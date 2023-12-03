import { CampaignFormResponse } from "../../models/campaign-form-response";
import { ConsoleLogger } from "../logger/ConsoleLogger";
import { FileLogger } from "../logger/FileLogger";
import { LoggerRepository } from "../logger/LoggerRepository";
import { styleContent } from "./campaign-style-content";
import { OpenAICampaignGenerator } from "./open-ai-campaign-generator";
const { v4: uuidv4 } = require('uuid');
const AWS = require('aws-sdk');

var fs = require('fs');
var shell = require('shelljs');

const logger = new LoggerRepository([new ConsoleLogger(), new FileLogger()])

export class GeneratorService {
  campaignFile = "~/campaign.html"
  outputFile = "~/campaign.pdf"
  openAIGenerator = new OpenAICampaignGenerator()

  createCampaign(preferences: CampaignFormResponse): Promise<string> {
    return new Promise((resolve, reject) => {
      this.buildHtml(preferences)
        .then((content) => {
          logger.log("Generated content: " + content + "\n\n Writing data to file...")
          try {
            fs.writeFile(this.campaignFile, content, async (err: Error) => { 
              if(err) { 
                reject(err)
              }
              logger.log("Data has been written to file successfully."); 
              
              if (shell.exec(`pagedjs-cli ${ this.campaignFile } -o ${ this.outputFile }`).code !== 0) {
                logger.log('Error: Failed to generate campaign PDF using pagedjs-cli')
                shell.exit(1);
                reject(new Error("Error: Failed to generate campaign PDF"))
              }
        
              const newID: string = uuidv4();
              try {
                const url = await this.saveCampaign(newID);
                resolve(newID);
              } catch(err) {
                logger.log(`Error: Failed to save a campaign with id ${newID} with error: ${err}`)
                reject(err);
              }
            }); 
          } catch(error) {
            logger.log(`Error: Failed to save a campaign data to file with error: ${error}`)
            reject(error)
          }
        })
        .catch((error: Error) => {
          logger.log(`Error: Failed to generate the html for new campaign with error: ${error}`)
          reject(error)
        })
    })
    
  }

  getCampaign(id: string) {
    
  }

  private async saveCampaign(id: string): Promise<string> {
    return new Promise(async (resolve, reject) => {
      try {
        const s3 = new AWS.S3({
          accessKeyId: process.env.AWS_ACCESS_KEY,
          secretAccessKey: process.env.AWS_SECRET_KEY,
          region: process.env.AWS_BUCKET_REGION
        });

        const pdfbucketName = process.env.AWS_BUCKET_NAME;
        const pdfFileStream = fs.createReadStream(this.outputFile);
        const pdfUploadParams =  {
          Bucket: pdfbucketName,
          Key: `${id}.pdf`,
          Body: pdfFileStream
        }

        await s3.upload(pdfUploadParams, function(err: Error, data: any) {
          if (err) {
            logger.log("PDF upload failed: " + err);
            reject(err)
          }
          logger.log(`PDF file uploaded successfully. ${data.Location}`);
          resolve(data.location)
        });

        const htmlFileStream = fs.createReadStream(this.campaignFile)
        const htmlbucketName = process.env.HTML_BUCKET_NAME;
        const htmlUploadParams =  {
          Bucket: htmlbucketName,
          Key: `${id}.html`,
          Body: htmlFileStream
        }

        await s3.upload(htmlUploadParams, function(err: Error, data: any) {
          if (err) {
              throw err;
          }
          logger.log(`HTML file uploaded successfully. ${data.Location}`);
        });
      } catch (error) {
        logger.log("Failed to save the campaign: " + error)
        reject(error)
      }
    })
  }

  private buildHtml(form: CampaignFormResponse): Promise<string> {
    return new Promise((resolve, reject) => {
      this.openAIGenerator.generateCampaign(form)
        .then((content: string | void) => {
          logger.log("Final generated content: " + content)

          if (content === undefined) {
            reject("Failed to generate the campaign because the final content was nil")
            return
          }

          resolve(`
          <html>
          <head>
            <meta charset="UTF-8" />
            <style>
              ${styleContent}
            </style>
          </head>
          <body>
            <div class="content">
              ${content}
            </div>
          </body>
          </html>
          `)
        })
        .catch((error: Error) => {
          logger.log(`Error: OPEN AI Campaign Generation failed with error: ${error}`)
          reject(error);
        })
    })
  }
}
import { styleContent } from "./campaign-style-content";
const { v4: uuidv4 } = require('uuid');
const AWS = require('aws-sdk');

var fs = require('fs');
var shell = require('shelljs');

export class GeneratorService {
  campaignFile = "campaign.html"
  outputFile = "campaign.pdf"

  createCampaign(): Promise<string> {
    return new Promise((resolve, reject) => {
      fs.writeFile(this.campaignFile, this.buildHtml(), async (err: Error) => { 
        if(err) { 
          reject(err)
        }
        console.log("Data has been written to file successfully."); 
        
        if (shell.exec(`pagedjs-cli ${ this.campaignFile } -o ${ this.outputFile }`).code !== 0) {
          shell.echo('Error: Failed to generate campaign PDF');
          shell.exit(1);
          reject(new Error("Error: Failed to generate campaign PDF"))
        }
  
        const newID: string = uuidv4();
        try {
          await this.saveCampaign(newID);
          resolve(newID);
        } catch(err) {
          reject(err);
        }
      }); 
    })
    
  }

  getCampaign(id: string) {
    
  }

  private async saveCampaign(id: string) {
    const s3 = new AWS.S3({
      accessKeyId: process.env.AWS_ACCESS_KEY,
      secretAccessKey: process.env.AWS_SECRET_KEY,
      region: process.env.AWS_BUCKET_REGION
    });
    const bucketName = process.env.AWS_BUCKET_NAME;
    const fileStream = fs.createReadStream(this.outputFile);
    const uploadParams =  {
      Bucket: bucketName,
      Key: `${id}.pdf`,
      Body: fileStream
    }

    await s3.upload(uploadParams, function(err: Error, data: any) {
      if (err) {
          throw err;
      }
      console.log(`File uploaded successfully. ${data.Location}`);
  });
  }

  private buildHtml(): string {
    var content = `
    <h1>This is a Title</h1>
    <p class="firstText">aalskdjf a;slkdjf ;alskdjfv na;lskdjf ;lasdkjfvwqeoijvnfpeoqwiudhgj [opaisdufnvpoiwejdgv apaiosunf ql;wkvf aksjdhf poasidfjvnqwlkervn apsoidug npaosij vfq;lwkejvnfpoasidufn aosj dfvpoqwiunecrm[paosk, foaijsh fpoiajsnmvt[oiqwje vflaksjd f[0oiasumfv[lkqwj erfvpoijas dg[oija spfv oijqwnf[d poi asdpjfqpeoijfv owieurhgnvpodi nvm pkj ,mj dpoijeq pgotjdsfplgkj epoijtr oqiwje flkasjdngp oi jdl;f kmxl kmc[owpd r[weopuit -[0394u5 [oqidsajg [owij foq[wiej toi</p>
    <p>aalskdjf a;slkdjf ;alskdjfv na;lskdjf ;lasdkjfvwqeoijvnfpeoqwiudhgj [opaisdufnvpoiwejdgv apaiosunf ql;wkvf aksjdhf poasidfjvnqwlkervn apsoidug npaosij vfq;lwkejvnfpoasidufn aosj dfvpoqwiunecrm[paosk, foaijsh fpoiajsnmvt[oiqwje vflaksjd f[0oiasumfv[lkqwj erfvpoijas dg[oija spfv oijqwnf[d poi asdpjfqpeoijfv owieurhgnvpodi nvm pkj ,mj dpoijeq pgotjdsfplgkj epoijtr oqiwje flkasjdngp oi jdl;f kmxl kmc[owpd r[weopuit -[0394u5 [oqidsajg [owij foq[wiej toi</p>
    <p>aalskdjf a;slkdjf ;alskdjfv na;lskdjf ;lasdkjfvwqeoijvnfpeoqwiudhgj [opaisdufnvpoiwejdgv apaiosunf ql;wkvf aksjdhf poasidfjvnqwlkervn apsoidug npaosij vfq;lwkejvnfpoasidufn aosj dfvpoqwiunecrm[paosk, foaijsh fpoiajsnmvt[oiqwje vflaksjd f[0oiasumfv[lkqwj erfvpoijas dg[oija spfv oijqwnf[d poi asdpjfqpeoijfv owieurhgnvpodi nvm pkj ,mj dpoijeq pgotjdsfplgkj epoijtr oqiwje flkasjdngp oi jdl;f kmxl kmc[owpd r[weopuit -[0394u5 [oqidsajg [owij foq[wiej toi</p>
    <br><br><br>
    <hr>
    <table>
        <thead>
            <th>
                Heading 1
            </th>
            <th>
                Heading 2
            </th>
            <th>
                Heading 3
            </th>
        </thead>
        <tbody>
            <tr>
                <td>
                    Data 1
                </td>
                <td>
                    Data 2
                </td>
                <td>
                    Data 3
                </td>
            </tr>
        </tbody>
        

    </table>
    <p>aalskdjf a;slkdjf ;alskdjfv na;lskdjf ;lasdkjfvwqeoijvnfpeoqwiudhgj [opaisdufnvpoiwejdgv apaiosunf ql;wkvf aksjdhf poasidfjvnqwlkervn apsoidug npaosij vfq;lwkejvnfpoasidufn aosj dfvpoqwiunecrm[paosk, foaijsh fpoiajsnmvt[oiqwje vflaksjd f[0oiasumfv[lkqwj erfvpoijas dg[oija spfv oijqwnf[d poi asdpjfqpeoijfv owieurhgnvpodi nvm pkj ,mj dpoijeq pgotjdsfplgkj epoijtr oqiwje flkasjdngp oi jdl;f kmxl kmc[owpd r[weopuit -[0394u5 [oqidsajg [owij foq[wiej toi</p>
    <h2>Subtitle</h2>
    <p>aalskdjf a;slkdjf ;alskdjfv na;lskdjf ;lasdkjfvwqeoijvnfpeoqwiudhgj [opaisdufnvpoiwejdgv apaiosunf ql;wkvf aksjdhf poasidfjvnqwlkervn apsoidug npaosij vfq;lwkejvnfpoasidufn aosj dfvpoqwiunecrm[paosk, foaijsh fpoiajsnmvt[oiqwje vflaksjd f[0oiasumfv[lkqwj erfvpoijas dg[oija spfv oijqwnf[d poi asdpjfqpeoijfv owieurhgnvpodi nvm pkj ,mj dpoijeq pgotjdsfplgkj epoijtr oqiwje flkasjdngp oi jdl;f kmxl kmc[owpd r[weopuit -[0394u5 [oqidsajg [owij foq[wiej toi</p>
    <p>aalskdjf a;slkdjf ;alskdjfv na;lskdjf ;lasdkjfvwqeoijvnfpeoqwiudhgj [opaisdufnvpoiwejdgv apaiosunf ql;wkvf aksjdhf poasidfjvnqwlkervn apsoidug npaosij vfq;lwkejvnfpoasidufn aosj dfvpoqwiunecrm[paosk, foaijsh fpoiajsnmvt[oiqwje vflaksjd f[0oiasumfv[lkqwj erfvpoijas dg[oija spfv oijqwnf[d poi asdpjfqpeoijfv owieurhgnvpodi nvm pkj ,mj dpoijeq pgotjdsfplgkj epoijtr oqiwje flkasjdngp oi jdl;f kmxl kmc[owpd r[weopuit -[0394u5 [oqidsajg [owij foq[wiej toi</p>

    <img src="generate-campaign.jpg">
    <p>aalskdjf a;slkdjf ;alskdjfv na;lskdjf ;lasdkjfvwqeoijvnfpeoqwiudhgj [opaisdufnvpoiwejdgv apaiosunf ql;wkvf aksjdhf poasidfjvnqwlkervn apsoidug npaosij vfq;lwkejvnfpoasidufn aosj dfvpoqwiunecrm[paosk, foaijsh fpoiajsnmvt[oiqwje vflaksjd f[0oiasumfv[lkqwj erfvpoijas dg[oija spfv oijqwnf[d poi asdpjfqpeoijfv owieurhgnvpodi nvm pkj ,mj dpoijeq pgotjdsfplgkj epoijtr oqiwje flkasjdngp oi jdl;f kmxl kmc[owpd r[weopuit -[0394u5 [oqidsajg [owij foq[wiej toi</p>
    <p>aalskdjf a;slkdjf ;alskdjfv na;lskdjf ;lasdkjfvwqeoijvnfpeoqwiudhgj [opaisdufnvpoiwejdgv apaiosunf ql;wkvf aksjdhf poasidfjvnqwlkervn apsoidug npaosij vfq;lwkejvnfpoasidufn aosj dfvpoqwiunecrm[paosk, foaijsh fpoiajsnmvt[oiqwje vflaksjd f[0oiasumfv[lkqwj erfvpoijas dg[oija spfv oijqwnf[d poi asdpjfqpeoijfv owieurhgnvpodi nvm pkj ,mj dpoijeq pgotjdsfplgkj epoijtr oqiwje flkasjdngp oi jdl;f kmxl kmc[owpd r[weopuit -[0394u5 [oqidsajg [owij foq[wiej toi</p>

    <blockquote>Test quote</blockquote>
    <p>aalskdjf a;slkdjf ;alskdjfv na;lskdjf ;lasdkjfvwqeoijvnfpeoqwiudhgj [opaisdufnvpoiwejdgv apaiosunf ql;wkvf aksjdhf poasidfjvnqwlkervn apsoidug npaosij vfq;lwkejvnfpoasidufn aosj dfvpoqwiunecrm[paosk, foaijsh fpoiajsnmvt[oiqwje vflaksjd f[0oiasumfv[lkqwj erfvpoijas dg[oija spfv oijqwnf[d poi asdpjfqpeoijfv owieurhgnvpodi nvm pkj ,mj dpoijeq pgotjdsfplgkj epoijtr oqiwje flkasjdngp oi jdl;f kmxl kmc[owpd r[weopuit -[0394u5 [oqidsajg [owij foq[wiej toi</p>
    <div class="descriptive">
    <p>Test regular</p>
    <strong>Test Strong</strong>
    </div>
    <p>aalskdjf a;slkdjf ;alskdjfv na;lskdjf ;lasdkjfvwqeoijvnfpeoqwiudhgj [opaisdufnvpoiwejdgv apaiosunf ql;wkvf aksjdhf poasidfjvnqwlkervn apsoidug npaosij vfq;lwkejvnfpoasidufn aosj dfvpoqwiunecrm[paosk, foaijsh fpoiajsnmvt[oiqwje vflaksjd f[0oiasumfv[lkqwj erfvpoijas dg[oija spfv oijqwnf[d poi asdpjfqpeoijfv owieurhgnvpodi nvm pkj ,mj dpoijeq pgotjdsfplgkj epoijtr oqiwje flkasjdngp oi jdl;f kmxl kmc[owpd r[weopuit -[0394u5 [oqidsajg [owij foq[wiej toi</p>
    <p>aalskdjf a;slkdjf ;alskdjfv na;lskdjf ;lasdkjfvwqeoijvnfpeoqwiudhgj [opaisdufnvpoiwejdgv apaiosunf ql;wkvf aksjdhf poasidfjvnqwlkervn apsoidug npaosij vfq;lwkejvnfpoasidufn aosj dfvpoqwiunecrm[paosk, foaijsh fpoiajsnmvt[oiqwje vflaksjd f[0oiasumfv[lkqwj erfvpoijas dg[oija spfv oijqwnf[d poi asdpjfqpeoijfv owieurhgnvpodi nvm pkj ,mj dpoijeq pgotjdsfplgkj epoijtr oqiwje flkasjdngp oi jdl;f kmxl kmc[owpd r[weopuit -[0394u5 [oqidsajg [owij foq[wiej toi</p>
    <p>aalskdjf a;slkdjf ;alskdjfv na;lskdjf ;lasdkjfvwqeoijvnfpeoqwiudhgj [opaisdufnvpoiwejdgv apaiosunf ql;wkvf aksjdhf poasidfjvnqwlkervn apsoidug npaosij vfq;lwkejvnfpoasidufn aosj dfvpoqwiunecrm[paosk, foaijsh fpoiajsnmvt[oiqwje vflaksjd f[0oiasumfv[lkqwj erfvpoijas dg[oija spfv oijqwnf[d poi asdpjfqpeoijfv owieurhgnvpodi nvm pkj ,mj dpoijeq pgotjdsfplgkj epoijtr oqiwje flkasjdngp oi jdl;f kmxl kmc[owpd r[weopuit -[0394u5 [oqidsajg [owij foq[wiej toi</p>
    <p>aalskdjf a;slkdjf ;alskdjfv na;lskdjf ;lasdkjfvwqeoijvnfpeoqwiudhgj [opaisdufnvpoiwejdgv apaiosunf ql;wkvf aksjdhf poasidfjvnqwlkervn apsoidug npaosij vfq;lwkejvnfpoasidufn aosj dfvpoqwiunecrm[paosk, foaijsh fpoiajsnmvt[oiqwje vflaksjd f[0oiasumfv[lkqwj erfvpoijas dg[oija spfv oijqwnf[d poi asdpjfqpeoijfv owieurhgnvpodi nvm pkj ,mj dpoijeq pgotjdsfplgkj epoijtr oqiwje flkasjdngp oi jdl;f kmxl kmc[owpd r[weopuit -[0394u5 [oqidsajg [owij foq[wiej toi</p>
    <div class="classTable">
    <h5>Class Name<h5>
    </div>
    <p>aalskdjf a;slkdjf ;alskdjfv na;lskdjf ;lasdkjfvwqeoijvnfpeoqwiudhgj [opaisdufnvpoiwejdgv apaiosunf ql;wkvf aksjdhf poasidfjvnqwlkervn apsoidug npaosij vfq;lwkejvnfpoasidufn aosj dfvpoqwiunecrm[paosk, foaijsh fpoiajsnmvt[oiqwje vflaksjd f[0oiasumfv[lkqwj erfvpoijas dg[oija spfv oijqwnf[d poi asdpjfqpeoijfv owieurhgnvpodi nvm pkj ,mj dpoijeq pgotjdsfplgkj epoijtr oqiwje flkasjdngp oi jdl;f kmxl kmc[owpd r[weopuit -[0394u5 [oqidsajg [owij foq[wiej toi</p>
    <p>aalskdjf a;slkdjf ;alskdjfv na;lskdjf ;lasdkjfvwqeoijvnfpeoqwiudhgj [opaisdufnvpoiwejdgv apaiosunf ql;wkvf aksjdhf poasidfjvnqwlkervn apsoidug npaosij vfq;lwkejvnfpoasidufn aosj dfvpoqwiunecrm[paosk, foaijsh fpoiajsnmvt[oiqwje vflaksjd f[0oiasumfv[lkqwj erfvpoijas dg[oija spfv oijqwnf[d poi asdpjfqpeoijfv owieurhgnvpodi nvm pkj ,mj dpoijeq pgotjdsfplgkj epoijtr oqiwje flkasjdngp oi jdl;f kmxl kmc[owpd r[weopuit -[0394u5 [oqidsajg [owij foq[wiej toi</p>
    <p>aalskdjf a;slkdjf ;alskdjfv na;lskdjf ;lasdkjfvwqeoijvnfpeoqwiudhgj [opaisdufnvpoiwejdgv apaiosunf ql;wkvf aksjdhf poasidfjvnqwlkervn apsoidug npaosij vfq;lwkejvnfpoasidufn aosj dfvpoqwiunecrm[paosk, foaijsh fpoiajsnmvt[oiqwje vflaksjd f[0oiasumfv[lkqwj erfvpoijas dg[oija spfv oijqwnf[d poi asdpjfqpeoijfv owieurhgnvpodi nvm pkj ,mj dpoijeq pgotjdsfplgkj epoijtr oqiwje flkasjdngp oi jdl;f kmxl kmc[owpd r[weopuit -[0394u5 [oqidsajg [owij foq[wiej toi</p>
    <p>aalskdjf a;slkdjf ;alskdjfv na;lskdjf ;lasdkjfvwqeoijvnfpeoqwiudhgj [opaisdufnvpoiwejdgv apaiosunf ql;wkvf aksjdhf poasidfjvnqwlkervn apsoidug npaosij vfq;lwkejvnfpoasidufn aosj dfvpoqwiunecrm[paosk, foaijsh fpoiajsnmvt[oiqwje vflaksjd f[0oiasumfv[lkqwj erfvpoijas dg[oija spfv oijqwnf[d poi asdpjfqpeoijfv owieurhgnvpodi nvm pkj ,mj dpoijeq pgotjdsfplgkj epoijtr oqiwje flkasjdngp oi jdl;f kmxl kmc[owpd r[weopuit -[0394u5 [oqidsajg [owij foq[wiej toi</p>
    <p>aalskdjf a;slkdjf ;alskdjfv na;lskdjf ;lasdkjfvwqeoijvnfpeoqwiudhgj [opaisdufnvpoiwejdgv apaiosunf ql;wkvf aksjdhf poasidfjvnqwlkervn apsoidug npaosij vfq;lwkejvnfpoasidufn aosj dfvpoqwiunecrm[paosk, foaijsh fpoiajsnmvt[oiqwje vflaksjd f[0oiasumfv[lkqwj erfvpoijas dg[oija spfv oijqwnf[d poi asdpjfqpeoijfv owieurhgnvpodi nvm pkj ,mj dpoijeq pgotjdsfplgkj epoijtr oqiwje flkasjdngp oi jdl;f kmxl kmc[owpd r[weopuit -[0394u5 [oqidsajg [owij foq[wiej toi</p>
    <p>aalskdjf a;slkdjf ;alskdjfv na;lskdjf ;lasdkjfvwqeoijvnfpeoqwiudhgj [opaisdufnvpoiwejdgv apaiosunf ql;wkvf aksjdhf poasidfjvnqwlkervn apsoidug npaosij vfq;lwkejvnfpoasidufn aosj dfvpoqwiunecrm[paosk, foaijsh fpoiajsnmvt[oiqwje vflaksjd f[0oiasumfv[lkqwj erfvpoijas dg[oija spfv oijqwnf[d poi asdpjfqpeoijfv owieurhgnvpodi nvm pkj ,mj dpoijeq pgotjdsfplgkj epoijtr oqiwje flkasjdngp oi jdl;f kmxl kmc[owpd r[weopuit -[0394u5 [oqidsajg [owij foq[wiej toi</p>
    `
    return `
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
    `
  }
}
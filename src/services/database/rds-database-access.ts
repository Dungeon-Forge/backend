import { OkPacket, RowDataPacket } from "mysql2";
import { DatabaseReading } from "./database-reading";
import { Connection } from "mysql2/typings/mysql/lib/Connection";
import { LoggerRepository } from "../logger/LoggerRepository";
import { ConsoleLogger } from "../logger/ConsoleLogger";
import { FileLogger } from "../logger/FileLogger";
var mysql = require('mysql2');

export interface Campaign extends RowDataPacket {
    id: string
    pdfURL: string
    htmlURL: string
}

const logger = new LoggerRepository([new ConsoleLogger(), new FileLogger()])

export class RDSDatabaseAccess implements DatabaseReading {
    databaseURL = process.env.DB_URL
    databasePort = process.env.DB_PORT
    databaseUsername = process.env.DB_USERNAME
    databasePWD = process.env.DB_PWD

    fetchCampaign(id: string): Promise<string> {
        const request = `SELECT * FROM \`dungeon-forge\`.Campaigns where id = \"${id}\";`
        logger.log(`Sending request to db: ${request}`)

        return new Promise(async (resolve, reject) => {
            const connection: Connection = await mysql.createConnection({
                host: this.databaseURL,
                port: this.databasePort,
                user: this.databaseUsername,
                password: this.databasePWD
            });

            try {
                connection.connect();
                connection.query<Campaign[]>(request, [[id]], (err, res) => {
                    if (err) {
                        logger.log("Failed to execute fetch capmaign query with error: " + err)
                        reject(err)
                    }

                    if (res.length > 0) {
                        logger.log(`Found campaign with id ${id}: ` + JSON.stringify(res[0]))
                        resolve(res[0].pdfURL)
                    } else {
                        logger.log(`No campaign with id: ${id}`)
                        throw new Error(`No campaign with id: ${id}`)
                    }
                })
            } catch(error) {
                reject(error)
                logger.log(`Failed to fetch data from Campaigns table: ${error}`)
            } finally {
                connection.end()
            }
        })
              
    }

    saveCampaign(id: string, pdfURL: string, htmlURL: string): void {
        const request = `INSERT INTO \`dungeon-forge\`.Campaigns (id, pdfURL, htmlURL) VALUES (\"${id}\", \"${pdfURL}\", \"${htmlURL}\");`
        logger.log(`Sending request to db: ${request}`)
        
        const connection: Connection = mysql.createConnection({
            host: this.databaseURL,
            port: this.databasePort,
            user: this.databaseUsername,
            password: this.databasePWD
        });

        connection.query<OkPacket>(request, (err, res) => {
            if (err) {
                throw err
            }

            logger.log(`Successfully inserted campaign ${id} into the database`)
        })
    }
}
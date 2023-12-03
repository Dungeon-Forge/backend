import express from "express";
import { GeneratorService } from "./services/generator/generator-service";
import { CampaignFormValidator } from "./services/form-validator/form-validator";
import { CampaignFormResponse } from "./models/campaign-form-response";
import { LoggerRepository } from "./services/logger/LoggerRepository";
import { ConsoleLogger } from "./services/logger/ConsoleLogger";
import { FileLogger } from "./services/logger/FileLogger";

var cors = require('cors')
const index = express.Router();

const generatorService = new GeneratorService();
const logger = new LoggerRepository([new ConsoleLogger(), new FileLogger()])

index.post('/campaigns/generate', cors(), function(req, res) {
    logger.log("Received generate request...")
    res.set('Access-Control-Allow-Origin', '*');
    res.set('Access-Control-Allow-Methods', 'POST')

    req.setTimeout(12000000, () => {
        logger.log(`Generate campaign request timed out`)
        res.status(408).send()
    })

    logger.log(req.body)
    const body = req.body

    if (Object.keys(body).length === 0) {
        res.status(400).send('No input provided');
    } else {
        try {
            const validator = new CampaignFormValidator()
            const formInput = body as CampaignFormResponse

            validator.validateForm(formInput)
            
            generatorService
                .createCampaign(formInput)
                .then((id) => {
                    const responseBody = {
                        id: id
                    }
                    logger.log("Sending generate campaign response body: " + responseBody)
                    res.status(200).send(JSON.stringify(responseBody))
                })
                .catch((error) => {
                    logger.log("Failed to generate a new campaign: " + error)
                    res.status(400).send("Failed to generate a campaign")
                })
        } catch(e) {
            logger.log("Invalid input form: " + e)
            res.status(400).send("Invalid input parameters")
        }
    }
});

/**
 * 
 * Handle GET campaign/{id}
 *
 * @param id - A string id representing the generated campaign
 * @returns A campaign with that id number
 */
index.get('/campaign/:id', cors(), function(req, res) {
    res.removeHeader('Access-Control-Allow-Origin')
    res.set('Access-Control-Allow-Origin', '*');
    res.set('Access-Control-Allow-Methods', 'GET');
    let id = req.params.id;

    if (id.toString() === "none") {
        res.status(404).send()
    } else {
        res.status(200).json(JSON.stringify(generatorService.getCampaign(id.toString()))).send()
    }
});

export { index };
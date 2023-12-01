import express, { response } from "express";
import { GeneratorService } from "./services/generator/generator-service";
import { CampaignFormValidator } from "./services/form-validator/form-validator";
import { CampaignFormResponse } from "./models/campaign-form-response";

var cors = require('cors')
const index = express.Router();

const generatorService = new GeneratorService();

index.options('/campaigns/generate', cors())
index.post('/campaigns/generate', cors(), async function(req, res) {
    try {
        console.log("Received generate request...")
        res.removeHeader('Access-Control-Allow-Origin')
        res.set('Access-Control-Allow-Origin', '*');
        res.set('Access-Control-Allow-Methods', 'POST')
    
        // console.log(req.body)
        // const body = req.body
    
        // if (Object.keys(body).length === 0) {
        //     return res.status(400).send('No input provided');
        // }
        
        // const validator = new CampaignFormValidator()
        // const formInput = body as CampaignFormResponse

        // validator.validateForm(formInput)
        
        // const id = await generatorService.createCampaign(formInput);
        // const responseBody = { id };

        // console.log("Sending generate campaign response body: " + responseBody)
        res.status(200).send(JSON.stringify({"Test": "Test"}))
    } catch(e) {
        console.log("Invalid input form: " + e)
        res.status(400).send("Invalid input parameters")
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
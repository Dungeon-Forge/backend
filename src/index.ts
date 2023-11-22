import express from "express";
import { GeneratorService } from "./services/generator-service";
import { CampaignFormValidator } from "./services/form-validator";
import { CampaignFormResponse } from "./models/campaign-form-response";
const index = express.Router();

const generatorService = new GeneratorService();

index.post('/campaigns/generate', function(req, res) {
    res.set('Access-Control-Allow-Origin', '*');

    console.log(req.body)
    const body = req.body
    if (Object.keys(body).length === 0) {
        res.status(400).send('No input provided');
    } else {
        try {
            const validator = new CampaignFormValidator()
            const formInput = body as CampaignFormResponse
            res.status(200).send()
            
        } catch(e) {
            console.log("Invalid input form: " + e)
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
index.get('/campaign/:id', function(req, res) {
    res.set('Access-Control-Allow-Origin', '*');
    let id = req.params.id;

    if (id.toString() === "none") {
        res.status(404).send()
    } else {
        res.status(200).json(JSON.stringify(generatorService.getCampaign(id.toString()))).send()
    }
});

export { index };
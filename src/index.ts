import express from "express";
import { GeneratorService } from "./services/generator-service";
const index = express.Router();

const generatorService = new GeneratorService();

index.post('/campaigns/generate', function(req, res) {
    console.log(req.body)
    const body = req.body
    if (Object.keys(body).length === 0) {
        res.status(400).send('No input provided');
    } else {
        res.status(200).send()
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
    let id = req.params.id;

    if (id.toString() === "none") {
        res.status(404).send()
    } else {
        res.status(200).json(JSON.stringify(generatorService.getCampaign(id.toString()))).send()
    }
});

export { index };
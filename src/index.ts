import express from "express";
import { GeneratorService } from "./services/generator-service";
const index = express.Router();

const generatorService = new GeneratorService();

/**
 * 
 * Handle GET campaign/{id}
 *
 * @param id - A string id representing the generated campaign
 * @returns A campaign with that id number
 */
index.get('/campaign/:id', function(req, res) {
    var id = req.params.id;
    if (id === "none") {
        res.status(404).send()
    } else {
        res.status(200).json(JSON.stringify(generatorService.getCampaign(id))).send()
    }
});

export { index };
import express from "express";
import {index} from "./index";
import { GeneratorService } from "./services/generator/generator-service";
import { CampaignFormValidator } from "./services/form-validator/form-validator";
import { CampaignFormResponse } from "./models/campaign-form-response";
var bodyParser = require('body-parser')
var cors = require('cors')

const app = express();

app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
});
app.options('*', cors());

const generatorService = new GeneratorService();

app.options('/campaigns/generate', cors())
app.post('/campaigns/generate', cors(), async function(req, res) {
    try {
        console.log("Received generate request...")
        res.removeHeader('Access-Control-Allow-Origin')
        res.set('Access-Control-Allow-Origin', '*');
        res.set('Access-Control-Allow-Methods', 'POST')
    
        console.log(req.body)
        const body = req.body
    
        if (Object.keys(body).length === 0) {
            return res.status(400).send('No input provided');
        }
        
        const validator = new CampaignFormValidator()
        const formInput = body as CampaignFormResponse

        validator.validateForm(formInput)
        
        const id = await generatorService.createCampaign(formInput);
        const responseBody = { id };

        console.log("Sending generate campaign response body: " + responseBody)
        res.status(200).send(JSON.stringify(responseBody))
    } catch(e) {
        console.log("Invalid input form: " + e)
        res.status(400).send("Invalid input parameters")
    }
});

app.get('/campaigns/generate', cors(), async function(req, res) {
    console.log("Received generate request...")
    res.removeHeader('Access-Control-Allow-Origin')
    res.set('Access-Control-Allow-Origin', '*');
    res.set('Access-Control-Allow-Methods', 'POST')
    res.status(200).send("No cors")
});

/**
 * 
 * Handle GET campaign/{id}
 *
 * @param id - A string id representing the generated campaign
 * @returns A campaign with that id number
 */
app.get('/campaign/:id', cors(), function(req, res) {
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

const port = process.env.PORT || 8080;

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
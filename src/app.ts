import express from "express";
import {index} from "./index";
import { LoggerRepository } from "./services/logger/LoggerRepository";
import { ConsoleLogger } from "./services/logger/ConsoleLogger";
import { FileLogger } from "./services/logger/FileLogger";
var bodyParser = require('body-parser')
var cors = require('cors')

const app = express();
const logger = new LoggerRepository([new ConsoleLogger(), new FileLogger()])

app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
});
app.use("/", index);

const port = process.env.PORT || 8080;

var server = app.listen(port, () => {
    logger.log(`Server running at http://localhost:${port}`);
});

server.setTimeout(12000000, () => {
    logger.log('Request timed out');
    server.closeIdleConnections();
});
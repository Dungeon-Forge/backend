import express from "express";
import {index} from "./index";
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
app.use("/", index);

const port = process.env.PORT || 8080;

var server = app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
server.timeout = 0
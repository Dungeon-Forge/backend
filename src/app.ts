import express from "express";
import {index} from "./index";
var bodyParser = require('body-parser')

const app = express();

app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false }));
app.use("/", index);

const port = process.env.PORT || 8080;

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
import express from "express";
import {index} from "./index";

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use("/", index);

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
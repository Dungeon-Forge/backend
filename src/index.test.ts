import {expect, jest, test} from '@jest/globals';
import {index} from "./index";
import express from 'express';
import request from "supertest";

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use("/", index);

test('reject /campaign POST', done => {
    request(app)
    .post("/campaign")
    .expect(404, done);
});

test('reject /campaign PUT', done => {
    request(app)
    .put("/campaign")
    .expect(404, done);
});

test('reject /campaign GET with no id', done => {
    request(app)
    .get("/campaign")
    .expect(404, done);
});

test('/campaign/test GET returns campaign with id test', done => {
    request(app)
    .get("/campaign/test")
    .expect("Content-Type", /json/)
    .expect(200, done);
});

test('/campaign/test GET unknown campaign returns 404', done => {
    request(app)
    .get("/campaign/none")
    .expect(404, done);
})

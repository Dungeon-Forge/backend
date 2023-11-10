import {expect, jest, test} from '@jest/globals';
import {index} from "./index";
import express from 'express';
import request from "supertest";

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use("/", index);

// GET /campaign/{id} endpoint tests
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

// POST /campaign/generate endpoint tests
test('/campaigns/generate GET returns 404', done => {
    request(app)
    .get("/campaigns/generate")
    .expect(404, done);
})

test('/campaigns/generate PUT returns 404', done => {
    request(app)
    .put("/campaigns/generate")
    .expect(404, done);
})

test('/campaigns/generate POST with no inputs returns 400', done => {
    request(app)
    .post("/campaigns/generate")
    .expect("No input provided")
    .expect(400, done);
})

test('/campaigns/generate POST with valid inputs returns 200', done => {
    request(app)
    .post("/campaigns/generate")
    .type("form")
    .send({ test: "test" })
    .expect(200, done);
})
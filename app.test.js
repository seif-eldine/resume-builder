require("dotenv").config();
const request = require("supertest");
const app = require("./app");

let token = null;

describe("Resume builder API", () => {
  beforeEach((done) => {
    request(app)
      .post("/resumes/login")
      .send({
        username: "user",
        password: "user",
      })
      .end((err, res) => {
        token = res.body.accessToken; // Or something
        done();
      });
  });

  it("POST /login --> user logs in", () => {
    return request(app)
      .post("/resumes/login")
      .send({
        username: "user",
        password: "user",
      })
      .expect("Content-Type", /json/)
      .expect(200)
      .then((response) => {
        expect(response.body).toEqual(
          expect.objectContaining({
            accessToken: expect.any(String),
            user: expect.any(Object),
          })
        );
      });
  });

  it("POST /create --> user is created and server responds with data object", () => {
    return request(app)
      .post("/resumes/create")
      .set("authorization", token)
      .send({
        stageNum: 3,
        username: "user",
        firstName: "Seif Eldine",
        lastName: "Ashraf",
        age: "25",
        email: "seif.eldine.ghozais@gmail.com",
      })
      .expect("Content-Type", "application/json; charset=utf-8")
      .expect(200)
      .then((response) => {
        expect(response.body).toEqual(
          expect.objectContaining({
            // responseToClient: expect.objectContaining({
            //   data: expect.any(Object),
            //   username: expect.any(String),
            // }),
            data: expect.any(Object),
            username: expect.any(String),
          })
        );
      });
  });
});

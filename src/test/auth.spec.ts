import {describe, expect, test} from '@jest/globals';
import app from "../app/application/app";
import request from 'supertest';


describe("GET /api/auth/login", () => {
    test("should respond with a 400 status code", async () => {
        const userData = {
            email: "pepe@gmail.com",
            password: "1234"
        };
        const response = await request(app).post("/api/auth/login").send(userData);
        expect(response.statusCode).toBe(400)
    })
})

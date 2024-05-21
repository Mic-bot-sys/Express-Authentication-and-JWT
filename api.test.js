const request = require('supertest')
const server = require('./server')
const {addition} = require("./util")



// describe('GET /v1/user/get', () => {
//     it('responds with status 200', async () => {
//       const response = await request(server).get('/v1/user/get');
//       expect(response.status).toBe(200);
//     });
//   });
const request = require('supertest');
const app = require('../app'); // Assuming your app is exported from app.js

describe('GET /', () => {
  it('responds with status 200 and a welcome message', async () => {
    const response = await request(app).get('/');
    expect(response.statusCode).toBe(200);
    expect(response.text).toBe('Welcome to LectoTrack API!');
  });
}); 
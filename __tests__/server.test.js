'use strict';

const supertest = require('supertest');
const { app } = require('../src/server');
const { db } = require('../src/models/index');

const request = supertest(app);

beforeAll(async () => {
  await db.sync();
});

afterAll(async () => {
  await db.drop();
});

describe('Test routes', () => {

  test('testing POST', async () => {
    let response = await request.post('/api/v1/food').send({
      name: 'apple',
      calories: 95,
      type: 'fruit',
    });

    expect(response.status).toEqual(201);
    expect(response.body.name).toEqual('apple');
  });

  test('testing GET all', async () => {
    let response = await request.get('/api/v1/food');

    expect(response.body[0].name).toEqual('apple');
    expect(response.body[0].calories).toEqual(95);
    expect(response.body[0].type).toEqual('fruit');
  });

  test('testing GET one', async () => {
    let response = await request.get('/api/v1/food/1');

    expect(response.body.name).toEqual('apple');
    expect(response.body.calories).toEqual(95);
    expect(response.body.type).toEqual('fruit');
  });

  test('testing PUT', async () => {
    let response = await request.put('/api/v1/food/1').send({
      name: 'NewApple',
      calories: 95,
      type: 'fruit',
    });

    expect(response.status).toEqual(200);
    expect(response.body.name).toEqual('NewApple');
  });

  test('testing DELETE', async () => {
    let response = await request.delete('/api/v1/food/1');

    expect(response.status).toEqual(200);
  });
});
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

describe('auth testing', () => {

  test('test signup', async () => {
    let response = await request.post('/signup').send({
      username: 'Adin',
      password: 'adin101',
      role: 'admin',
    });

    expect(response.status).toBe(201);
    expect(response.body.user.username).toBe('Adin');
    expect(response.body.user.role).toBe('admin');
  });

  test('test signin', async () => {
    let response = await request.post('/signin').auth('Adin', 'adin101');

    expect(response.status).toBe(200);
    expect(response.body.user.username).toEqual('Adin');
    expect(response.body.user.role).toEqual('admin');
  });
});
'use strict';

const { app } = require('../src/server.js');
const supergoose = require('@code-fellows/supergoose');
const request = supergoose(app);

let idFood;
let idClothe;


describe('Handle Not found errors', () => {
  it('should return a 404 error on bad route', async () => {
    let response = await request.get('/foo');
    expect(response.status).toEqual(404);
  });
  it('should return a 404 error on bad method', async () => {
    let response = await request.post('/foo');
    expect(response.status).toEqual(404);
  });
});

describe('api server', () => {
  it('should return all food using post', async () => {
    let response = await request
      .post('/food')
      .send({ type: 'healthy', name: 'salad' });
    expect(response.status).toEqual(200);
    idFood = response.body._id;
    expect(response.body).toStrictEqual({
      __v: 0,
      _id: idFood,
      type: 'healthy',
      name: 'salad',
    });
  });
  it('should return all clothes using post', async () => {
    let response = await request
      .post('/clothes')
      .send({ type: 'blouse', size: 'xl' });
    expect(response.status).toEqual(200);
    idClothe = response.body._id;
    expect(response.body).toStrictEqual({
      __v: 0,
      _id: idClothe,
      type: 'blouse',
      size: 'xl',
    });
  });



  it('should return all food using get', async () => {
    let response = await request.get('/food');
    expect(response.status).toEqual(200);
  });
  it('should return all clothes using get', async () => {
    let response = await request.get('/clothes');
    expect(response.status).toEqual(200);
  });


  it('should return specific food using GET/:id routes', async () => {
    let response = await request.get(`/food/${idFood}`);
    expect(response.status).toEqual(200);
    expect(response.body[0]._id).toEqual(idFood);
  });
  it('should return specific clothes using GET/:id routes', async () => {
    let response = await request.get(`/clothes/${idClothe}`);
    expect(response.status).toEqual(200);
    expect(response.body[0]._id).toEqual(idClothe);
  });


  it('should return specific food using update/:id routes', async () => {
    let response = await request
      .put(`/food/${idFood}`)
      .send({ type: 'fastfood', name: 'burger' });
    expect(response.status).toEqual(200);
    expect(response.body).toStrictEqual({
      __v: 0,
      _id: idFood,
      type: 'fastfood',
      name: 'burger',
    });
  });
  it('should return specific  clothes using update/:id routes', async () => {
    let response = await request
      .put(`/clothes/${idClothe}`)
      .send({ type: 'jeans', size: 'xxl' });
    expect(response.status).toEqual(200);
    expect(response.body).toStrictEqual({
      __v: 0,
      _id: idClothe,
      type: 'jeans',
      size: 'xxl',
    });
  });


  it('should return null when data is deleted from food', async () => {
    let response = await request.delete(`/food/${idFood}`);
    expect(response.status).toEqual(200);
    expect(response.body).toStrictEqual({
      __v: 0,
      _id: idFood,
      type: 'fastfood',
      name: 'burger',
    });
  });
  it('should return null when data is deleted from clothes', async () => {
    let response = await request.delete(`/clothes/${idClothe}`);
    expect(response.status).toEqual(200);
    expect(response.body).toStrictEqual({
      __v: 0,
      _id: idClothe,
      type: 'jeans',
      size: 'xxl',
    });
  });


});



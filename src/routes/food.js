'use strict';
const express = require('express');
const DataMngr = require('../models/dataMngr.js');
const foodModel = require('../models/food.js');
const food = new DataMngr(foodModel);
const router = express.Router();



router.get('/', getFood);
router.get('/:id', getFoodById);
router.post('/', createFood);
router.put('/:id', updateFood);
router.delete('/:id', deleteFood);


async function getFood (req, res, next) {
  try {
    let foodArray = await food.read();
    res.status(200).json(foodArray);
  } catch (error) {
    next(error);
  }
}


async function getFoodById  (req, res, next) {
  try {
    let foodObject = await food.read(req.params.id);
    res.json(foodObject);
    
  } catch (error) {
    next(error);
  }
}


async function createFood  (req, res, next) {
  try {
    const foodObject = req.body;
    const resopnse = await food.create(foodObject);
    res.status(200).json(resopnse);
    
  } catch (error) {
    next(error);
  }
}



async function updateFood (req, res, next) {
  try {
    let foodObject = req.body;
    let response = await food.update(req.params.id, foodObject);
    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
}


async function deleteFood  (req, res, next) {
  try {
    const response = await food.delete(req.params.id);
    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
}



module.exports = router;

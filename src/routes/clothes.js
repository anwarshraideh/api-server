'use strict';
const express = require('express');
const DataMngr = require('../models/dataMngr.js');
const clotheModel = require('../models/clothes.js');
const clothe = new DataMngr(clotheModel);
const router = express.Router();



router.get('/', getClothes);
router.get('/:id', getClothesById);
router.post('/', createClothes);
router.put('/:id', updateClothe);
router.delete('/:id', deleteClothe);


async function getClothes (req, res, next) {
  try {
    let clothesArray = await clothe.read();
    res.status(200).json(clothesArray);
  } catch (error) {
    next(error);
  }
}


async function getClothesById(req, res, next) {
  try {
    let colthesObject = await clothe.read(req.params.id);
    res.json(colthesObject);

  } catch (error) {
    next(error);
  }
}


async function createClothes(req, res, next) {
  try {
    const clotheObject = req.body;
    const resopnse = await clothe.create(clotheObject);
    res.status(200).json(resopnse);


  } catch (error) {
    next(error);
  }
}



async function updateClothe (req, res, next) {
  try {
    let clotheObject = req.body;
    let response = await clothe.update(req.params.id, clotheObject);
    res.status(200).json(response);


  } catch (error) {
    next(error);
  }
}


async function deleteClothe (req, res, next) {
  try {
    const response = await clothe.delete(req.params.id);
    res.status(200).json(response);

  } catch (error) {
    next(error);
  }
}


module.exports = router;

const router = require('express').Router();
const apoliceController = require('../controllers/apolice.controller');
const apoliceValidator = require('../validators/apolice.validator');

router.get('/apolice/:id', apoliceValidator.validationParamsRules, apoliceValidator.checkRules, apoliceController.generateCode, apoliceController.generateToken, apoliceController.generateURL);

module.exports = router;
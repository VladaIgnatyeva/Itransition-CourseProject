const express = require('express');
const passport = require('passport');
const router = express.Router();

const db = require('../mongoose/mongoose');
const log = require('../log')(module);
const Collection = require('../mongoose/models/Collection');


module.exports = router;



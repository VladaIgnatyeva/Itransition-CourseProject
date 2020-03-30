//import express from 'express';
const express = require('express');
const bodyParser = require('body-parser');
//import bodyParser from 'body-parser';
//import cors from 'cors';
//import path from 'path';
const cors = require('cors');
const path = require('path');
const log = require('./libs/log')(module);
const config = require('./libs/config');
const passport = require('passport');
require('./libs/auth/passport');
const api = require('./libs/routes/api');
const users = require('./libs/routes/users');
const oauth = require('./libs/routes/oauth');
const tags = require('./libs/routes/tags');
const collections = require('./libs/routes/collections');

const app = express();

app.use(bodyParser.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(passport.initialize());

app.use('/', api);
app.use('/api', api);
app.use('/api', oauth);
app.use('/api/users', users);
app.use('/api/collections', collections);
app.use('/api/tags', tags);


app.listen(config.get('port'), () => {
    log.info(`Server is up and running on port ${config.get('port')}`);
});

app.use(function (req, res, next) {
    res.status(404);
    log.debug(`${req.method} ${res.statusCode} ${req.url}`);
    res.json({
        error: 'Not found'
    });
    return;
});

app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    log.error(`${req.method} ${res.statusCode} ${err.message}`);
    res.json({
        error: err.message
    });
    return;
});

module.exports = app;
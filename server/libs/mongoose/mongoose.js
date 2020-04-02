const mongoose = require('mongoose');
const log = require('../log')(module);
const config = require('../config');

console.log("connect ", config.get('mongoose:uri'))
mongoose.connect(config.get('mongoose:uri'), { useCreateIndex: true, useUnifiedTopology: true, useNewUrlParser: true });
var db = mongoose.connection;

db.on('error', function (err) {
    log.error('connection error:', err.message);
});

db.once('open', function callback() {
    log.info("Connected to DB!");
});

module.exports = mongoose;
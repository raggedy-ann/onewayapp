//Setup mongoose and load the schemas 
var mongoose = require('mongoose'),
    userModel = require('../models/User'),
    bikeModel = require('../models/Bike'),
    compareModel = require('../models/Compare');

module.exports = function (config) {
    mongoose.connect(config.db);
    
    var db = mongoose.connection;
    db.on('error', console.error.bind(console, 'Connection error...'));
    db.once('open', function callback() {
        console.log('DB opened...');
    });
}
//load the path api from the node library
var path = require('path');
var rootPath = path.normalize(__dirname + '/../../');

module.exports = {
    development: {
        db: 'localhost/oneway',
        rootPath: rootPath,
        port: 3030
    },
    production: {
        db: 'mongodb://localhost/oneway',
        rootPath: rootPath,
        port: process.env.PORT || 80
    },
}
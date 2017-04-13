//configure Express

var express = require('express'),
    stylus = require('stylus'),
    logger = require('morgan'),
    bodyparser = require('body-parser'),
    cookieParser = require('cookie-parser'),
    session = require('express-session'),
    passport = require('passport'),
    fs = require('fs'),
    path = require('path'),
    csp = require(`helmet-csp`);

module.exports = function (app, config) {
    //set the path to the stylus files and configure stylus to compile them
    function compile(str, path) {
        return stylus(str).set('filename', path);
    }
    
    //configure the views folder
    app.set('views', config.rootPath + '/server/views');
    
    //configure middleware    
    app.set('view engine', 'jade');

    //var accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), {flags: 'a'});
    app.use(logger('dev'));//, {stream: accessLogStream}));//
    app.use(cookieParser());
    
    app.use(bodyparser());
    
    app.use(bodyparser.json({
        type: ['json', 'application/csp-report']
    }));
    
    //session data is not stored in the cookie itself, only the session id. the data is stored server-side.
    app.use(session({ secret: 'oneway' }));
    
    //configure passport
    app.use(passport.initialize());
    app.use(passport.session());
    
    //adding a middleware to express that handles requests for stylus files
    app.use(stylus.middleware(
        {
            src: config.rootPath + "/public",
            compile: compile
        }
    ));
    app.use(express.static(config.rootPath + "/public"));

    //CSP
    app.use(csp({
        directives: {
            //defaultSrc: [`'self'`],
            imgSrc: ['images.motorcycle-usa.com'],
            scriptSrc: [`'self'`], //`'unsafe-eval'`
            //reportUri: `/api/csp/report`
        },
        reportOnly: false   //default
    }))
}
﻿var User = require('mongoose').model('User'),
    encrypt = require('../utilities/encryption')

exports.getUsers = function (req, res) {
    User.find({}).exec(function (err, collection) {
        res.send(collection);
        console.log("bla");
    })
};

exports.deleteUser = function (req, res) {
    User.remove({ _id: req.params.id }).exec(function (err, result) {
        res.send((result === 1) ? { msg: '' } : { msg: 'error: ' + err });
    });
};

exports.createUser = function (req, res, next) {
    var userData = req.body;
    userData.username = userData.username.toLowerCase();
    userData.email = userData.email.toLowerCase();
    userData.salt = encrypt.createSalt();
    userData.hashed_pwd = encrypt.hashPwd(userData.salt, userData.password);
    User.create(userData, function (err, user) {
        if (err) {
            if (err.toString().indexOf('E11000') > -1) {
                err = new Error('Duplicate Username');
            }
            res.status(400);
            return res.send({ reason: err.toString() });
        }
        req.logIn(user, function (err) {
            if (err) {
                return next(err);
            }
            res.send(user);
        })
    })
};

exports.updateUser = function (req, res) {
    var userUpdates = req.body;
    if (req.user._id != userUpdates._id && !req.user.hasRole('admin')) {
        res.status(403);
        return res.end();
    }

    req.user.firstName = userUpdates.firstName;
    req.user.lastName = userUpdates.lastName;
    req.user.username = userUpdates.username;
    req.user.email = userUpdates.email;

    if (userUpdates.password && userUpdates.password.length > 0) {
        req.user.salt = encrypt.createSalt();
        req.user.hashed_pwd = encrypt.hashPwd(req.user.salt, userUpdates.password);
    }

    req.user.save(function (err) {
        if (err) {
            res.status(400);
            return res.send({ reason: err.toString() });
        }
        res.send(req.user);
    });
}

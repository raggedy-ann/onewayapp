var Compare = require('mongoose').model('Compare');

exports.getHistory = function (req, res) {
    Compare.find({ user : req.params.user}).exec(function (err, collection) {
        res.send(collection);
    })
};

exports.saveCompare = function (req, res) {
    Compare.find({ user : req.body.user, bikes : req.body.bikes }).exec(function (err, collection) {
        if (collection.length == 0) {
            Compare.create(req.body, function (err, compare) {
                if (err) {
                    res.status(400);
                    return res.send({ reason: err.toString() });
                }
            })    
        }
        res.status(200);
        return res.end();
    });
};
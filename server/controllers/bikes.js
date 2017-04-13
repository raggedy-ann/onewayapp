var Bike = require('mongoose').model('Bikes');

exports.getBikes = function (req, res) {
    Bike.find({}).exec(function (err, collection) {
        res.send(collection);
    })
};

exports.getBikeById = function (req, res) {
    Bike.findOne({ _id: req.params.id }).exec(function (err, bike) {
        res.send(bike);
    });
};

exports.getHomeDrilldown = function (req, res) {
    Bike.aggregate([
        {
            $match : {
                Manufacturer: { $in: ['BMW', 'Ducati', 'Harley-Davidson', 'Honda', 'KTM', 'Kawasaki', 'Suzuki', 'Yamaha' ]}
            }
        },
        {
            $group : {
                _id: '$Manufacturer', 
                count: { $sum: 1 },
                categories: {
                    $push: { category: '$Category' }
                }
            }
        },
        { $unwind: '$categories' },
        {
            $group : {
                _id: { manufacturer: '$_id', count: '$count', category: '$categories.category' },
                count: { $sum : 1}
            }
        },
        {
            $group : {
                _id: { manufacturer: '$_id.manufacturer', count: '$_id.count' },
                categories: {
                    $push : { category: '$_id.category', count: '$count' }
                }
            }
        }

    ]).exec(function (err, collection) {
        res.send(collection);
    });
};

exports.getManufacturers = function (req, res) {
    Bike.distinct('Manufacturer')
        .exec(function (err, collection) {
            res.send(collection);
        })
};

exports.countBikesOfManufacturer = function (req, res) {
    Bike.count({ Manufacturer: req.params.manufacturer })
        .exec(function (err, count) {
            res.send({ manufacturer: req.params.manufacturer, count: count.toString() });
        });
};

exports.getCategories = function (req, res) {
    Bike.aggregate([
        { $match : { 'Manufacturer': req.params.manufacturer } },
        { $group : { _id: '$Category', count: { $sum: 1 } } }
    ]).exec(function (err, collection) {
            res.send(collection);
        });
};

exports.getBikesForMakeAndCategory = function (req, res) {
    Bike.find({ Manufacturer: req.params.manufacturer, Category: req.params.category })
        .exec(function (err, bike) {
            res.send(bike);
        });
};
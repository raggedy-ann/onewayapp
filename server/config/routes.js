var auth = require('./auth'),
    users = require('../controllers/users'),
    compare = require('../controllers/compare'),
    bikes = require('../controllers/bikes'),
    mongoose = require('mongoose'),
    logger = require('morgan');
    User = mongoose.model('User');

module.exports = function (app) {
    
    //Users
    app.get('/api/users', auth.requiresRole('admin'), users.getUsers);
    app.delete('/api/users/:id', auth.requiresRole('admin'), users.deleteUser); 
    app.post('/api/users', users.createUser);
    app.put('/api/users', auth.requiresApiLogin(), users.updateUser);
    
    //Bikes
    app.get('/api/manufacturers', bikes.getManufacturers);
    app.get('/api/categories/:manufacturer', bikes.getCategories);
    app.get('/api/bikes/:manufacturer/:category', bikes.getBikesForMakeAndCategory);
    app.get('/api/bikes/:id', bikes.getBikeById);
    app.get('/api/bikes', bikes.getBikes);
    app.get('/api/countBikesOfManufacturer/:manufacturer', bikes.countBikesOfManufacturer);
    app.get('/api/getHomeDrilldown', bikes.getHomeDrilldown);
    
    //Compares
    app.get('/api/compareHistory/:user', compare.getHistory);
    app.post('/api/saveCompare', compare.saveCompare);

    //CSP report
    app.post('/api/csp/report', function (req, res) {
        if (req.body) {
            console.log('CSP Violation: ', req.body)
        } else {
            console.log('CSP Violation: No data received!')
        }
        res.status(204).end()
    })

    //Angular partial views (because express needs to compile the jade views)
    app.get('/partials/*', function (req, res) {
        res.render('../../public/app/' + req.params[0]);
    });
    
    //Authentication
    app.post('/login', auth.authenticate);
    app.post('/logout', function (req, res) {
        req.logout();
        res.end();
    });
    
    //Any other api request goes to 404
    app.all('/api/*', function (req, res) { 
        res.send(404);
    });
    
    //Index view is requested, render it and pass the user as data
    app.get('*', function (req, res) {
        res.render('index', {
            bootstrappedUser: req.user
        });
    });
}
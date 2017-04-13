var mongoose = require('mongoose'),
    encrypt = require('../utilities/encryption');

var userSchema = mongoose.Schema({
    firstName:  { type: String, required: '{PATH} is required!' },
    lastName:   { type: String, required: '{PATH} is required!' },
    username:   { type: String, required: '{PATH} is required!', unique: true },
    email:      { type: String, required: '{PATH} is required!', unique: true },
    salt:       { type: String, required: '{PATH} is required!' },
    hashed_pwd: { type: String, required: '{PATH} is required!' },
    roles:      [String]
});

userSchema.methods = {
    //this function is used by passport 
    authenticate: function (passwordToMatch) {
        return encrypt.hashPwd(this.salt, passwordToMatch) === this.hashed_pwd;
    },
    hasRole: function (role){
        return this.roles.indexOf(role) > -1;
    }
};

//compile the schema into the model
var User = mongoose.model('User', userSchema);

function createDefaultUsers() {
    User.find({}).exec(function (err, collection) {
        if (collection.length === 0) {
            var salt, hash;
            salt = encrypt.createSalt();
            hash = encrypt.hashPwd(salt, 'laura');
            User.create({ firstName: 'Laura', lastName: 'Lungoci', username: 'admin', email:'email@email.com', salt: salt, hashed_pwd: hash, roles: ['admin'] });
            
            salt = encrypt.createSalt();
            hash = encrypt.hashPwd(salt, 'test');
            User.create({ firstName: 'Test First Name', lastName: 'Test Last Name', username: 'test', email: 'test@test.com', salt: salt, hashed_pwd: hash });
        }
    })
};

createDefaultUsers();
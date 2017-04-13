var mongoose = require('mongoose');

var compareSchema = mongoose.Schema({
    user: mongoose.Schema.Types.ObjectId,
    date: { type: Date, default: Date.now },
    bikes: [mongoose.Schema.Types.ObjectId]
});

//compile the schema into the model
var Compare = mongoose.model('Compare', compareSchema);
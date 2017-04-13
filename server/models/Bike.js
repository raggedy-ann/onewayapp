var mongoose = require('mongoose');

//Define the bike schema
var bikeSchema = mongoose.Schema({
    Category: String,
    ImageXL: String,
    ImageL: String,
    ImageS: String,
    Year: String,
    Manufacturer: String,
    Model: String,
    EngineType: String,
    EngineDisplacement: String,
    BoreAndStroke: String,
    CompressionRatio: String,
    Cooling: String,
    FuelSystem: String,
    Ignition: String,
    StartingSystem: String,
    Transmission: String,
    FinalDrive: String,
    RakeAndTrail: String,
    WheelBase: String,
    SeatHeight: String,
    FrontSuspension: String,
    RearSuspension: String,
    FrontBrake: String,
    RearBrake: String,
    FrontTire: String,
    RearTire: String,
    FuelCapacity: String,
    DryWeight: String,
    MSRP: String,
});

//compile the schema into the model
var Bike = mongoose.model('Bikes', bikeSchema);




//mongoimport --jsonArray --host localhost --db oneway --collection bikes < bikes.json
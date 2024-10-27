const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create a new schema for the items
const regiSchema = new Schema({
    name: {
        type: String,  //data type
        required: true //validate
    },
    gmail: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model(
    "Register", //file name
    regiSchema  //function(schema) name
)
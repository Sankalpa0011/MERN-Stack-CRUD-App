const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create a new schema for the items
const userSchema = new Schema({
    name: {
        type: String,  //data type
        required: true //validate
    },
    gmail: {
        type: String,
        required: true,
        unique: true
    },
    age: {
        type: Number,
        required: true
    },
    address: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model(
    "UserModel", //file name
    userSchema  //function(schema) name
)
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create a new schema for the items
const ImgSchema = new Schema({
    image: {
        type: String,  //data type
        required: true //validate
    },
});

module.exports = mongoose.model(
    "ImgModel", //file name
    ImgSchema  //function(schema) name
)
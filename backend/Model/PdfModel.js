const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create a new schema for the items
const pdfSchema = new Schema({
    pdf: {
        type: String,  //data type
        required: true //validate
    },
    title: {
        type: String,
        required: true,
        unique: true
    }
});

module.exports = mongoose.model(
    "PdfDetails", //file name
    pdfSchema  //function(schema) name
)
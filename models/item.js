// JavaScript File
// app/models/item.js

var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var ItemSchema   = new Schema({
    name: {
        type: String,
        required: true
    },
    itemType: {
        type: String,
        enum:["book","CD"],
        required: true
    },
    loanPeriod:{
        type: Number
    },
    quantity:{
        type: Number
    }
});

module.exports = mongoose.model('Item', ItemSchema);
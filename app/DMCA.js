// JavaScript File
var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var DMCASchema   = new Schema({
    
    text:{
        type:String
    }
    
});

module.exports = mongoose.model('DMCA', DMCASchema);
// JavaScript File
// JavaScript File
var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var PrivacySchema   = new Schema({
    
    text:{
        type:String
    }
    
});

module.exports = mongoose.model('Privacy', PrivacySchema);
// JavaScript File
var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var TempUserSchema   = new Schema({
    email:{
        type:String,
        unique:true,
        required:true
    },
    name:{
        type:String,
        required:true
    },
    sitemanager:Boolean,
    activated:Boolean,
    hash:String,
    salt:String
   
});

module.exports = mongoose.model('User', TempUserSchema);
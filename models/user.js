// JavaScript File
var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var UserSchema   = new Schema({
    email:{
        type:String,
        unique:true,
        required:true
    },
    name:{
        type:String,
        required:true
    },
    activated:Boolean,
    hash:String,
    salt:String
   
});

module.exports = mongoose.model('User', UserSchema);
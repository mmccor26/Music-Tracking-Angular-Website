// JavaScript File
var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;
var crypto       = require('crypto');

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
    
    sitemanager:Boolean,
    activated:Boolean,
    hash:String,
    salt:String
   
});
UserSchema.methods.validatePassword = function(pwd){
    let hash = crypto.pbkdf2Sync(pwd,this.salt,1000,64,'sha512').toString("hex");
    return this.hash === hash;
}
UserSchema.methods.makePassword = function(pwd){
    this.salt = crypto.randomBytes(16).toString('hex');
   
    this.hash = crypto.pbkdf2Sync(pwd, this.salt, 1000, 64, 'sha512').toString('hex');
   
    
}

module.exports = mongoose.model('User', UserSchema);
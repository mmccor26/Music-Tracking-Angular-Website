// JavaScript File

var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;
var bcrypt       = require('bcrypt');
const config = require('config');
const jwt = require('jsonwebtoken');

var UserSchema   = new Schema({
    email:{
        type:String,
        unique:true,
        required:true
    },
    
    sitemanager:Boolean,
    activated:Boolean,
    hash:String,
    salt:String
   
});
UserSchema.methods.validatePassword = function(pwd){
    return bcrypt.compareSync(pwd, this.hash);
}
UserSchema.methods.makePassword = function(pwd){
    
    this.hash = bcrypt.hashSync(pwd, 10);
    console.log("hash "+this.hash);

}

UserSchema.methods.generateAuthToken = function(){
    const token = jwt.sign({_id:this._id,isAdmin:this.sitemanager},
    config.get('myprivatekey'));
   
    return token;
}
UserSchema.methods.generateAdminToken = function(){
    const token = jwt.sign({_id:this._id,isAdmin:this.sitemanager},
    config.get('key'));
   
    return token;
}
module.exports = mongoose.model('User', UserSchema);

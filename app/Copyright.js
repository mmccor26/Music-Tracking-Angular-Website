// JavaScript File
var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var CopyrightSchema   = new Schema({
    date:{
        type:Date
    },
    noticeType:{
        type:String,
        
        enum:["Infringement Notice","Takedown Request","Dispute Claim"]
    },
    text:{
        type:String
    },
    song_id:{
        type:String,
        required:true
    }
    
});

module.exports = mongoose.model('Copyright', CopyrightSchema);
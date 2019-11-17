// JavaScript File
var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var ReviewSchema   = new Schema({
    rating:{
        type:Number,
        enum:[1,2,3,4,5]
    },
    text:{
        type:String
    },
    username:{
        type:String,
        required:true
    },
    song_id:{
        type:String,
        required:true
    }
    
});

module.exports = mongoose.model('Review', ReviewSchema);
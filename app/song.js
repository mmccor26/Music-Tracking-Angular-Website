// JavaScript File
var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var SongSchema   = new Schema({
    header:{
        type: String,
        max: 3
    },
    title: {
        type: String,
        maxlength:30,
        required: true
    },
    artist: {
        type: String,
        maxlength:30,
        required: true
    },
    genre:{
        type: Number
    },
    
    album:{
        type:String,
        maxlength:30
    },
    songcomment:{
        type:String,
     
    },
    year:{
        type:Number,
        max:9999
    }
});

module.exports = mongoose.model('Song', SongSchema);
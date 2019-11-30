// JavaScript File
var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;
var review       = require('./review');

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
    },
    hidden:{
        type:Boolean,
        required:true
    },
    numberofratings:{
        type:Number,
        required:true
    },
    avgrating:{
        type:Number,
        required:true
    },
    lastreview:{
        type: [Schema.Types.Review]
    }
});

module.exports = mongoose.model('Song', SongSchema);
// JavaScript File
var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var SongSchema   = new Schema({
    title: {
        type: String,
        required: true
    },
    artist: {
        type: String,
        required: true
    },
    genre:{
        type: String
    }
});

module.exports = mongoose.model('Song', SongSchema);
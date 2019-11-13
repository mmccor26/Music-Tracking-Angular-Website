// JavaScript File
var Song         = require('./song');
var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var PlaylistSchema   = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    songs:{
        type: [Schema.Types.Song] 
    }
    
});

module.exports = mongoose.model('Playlist', PlaylistSchema);
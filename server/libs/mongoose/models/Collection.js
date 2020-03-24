const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const Images = new Schema({
    kind: {
        type: String,
        enum: ['thumbnail', 'detail'],
        required: true
    },
    url: { type: String, required: true }
});

const Collection = new Schema({
    title: { 
        type: String, 
        required: true 
    },
    author: { 
        type: String, 
        required: true 
    },
    description: { 
        type: String,
        required: true
    },
    images: [Images],
    modified: { 
        type: Date, 
        default: Date.now 
    }
});


Collection.path('title').validate(function (v) {
    return v.length > 5 && v.length < 70;
});

const CollectionModel = mongoose.model('Collection', Collection);

module.exports.CollectionModel = CollectionModel;
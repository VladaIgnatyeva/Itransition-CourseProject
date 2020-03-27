const mongoose = require('mongoose');
const Item = require('./Item');

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
    authorId: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    items: {
        type: Object,
        required: false
    },
    fieldsImage: {
        type: Object,
        required: false
    },
    topic: {
        type: String,
        required: true
    },
    cover: {
        type: String,
        required: false
    }
});

/*
Collection.path('title').validate(function (v) {
    return v.length > 5 && v.length < 70;
});
*/
Collection.virtual('collectionId')
    .get(function () {
        return this.id;
    });

const CollectionModel = mongoose.model('Collection', Collection);

module.exports = CollectionModel;
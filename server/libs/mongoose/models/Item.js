const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const Item = new Schema({
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
    tags: [Object],
    fieldsItem: {
        type: Object,
        required: false
    },
    modified: {
        type: Date,
        required: true,
        default: Date.now
    },
    img: {
        data: Buffer,
        contentType: String
    },
    topic: {
        type: String,
        required: true
    }

});

Item.virtual('itemId')
    .get(function () {
        return this.id;
    });

const ItemModel = mongoose.model('Item', Item);

module.exports = ItemModel;
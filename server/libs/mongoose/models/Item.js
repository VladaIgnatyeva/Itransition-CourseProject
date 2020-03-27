const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const Item = new Schema({
    name: { 
        type: String, 
        required: true 
    },
    author: { 
        type: String, 
        required: true 
    },
    tags: [String],
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
    }
    
});

const ItemModel = mongoose.model('Item', Item);

module.exports.ItemModel = ItemModel;
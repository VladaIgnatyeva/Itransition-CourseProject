const express = require('express');
const passport = require('passport');
const router = express.Router();

const db = require('../mongoose/mongoose');
const log = require('../log')(module);
const Collection = require('../mongoose/models/Collection');
const Item = require('../mongoose/models/Item');

router.get('/', function (req, res) {

    const result = Collection.find({}, {
        title: 1,
        description: 1,
        topic: 1
    });

    result.then(data => res.json(data))
        .catch(err => res.status(400).send(err));
});

router.get('/:id', function (req, res) {
    //console.log("id ", req.params)
    Collection.findOne({ _id: req.params.id }, {
        title: 1,
        description: 1,
        topic: 1,
        cover: '',
        fieldsImage: 1,
        author : 1,
        authorId : 1
    })
        .then(data => {console.log(data); res.json(data)})
        .catch(err => res.status(400).send(err));
});

router.get('/author/:authorId', function (req, res) {
    Collection.find({ authorId: req.params.authorId }, {
        title: 1,
        description: 1,
        topic: 1,
        cover: '',
        id: 1
    })
        .then(data => res.json(data))
        .catch(err => res.status(400).send(err));
});

router.put('/:id', function (req, res) {
    Collection.updateOne({ _id: req.body._id }, {
        $set: {
            title: req.body.title,
            description: req.body.description,
            topic: req.body.topic,
            cover: req.body.cover,
            fieldsImage: req.body.fieldsImage
        }
    })
        .then(data => res.json(data))
        .catch(err => res.status(400).send(err));
});

router.post('/collection', function (req, res) {
    const collection = new Collection({
        title: req.body.title,
        author: req.body.author,
        authorId: req.body.authorId,
        description: req.body.description,
        items: req.body.items,
        fieldsImage: req.body.fieldsImage,
        topic: req.body.topic,
        cover: req.body.cover
    });

    collection.save(function (err) {
        if (!err) {
            log.info(`User ${collection.author} created collection with id: ${collection.collectionId}`);
            return res.json(collection);
        } else {
            if (err.name === 'ValidationError') {
                res.statusCode = 400;
                res.json({
                    error: 'Validation error'
                });
            } else {
                res.statusCode = 500;

                log.error(`Internal error(${res.statusCode}): ${err.message}`);

                res.json({
                    error: 'Server error'
                });
            }
        }
    });
});

router.delete('/:id', function (req, res) {
    log.info(`Delete collection with id: ${req.body.data}`);
    Collection.findOne({ _id: req.body.data })
        .deleteOne()
        .then(data => res.json(data))
        .catch(err => res.status(400).send(err));
});

router.post('/collection/:id/item', function (req, res) {
    const item = new Item({
        title: req.body.title,
        author: req.body.author,
        authorId: req.body.authorId,
        img: req.body.img,
        fieldsItem: req.body.fieldsItem,
        topic: req.body.topic,
        tags: req.body.tags
    });

    Collection.findByIdAndUpdate(req.body._idCollection , {
        $push: {
           "items" : item
        }
    })
        .then(data => res.json(data))
        .catch(err => res.status(400).send(err));

    /*item.save(function (err) {
        if (!err) {
            log.info(`User ${item.author} created item with id: ${item.itemId}`);
            return res.json(item);
        } else {
            if (err.name === 'ValidationError') {
                res.statusCode = 400;
                res.json({
                    error: 'Validation error'
                });
            } else {
                res.statusCode = 500;

                log.error(`Internal error(${res.statusCode}): ${err.message}`);

                res.json({
                    error: 'Server error'
                });
            }
        }
    });*/
});

router.put('/items/:itemId', function (req, res) {
    Item.updateOne({ _id: req.body._id }, {
        $set: {
            title: req.body.title,
            img: req.body.img,
            fieldsImage: req.body.fieldsImage,
        
        }
    })
        .then(data => res.json(data))
        .catch(err => res.status(400).send(err));
});

module.exports = router;



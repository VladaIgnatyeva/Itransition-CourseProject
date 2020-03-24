const express = require('express');
const auth = require('../auth/auth2');
const router = express.Router();

router.get('/', auth.required, function (req, res) {
    res.json({
        msg: 'API is running'
    });
});

module.exports = router;
const express = require('express'),
    router = express.Router(),
    catRouter = require('./cats'),
    {
        name,
        version,
    } = require('../package');

router.get('/', (req, res, next) => {
    res.status(200).json({
        name,
        version
    });
    next();
});
router.use('/cats', catRouter);

module.exports = router;

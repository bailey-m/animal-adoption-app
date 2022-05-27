const router = require('express').Router();

router.use('/pets', require('./pets'));
router.use('/news', require('./news'));
router.use('/match', require('./match'));
router.use('/users', require('./users'));

module.exports = router;
const express = require('express')
const router = express.Router()
const { intro, next } = require('../controllers/main.controller');

router.get('/', intro);
router.get('/next', next);

module.exports = router;

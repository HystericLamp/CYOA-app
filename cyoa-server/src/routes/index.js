const express = require('express')
const router = express.Router()
const { intro, story } = require('../controllers/main.controller');

router.get('/', intro);
router.get('/story', generateStory);
router.post('/story', storyPrompt);

module.exports = router;

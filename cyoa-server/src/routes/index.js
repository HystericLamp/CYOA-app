const express = require('express')
const router = express.Router()
const { intro, generateStory, nextStoryPrompt } = require('../controllers/main.controller');

router.get('/', intro);
router.get('/story', generateStory);
router.post('/story', nextStoryPrompt);

module.exports = router;

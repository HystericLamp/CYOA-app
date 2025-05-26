const express = require('express')
const router = express.Router()
const { intro, generateIntroStory, nextStoryPrompt } = require('../controllers/main.controller');

router.get('/', intro);
router.get('/story', generateIntroStory);
router.post('/story', nextStoryPrompt);

module.exports = router;

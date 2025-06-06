const express = require('express')
const router = express.Router()
const { intro, generateIntroStory, nextStoryPrompt, resetStory } = require('../controllers/main.controller');

router.get('/', intro);
router.get('/story', generateIntroStory);
router.post('/story', nextStoryPrompt);
router.post('/reset', resetStory);

module.exports = router;

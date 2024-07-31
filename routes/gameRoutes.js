const express = require('express');
const router = express.Router();
const gameController = require('../controllers/gameController');

router.post('/games', gameController.startNewGame);
router.get('/games/:id', gameController.getGameById);
router.put('/games/:id', gameController.updateGame);
router.put('/games/:id/end', gameController.endGame);

module.exports = router;

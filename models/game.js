const mongoose = require('mongoose');

const gameSchema = new mongoose.Schema({
  playerName: { type: String, required: true },
  currentQuestion: { type: Number, required: true, default: 1 },
  lifelinesUsed: { 
    type: {
      fiftyFifty: { type: Boolean, default: false },
      flipTheQuestion: { type: Boolean, default: false },
      doubleDip: { type: Boolean, default: false },
      skipQuestion: { type: Boolean, default: false }
    }, 
    required: true
  },
  moneyWon: { type: Number, default: 0 },
  startedAt: { type: Date, default: Date.now },
  endedAt: { type: Date }
});

const Game = mongoose.model('Game', gameSchema);

module.exports = Game;

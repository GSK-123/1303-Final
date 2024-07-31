const Game = require('../models/game');

// Start a new game
exports.startNewGame = async (req, res) => {
  try {
    const newGame = new Game(req.body);
    const game = await newGame.save();
    res.status(201).json(game);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get game by ID
exports.getGameById = async (req, res) => {
  try {
    const game = await Game.findById(req.params.id);
    if (!game) {
      return res.status(404).json({ message: 'Game not found' });
    }
    res.status(200).json(game);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update game progress
exports.updateGame = async (req, res) => {
  try {
    const game = await Game.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!game) {
      return res.status(404).json({ message: 'Game not found' });
    }
    res.status(200).json(game);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// End a game
exports.endGame = async (req, res) => {
  try {
    const game = await Game.findByIdAndUpdate(req.params.id, { endedAt: Date.now() }, { new: true });
    if (!game) {
      return res.status(404).json({ message: 'Game not found' });
    }
    res.status(200).json(game);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

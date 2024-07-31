const express = require('express');
const connectDB = require('./config/db');
const questionRoutes = require('./routes/questionRoutes');
const gameRoutes = require('./routes/gameRoutes');
const errorHandler = require('./utils/errorHandler');

const app = express();

// Connect to database
connectDB();

// Middleware
app.use(express.json());
app.use('/api', questionRoutes);
app.use('/api', gameRoutes);
app.use(errorHandler);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

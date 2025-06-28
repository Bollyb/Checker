const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();

// Middlewares
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.error(err));

// Routes
app.use('/api/users', require('./models/userRoutes'));
app.use('/api/brands', require('./models/brandRoutes'));

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

// Add these lines to server.js after the existing code

const userRoutes = require('./routes/userRoutes');
const brandRoutes = require('./routes/brandRoutes');

app.use('/api/users', userRoutes);
app.use('/api/brands', brandRoutes);

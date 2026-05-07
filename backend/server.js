const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const authRoutes = require('./routes/auth');
const projectRoutes = require('./routes/projects');
const taskRoutes = require('./routes/tasks');
const app = express();

// Middleware pour lire le JSON dans le corps des requêtes
app.use(express.json());
app.use(cors());

// Connexion à MongoDB
async function connectDB() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB successfully');
  } catch (error) {
    console.error('Initial connection error:', error);
  }
}

connectDB();

// Routes d'authentification
app.use('/api/auth', authRoutes);
//Routes pour les projets 
app.use('/api/projects',projectRoutes);
// Routes pour les taches
app.use('/api/tasks', taskRoutes);
app.use('/api/projects', taskRoutes); // pour GET /api/projects/:id/tasks

// Démarrage du serveur
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Serveur démarré sur le port ${PORT}`);
});
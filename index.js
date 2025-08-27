import express from 'express';
import dotenv from 'dotenv';
import authRoutes from './routes/authRoutes.js';
import eventsRoutes from './routes/eventsRoutes.js';
import { conectarDB } from './database/config.js';
import cors from 'cors';

// configurar variables de entorno
dotenv.config();

// Conectar a la DB
conectarDB();

const app = express();
const port = process.env.PORT || 4000;

// Habilitar cors
app.use(cors());

// Directorio publico
app.use(express.static('public'));

// Middleware para JSON
app.use(express.json());

// Rutas para auth
app.use('/api/auth', authRoutes);
app.use('/api/events', eventsRoutes);

// TODO: rutas para eventos

// Iniciar servidor
app.listen(port, () => {
    console.log(`Server running at port ${port}`);
});
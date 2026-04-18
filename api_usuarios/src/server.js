require('dotenv').config(); // Carga las variables de entorno
const express = require('express');
const app = express();

// Middleware
app.use(express.json());

// Importar rutas
const usuariosRoutes = require('./routes/usuarios.routes');

// Montar rutas
app.use('/api/usuarios', usuariosRoutes);

// 404 global
app.use((req, res) => {
    res.status(404).json({ error: 'Ruta no encontrada' });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
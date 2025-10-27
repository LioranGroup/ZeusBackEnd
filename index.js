const express = require('express');
const cors = require('cors');
const pool = require('./database/connection');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

// Ruta base
app.get('/', (req, res) => {
  res.send('Servidor conectado con PostgreSQL 🚀');
});

// Ejemplo: obtener todos los usuarios
app.get('/actividad', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM actividad');
    res.json(result.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Error al obtener los usuarios ' + err.message);
  }
});

// Ejemplo: agregar un usuario
app.post('/usuarios', async (req, res) => {
  try {
    const { nombre, correo } = req.body;
    const result = await pool.query(
      'INSERT INTO usuarios (nombre, correo) VALUES ($1, $2) RETURNING *',
      [nombre, correo]
    );
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Error al insertar usuario');
  }
});

app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});

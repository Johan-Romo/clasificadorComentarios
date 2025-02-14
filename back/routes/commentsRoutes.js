const express = require('express');
const router = express.Router();
const pool = require('../config/db');

// 1) Obtener la lista de comentarios
router.get('/comments', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM comentarios');
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener comentarios' });
  }
});

// 2) Registrar usuario (solo si deseas hacerlo de forma explícita)
router.post('/users', async (req, res) => {
  try {
    const { nombre } = req.body;
    const result = await pool.query(
      'INSERT INTO users (nombre) VALUES ($1) RETURNING *',
      [nombre]
    );
    res.json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al registrar usuario' });
  }
});

// 3) Guardar clasificaciones
router.post('/classifications', async (req, res) => {
  try {
    // Suponiendo que recibes un array de clasificaciones
    const { userId, clasificaciones } = req.body;

    // clasificaciones es un array con objetos del tipo:
    // { comentarioId, esPositivo, esNegativo, esNeutral }

    for (let c of clasificaciones) {
      await pool.query(
        `INSERT INTO clasificaciones (user_id, comentario_id, es_positivo, es_negativo, es_neutral)
         VALUES ($1, $2, $3, $4, $5)`,
        [userId, c.comentarioId, c.esPositivo, c.esNegativo, c.esNeutral]
      );
    }

    res.json({ message: 'Clasificaciones guardadas exitosamente' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al guardar clasificaciones' });
  }
});

module.exports = router;

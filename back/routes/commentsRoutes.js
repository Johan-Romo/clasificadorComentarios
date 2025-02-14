const express = require('express');
const router = express.Router();
const pool = require('../config/db');


//  **Usuarios**
// 🔹 Obtener todos los usuarios
router.get('/users', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM users');
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener usuarios' });
  }
});

// 🔹 Crear un usuario
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

// 🔹 Actualizar un usuario
router.put('/users/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre } = req.body;
    const result = await pool.query(
      'UPDATE users SET nombre = $1 WHERE id = $2 RETURNING *',
      [nombre, id]
    );
    res.json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al actualizar usuario' });
  }
});

// 🔹 Eliminar un usuario
router.delete('/users/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await pool.query('DELETE FROM users WHERE id = $1', [id]);
    res.json({ message: 'Usuario eliminado correctamente' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al eliminar usuario' });
  }
});


//  **Comentarios**
// 🔹 Obtener todos los comentarios
router.get('/comments', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM comentarios');
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener comentarios' });
  }
});

// 🔹 Crear un comentario
router.post('/comments', async (req, res) => {
  try {
    const { texto } = req.body;
    const result = await pool.query(
      'INSERT INTO comentarios (texto) VALUES ($1) RETURNING *',
      [texto]
    );
    res.json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al registrar comentario' });
  }
});

// 🔹 Actualizar un comentario
router.put('/comments/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { texto } = req.body;
    const result = await pool.query(
      'UPDATE comentarios SET texto = $1 WHERE id = $2 RETURNING *',
      [texto, id]
    );
    res.json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al actualizar comentario' });
  }
});

// 🔹 Eliminar un comentario
router.delete('/comments/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await pool.query('DELETE FROM comentarios WHERE id = $1', [id]);
    res.json({ message: 'Comentario eliminado correctamente' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al eliminar comentario' });
  }
});


//  **Clasificaciones**
// 🔹 Obtener todas las clasificaciones
router.get('/classifications', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM clasificaciones');
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener clasificaciones' });
  }
});

// 🔹 Guardar clasificaciones
router.post('/classifications', async (req, res) => {
  try {
    const { userId, clasificaciones } = req.body;

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

// 🔹 Actualizar una clasificación
router.put('/classifications/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { userId, comentarioId, esPositivo, esNegativo, esNeutral } = req.body;

    const result = await pool.query(
      `UPDATE clasificaciones 
       SET user_id = $1, comentario_id = $2, es_positivo = $3, es_negativo = $4, es_neutral = $5
       WHERE id = $6 RETURNING *`,
      [userId, comentarioId, esPositivo, esNegativo, esNeutral, id]
    );

    res.json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al actualizar clasificación' });
  }
});

// 🔹 Eliminar una clasificación
router.delete('/classifications/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await pool.query('DELETE FROM clasificaciones WHERE id = $1', [id]);
    res.json({ message: 'Clasificación eliminada correctamente' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al eliminar clasificación' });
  }
});

module.exports = router;

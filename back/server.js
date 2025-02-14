require('dotenv').config();
const express = require('express');
const cors = require('cors');
const commentsRoutes = require('./routes/commentsRoutes');

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Rutas
app.use('/api', commentsRoutes);


// Ejemplo de endpoint para probar la BD
app.get('/', async (req, res) => {
    try {
      // Simple query para ver la fecha/hora del servidor Postgres
      const result = await pool.query('SELECT NOW() AS current_time');
      res.json({
        success: true,
        currentTime: result.rows[0].current_time
      });
    } catch (error) {
      console.error('Error al consultar la BD:', error);
      res.status(500).json({
        success: false,
        error: error.message
      });
    }
  });

// Puerto
const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});

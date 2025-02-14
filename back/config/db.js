const { Pool } = require('pg');
require('dotenv').config();

// Configura la conexión individualmente
const pool = new Pool({
    // Usa la variable de entorno inyectada por Railway
    connectionString: process.env.DATABASE_URL,
    ssl: {
      rejectUnauthorized: false,
    },
  });

// Aquí hacemos un test de conexión inmediato:
pool.connect()
  .then(() => {
    console.log('Conexión exitosa a la base de datos'); 
  })
  .catch((err) => {
    console.error('Error al conectar a la base de datos:', err);
  });

module.exports = pool;

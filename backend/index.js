const express = require('express');
require('dotenv').config();
const conection = require('../backend/DB/db');

// Inicializar servidor
const app = express();

//Middleware
app.use(express.json());

// Rutas
app.use('/api',require('./routes/crear'));
app.use('/api',require('./routes/editar'));
app.use('/api',require('./routes/listar'));
app.use('/api',require('./routes/eliminar'));

// Establecer puerto
app.set('port', process.env.PORT || 4000);

// Iniciar el servidor
app.listen(app.get('port'), () => {
    console.log('Server is running on port', app.get('port'));
});
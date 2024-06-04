const express = require('express');
const mongoose = require('mongoose');
const app = express();
const path = require('path');
const PORT = process.env.PORT || 3000;
const uri = "mongodb+srv://gabrielparisbaquero:hAdb8Hfv9K5ZIGW3@acoupondb.lbsmw2g.mongodb.net/?retryWrites=true&w=majority&appName=aCouponDB";

// Conexión a MongoDB
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Conectado a MongoDB'))
  .catch(err => console.error('Error al conectar a MongoDB', err));

// Definición del modelo Usuario con Mongoose
const usuarioSchema = new mongoose.Schema({
  celular: String,
  direccion: String,
  ciudad: String,
  cartData: String,
  precioFinal: Number
});
const Usuario = mongoose.model('Usuario', usuarioSchema);

// Middleware para analizar el cuerpo de las solicitudes
app.use(express.urlencoded({ extended: true }));
app.use(express.json()); // Para aceptar y parsear JSON

// Middleware para servir archivos estáticos
app.use('/css', express.static(path.join(__dirname, '/css')));

// Ruta para la página principal de admin
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// API para obtener todos los usuarios
app.get('/api/usuarios', async (req, res) => {
  console.log('Solicitando usuarios...');
  try {
    const usuarios = await Usuario.find();
    console.log(`Usuarios encontrados: ${usuarios.length}`);
    res.json(usuarios);
  } catch (error) {
    console.error('Error al obtener datos:', error);
    res.status(500).send('Error al obtener datos');
  }
});

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

import express from 'express';
import cors from 'cors';

// Inicialización de la aplicación Express
const app = express();
const PORT = process.env.PORT || 5000;

// Configuración de Middlewares
// CORS permite la comunicación segura con el frontend (ej. ejecutándose en localhost:5173 o Vercel)
app.use(cors());
// Permite procesar cuerpos de solicitudes en formato JSON
app.use(express.json());

// Base de datos de usuarios en memoria simulada (Mock DB)
// Contiene un usuario inicial para pruebas
const usuariosBaseDatos = [
  {
    id: "1",
    nombre: "María González",
    email: "maria.gonzalez@empresa.com",
    contrasena: "123456",
    numeroCarnet: "CNV-2024-001234",
    puntos: 2500,
    empresa: "Empresa S.A.",
    role: "asociado"
  },
  {
    id: "2",
    nombre: "Administrador Cooperativa",
    email: "admin@cooperativa.com",
    contrasena: "admin123",
    numeroCarnet: "ADM-2024-000001",
    puntos: 0,
    empresa: "COOPERATIVA SAS",
    role: "admin"
  }
];

/**
 * Servicio Web: Registro de Nuevos Usuarios
 * Ruta: POST /api/auth/register
 * Recibe: nombre, email, contrasena, empresa, role
 */
app.post('/api/auth/register', (req, res) => {
  const { nombre, email, contrasena, empresa, role } = req.body;

  // Validación de campos requeridos
  if (!nombre || !email || !contrasena) {
    return res.status(400).json({
      exito: false,
      mensaje: "Error en el registro: Nombre, correo electrónico y contraseña son obligatorios."
    });
  }

  // Verificar si el usuario ya existe registrado
  const usuarioExistente = usuariosBaseDatos.find(usuario => usuario.email.toLowerCase() === email.toLowerCase());
  if (usuarioExistente) {
    return res.status(409).json({
      exito: false,
      mensaje: "Error en el registro: El correo electrónico ya se encuentra registrado."
    });
  }

  // Crear el nuevo registro del usuario con datos simulados
  const nuevoUsuario = {
    id: (usuariosBaseDatos.length + 1).toString(),
    nombre,
    email: email.toLowerCase(),
    contrasena, // En producción se debe aplicar hash (ej. bcrypt)
    numeroCarnet: `CNV-2026-000${Math.floor(100 + Math.random() * 900)}`,
    puntos: 100, // Bono de puntos por registro
    empresa: empresa || "Asociado Independiente",
    role: role || "asociado"
  };

  // Guardar en nuestra base de datos en memoria
  usuariosBaseDatos.push(nuevoUsuario);

  return res.status(201).json({
    exito: true,
    mensaje: "Registro de usuario completado de forma satisfactoria.",
    usuario: {
      id: nuevoUsuario.id,
      nombre: nuevoUsuario.nombre,
      email: nuevoUsuario.email,
      numeroCarnet: nuevoUsuario.numeroCarnet,
      role: nuevoUsuario.role
    }
  });
});

/**
 * Servicio Web: Inicio de Sesión / Autenticación
 * Ruta: POST /api/auth/login
 * Recibe: email, contrasena
 */
app.post('/api/auth/login', (req, res) => {
  const { email, contrasena } = req.body;

  // Validación de parámetros obligatorios
  if (!email || !contrasena) {
    return res.status(400).json({
      exito: false,
      mensaje: "Error en la autenticación: Correo electrónico y contraseña son requeridos."
    });
  }

  // Buscar el usuario por su correo electrónico en la base de datos
  const usuarioEncontrado = usuariosBaseDatos.find(
    usuario => usuario.email.toLowerCase() === email.toLowerCase()
  );

  // Verificar coincidencia de credenciales
  if (usuarioEncontrado && usuarioEncontrado.contrasena === contrasena) {
    // Retornar mensaje de éxito y datos del perfil (sin incluir la contraseña por seguridad)
    return res.status(200).json({
      exito: true,
      mensaje: "Autenticación satisfactoria.",
      usuario: {
        id: usuarioEncontrado.id,
        nombre: usuarioEncontrado.nombre,
        email: usuarioEncontrado.email,
        numeroCarnet: usuarioEncontrado.numeroCarnet,
        puntos: usuarioEncontrado.puntos,
        empresa: usuarioEncontrado.empresa,
        role: usuarioEncontrado.role
      }
    });
  } else {
    // Retornar código de error de no autorizado
    return res.status(401).json({
      exito: false,
      mensaje: "Error en la autenticación: Credenciales inválidas. Correo o contraseña incorrectos."
    });
  }
});

// Arrancar el servidor y escuchar peticiones
app.listen(PORT, () => {
  console.log(`Servidor API corriendo satisfactoriamente en http://localhost:${PORT}`);
});

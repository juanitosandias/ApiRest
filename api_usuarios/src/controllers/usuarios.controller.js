const { v4: uuidv4 } = require('uuid');

// base de datos
let usuarios = [];

// GET: Consultar todos los usuarios
const getUsuarios = (req, res) => {
    res.status(200).json(usuarios);
};

// GET: Consultar un usuario por ID
const getUsuarioById = (req, res) => {
    const { id } = req.params;
    const usuario = usuarios.find(u => u.id === id);

    if (!usuario) {
        return res.status(404).json({ error: 'Usuario no encontrado' });
    }
    res.status(200).json(usuario);
};

// POST: Crear un nuevo usuario
const createUsuario = (req, res) => {
    const { nombre, email, edad, activo } = req.body;

    // Validaciones básicas
    if (!nombre || !email || edad === undefined) {
        return res.status(400).json({ error: 'Nombre, email y edad son campos obligatorios' });
    }
    if (typeof edad !== 'number' || edad < 0) {
        return res.status(400).json({ error: 'La edad debe ser un número positivo' });
    }

    const nuevoUsuario = {
        id: uuidv4(),
        nombre,
        email,
        edad,
        activo: activo !== undefined ? activo : true // Activo por defecto si no se envía
    };

    usuarios.push(nuevoUsuario);
    res.status(201).json(nuevoUsuario);
};

// PUT: Actualizar un usuario existente
const updateUsuario = (req, res) => {
    const { id } = req.params;
    const { nombre, email, edad, activo } = req.body;

    const index = usuarios.findIndex(u => u.id === id);

    if (index === -1) {
        return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    // Actualizamos solo los campos que vengan en el body
    const usuarioActualizado = {
        ...usuarios[index],
        nombre: nombre || usuarios[index].nombre,
        email: email || usuarios[index].email,
        edad: edad !== undefined ? edad : usuarios[index].edad,
        activo: activo !== undefined ? activo : usuarios[index].activo
    };

    usuarios[index] = usuarioActualizado;
    res.status(200).json(usuarioActualizado);
};

// DELETE: Eliminar un usuario
const deleteUsuario = (req, res) => {
    const { id } = req.params;
    const index = usuarios.findIndex(u => u.id === id);

    if (index === -1) {
        return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    usuarios.splice(index, 1);
    res.status(200).json({ mensaje: 'Usuario eliminado correctamente' });
};

module.exports = {
    getUsuarios,
    getUsuarioById,
    createUsuario,
    updateUsuario,
    deleteUsuario
};
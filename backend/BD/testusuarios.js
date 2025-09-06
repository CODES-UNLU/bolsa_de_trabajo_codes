const Database = require('better-sqlite3');

// Abrir la base de datos existente
const db = new Database('codes.db');

// Función que verifica si un usuario existe por su email
function usuarioExiste(email) {
    const row = db.prepare('SELECT id FROM usuarios WHERE email = ?').get(email);
    return !!row; // true si existe, false si no
}

// Test de ejemplo: cambia el email para probar distintos casos
const emailTest = 'juan123.perez@example.com';

// Mensaje en consola
if (usuarioExiste(emailTest)) {
    console.log(`El usuario con email ${emailTest} existe.`);
} else {
    console.log(`No existe el usuario con email ${emailTest}.`);
}
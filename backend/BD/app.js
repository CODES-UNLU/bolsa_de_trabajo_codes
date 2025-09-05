const Database = require('better-sqlite3');

// Abrir o crear la base de datos
const db = new Database('codes.db');

// Crear la tabla si no existe
db.prepare(`
    CREATE TABLE IF NOT EXISTS usuarios (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nombre TEXT NOT NULL CHECK(length(nombre) <= 20),
        apellido TEXT NOT NULL CHECK(length(apellido) <= 20),
        email TEXT NOT NULL CHECK(length(email) <= 50), -- más realista para emails
        clave TEXT NOT NULL
    )
`).run();

console.log('Tabla creada');

// Función para insertar un usuario
function insertar_usuario(nombre, apellido, email, clave) {
    const stmt = db.prepare(`
        INSERT INTO usuarios (nombre, apellido, email, clave) 
        VALUES (?, ?, ?, ?)
    `);
    stmt.run(nombre, apellido, email, clave);
    console.log("Usuario insertado correctamente");
}
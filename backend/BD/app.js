const Database = require('better-sqlite3');

// Abrir o crear la base de datos
const db = new Database('codes.db');

// Crear la tabla de usuarios (datos básicos)
db.prepare(`
    CREATE TABLE IF NOT EXISTS usuarios (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nombre TEXT NOT NULL CHECK(length(nombre) <= 20),
    apellido TEXT NOT NULL CHECK(length(apellido) <= 20),
    email TEXT NOT NULL CHECK(length(email) <= 50),
    clave TEXT NOT NULL,
    rol TEXT NOT NULL DEFAULT 'user' CHECK(rol IN ('user','admin')),
    activo INTEGER NOT NULL DEFAULT 1 CHECK(activo IN (0, 1))
);

`).run();

// Crear la tabla de perfiles (datos ampliados)
db.prepare(`
    CREATE TABLE IF NOT EXISTS perfiles (
        usuario_id INTEGER PRIMARY KEY,
        domicilio TEXT,
        telefono TEXT CHECK(telefono GLOB '[0-9]*'), -- solo números (permite vacío)
        cp TEXT,
        url TEXT,
        FOREIGN KEY(usuario_id) REFERENCES usuarios(id)
    )
`).run();

// Verificar si ya existe un usuario administrador
const adminEmail = 'admin@example.com';
const admin = db.prepare(`
    SELECT id FROM usuarios
    WHERE email = ? AND rol = 'admin'
`).get(adminEmail);

// Si no existe, insertar el usuario admin
if (!admin) {
    db.prepare(`
        INSERT INTO usuarios (nombre, apellido, email, clave, rol, activo)
        VALUES (?, ?, ?, ?, ?, ?)
    `).run('Administrador', 'DelSistema', adminEmail, '123', 'admin', '1');
    console.log('Usuario administrador creado automáticamente.');
} else {
    console.log('Ya existe un usuario administrador. No se ha insertado un nuevo registro.');
}

console.log('Tablas creadas');

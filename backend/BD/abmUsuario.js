// Función para insertar un usuario
function insertar_usuario(nombre, apellido, email, clave) {
    const stmt = db.prepare(`
        INSERT INTO usuarios (nombre, apellido, email, clave) 
        VALUES (?, ?, ?, ?)
    `);
    stmt.run(nombre, apellido, email, clave);
    console.log("Usuario insertado correctamente");
}

//Funcion para insertar en el perfil
function insertar_perfil(domicilio,telefono,cp,url) {
    const stmt = db.prepare(`
        INSERT INTO perfiles (usuario_id, domicilio, telefono, cp, url)
        VALUES (?, ?, ?, ?, ?)
    `);
    stmt.run(usuario_id, domicilio, telefono, cp, url);
    console.log("Perfil actualizado");

}

// Actualizacion de datos del usuario

const Database = require('better-sqlite3');
const db = new Database('codes.db');

/**
 * Actualiza el correo electrónico y la clave de un usuario existente.
 * @param {number} id        - ID del usuario en la tabla usuarios.
 * @param {string} nuevoEmail - Nuevo correo electrónico.
 * @param {string} nuevaClave - Nueva clave (idealmente ya debería ser un hash).
 */
function actualizarCredencialesUsuario(id, nuevoEmail, nuevaClave) {
    // Puedes agregar aquí validaciones, por ejemplo, formato de email.
    const update = db.prepare(`
        UPDATE usuarios
        SET email = ?, clave = ?
        WHERE id = ?
    `);
    const info = update.run(nuevoEmail, nuevaClave, id);

    if (info.changes > 0) {
        console.log('Credenciales actualizadas correctamente');
    } else {
        console.log('No se encontró ningún usuario con ese ID');
    }
}

/**
 * Actualiza los datos del perfil del usuario.
 * Si no existe un perfil previo, puedes optar por insertarlo.
 * @param {number} usuarioId - ID del usuario en la tabla usuarios.
 * @param {string} domicilio - Nuevo domicilio.
 * @param {string} telefono  - Nuevo teléfono (solo dígitos).
 * @param {string} cp        - Nuevo código postal.
 * @param {string} url       - Nueva URL del perfil.
 */
function actualizarPerfilUsuario(usuarioId, domicilio, telefono, cp, url) {
    // Validar que el teléfono contenga solo números (o permitir null)
    if (telefono && !/^\d+$/.test(telefono)) {
        throw new Error('El teléfono debe contener solo números');
    }

    // Comprueba si ya existe un perfil para este usuario
    const existingProfile = db.prepare(`
        SELECT usuario_id FROM perfiles WHERE usuario_id = ?
    `).get(usuarioId);

    if (existingProfile) {
        // Si ya existe, se actualiza
        const update = db.prepare(`
            UPDATE perfiles
            SET domicilio = ?, telefono = ?, cp = ?, url = ?
            WHERE usuario_id = ?
        `);
        update.run(domicilio, telefono, cp, url, usuarioId);
        console.log('Perfil actualizado correctamente');
    } else {
        // Si no existe, se inserta un nuevo perfil
        const insert = db.prepare(`
            INSERT INTO perfiles (usuario_id, domicilio, telefono, cp, url)
            VALUES (?, ?, ?, ?, ?)
        `);
        insert.run(usuarioId, domicilio, telefono, cp, url);
        console.log('Perfil creado correctamente');
    }
}

// // Ejemplos de uso:

// // Actualizar correo y clave de un usuario con ID 3
// actualizarCredencialesUsuario(3, 'nuevo.correo@example.com', 'nuevaClaveSegura');

// // Actualizar o crear perfil del usuario con ID 3
// actualizarPerfilUsuario(3, 'Calle Actualizada 456', '1122334455', '1900', 'https://misitioactualizado.com');

//Baja de usuario
/**
 * Marca un usuario como inactivo (baja lógica).
 * @param {number} idUsuario - ID del usuario a dar de baja.
 * @returns {boolean} Devuelve true si se actualizó algún registro; false en caso contrario.
 */
function darDeBajaUsuario(idUsuario) {
    const stmt = db.prepare(`
        UPDATE usuarios
        SET activo = 0
        WHERE id = ?
    `);
    const info = stmt.run(idUsuario);
    return info.changes > 0; // true si se modificó algún registro
}

// Ejemplo de uso:
if (darDeBajaUsuario(4)) {
    console.log('Usuario dado de baja lógicamente');
} else {
    console.log('No se encontró al usuario o ya estaba inactivo');
}

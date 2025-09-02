document.addEventListener("DOMContentLoaded", function () {
    // 🔐 LOGIN
    const formularioLogin = document.getElementById("login-formulario");
    if (formularioLogin) {
        formularioLogin.addEventListener("submit", function (event) {
            event.preventDefault();
            const mail = document.getElementById("mail").value;
            const password = document.getElementById("password").value;

            const usuarios = JSON.parse(localStorage.getItem("usuariosRegistrados")) || [];
            const valido = usuarios.find(u => u.email === mail && u.contrasenia === password);

            if (valido) {
                alert(`🎉 ¡Bienvenido, ${valido.nombre}! Tu sesión ha comenzado.`);
                window.location.href = "bienvenida.html";
            } else {
                alert("❌ Mail o contraseña incorrectos. Intenta nuevamente.");
            }
        });
    }

    // 📝 REGISTRO
    const formularioRegistro = document.getElementById("registro-formulario");
    if (formularioRegistro) {
        formularioRegistro.addEventListener("submit", function (event) {
            event.preventDefault();
            const mail = document.getElementById("mail").value;
            const password = document.getElementById("password").value;
            const passwordVerificacion = document.getElementById("verificar-password").value;
            const nombre = document.getElementById("nombre").value;
            const apellido = document.getElementById("apellido").value;

            if (password !== passwordVerificacion) {
                alert("⚠️ Las contraseñas no coinciden. Verifícalas por favor.");
                return;
            }

            const nuevoUsuario = {
                email: mail,
                contrasenia: password,
                nombre: nombre,
                apellido: apellido
            };

            let usuarios = JSON.parse(localStorage.getItem("usuariosRegistrados")) || [];

            // Validar si el mail ya está registrado
            const existe = usuarios.find(u => u.email === mail);
            if (existe) {
                alert("⚠️ Este correo ya está registrado. Inicia sesión o usa otro.");
                return;
            }

            usuarios.push(nuevoUsuario);
            localStorage.setItem("usuariosRegistrados", JSON.stringify(usuarios));

            alert(`✅ Registro exitoso, ${nombre}. ¡Bienvenido a la comunidad!`);
            window.location.href = "index.html";
        });
    }
});
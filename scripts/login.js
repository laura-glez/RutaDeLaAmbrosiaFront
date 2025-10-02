// Mostrar popup de login
function mostarLogin() {
  document.getElementById('login-popup').style.display = 'block';
  document.getElementById('popup-overlay').style.display = 'block';
}

// Mostrar popup de registro
function mostarRegistro() {
  document.getElementById('login-popup2').style.display = 'block';
  document.getElementById('popup-overlay').style.display = 'block';
}

// Cerrar ambos popups
function closeLoginPopup() {
  document.getElementById('login-popup').style.display = 'none';
  document.getElementById('login-popup2').style.display = 'none';
  document.getElementById('popup-overlay').style.display = 'none';
}


document.addEventListener("DOMContentLoaded", () => {
  document.getElementById('usuario-icono').addEventListener('click', (e) => {
    e.preventDefault();
    mostarLogin();
  });

  document.getElementById('registro-icono').addEventListener('click', (e) => {
    e.preventDefault();
    mostarRegistro();
  });

  document.getElementById('reserva').addEventListener('click', (e) => {
    e.preventDefault();
    mostarLogin();
  });

  document.querySelector('btn-P-Reseñas').addEventListener('click', (e) => {
    e.preventDefault();
    mostarLogin();
  });


  // Envío del formulario de login
  document.getElementById("login-form").addEventListener("submit", async function (event) {
    event.preventDefault();

    try {
      const usuario = document.getElementById("usuario").value;
      const contrasena = document.getElementById("contrasena").value;

      const res = await fetch(`http://localhost:9003/usuario/buscarEmailYPass/${usuario}/${contrasena}`);
      const user = await res.json();

      localStorage.setItem("usuario", JSON.stringify(user));

      if (user.idUsuario === 1) {
        window.location.href = "eventos.html";
      } else {
        window.location.href = "loginCliente.html";
      }
    } catch (error) {
      console.error("Error en login:", error);
      alert("Error al iniciar sesión.");
    }
  });

  // Envío del formulario de registro
  document.getElementById("login-form2").addEventListener("submit", async function (event) {
    event.preventDefault();

    const nuevoUsuario = {
      nombre: document.getElementById("nombre").value,
      apellidos: document.getElementById("apellidos").value,
      email: document.getElementById("email").value,
      password: document.getElementById("password").value,
      enabled: 1,
      fechaRegistro: new Date().toISOString().split('T')[0],
      perfil: { idPerfil: 2 }
    };

    try {
      const response = await fetch("http://localhost:9003/usuario/alta", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(nuevoUsuario)
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Error al registrar el usuario: ${errorText}`);
      }

      alert("Usuario registrado con éxito.");
      document.getElementById("login-form2").reset();
      closeLoginPopup();
      mostarLogin();

    } catch (error) {
      console.error("Error al registrar:", error);
      alert("Error al registrar el usuario.");
    }
  });
});


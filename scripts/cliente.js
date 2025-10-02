document.querySelectorAll('.card').forEach(card => {
  card.addEventListener('click', () => {
    const clone = card.cloneNode(true);
    card.classList.toggle("flat");

    clone.querySelectorAll('.btn-P-Reseñas').forEach(btn => {
      btn.style.position   = 'absolute';
      btn.style.bottom     = '1.5rem';
      btn.style.left       = '50%';
      btn.style.transform  = 'translateX(-50%)';
      btn.style.margin     = '0';
    });

    const closeButton = document.createElement("button");
    closeButton.classList.add("close-button");
    closeButton.innerHTML = "&times;";
    clone.appendChild(closeButton);

    clone.querySelectorAll('.btn-P-Reseñas').forEach(btn => {
      btn.addEventListener('click', e => {
        e.stopPropagation(); 
        const destino = btn.getAttribute('dirreccion-para-reservas');
        if (destino) window.location.href = destino;
      });
    });
    clone.style.position = "fixed";
    clone.style.left     = card.getBoundingClientRect().left + "px";
    clone.style.top      = card.getBoundingClientRect().top + "px";
    clone.style.width    = card.offsetWidth + "px";
    clone.style.height   = card.offsetHeight + "px";
    clone.style.zIndex   = 999;
    clone.querySelector(".card-details").style.display = "block";

    document.body.appendChild(clone);
    requestAnimationFrame(() => clone.classList.add("card-full"));

    closeButton.addEventListener("click", e => {
      e.stopPropagation();
      clone.classList.remove("card-full");
      card.classList.toggle("flat");
      setTimeout(() => clone.remove(), 300);
    });

    clone.addEventListener("click", e => {
      if (e.target === clone) {
        clone.classList.remove("card-full");
        card.classList.toggle("flat");
        setTimeout(() => clone.remove(), 300);
      }
    });
  });
});



const usuarioStored = localStorage.getItem('usuario');
if (!usuarioStored) {
  console.log("No se encontró usuario en localStorage");
} else {
  const usuario = JSON.parse(usuarioStored);
  const idUsuario = usuario.idUsuario;
  console.log("ID del usuario:", idUsuario);


 
  getReservasUsuario(idUsuario);
}


async function getUsuario() {
  try {
      const res = await fetch(`http://localhost:9003/usuario/buscarDatosUsuario/${idUsuario}`);
      if (!res.ok) {
          throw new Error(`Error al obtener el usuario: ${res.statusText}`);
      }
      const user = await res.json();
      console.log(user);
      return user;
  } catch (error) {
      document.getElementById('tablaUsuarioContainer').innerHTML = `<p style="color:red">${error.message}</p>`;
      throw error; 
  }
}

async function getReservasUsuario(idUsuario) {
  try {
      const resUsuario = await fetch(`http://localhost:9003/reserva/usuarioId/${idUsuario}`);
      const usuarios = await resUsuario.json();
      console.log(usuarios);

      
      if (!usuarios || usuarios.length === 0) {
          document.getElementById('tablaUsuarioContainer').innerHTML = `<p>No se encontraron datos para el usuario.</p>`;
          return;
      }

      renderizarTablaUsuario(usuarios);

  } catch (error) {
      document.getElementById('tablaUsuarioContainer').innerHTML = `<p style="color:red">${error.message}</p>`;
  }
}


function renderizarTablaUsuario(u) {
  const divDetalles = document.getElementById('tablaUsuarioContainer');
  const usuario = u[0]; 
  console.log(usuario);

  divDetalles.innerHTML = `
      <h2>Detalles del Usuario: ${usuario.nombre}</h2>
      <p><strong>ID:</strong> ${usuario.idUsuario}</p>
      <p><strong>Email:</strong> ${usuario.email}</p>
      <p><strong>Nombre:</strong> ${usuario.nombre}</p>
      <p><strong>Apellidos:</strong> ${usuario.apellidos}</p>
      <p><strong>Password:</strong> <input type="password" value="${usuario.password}" disabled /></p>
  `;
}
async function getUsuario(idUsuario) {
  try {
      const res = await fetch(`http://localhost:9003/usuario/buscarDatosUsuario/${idUsuario}`);
      if (!res.ok) {
          throw new Error(`Error al obtener el usuario: ${res.statusText}`);
      }
      const user = await res.json();
      return user;
  } catch (error) {
      document.getElementById('tablaUsuarioContainer').innerHTML = `<p style="color:red">${error.message}</p>`;
      throw error; 
  }
}



function renderizarNombreUsuario() {
  try {
      const usuario = getUsuario(); 
     
      const divNombre = document.getElementById('nombreUsuario');
      divNombre.innerHTML = `
          <nav class="nav nav1">
              <li><a href="#"> ${usuario.nombre}</a></li>
          </nav>
      `;
  } catch (error) {
      console.error("Error al renderizar el nombre del usuario:", error);
  }
}



const cerrarSesion = document.getElementById('cerrarSesion');
cerrarSesion.addEventListener('click', function(e) {
  e.preventDefault();
  localStorage.clear();  
  window.location.href = "index.html";  
});
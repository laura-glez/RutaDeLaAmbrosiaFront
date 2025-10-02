document.querySelectorAll('.btn-P-Reseñas').forEach(btn => {
    btn.addEventListener('click', () => {
        const destino = btn.getAttribute('dirreccion-para-reservas');
        if (destino) {
            window.location.href = destino;
        }
        });
    });

    // <!-- Funcion de los destacados -->
    let eventosDes = [];

        async function loadeventosDes() {
            try {
                const res = await fetch('http://localhost:9003/evento/destacado/S');
                const listResult = await res.json();

                console.log("Datos obtenidos:", listResult);

                if (!Array.isArray(listResult) || listResult.length === 0) {
                    document.querySelector('.pagina-content-P-reservas').innerHTML = `<p>No se encontraron eventos destacados</p>`;
                    return;
                }

                for (let i = listResult.length - 1; i > 0; i--) {
                    const j = Math.floor(Math.random() * (i + 1));
                    [listResult[i], listResult[j]] = [listResult[j], listResult[i]];
                }

                eventosDes = listResult.slice(0, 5);

                renderTarjetas(eventosDes);
            } catch (error) {
                console.error(error);
                document.querySelector('.pagina-content-P-reservas').innerHTML = `<p style="color:red">${error.message}</p>`;
            }
        }

        function renderTarjetas(lista) {
            const contenedor = document.querySelector('.pagina-content-P-reservas');
            contenedor.innerHTML = '';

            lista.forEach((ev) => {
                const card = document.createElement('div');
                card.classList.add('card-P-reservas');
                card.style.setProperty(
                    'background-image',
                    `url(${ev.imagenUrl || ''})`
                );

                const content = document.createElement('div');
                content.classList.add('content-P-reservas');

                const titulo = document.createElement('h2');
                titulo.classList.add('ElTitulo');
                titulo.textContent = ev.nombre;

                const descripcion = document.createElement('p');
                descripcion.classList.add('P-reseña_Descrip');
                descripcion.textContent = ev.descripcion;

                const btn = document.createElement('button');
                btn.classList.add('btn-P-Reseñas');
                btn.textContent = 'Reservar Ahora';
                btn.addEventListener('click', () => {
                    window.location.href = ev.urlReserva || '#';
                });

                content.append(titulo, descripcion, btn);
                card.append(content);
                contenedor.append(card);
            });
        }

        window.addEventListener('DOMContentLoaded', loadeventosDes);

        // Funcion de todas las reservas
        const img_ordenada = [
            'https://img.freepik.com/foto-gratis/disparo-enfoque-selectivo-arboles-vid-capturados-hermoso-vinedo-crepusculo_181624-43455.jpg?semt=ais_hybrid&w=740',
            'https://i.pinimg.com/474x/ea/e4/dc/eae4dc8c924f75141f14df13c2f5c10f.jpg',
            ];
    
            let eventos = [];
    
            async function getEventos() {
            try {
                const res = await fetch('http://localhost:9003/evento/todos');
                const listResult = await res.json();
    
                console.log("Datos obtenidos:", listResult);
    
                if (!Array.isArray(listResult) || listResult.length === 0) {
                document.getElementById('container-card').innerHTML = `<p>No se encontraron eventos</p>`;
                return;
                }
    
                eventos = listResult;
                renderCards();
            }   catch (error) {
                console.error(error);
                document.getElementById('container-card').innerHTML = `<p style="color:red">${error.message}</p>`;
            }
            }
    
            function renderCards() {
            for (let i = eventos.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [eventos[i], eventos[j]] = [eventos[j], eventos[i]];
            }
    
            const seleccionados = eventos.slice(0, 10);
            document.getElementById('container-card').innerHTML = '';
    
            seleccionados.forEach((evento, index) => {
                evento.imagenUrl = img_ordenada[index % img_ordenada.length];
                const card = crearCard(evento, index);
                document.getElementById('container-card').appendChild(card);
            });
            }
    
            function crearCard(evento, idx) {
            const card = document.createElement('div');
            card.classList.add('card');
            card.style.backgroundImage = `url(${evento.imagenUrl})`;
            card.dataset.index = idx;
    
            const cuerpo = document.createElement('div');
            cuerpo.classList.add('card-Cuerpo');
    
            const titulo = document.createElement('h3');
            titulo.classList.add('card-Titulo');
            titulo.textContent = evento.nombre;
    
            const descripcion = document.createElement('div');
            descripcion.classList.add('card-descripcion');
            descripcion.innerHTML = `
                <div class="subContenedor">${evento.descripcion || ''}</div>
                <div class="subContenedor">Dirección: ${evento.direccion ?? '—'}</div>
                <div class="subContenedor">Precio: ${evento.precio ?? '—'}€</div>
                <div class="subContenedor">Aforo Máximo: ${evento.aforoMaximo ?? '—'}</div>
                <div class="subContenedor">Fecha del Evento: ${evento.fechaInicio ?? '—'}</div>
                <button class="btn-todas-Reseñas" id="reservar-${idx}">Reservar Ahora</button>
            `;
    
            cuerpo.append(titulo, descripcion);
            card.append(cuerpo);
    
            card.addEventListener('click', () => {
                const clone = card.cloneNode(true);
                card.classList.toggle('flat');
    
                const closeButton = document.createElement('button');
                closeButton.classList.add('close-button');
                closeButton.innerHTML = '&times;';
                clone.appendChild(closeButton);
    
                const btn = clone.querySelector('.btn-todas-Reseñas');
                btn.style.position = 'absolute';
                btn.style.bottom   = '1.5rem';
                btn.style.left     = '50%';
                btn.style.transform= 'translateX(-50%)';
                btn.addEventListener('click', e => {
                e.stopPropagation();
                mostarLogin()
                });
    
                const rect = card.getBoundingClientRect();
                clone.style.position = 'fixed';
                clone.style.left     = `${rect.left}px`;
                clone.style.top      = `${rect.top}px`;
                clone.style.width    = `${rect.width}px`;
                clone.style.height   = `${rect.height}px`;
                clone.style.zIndex   = 999;
                clone.classList.add('total-card');
    
                document.body.appendChild(clone);
    
                closeButton.addEventListener('click', e => {
                e.stopPropagation();
                clone.classList.remove('total-card');
                card.classList.toggle('flat');
                setTimeout(() => clone.remove(), 300);
                });
                clone.addEventListener('click', e => {
                if (e.target === clone) {
                    clone.classList.remove('total-card');
                    card.classList.toggle('flat');
                    setTimeout(() => clone.remove(), 300);
                }
                });
            });
    
            return card;
            }
    
            window.addEventListener('DOMContentLoaded', getEventos);



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
  
    document.querySelector('.btn-P-Reseñas').addEventListener('click', (e) => {
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
  
  
const img_ordenada = [
    'https://caracol.com.co/resizer/v2/YIXVDJXCTBAFZCT4YI5QNWXG3A.jpg?auth=4127c5c76ae776ec3bf36f6f1456fc480260a44399d197a71b2e6c25ac91f57a&width=650&height=488&quality=70&smart=true',
    'https://www.blogdelfotografo.com/wp-content/uploads/2021/12/Fondo_Negro_4.webp',
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
    const event = evento.idEvento;

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
        localStorage.setItem("evento", JSON.stringify(event));
        window.location.href="nuevaReserva.html";
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
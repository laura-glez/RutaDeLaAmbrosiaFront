window.addEventListener('scroll', function() {
    const scrolled = window.scrollY;
    const background = document.getElementById('Principal');
    // Ajusta la velocidad cambiando el divisor (e.g. 2 para más lento, 0.5 para más rápido)
    background.style.transform = 'translateY(' + scrolled * 0.5 + 'px)';
});


document.querySelectorAll('.btn-T-Sendas').forEach(btn => {
    btn.addEventListener('click', () => {
        const destino = btn.getAttribute('dirreccion-Senda');
        if (destino) {
            window.location.href = destino;
        }
    });
});


document.querySelectorAll('.btn-P-Reseñas').forEach(btn => {
btn.addEventListener('click', () => {
    const destino = btn.getAttribute('dirreccion-para-reservas');
    if (destino) {
        window.location.href = destino;
    }
    });
});


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

        eventosDes = listResult.slice(0, 3);

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





const img_ordenada = [
'https://therumlab.com/wp-content/uploads/2023/11/barriles-2-1000x641.jpg',
'https://mejorconsalud.as.com/wp-content/uploads/2021/12/cielo-estrellado-negro.jpg',
];

let eventos = [];

async function getEventos() {
try {
    const res = await fetch('http://localhost:9003/evento/tipo/1');
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
    mostarLogin();
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



  
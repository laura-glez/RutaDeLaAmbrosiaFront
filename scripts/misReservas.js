const idUsuario = JSON.parse(localStorage.getItem('usuario')).idUsuario;

async function obtenerReservas(idUsuario) {
  try {
    const res = await fetch(`http://localhost:9003/reserva/usuarioId/${idUsuario}`);
    const reservas = await res.json();

    if (!reservas || reservas.length === 0) {
      document.getElementById('tablaReservasContainer').innerHTML = `<p>No se encontraron reservas</p>`;
      return;
    }

    renderizarTablaReservas(reservas);
  } catch (error) {
    console.error('Error al obtener reservas:', error);
    document.getElementById('tablaReservasContainer').innerHTML = `<p style="color:red">${error.message}</p>`;
  }
}

function renderizarTablaReservas(reservas) {
  const tablaContainer = document.getElementById('tablaReservasContainer');

  const filas = reservas.map((reserva) => `
    <tr>
      <td>${reserva.idReserva || "N/A"}</td>
      <td>${reserva.evento?.idEvento || reserva.idEvento || "Sin evento"}</td>
      <td>${reserva.nombreEvento || "Sin evento"}</td>
      <td>28</td> <!-- Precio fijo -->
      <td>${reserva.precioVenta ?? "No especificado"}</td>
      <td>
        <input type="number" value="${reserva.cantidad ?? 1}" class="cantidadInput" data-idReserva="${reserva.idReserva}" min="1" max="10" />
      </td>
      <td>
        <input type="text" value="${reserva.observaciones ?? 'Observaciones'}" class="observacionesInput" />
      </td>
      <td>
        <button class="guardarCantidadBtn" data-idReserva="${reserva.idReserva}">Guardar</button>
      </td>
      <td>
        <button class="eliminarReservaBtn" data-idReserva="${reserva.idReserva}">Cancelar Reserva</button>
      </td>
    </tr>
  `).join('');

  tablaContainer.innerHTML = `
    <br><br>
    <table id="tablaReservas" border="1" cellspacing="0" cellpadding="5" style="border-collapse: collapse; width: 100%;">
      <thead>
        <tr>
          <th>ID Reserva</th>
          <th>Evento ID</th>
          <th>Nombre Evento</th>
          <th>Precio Unitario</th>
          <th>Precio Venta</th>
          <th>Cantidad</th>
          <th>Observaciones</th>
          <th>Modificar</th>
          <th>Cancela tu Reserva</th>
        </tr>
      </thead>
      <tbody>
        ${filas}
      </tbody>
    </table>
  `;

  // Evento para guardar cantidad y observaciones
  const guardarBtns = document.querySelectorAll('.guardarCantidadBtn');
  guardarBtns.forEach(btn => {
    btn.addEventListener("click", function () {
      const idReserva = this.getAttribute('data-idReserva');
      const fila = this.closest('tr');
      const cantidadInput = fila.querySelector('.cantidadInput');
      const observacionesInput = fila.querySelector('.observacionesInput');

      const nuevaCantidad = parseInt(cantidadInput.value);
      const nuevasObservaciones = observacionesInput.value;

      guardarCantidadModificada(idReserva, nuevaCantidad, nuevasObservaciones, fila);
    });
  });

  // Evento para eliminar reserva
  const eliminarBtns = document.querySelectorAll('.eliminarReservaBtn');
  eliminarBtns.forEach(btn => {
    btn.addEventListener("click", function () {
      const idReserva = this.getAttribute('data-idReserva');
      eliminarReserva(idReserva);  
    });
  });
}

async function guardarCantidadModificada(idReserva, nuevaCantidad, nuevasObservaciones, fila) {
  const precioUnitario = 28;
  const precioVenta = nuevaCantidad * precioUnitario;

  const idEvento = fila.children[1].textContent.trim();

  const reservaModificada = { 
    idReserva: parseInt(idReserva), 
    cantidad: nuevaCantidad,
    precioVenta: precioVenta,
    observaciones: nuevasObservaciones,
    usuario: { idUsuario: idUsuario }, 
    evento: { idEvento: parseInt(idEvento) }
  };

  console.log("Datos para modificar reserva:", reservaModificada);

  try {
    const response = await fetch('http://localhost:9003/reserva/modificar', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(reservaModificada),
    });

    if (response.ok) {
      alert("Reserva modificada con éxito");
      obtenerReservas(idUsuario);
    } else {
      throw new Error('Error al modificar la reserva');
    }
  } catch (error) {
    console.error('Error al modificar la reserva:', error);
    alert('Hubo un problema al modificar la reserva.');
  }
}

async function eliminarReserva(idReserva) {
  const confirmDelete = confirm("¿Estás seguro de cancelar esta reserva?");
  
  if (confirmDelete) {
    try {
      const response = await fetch(`http://localhost:9003/reserva/eliminar/${idReserva}`, { method: 'DELETE' });

      if (response.ok) {
        alert("Reserva cancelada con éxito");
        obtenerReservas(idUsuario); 
      } else {
        throw new Error('No se pudo cancelar la reserva');
      }
    } catch (error) {
      console.error('Error al cancelar la reserva:', error);
      alert('Hubo un problema al cancelar la reserva.');
    }
  }
}

obtenerReservas(idUsuario);

const cerrarSesion = document.getElementById('cerrarSesion');
cerrarSesion.addEventListener('click', function(e) {
  e.preventDefault();
  localStorage.clear();
  window.location.href = "index.html";
});

document.getElementById("container").addEventListener("submit", async function (event) {
    event.preventDefault();
  
    //const fechaAlta = new Date().toISOString();  
  
    let nuevoUsuario = {
      nombre: document.getElementById("nombre").value,
      apellidos: document.getElementById("apellidos").value,
      email: document.getElementById("email").value,
      password: document.getElementById("password").value,
      enabled: 1,
      tipo: 
        {idTipo:2},
      fechaRegistro: Date.now()  
    };
    console.log(nuevoUsuario);
    try {
      const response = await fetch('localhost:9003/usuario/alta', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(nuevoUsuario)
      });
    
      if (!response.ok) {
        const errorDetails = await response.json();
        console.log(nuevoUsuario);
        throw new Error('Error al crear el evento: ' + JSON.stringify(errorDetails));
      }
    
    //   const eventoCreado = await response.json();
    //   eventos.push(eventoCreado);
    //   renderTabla();
    //   document.getElementById("formAltaEvento").reset();
    //   alert("Evento dado de alta con éxito");
    
    } catch (error) {
      console.error("Error al registrar el usuario:", error.message);
      alert("Error al registrar el usuario: " + error.message);
    }
  });
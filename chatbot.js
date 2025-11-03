document.addEventListener('DOMContentLoaded', () => {
  // =====================================
  // 🔹 1. Obtener el botón flotante de chat (ya existe en HTML)
  // =====================================
  const botonChat = document.getElementById('chatbot-btn');
  if (!botonChat) {
    console.error('Botón del chatbot no encontrado en el HTML.');
    return;
  }

  // =====================================
  // 🔹 2. Crear el contenedor del chat
  // =====================================
  const chatContainer = document.createElement('div');
  chatContainer.id = 'chatbot-container';
  chatContainer.innerHTML = `
    <div class="chat-header">
      🤖 Asistente Sindugrafs
      <span id="cerrarChat" style="cursor:pointer;">✖</span>
    </div>
    <div class="chat-body" id="chatBody"></div>
    <div class="chat-footer">
      <input type="text" id="chatInput" placeholder="Escribe tu mensaje..." disabled />
    </div>
  `;
  document.body.appendChild(chatContainer);

  // =====================================
  // 🔹 3. Mostrar / Ocultar chat
  // =====================================
  botonChat.addEventListener('click', () => {
    chatContainer.classList.toggle('activo');
    if (chatContainer.classList.contains('activo')) {
      mostrarMenuPrincipal();
    }
  });

  document.getElementById('cerrarChat').addEventListener('click', () => {
    chatContainer.classList.remove('activo');
  });

  // =====================================
  // 🔹 4. Menú principal
  // =====================================
  function mostrarMenuPrincipal() {
    const chatBody = document.getElementById('chatBody');
    chatBody.innerHTML = `
      <p>👋 ¡Hola! Soy el asistente virtual de <b>Sindugrafs</b>. ¿En qué puedo ayudarte hoy?</p>
      <div class="chat-options">
        <button class="chat-option btn btn-outline-primary my-1" data-op="cotizar">🧾 Cotizar un servicio</button>
        <button class="chat-option btn btn-outline-primary my-1" data-op="empresa">🏢 Conocer sobre Sindugrafs</button>
        <button class="chat-option btn btn-outline-primary my-1" data-op="horarios">🕒 Horarios o local</button>
        <button class="chat-option btn btn-outline-primary my-1" data-op="asesor">💬 Comunicarme con un asesor</button>
        <button class="chat-option btn btn-outline-primary my-1" data-op="sitios">🌐 Sitios oficiales</button>
      </div>
    `;

    document.querySelectorAll('.chat-option').forEach(btn => {
      btn.addEventListener('click', e => manejarOpcion(e.target.dataset.op));
    });
  }

  // =====================================
  // 🔹 5. Función principal de opciones
  // =====================================
  function manejarOpcion(op) {
    const chatBody = document.getElementById('chatBody');
    chatBody.innerHTML = '';

    switch (op) {
      // 🧾 COTIZAR
      case 'cotizar':
        chatBody.innerHTML = `
          <p>🧾 Perfecto, te ayudaré con una cotización.</p>
          <p>¿Qué tipo de servicio te interesa cotizar?</p>
          <select id="servicioSelect" class="form-select mt-2">
            <option value="">Selecciona un servicio...</option>
            <option value="Revistas">Revistas</option>
            <option value="Afiches">Afiches</option>
            <option value="Cajas">Cajas</option>
            <option value="Etiquetas">Etiquetas</option>
            <option value="Brochures">Brochures</option>
            <option value="Gigantografías">Gigantografías</option>
          </select>
          <div class="d-grid mt-3">
            <button id="continuarCotizacion" class="btn btn-primary">Continuar</button>
            <button class="btn btn-outline-secondary mt-2" id="volverInicio">🏠 Menú principal</button>
          </div>
        `;

        document.getElementById('continuarCotizacion').addEventListener('click', () => {
          const servicio = document.getElementById('servicioSelect').value;
          if (!servicio) {
            mostrarMensajeChat('⚠️ Por favor selecciona un servicio antes de continuar.');
            return;
          }
          pedirDatosCliente(servicio);
        });

        document.getElementById('volverInicio').addEventListener('click', mostrarMenuPrincipal);
        break;

      // 🏢 EMPRESA
      case 'empresa':
        chatBody.innerHTML = `
          <p>🏢 Somos <b>Sindugrafs</b>, expertos en impresiones de alta calidad: revistas, cajas, etiquetas, gigantografías y más.</p>
          <p>Brindamos soluciones gráficas innovadoras y personalizadas para tu empresa.</p>
          <button class="btn btn-outline-secondary mt-2" id="volverInicio">🏠 Volver al menú</button>
        `;
        document.getElementById('volverInicio').addEventListener('click', mostrarMenuPrincipal);
        break;

      // 🕒 HORARIOS
      case 'horarios':
        chatBody.innerHTML = `
          <p>🕒 Nuestro horario de atención:</p>
          <ul>
            <li>Lunes a Viernes: 8:00 AM - 6:00 PM</li>
            <li>Sábado: 9:00 AM - 1:00 PM</li>
            <li>Domingos: cerrado</li>
          </ul>
          <p>📍 Encuéntranos aquí:</p>
          <a href="https://www.google.com/maps?q=-12.053006696080134,-77.0513219906001" target="_blank" class="btn btn-success btn-sm">Ver ubicación</a>
          <button class="btn btn-outline-secondary mt-2" id="volverInicio">🏠 Volver al menú</button>
        `;
        document.getElementById('volverInicio').addEventListener('click', mostrarMenuPrincipal);
        break;

      // 💬 ASESOR
      case 'asesor':
        chatBody.innerHTML = `
          <p>💬 Puedes comunicarte directamente con un asesor:</p>
          <a href="https://wa.me/51947234694" target="_blank" class="btn btn-success">Contactar por WhatsApp</a>
          <button class="btn btn-outline-secondary mt-2" id="volverInicio">🏠 Volver al menú</button>
        `;
        document.getElementById('volverInicio').addEventListener('click', mostrarMenuPrincipal);
        break;

      // 🌐 SITIOS
      case 'sitios':
        chatBody.innerHTML = `
          <p>🌐 Encuéntranos en nuestras redes:</p>
          <ul>
            <li><a href="https://www.facebook.com" target="_blank">Facebook</a></li>
            <li><a href="https://www.tiktok.com" target="_blank">TikTok</a></li>
            <li><a href="https://www.linkedin.com" target="_blank">LinkedIn</a></li>
          </ul>
          <button class="btn btn-outline-secondary mt-2" id="volverInicio">🏠 Volver al menú</button>
        `;
        document.getElementById('volverInicio').addEventListener('click', mostrarMenuPrincipal);
        break;
    }
  }

  // =====================================
  // 💬 Mostrar mensaje del sistema
  // =====================================
  function mostrarMensajeChat(texto) {
    const chatBody = document.getElementById('chatBody');
    const mensaje = document.createElement('p');
    mensaje.classList.add('chat-msg-sistema');
    mensaje.textContent = texto;
    chatBody.appendChild(mensaje);
    chatBody.scrollTop = chatBody.scrollHeight;
  }

  // =====================================
  // 📋 Pedir datos del cliente
  // =====================================
  function pedirDatosCliente(servicio, datosPrevios = {}) {
    const chatBody = document.getElementById('chatBody');
    chatBody.innerHTML = `
      <p>Excelente. Ingresa tus datos para la cotización:</p>
      <div class="form-chat">
        <input type="text" id="nombreCliente" placeholder="Tu nombre" class="form-control mt-2 ${datosPrevios.nombreError ? 'input-error' : ''}" value="${datosPrevios.nombre || ''}">
        <input type="email" id="correoCliente" placeholder="Tu correo electrónico" class="form-control mt-2 ${datosPrevios.correoError ? 'input-error' : ''}" value="${datosPrevios.correo || ''}">
        <input type="text" id="telefonoCliente" placeholder="Tu teléfono" class="form-control mt-2 ${datosPrevios.telefonoError ? 'input-error' : ''}" value="${datosPrevios.telefono || ''}">
      </div>
      <div id="mensajeError" class="chat-error">${datosPrevios.mensajeError || ''}</div>
      <div class="d-grid mt-3">
        <button id="enviarCotizacion" class="btn btn-primary">📩 Enviar Cotización</button>
        <button class="btn btn-outline-secondary mt-2" id="volverAtras">⬅️ Volver</button>
      </div>
    `;

    document.getElementById('volverAtras').addEventListener('click', () => manejarOpcion('cotizar'));

    document.getElementById('enviarCotizacion').addEventListener('click', async () => {
      const nombre = document.getElementById('nombreCliente').value.trim();
      const correo = document.getElementById('correoCliente').value.trim();
      const telefono = document.getElementById('telefonoCliente').value.trim();

      let errores = {};
      let mensajeError = '';

      if (!nombre) errores.nombreError = true;
      if (!correo) errores.correoError = true;
      if (!telefono) errores.telefonoError = true;

      const emailRegex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;
      if (correo && !emailRegex.test(correo)) {
        errores.correoError = true;
        mensajeError = '⚠️ Ingresa un correo electrónico válido.';
      }

      if (Object.keys(errores).length > 0) {
        if (!mensajeError) mensajeError = 'Por favor completa los campos resaltados en rojo.';
        pedirDatosCliente(servicio, { nombre, correo, telefono, ...errores, mensajeError });
        return;
      }

      // Mostrar spinner
      chatBody.innerHTML = `
        <div class="chat-loading text-center mt-3">
          <div class="spinner-border text-primary" role="status"></div>
          <p class="mt-2">Enviando tu cotización...</p>
        </div>
      `;

      try {
        await guardarCotizacion({
          nombre, correo, telefono, servicio,
          mensaje: `Solicitud automática desde chatbot para ${servicio}`
        });

        chatBody.innerHTML = `
          <div class="bot-message fade-in">
            <p>✅ ¡Gracias, <b>${nombre}</b>!</p>
            <p>Tu solicitud de cotización para <b>${servicio}</b> fue enviada correctamente.</p>
            <p>¿Deseas enviarla también por WhatsApp?</p>
            <button class="btn btn-success btn-sm" id="btnEnviarWA">Sí, enviar</button>
            <button class="btn btn-outline-secondary btn-sm ms-2" id="volverInicio">🏠 Volver al menú</button>
          </div>
        `;

        document.getElementById('btnEnviarWA').addEventListener('click', () => {
          const mensaje = encodeURIComponent(`Hola, soy ${nombre}. Quisiera cotizar el servicio de ${servicio}. Mi número es ${telefono}.`);
          window.open(`https://wa.me/51947234694?text=${mensaje}`, '_blank');
        });
        document.getElementById('volverInicio').addEventListener('click', mostrarMenuPrincipal);
      } catch (error) {
        mostrarMensajeChat('❌ Ocurrió un error al enviar la cotización. Intenta nuevamente.');
      }
    });
  }

  // Inicializar chat
  mostrarMenuPrincipal();
});

// =====================================
// 💾 Guardar cotización en MongoDB
// =====================================
async function guardarCotizacion(datos) {
  const response = await fetch("http://localhost:3000/api/cotizar", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(datos)
  });
  if (!response.ok) throw new Error('Error al guardar cotización');
  return await response.json();
}


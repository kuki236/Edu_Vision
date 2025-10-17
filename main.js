document.addEventListener("DOMContentLoaded", function () {
    const sections = document.querySelectorAll(".section");
    let usuarioLogueado = false; // Variable de estado de sesión

    // IMPORTANTE: Hacer la función global para que pueda ser llamada desde HTML
    window.mostrarSeccion = function(id) {
        // Detener todos los medios antes de cambiar de sección
        
        if (typeof detenerTodosLosMedias === 'function') {
            detenerTodosLosMedias();
        }
        
        sections.forEach(sec => {
            if (sec.id === id) {
                sec.classList.remove("hidden");
            } else {
                sec.classList.add("hidden");
            }
        });
        window.scrollTo({ top: 0, behavior: "smooth" });
        // NUEVO: Actualizar migas de pan
        actualizarMigasDePan(id);
    }

    // Función para actualizar el botón Login/Logout del navbar
    function actualizarBotonNavbar() {
        const btnLoginLogout = document.getElementById('btnLoginLogout');
        
        if (btnLoginLogout) {
            if (usuarioLogueado) {
                btnLoginLogout.textContent = 'Logout';
                btnLoginLogout.onclick = function(e) {
                    e.preventDefault();
                    cerrarSesion();
                };
            } else {
                btnLoginLogout.textContent = 'Login';
                btnLoginLogout.onclick = function(e) {
                    e.preventDefault();
                    mostrarSeccion('login');
                };
            }
        }
    }

    // Función para actualizar migas de pan simple basada en el ID de la sección visible
    window.actualizarMigasDePan = function(seccionId) {
        const contenedorMigas = document.getElementById('migasDePan');
        if (!contenedorMigas) return;

        // Define títulos amigables para las secciones
        const titulosSecciones = {
            inicio: 'Inicio',
            login: 'Login',
            dashboardAlumno: 'Dashboard Alumno',
            dashboardDocente: 'Dashboard Docente',
            ajustesAccesibilidad: 'Ajustes',
            inputSubirCurso: 'Subir Curso',
            listaCursosAlumno: 'Mis Cursos',
            recursosCurso: 'Recursos del Curso',
            lectorInmersivo: 'Lector Inmersivo',
            miniFormulario: 'Formulario',
            encuestaSatisfaccion: 'Encuesta',
            recomendaciones: 'Recomendaciones'
            // Agrega más si tienes más secciones
        };

        // Ejemplo simple: Inicio > Sección Actual
        const migas = ['Inicio'];

        if (seccionId !== 'inicio') {
            migas.push(titulosSecciones[seccionId] || seccionId);
        }

        // Construir HTML de migas
        contenedorMigas.innerHTML = migas.map((texto, index) => {
            if (index === migas.length - 1) {
                return `<span aria-current="page">${texto}</span>`;
            } else {
                return `<a href="#${Object.keys(titulosSecciones).find(key => titulosSecciones[key] === texto)}" onclick="mostrarSeccion('${Object.keys(titulosSecciones).find(key => titulosSecciones[key] === texto)}');return false;">${texto}</a> &gt; `;
            }
        }).join('');
    }


    // Función para cerrar sesión
    function cerrarSesion() {
        usuarioLogueado = false;
        actualizarBotonNavbar();
        mostrarSeccion('inicio');
        
        // Limpiar campos de login
        const loginEmail = document.getElementById('login-email');
        if (loginEmail) loginEmail.value = '';
        const loginPassword = document.getElementById('login-password');
        if (loginPassword) loginPassword.value = '';
    }

    const links = document.querySelectorAll("nav a");
    links.forEach(link => {
        link.addEventListener("click", e => {
            const destino = link.getAttribute("href");
            if (destino.startsWith("#") && link.id !== 'btnLoginLogout') {
                e.preventDefault();
                const id = destino.substring(1);
                mostrarSeccion(id);
            }
        });
    });

    const btnConectarse = document.getElementById('btnConectarse');
    const loginEmailInput = document.getElementById('login-email');

    if (btnConectarse) {
        btnConectarse.addEventListener('click', function(event) {
            event.preventDefault(); 
            const emailValue = loginEmailInput.value.trim();

            // Marcar como logueado
            usuarioLogueado = true;
            actualizarBotonNavbar();

            if (emailValue.toLowerCase().startsWith('e')) {
                mostrarSeccion("dashboardAlumno");
            } else {
                mostrarSeccion("dashboardDocente"); 
            }
        });
    }
    
    const btnComienza = document.querySelector('.botonComienza');

    if (btnComienza) {
        btnComienza.addEventListener('click', function(event) {
            event.preventDefault(); 
            mostrarSeccion("login"); 
        });
    }
    
    const btnAjustes = document.getElementById('btnAjustes');
    if (btnAjustes) {
        btnAjustes.addEventListener('click', function() {
            mostrarSeccion("ajustesAccesibilidad");
        });
    }

    const btnIrSubida = document.getElementById("btnIrSubida");
    if (btnIrSubida) {
        btnIrSubida.addEventListener("click", () => {
            mostrarSeccion("inputSubirCurso");
        });
    }

    const btnVolverDashboard = document.getElementById("btnVolverDashboard");
    if (btnVolverDashboard) {
        btnVolverDashboard.addEventListener("click", () => {
            mostrarSeccion("dashboardDocente");
        });
    }
    
    const btnRegresarADashboard = document.getElementById("btnRegresarADashboard");
    if (btnRegresarADashboard) {
        btnRegresarADashboard.addEventListener("click", () => {
            mostrarSeccion("dashboardDocente"); 
        });
    }
    
    const linkSubirRecurso = document.querySelector('a.subirRecurso');

    if (linkSubirRecurso) {
        linkSubirRecurso.addEventListener("click", (e) => {
            e.preventDefault();
            const id = linkSubirRecurso.getAttribute("href").substring(1); 
            mostrarSeccion(id);
        });
    }
    
    const logoutBtn = document.getElementById('logoutBtn');

    if (logoutBtn) {
        logoutBtn.addEventListener('click', function() {
            cerrarSesion();
        });
    }

    // Conectar botón "Mis cursos" - Método más robusto
    const btnMisCursos = document.querySelector('#dashboardAlumno button');
    if (btnMisCursos) {
        btnMisCursos.addEventListener('click', function(e) {
            if (this.textContent.includes('Mis cursos')) {
                e.preventDefault();
                mostrarSeccion("listaCursosAlumno");
            }
        });
    }

    // Modificar el evento del botón de ajustes en el navbar
    const btnAjustesSettings = document.querySelector('button.flex.h-10.w-10');
    if (btnAjustesSettings && !btnAjustesSettings.id) {
        btnAjustesSettings.id = 'btnAjustesNav';
        btnAjustesSettings.addEventListener('click', function() {
            mostrarSeccion("ajustesAccesibilidad");
        });
    }

    // Inicializar estado del botón navbar
    actualizarBotonNavbar();
    inicializarPreferenciasAccesibilidad();
    configurarTogglesAccesibilidad();
    mostrarSeccion("inicio");
});
    function inicializarPreferenciasAccesibilidad() {
    const preferencias = {
        contraste: localStorage.getItem('accesibilidad_contraste') === 'true',
        tipografia: localStorage.getItem('accesibilidad_tipografia') === 'true',
        navegacionVoz: localStorage.getItem('accesibilidad_navegacionVoz') === 'true' || localStorage.getItem('accesibilidad_navegacionVoz') === null, // Por defecto activado
        respuestaHaptica: localStorage.getItem('accesibilidad_respuestaHaptica') === 'true'
    };
    
    // Aplicar preferencias a los toggles
    aplicarPreferenciasAToggles(preferencias);
    
    // Aplicar efectos visuales según preferencias
    aplicarEfectosAccesibilidad(preferencias);
}

// Aplicar preferencias guardadas a los toggles del DOM
function aplicarPreferenciasAToggles(preferencias) {
    const toggles = {
        contraste: document.querySelector('#dashboardAlumno .dark\\:bg-background-dark\\/80.rounded-lg > div:nth-child(1) input[type="checkbox"]'),
        tipografia: document.querySelector('#dashboardAlumno .dark\\:bg-background-dark\\/80.rounded-lg > div:nth-child(2) input[type="checkbox"]'),
        navegacionVoz: document.querySelector('#dashboardAlumno .dark\\:bg-background-dark\\/80.rounded-lg > div:nth-child(3) input[type="checkbox"]'),
        respuestaHaptica: document.querySelector('#dashboardAlumno .dark\\:bg-background-dark\\/80.rounded-lg > div:nth-child(4) input[type="checkbox"]')
    };
    
    if (toggles.contraste) toggles.contraste.checked = preferencias.contraste;
    if (toggles.tipografia) toggles.tipografia.checked = preferencias.tipografia;
    if (toggles.navegacionVoz) toggles.navegacionVoz.checked = preferencias.navegacionVoz;
    if (toggles.respuestaHaptica) toggles.respuestaHaptica.checked = preferencias.respuestaHaptica;
}

// Configurar event listeners para todos los toggles
function configurarTogglesAccesibilidad() {
    // Obtener todos los toggles de accesibilidad
    const contenedorAccesibilidad = document.querySelector('#dashboardAlumno aside .dark\\:bg-background-dark\\/80');
    
    if (!contenedorAccesibilidad) return;
    
    const toggles = contenedorAccesibilidad.querySelectorAll('input[type="checkbox"]');
    
    toggles.forEach((toggle, index) => {
        toggle.addEventListener('change', function() {
            switch(index) {
                case 0: // Contraste
                    guardarPreferencia('contraste', this.checked);
                    aplicarContraste(this.checked);
                    break;
                case 1: // Tipografía
                    guardarPreferencia('tipografia', this.checked);
                    aplicarTipografia(this.checked);
                    break;
                case 2: // Navegación por Voz
                    guardarPreferencia('navegacionVoz', this.checked);
                    aplicarNavegacionVoz(this.checked);
                    break;
                case 3: // Respuesta Háptica
                    guardarPreferencia('respuestaHaptica', this.checked);
                    aplicarRespuestaHaptica(this.checked);
                    break;
            }
            
            // Feedback visual y sonoro
            mostrarNotificacionCambio(index, this.checked);
        });
    });
}

// Guardar preferencia en localStorage
function guardarPreferencia(nombre, valor) {
    localStorage.setItem('accesibilidad_' + nombre, valor.toString());
    console.log(`Preferencia guardada: ${nombre} = ${valor}`);
}

// Aplicar todos los efectos de accesibilidad
function aplicarEfectosAccesibilidad(preferencias) {
    if (preferencias.contraste) aplicarContraste(true);
    if (preferencias.tipografia) aplicarTipografia(true);
    if (preferencias.navegacionVoz) aplicarNavegacionVoz(true);
    if (preferencias.respuestaHaptica) aplicarRespuestaHaptica(true);
}

// Aplicar modo de alto contraste
function aplicarContraste(activar) {
    if (activar) {
        document.body.classList.add('alto-contraste');
        // Agregar estilos de alto contraste
        if (!document.getElementById('estilos-contraste')) {
            const style = document.createElement('style');
            style.id = 'estilos-contraste';
            style.textContent = `
                .alto-contraste {
                    --tw-bg-opacity: 1;
                    background-color: rgb(0 0 0 / var(--tw-bg-opacity));
                }
                .alto-contraste .text-gray-500 {
                    color: #FFFFFF !important;
                }
                .alto-contraste .text-gray-700 {
                    color: #FFFFFF !important;
                }
                .alto-contraste button,
                .alto-contraste .dark\\:bg-background-dark\\/80 {
                    border: 2px solid #FFFFFF !important;
                }
            `;
            document.head.appendChild(style);
        }
    } else {
        document.body.classList.remove('alto-contraste');
    }
}

// Aplicar tipografía de alta legibilidad
function aplicarTipografia(activar) {
    if (activar) {
        document.body.style.fontFamily = 'Arial, sans-serif';
        document.body.style.fontSize = '18px';
        document.body.style.letterSpacing = '0.05em';
        document.body.style.lineHeight = '1.8';
    } else {
        document.body.style.fontFamily = '';
        document.body.style.fontSize = '';
        document.body.style.letterSpacing = '';
        document.body.style.lineHeight = '';
    }
}

// Activar/desactivar navegación por voz
function aplicarNavegacionVoz(activar) {
    if (activar) {
        console.log('Navegación por voz activada');
        // Aquí se integraría con el sistema de lectura de texto existente
        window.navegacionVozActiva = true;
    } else {
        console.log('Navegación por voz desactivada');
        window.navegacionVozActiva = false;
        window.speechSynthesis.cancel();
    }
}

// Activar/desactivar respuesta háptica
function aplicarRespuestaHaptica(activar) {
    if (activar) {
        console.log('Respuesta háptica activada');
        window.respuestaHapticaActiva = true;
        // Vibración de prueba si está disponible
        if ('vibrate' in navigator) {
            navigator.vibrate(50);
        }
    } else {
        console.log('Respuesta háptica desactivada');
        window.respuestaHapticaActiva = false;
    }
}

// Mostrar notificación visual al cambiar una preferencia
function mostrarNotificacionCambio(index, activado) {
    const nombres = ['Contraste', 'Tipografía', 'Navegación por Voz', 'Respuesta Háptica'];
    const mensaje = `${nombres[index]} ${activado ? 'activado' : 'desactivado'}`;
    
    // Crear notificación temporal
    const notificacion = document.createElement('div');
    notificacion.className = 'fixed bottom-4 right-4 bg-primary text-white px-6 py-3 rounded-lg shadow-lg z-50 transition-opacity duration-300';
    notificacion.textContent = mensaje;
    notificacion.style.opacity = '0';
    
    document.body.appendChild(notificacion);
    
    // Animación de entrada
    setTimeout(() => {
        notificacion.style.opacity = '1';
    }, 10);
    
    // Leer en voz alta si está activada
    const navegacionVozActiva = localStorage.getItem('accesibilidad_navegacionVoz') === 'true';
    if (navegacionVozActiva && window.speechSynthesis) {
        const utterance = new SpeechSynthesisUtterance(mensaje);
        utterance.lang = 'es-ES';
        utterance.rate = 0.9;
        window.speechSynthesis.speak(utterance);
    }
    
    // Vibración si está activada
    if (window.respuestaHapticaActiva && 'vibrate' in navigator) {
        navigator.vibrate(activado ? [50, 50, 50] : [100]);
    }
    
    // Animación de salida
    setTimeout(() => {
        notificacion.style.opacity = '0';
        setTimeout(() => {
            notificacion.remove();
        }, 300);
    }, 2000);
}

// Función para resetear todas las preferencias
window.resetearPreferenciasAccesibilidad = function() {
    if (confirm('¿Estás seguro de que quieres resetear todas las preferencias de accesibilidad?')) {
        localStorage.removeItem('accesibilidad_contraste');
        localStorage.removeItem('accesibilidad_tipografia');
        localStorage.removeItem('accesibilidad_navegacionVoz');
        localStorage.removeItem('accesibilidad_respuestaHaptica');
        
        location.reload(); // Recargar para aplicar cambios
    }
}

// Función para exportar preferencias (útil para respaldo)
window.exportarPreferenciasAccesibilidad = function() {
    const preferencias = {
        contraste: localStorage.getItem('accesibilidad_contraste'),
        tipografia: localStorage.getItem('accesibilidad_tipografia'),
        navegacionVoz: localStorage.getItem('accesibilidad_navegacionVoz'),
        respuestaHaptica: localStorage.getItem('accesibilidad_respuestaHaptica'),
        fecha: new Date().toISOString()
    };
    
    const json = JSON.stringify(preferencias, null, 2);
    console.log('Preferencias de accesibilidad:', json);
    
    // Copiar al portapapeles
    if (navigator.clipboard) {
        navigator.clipboard.writeText(json).then(() => {
            alert('Preferencias copiadas al portapapeles');
        });
    }
    
    return preferencias;
}
// Funciones para el reproductor multimedia del lector inmersivo
window.cambiarVelocidad = function(velocidad) {
    const audio = document.getElementById('audioClase');
    const video = document.getElementById('videoClase');
    if (audio) audio.playbackRate = velocidad;
    if (video) video.playbackRate = velocidad;
}

window.saltarA = function(segundos) {
    const audio = document.getElementById('audioClase');
    const video = document.getElementById('videoClase');
    if (audio) {
        audio.currentTime = segundos;
        audio.play();
    }
    if (video) {
        video.currentTime = segundos;
        video.play();
    }
    reproduciendo = true;
    if (document.getElementById('iconoReproduccion')) {
        document.getElementById('iconoReproduccion').textContent = 'pause';
    }
}

window.toggleTranscripcion = function() {
    const content = document.getElementById('transcripcionContent');
    const toggleText = document.getElementById('transcripcionToggleText');
    if (content.style.display === 'none') {
        content.style.display = 'block';
        toggleText.textContent = 'Ocultar';
    } else {
        content.style.display = 'none';
        toggleText.textContent = 'Mostrar';
    }
}

// Funciones globales para el flujo de navegación de cursos

window.descargarTranscripcion = function() {
    alert('Descargando transcripción en formato PDF...');
}

window.mostrarRecursosCurso = function() {
    mostrarSeccion("recursosCurso");
}

window.volverListaCursos = function() {
    mostrarSeccion("listaCursosAlumno");
}

window.abrirLectorInmersivo = function() {
    mostrarSeccion("lectorInmersivo");
}

window.volverRecursos = function() {
    mostrarSeccion("recursosCurso");
}

window.mostrarMiniFormulario = function() {
    mostrarSeccion("miniFormulario");
}

window.completarEvaluacion = function() {
    alert("¡Evaluación completada! Ahora verás la encuesta de satisfacción.");
    mostrarSeccion("encuestaSatisfaccion");
}

window.completarEncuesta = function() {
    alert("¡Gracias por tus comentarios! Aquí están tus recomendaciones personalizadas.");
    mostrarSeccion("recomendaciones");
}

window.volverDashboardAlumno = function() {
    mostrarSeccion("dashboardAlumno");
}

// Variables del reproductor
let reproduciendo = false;
let duracionTotal = 143; // 2:23 en segundos
let tiempoActualSeg = 77; // 1:17 en segundos

// Función para toggle play/pause
window.toggleReproduccion = function() {
    const video = document.getElementById('videoClase');
    const audio = document.getElementById('audioClase');
    const icono = document.getElementById('iconoReproduccion');
    
    reproduciendo = !reproduciendo;
    
    if (reproduciendo) {
        icono.textContent = 'pause';
        if (video && !video.paused) video.play();
        if (audio && !audio.paused) audio.play();
    } else {
        icono.textContent = 'play_arrow';
        if (video) video.pause();
        if (audio) audio.pause();
    }
}

// Actualizar barra de progreso
window.actualizarBarraProgreso = function() {
    const video = document.getElementById('videoClase');
    const audio = document.getElementById('audioClase');
    const barra = document.getElementById('barraReproduccion');
    const tiempoActualEl = document.getElementById('tiempoActual');
    
    let mediaActual = video && !video.paused ? video : (audio && !audio.paused ? audio : null);
    
    if (mediaActual) {
        const progreso = (mediaActual.currentTime / mediaActual.duration) * 100;
        barra.style.width = progreso + '%';
        tiempoActualEl.textContent = formatearTiempo(mediaActual.currentTime);
        document.getElementById('tiempoTotal').textContent = formatearTiempo(mediaActual.duration);
    }
}

// Formatear tiempo en mm:ss
window.formatearTiempo = function(segundos) {
    const mins = Math.floor(segundos / 60);
    const secs = Math.floor(segundos % 60);
    return mins + ':' + (secs < 10 ? '0' : '') + secs;
}

// Click en la barra de progreso
window.clickEnBarra = function(event) {
    const barra = event.currentTarget;
    const rect = barra.getBoundingClientRect();
    const clickX = event.clientX - rect.left;
    const porcentaje = clickX / rect.width;
    
    const video = document.getElementById('videoClase');
    const audio = document.getElementById('audioClase');
    
    if (video) {
        video.currentTime = video.duration * porcentaje;
    }
    if (audio) {
        audio.currentTime = audio.duration * porcentaje;
    }
    
    actualizarBarraProgreso();
}

// Controles de navegación
window.retroceder15 = function() {
    const video = document.getElementById('videoClase');
    const audio = document.getElementById('audioClase');
    
    if (video) video.currentTime = Math.max(0, video.currentTime - 15);
    if (audio) audio.currentTime = Math.max(0, audio.currentTime - 15);
}

window.adelantar15 = function() {
    const video = document.getElementById('videoClase');
    const audio = document.getElementById('audioClase');
    
    if (video) video.currentTime = Math.min(video.duration, video.currentTime + 15);
    if (audio) audio.currentTime = Math.min(audio.duration, audio.currentTime + 15);
}

window.irInicio = function() {
    const video = document.getElementById('videoClase');
    const audio = document.getElementById('audioClase');
    
    if (video) video.currentTime = 0;
    if (audio) audio.currentTime = 0;
}

window.irFinal = function() {
    const video = document.getElementById('videoClase');
    const audio = document.getElementById('audioClase');
    
    if (video) video.currentTime = video.duration;
    if (audio) audio.currentTime = audio.duration;
}

window.reproduccionTerminada = function() {
    reproduciendo = false;
    const icono = document.getElementById('iconoReproduccion');
    if (icono) icono.textContent = 'play_arrow';
}

// Sistema de lectura de texto con Tab y Hover
let ultimoTextoLeido = '';
let tiempoUltimaLectura = 0;
let elementoActualLeyendo = null;

window.leerTexto = function(elemento) {
    const ahora = Date.now();
    const textoElemento = elemento.getAttribute('aria-label') || elemento.textContent.trim();
    
    if (textoElemento === ultimoTextoLeido && (ahora - tiempoUltimaLectura) < 2000) {
        return;
    }
    
    window.speechSynthesis.cancel();
    
    let textoALeer = '';
    
    if (elemento.getAttribute('aria-label')) {
        textoALeer = elemento.getAttribute('aria-label');
    } 
    else if (elemento.classList.contains('opcion-quiz')) {
        textoALeer = elemento.querySelector('span:last-child').textContent;
    }
    else if (elemento.tagName === 'H2') {
        textoALeer = 'Pregunta: ' + elemento.textContent;
    }
    else {
        textoALeer = elemento.textContent.trim();
    }
    
    if (textoALeer) {
        const utterance = new SpeechSynthesisUtterance(textoALeer);
        utterance.lang = 'en-US';
        utterance.rate = 0.9;
        utterance.pitch = 1;
        utterance.volume = 1;
        
        window.speechSynthesis.speak(utterance);
        
        ultimoTextoLeido = textoElemento;
        tiempoUltimaLectura = ahora;
        elementoActualLeyendo = elemento;
    }
}

window.detenerLectura = function(elemento) {
    if (elementoActualLeyendo === elemento) {
        window.speechSynthesis.cancel();
        elementoActualLeyendo = null;
    }
}

// Variables del quiz
let preguntaActualNum = 5;
let respuestaSeleccionada = false;
let respuestaCorrecta = null;

window.seleccionarRespuesta = function(elemento, respuesta, esCorrecta) {
    if (respuestaSeleccionada) return;
    
    respuestaSeleccionada = true;
    respuestaCorrecta = esCorrecta;
    
    elemento.setAttribute('aria-checked', 'true');
    
    document.querySelectorAll('.opcion-quiz').forEach(opcion => {
        opcion.classList.remove('border-red-500', 'border-green-500', 'bg-red-900', 'bg-green-900');
        if (opcion !== elemento) {
            opcion.setAttribute('aria-checked', 'false');
        }
    });
    
    const circulo = elemento.querySelector('span:first-child');
    const mensaje = document.getElementById('mensajeRetroalimentacion');
    
    if (esCorrecta) {
        elemento.classList.add('border-green-500', 'bg-green-900');
        circulo.innerHTML = '<span class="material-symbols-outlined text-green-500">check_circle</span>';
        mensaje.innerHTML = '<p class="text-green-500 text-center font-medium">✓ Correcto. La respuesta correcta es: ' + respuesta + '</p>';
        mensaje.setAttribute('aria-label', 'Correcto. La respuesta correcta es: ' + respuesta);
    } else {
        elemento.classList.add('border-red-500', 'bg-red-900');
        circulo.innerHTML = '<span class="material-symbols-outlined text-red-500">cancel</span>';
        mensaje.innerHTML = '<p class="text-red-500 text-center font-medium">✗ Incorrecto. La respuesta correcta se encuentra resaltada</p>';
        mensaje.setAttribute('aria-label', 'Incorrecto. La respuesta correcta es Magnifying glasses');
        
        document.querySelectorAll('.opcion-quiz').forEach(opcion => {
            const texto = opcion.querySelector('span:last-child').textContent;
            if (texto === 'Magnifying glasses') {
                opcion.classList.add('border-green-500', 'bg-green-900');
                const circuloCorrecto = opcion.querySelector('span:first-child');
                circuloCorrecto.innerHTML = '<span class="material-symbols-outlined text-green-500">check_circle</span>';
            }
        });
    }
    
    mensaje.classList.remove('hidden');
    
    setTimeout(() => {
        leerTexto(mensaje);
    }, 300);
    
    const btnSiguiente = document.getElementById('btnSiguientePregunta');
    if (btnSiguiente) btnSiguiente.disabled = false;
}

window.siguientePregunta = function() {
    detenerTodosLosMedias();
    
    preguntaActualNum++;
    
    if (preguntaActualNum > 10) {
        completarEvaluacion();
    } else {
        respuestaSeleccionada = false;
        respuestaCorrecta = null;
        
        const barraProgreso = document.getElementById('barraProgreso');
        const preguntaActual = document.getElementById('preguntaActual');
        
        if (barraProgreso) {
            const progreso = (preguntaActualNum / 10) * 100;
            barraProgreso.style.width = progreso + '%';
        }
        if (preguntaActual) {
            preguntaActual.textContent = preguntaActualNum;
        }
        
        const anuncio = 'Pregunta ' + preguntaActualNum + ' de 10';
        const utterance = new SpeechSynthesisUtterance(anuncio);
        utterance.lang = 'es-ES';
        window.speechSynthesis.speak(utterance);
        
        document.querySelectorAll('.opcion-quiz').forEach(opcion => {
            opcion.classList.remove('border-red-500', 'border-green-500', 'bg-red-900', 'bg-green-900');
            opcion.setAttribute('aria-checked', 'false');
            const circulo = opcion.querySelector('span:first-child');
            circulo.innerHTML = '';
            circulo.className = 'w-6 h-6 rounded-full border-2 border-slate-400 flex-shrink-0';
        });
        
        const mensaje = document.getElementById('mensajeRetroalimentacion');
        if (mensaje) mensaje.classList.add('hidden');
        
        const btnSiguiente = document.getElementById('btnSiguientePregunta');
        if (btnSiguiente) btnSiguiente.disabled = true;
    }
}

window.escucharPregunta = function() {
    const pregunta = document.querySelector('#quizContainer h2');
    if (pregunta) {
        window.speechSynthesis.cancel();
        const utterance = new SpeechSynthesisUtterance('Pregunta: ' + pregunta.textContent);
        utterance.lang = 'en-US';
        utterance.rate = 0.9;
        window.speechSynthesis.speak(utterance);
    }
}

// Función para detener todos los medios (audio y video)
window.detenerTodosLosMedias = function() {
    window.speechSynthesis.cancel();
    elementoActualLeyendo = null;
    
    const videos = document.querySelectorAll('video');
    videos.forEach(video => {
        video.pause();
        video.currentTime = 0;
    });
    
    const audios = document.querySelectorAll('audio');
    audios.forEach(audio => {
        audio.pause();
        audio.currentTime = 0;
    });
}

// Detener lectura al salir de la sección o cambiar de tab del navegador
document.addEventListener('visibilitychange', function() {
    if (document.hidden) {
        detenerTodosLosMedias();
    }
});

document.addEventListener("DOMContentLoaded", function () {
    const sections = document.querySelectorAll(".section");
    let usuarioLogueado = false;
    
    // Historial de navegación de secciones (inicia en 'inicio')
    const historialSecciones = ['inicio'];

    window.mostrarSeccion = function(id) {
        // Detener medios
        if (typeof detenerTodosLosMedias === 'function') {
            detenerTodosLosMedias();
        }
        
        // Mostrar/Ocultar secciones
        sections.forEach(sec => {
            if (sec.id === id) {
                sec.classList.remove("hidden");
            } else {
                sec.classList.add("hidden");
            }
        });
        
        window.scrollTo({ top: 0, behavior: "smooth" });
        
        // Actualizar migas y historial
        actualizarHistorialYMostrarMigas(id);
    }

    // Actualiza el historial y muestra migas
    function actualizarHistorialYMostrarMigas(seccionActual) {
        // Si la sección actual ya está en el historial y no es la última,
        // cortamos el historial para "retroceder" a esa sección
        const indexExistente = historialSecciones.indexOf(seccionActual);
        if (indexExistente !== -1 && indexExistente !== historialSecciones.length -1) {
            historialSecciones.splice(indexExistente + 1);
        } else if (indexExistente === -1) {
            historialSecciones.push(seccionActual);
        }
        actualizarMigasDePan();
    }

    // Función para actualizar migas de pan con historial
    function actualizarMigasDePan() {
        const contenedorMigas = document.getElementById('migasDePan');
        if (!contenedorMigas) return;

        // Mapa de títulos para las secciones
        const titulosSecciones = {
            inicio: 'Inicio',
            login: 'Login',
            dashboardAlumno: 'Dashboard Alumno',
            dashboardDocente: 'Dashboard Docente',
            ajustesAccesibilidad: 'Ajustes',
            inputSubirCurso: 'Subir Curso',
            listaCursosAlumno: 'Mis Cursos',
            recursosCurso: 'Recursos del Curso',
            lectorInmersivo: 'Lector Inmersivo',
            miniFormulario: 'Formulario',
            encuestaSatisfaccion: 'Encuesta',
            recomendaciones: 'Recomendaciones'
        };

        // Construir HTML de migas basado en historial
        const migasHTML = historialSecciones.map((seccionId, index) => {
            const texto = titulosSecciones[seccionId] || seccionId;
            if (index === historialSecciones.length - 1) {
                // Última sección sin enlace
                return `<span aria-current="page">${texto}</span>`;
            } else {
                // Enlaces a secciones previas
                return `<a href="#${seccionId}" data-index="${index}" onclick="window.retrocederA(event, ${index})">${texto}</a> &gt; `;
            }
        }).join('');

        contenedorMigas.innerHTML = migasHTML;
    }

    // Función para retroceder a una sección específica del historial
    window.retrocederA = function(event, index) {
        event.preventDefault();
        const seccion = historialSecciones[index];
        // Cortar historial hasta esa posición (inclusive)
        historialSecciones.splice(index + 1);
        mostrarSeccion(seccion);
        leerTextoPorSeccion(seccion);
    }

    // Función para leer en voz alta el título de una sección (usa SpeechSynthesis)
    function leerTextoPorSeccion(seccionId) {
        const titulosSecciones = {
            inicio: 'Inicio',
            login: 'Login',
            dashboardAlumno: 'Dashboard Alumno',
            dashboardDocente: 'Dashboard Docente',
            ajustesAccesibilidad: 'Ajustes',
            inputSubirCurso: 'Subir Curso',
            listaCursosAlumno: 'Mis Cursos',
            recursosCurso: 'Recursos del Curso',
            lectorInmersivo: 'Lector Inmersivo',
            miniFormulario: 'Formulario',
            encuestaSatisfaccion: 'Encuesta',
            recomendaciones: 'Recomendaciones'
        };
        const texto = titulosSecciones[seccionId] || seccionId;
        const utterance = new SpeechSynthesisUtterance(texto);
        utterance.lang = 'es-ES'; // Cambiar a tu idioma preferido
        window.speechSynthesis.cancel();
        window.speechSynthesis.speak(utterance);
    }

    // Evento para atajo de teclado para retroceder (Alt + Flecha Izquierda)
    document.addEventListener('keydown', function(event) {
        if (event.altKey && event.key === 'ArrowLeft') {
            event.preventDefault();
            if (historialSecciones.length > 1) {
                // Quitar última sección (actual) y mostrar la anterior
                historialSecciones.pop();
                const ultimaSeccion = historialSecciones[historialSecciones.length - 1];
                mostrarSeccion(ultimaSeccion);
                leerTextoPorSeccion(ultimaSeccion);
            }
        }
    });

    // Inicializar botones, estados y mostrar inicio
    actualizarBotonNavbar();
    mostrarSeccion('inicio');

});
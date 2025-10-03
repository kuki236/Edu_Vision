document.addEventListener("DOMContentLoaded", function () {
    const sections = document.querySelectorAll(".section");

    function mostrarSeccion(id) {
        sections.forEach(sec => {
            if (sec.id === id) {
                sec.classList.remove("hidden");
            } else {
                sec.classList.add("hidden");
            }
        });
        window.scrollTo({ top: 0, behavior: "smooth" });
    }

    const links = document.querySelectorAll("nav a");
    links.forEach(link => {
        link.addEventListener("click", e => {
            const destino = link.getAttribute("href");
            if (destino.startsWith("#")) {
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

    document.getElementById("btnVolverDashboard").addEventListener("click", () => {
        mostrarSeccion("dashboardDocente");
    });
    
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
            mostrarSeccion("login");
        });
    }
    mostrarSeccion("inicio");
});

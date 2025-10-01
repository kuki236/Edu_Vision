// main.js – navegación entre secciones (Inicio / Cursos)

document.addEventListener("DOMContentLoaded", function () {
  const links = document.querySelectorAll("nav a");
  const sections = document.querySelectorAll(".section");

  // Función para mostrar una sección y ocultar las demás
  function mostrarSeccion(id) {
    sections.forEach(sec => {
      if (sec.id === id) {
        sec.classList.remove("hidden");
      } else {
        sec.classList.add("hidden");
      }
    });

    // Desplaza al inicio de la página
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  // Escucha los clics en el navbar
  links.forEach(link => {
    link.addEventListener("click", e => {
      const destino = link.getAttribute("href");
      if (destino.startsWith("#")) {
        e.preventDefault();
        const id = destino.substring(1); // quita el '#'
        mostrarSeccion(id);
      }
    });
  });

  // Mostrar "inicio" al cargar
  mostrarSeccion("inicio");
});

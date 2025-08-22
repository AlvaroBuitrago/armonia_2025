
// Función para buscar contenido
function searchContent() {
  const searchTerm = document.getElementById("searchInput").value.toLowerCase();
  if (!searchTerm) return;
  // Quitar resaltados anteriores
  const highlights = document.querySelectorAll(".search-highlight");
  highlights.forEach((el) => {
    const parent = el.parentNode;
    parent.replaceChild(document.createTextNode(el.textContent), el);
    parent.normalize();
  });
  // Buscar y resaltar coincidencias
  const bodyText = document.body.innerHTML;
  const regex = new RegExp(`(${searchTerm})`, "gi");
  document.body.innerHTML = bodyText.replace(
    regex,
    '<span class="search-highlight">$1</span>'
  );
  // Desplazar a la primera coincidencia
  const firstMatch = document.querySelector(".search-highlight");
  if (firstMatch) {
    firstMatch.scrollIntoView({
      behavior: "smooth",
      block: "center"
    });
  }
}
// Permitir búsqueda con Enter
document
  .getElementById("searchInput")
  .addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
      e.preventDefault();
      searchContent();
    }
  });
// Actualizar navegación activa al hacer scroll
window.addEventListener("scroll", function () {
  const sections = document.querySelectorAll("section");
  const navLinks = document.querySelectorAll(".nav-link");
  let current = "";
  sections.forEach((section) => {
    const sectionTop = section.offsetTop;
    if (pageYOffset >= sectionTop - 100) {
      current = section.getAttribute("id");
    }
  });
  navLinks.forEach((link) => {
    link.classList.remove("active");
    if (link.getAttribute("href") === "#" + current) {
      link.classList.add("active");
    }
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const materias = document.querySelectorAll("li");

  materias.forEach((li) => {
    const id = li.getAttribute("data-id");
    const notaInput = li.querySelector(".nota-input");

    // Cargar estado guardado
    const estadoGuardado = localStorage.getItem(`materia-estado-${id}`);
    const notaGuardada = localStorage.getItem(`materia-nota-${id}`);

    if (estadoGuardado === "terminada") {
      li.classList.add("terminada");
    }
    if (notaGuardada) {
      notaInput.value = notaGuardada;
    }

    // Toggle tachado al hacer click en la materia (no en la nota)
    li.querySelector(".materia-text").addEventListener("click", () => {
      li.classList.toggle("terminada");
      const estado = li.classList.contains("terminada") ? "terminada" : "pendiente";
      localStorage.setItem(`materia-estado-${id}`, estado);
    });

    // Guardar nota al cambiar
    notaInput.addEventListener("input", () => {
      localStorage.setItem(`materia-nota-${id}`, notaInput.value);
    });
  });
});
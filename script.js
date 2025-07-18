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

    // Guardar nota al cambiar y recalcular promedios
    notaInput.addEventListener("input", () => {
      localStorage.setItem(`materia-nota-${id}`, notaInput.value);
      calcularPromedios();
    });
  });

  // Calcular y mostrar promedio por semestre
  function calcularPromedios() {
    const semestres = document.querySelectorAll('.semestre');

    semestres.forEach((semestre) => {
      const inputs = semestre.querySelectorAll('.nota-input');
      let suma = 0;
      let cantidad = 0;

      inputs.forEach(input => {
        const valor = parseFloat(input.value);
        if (!isNaN(valor)) {
          suma += valor;
          cantidad++;
        }
      });

      // Buscar o crear el contenedor de promedio
      let promedioDiv = semestre.querySelector('.promedio-semestre');
      if (!promedioDiv) {
        promedioDiv = document.createElement('div');
        promedioDiv.classList.add('promedio-semestre');
        semestre.appendChild(promedioDiv);
      }

      if (cantidad > 0) {
        const promedio = (suma / cantidad).toFixed(2);
        promedioDiv.textContent = `Promedio del semestre: ${promedio}`;
      } else {
        promedioDiv.textContent = `Promedio del semestre: -`;
      }
    });
  }

  // Llamar una vez al cargar
  calcularPromedios();
});
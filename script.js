document.querySelectorAll("button").forEach(btn => {
  btn.addEventListener("click", () => {
    btn.classList.toggle("disabled");
    actualizarMaterias();
  });
});

function actualizarMaterias() {
  const aprobadas = new Set();

  // Detecta materias tachadas (es decir, aprobadas)
  document.querySelectorAll("button:not(.disabled)").forEach(btn => {
    aprobadas.add(btn.textContent.trim());
  });

  document.querySelectorAll("button").forEach(btn => {
    const previas = btn.dataset.previas;
    if (!previas) {
      btn.disabled = false;
      return;
    }

    const listaPrevias = previas.split(",").map(p => p.trim());
    const cumplePrevias = listaPrevias.every(p => aprobadas.has(p));

    if (btn.classList.contains("disabled")) {
      // Aunque esté tachado, lo dejo editable
      btn.disabled = false;
    } else {
      // Si NO está tachado, bloqueo si no cumple las previas
      btn.disabled = !cumplePrevias;
    }
  });
}

// Inicializar bloqueo según previas
actualizarMaterias();

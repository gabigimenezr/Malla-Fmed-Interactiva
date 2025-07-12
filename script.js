const materias = [
  {
    nombre: "INTRODUCCIÓN A LA BIOLOGÍA CELULAR Y MOLECULAR",
    anio: 1,
    semestre: 1,
    previas: []
  },
  {
    nombre: "INTRODUCCIÓN A LA BIOESTADÍSTICA",
    anio: 1,
    semestre: 1,
    previas: []
  },
  {
    nombre: "SALUD Y HUMANIDADES Y BIOÉTICA",
    anio: 1,
    semestre: 1,
    previas: []
  },
  {
    nombre: "APRENDIZAJE EN TERRITORIO 1",
    anio: 1,
    semestre: 1,
    previas: []
  },
  {
    nombre: "BIOLOGÍA CELULAR Y MOLECULAR",
    anio: 1,
    semestre: 2,
    previas: ["INTRODUCCIÓN A LA BIOLOGÍA CELULAR Y MOLECULAR"]
  },
  {
    nombre: "APRENDIZAJE EN TERRITORIO 2",
    anio: 1,
    semestre: 2,
    previas: ["APRENDIZAJE EN TERRITORIO 1"]
  }
];

const mallaDiv = document.getElementById("malla");

const estados = JSON.parse(localStorage.getItem("materiasAprobadas") || "{}");

function guardarEstado() {
  localStorage.setItem("materiasAprobadas", JSON.stringify(estados));
}

function puedeDesbloquear(materia) {
  return materia.previas.every(previa => estados[previa]);
}

function render() {
  mallaDiv.innerHTML = "";

  const años = [...new Set(materias.map(m => m.anio))].sort((a, b) => a - b);

  años.forEach(anio => {
    const contenedor = document.createElement("div");
    contenedor.innerHTML = `<h2>Primero</h2>`;
    contenedor.querySelector("h2").textContent = `${anio === 1 ? "Primero" : anio + "°"}`
    mallaDiv.appendChild(contenedor);

    const semestresDiv = document.createElement("div");
    semestresDiv.id = "semestres";

    [1, 2].forEach(sem => {
      const bloque = document.createElement("div");
      bloque.className = `semestre ${sem === 1 ? "primero" : "segundo"}`;
      const titulo = document.createElement("h3");
      titulo.textContent = `${sem}º semestre`;
      bloque.appendChild(titulo);

      const lista = document.createElement("ul");

      materias
        .filter(m => m.anio === anio && m.semestre === sem)
        .forEach(materia => {
          const item = document.createElement("li");
          item.textContent = materia.nombre;
          item.className = "materia";

          const activa = estados[materia.nombre];
          const habilitada = puedeDesbloquear(materia);

          if (activa) item.classList.add("tachada");
          if (!habilitada && materia.previas.length) item.style.opacity = 0.4;

          item.onclick = () => {
            if (habilitada) {
              estados[materia.nombre] = !estados[materia.nombre];
              guardarEstado();
              render();
            }
          };

          lista.appendChild(item);
        });

      bloque.appendChild(lista);
      semestresDiv.appendChild(bloque);
    });

    contenedor.appendChild(semestresDiv);
  });
}

render();

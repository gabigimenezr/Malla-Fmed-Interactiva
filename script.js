const materias = {
  "Primero": {
    "1º semestre": [
      { nombre: "INTRODUCCIÓN A LA BIOLOGÍA CELULAR Y MOLECULAR" },
      { nombre: "INTRODUCCIÓN A LA BIOESTADÍSTICA" },
      { nombre: "SALUD Y HUMANIDADES Y BIOÉTICA" },
      { nombre: "APRENDIZAJE EN TERRITORIO 1" }
    ],
    "2º semestre": [
      { nombre: "BIOLOGÍA CELULAR Y MOLECULAR", previas: ["INTRODUCCIÓN A LA BIOLOGÍA CELULAR Y MOLECULAR"] },
      { nombre: "APRENDIZAJE EN TERRITORIO 2", previas: ["APRENDIZAJE EN TERRITORIO 1"] }
    ]
  },
  "Segundo": {
    "3º semestre": [
      { nombre: "QUÍMICA BIOLÓGICA", previas: ["BIOLOGÍA CELULAR Y MOLECULAR"] },
      { nombre: "MATEMÁTICA" },
      { nombre: "ANATOMÍA", previas: ["BIOLOGÍA CELULAR Y MOLECULAR"] },
      { nombre: "BIOFÍSICA" }
    ],
    "4º semestre": [
      { nombre: "FISIOLOGÍA", previas: ["ANATOMÍA", "BIOFÍSICA"] },
      { nombre: "BIOQUÍMICA", previas: ["QUÍMICA BIOLÓGICA"] },
      { nombre: "HISTOLOGÍA", previas: ["ANATOMÍA"] },
      { nombre: "APRENDIZAJE EN TERRITORIO 3", previas: ["APRENDIZAJE EN TERRITORIO 2"] }
    ]
  },
  "Tercero": {
    "5º semestre": [
      { nombre: "MICROBIOLOGÍA", previas: ["BIOQUÍMICA", "HISTOLOGÍA"] },
      { nombre: "PARASITOLOGÍA", previas: ["BIOQUÍMICA"] },
      { nombre: "PATOLOGÍA", previas: ["HISTOLOGÍA"] }
    ],
    "6º semestre": [
      { nombre: "FARMACOLOGÍA", previas: ["BIOQUÍMICA", "FISIOLOGÍA"] },
      { nombre: "SALUD PÚBLICA" },
      { nombre: "PSICOLOGÍA MÉDICA" },
      { nombre: "APRENDIZAJE EN TERRITORIO 4", previas: ["APRENDIZAJE EN TERRITORIO 3"] }
    ]
  },
  "Cuarto": {
    "7º semestre": [
      { nombre: "CLÍNICA MÉDICA 1", previas: ["FARMACOLOGÍA", "PATOLOGÍA"] },
      { nombre: "CLÍNICA QUIRÚRGICA 1", previas: ["FARMACOLOGÍA", "PATOLOGÍA"] },
      { nombre: "IMAGENOL. Y LAB. CLÍNICO", previas: ["PATOLOGÍA"] },
      { nombre: "APRENDIZAJE EN TERRITORIO 5", previas: ["APRENDIZAJE EN TERRITORIO 4"] }
    ],
    "8º semestre": [
      { nombre: "GINECOLOGÍA Y OBSTETRICIA 1", previas: ["FARMACOLOGÍA", "PATOLOGÍA"] },
      { nombre: "PEDIATRÍA 1", previas: ["FARMACOLOGÍA", "PATOLOGÍA"] },
      { nombre: "MEDICINA FAMILIAR Y COMUNITARIA", previas: ["SALUD PÚBLICA"] }
    ]
  },
  "Quinto": {
    "9º semestre": [
      { nombre: "CLÍNICA MÉDICA 2", previas: ["CLÍNICA MÉDICA 1"] },
      { nombre: "CLÍNICA QUIRÚRGICA 2", previas: ["CLÍNICA QUIRÚRGICA 1"] },
      { nombre: "APRENDIZAJE EN TERRITORIO 6", previas: ["APRENDIZAJE EN TERRITORIO 5"] }
    ],
    "10º semestre": [
      { nombre: "PEDIATRÍA 2", previas: ["PEDIATRÍA 1"] },
      { nombre: "GINECOLOGÍA Y OBSTETRICIA 2", previas: ["GINECOLOGÍA Y OBSTETRICIA 1"] },
      { nombre: "URGENCIAS Y EMERGENCIAS", previas: ["CLÍNICA MÉDICA 2", "CLÍNICA QUIRÚRGICA 2"] }
    ]
  },
  "Sexto": {
    "11º semestre": [
      { nombre: "INTERNADO CLÍNICO", previas: ["CLÍNICA MÉDICA 2", "PEDIATRÍA 2", "GINECOLOGÍA Y OBSTETRICIA 2", "CLÍNICA QUIRÚRGICA 2"] }
    ],
    "12º semestre": [
      { nombre: "ACTIVIDAD FINAL INTEGRADORA", previas: ["INTERNADO CLÍNICO", "APRENDIZAJE EN TERRITORIO 6"] }
    ]
  }
};

const container = document.getElementById("malla-container");
let aprobadas = new Set(JSON.parse(localStorage.getItem("aprobadas") || "[]"));

function actualizarStorage() {
  localStorage.setItem("aprobadas", JSON.stringify([...aprobadas]));
}

function puedeDesbloquear(materia) {
  if (!materia.previas) return true;
  return materia.previas.every(p => aprobadas.has(p));
}

function crearMateria(nombre, bloqueada) {
  const div = document.createElement("div");
  div.className = "materia";
  div.textContent = nombre;
  if (aprobadas.has(nombre)) div.classList.add("tachada");
  else if (bloqueada) div.classList.add("bloqueada");

  div.addEventListener("click", () => {
    if (div.classList.contains("bloqueada")) return;
    if (aprobadas.has(nombre)) {
      aprobadas.delete(nombre);
      div.classList.remove("tachada");
    } else {
      aprobadas.add(nombre);
      div.classList.add("tachada");
    }
    actualizarStorage();
    renderMalla();
  });
  return div;
}

function renderMalla() {
  container.innerHTML = "";
  for (const anio in materias) {
    const titulo = document.createElement("div");
    titulo.className = "anio";
    titulo.textContent = anio;
    container.appendChild(titulo);

    const fila = document.createElement("div");
    fila.className = "semestres";

    for (const semestre in materias[anio]) {
      const columna = document.createElement("div");
      columna.className = "semestre";

      const tituloSemestre = document.createElement("h2");
      tituloSemestre.textContent = semestre;
      columna.appendChild(tituloSemestre);

      materias[anio][semestre].forEach(m => {
        const bloqueada = !puedeDesbloquear(m);
        const divMateria = crearMateria(m.nombre, bloqueada);
        columna.appendChild(divMateria);
      });

      fila.appendChild(columna);
    }

    container.appendChild(fila);
  }
}

renderMalla();

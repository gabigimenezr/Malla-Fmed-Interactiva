
const materias = {
    'Primero': {
        '1º semestre': [
            "Introducción a la Biología Celular y Molecular",
            "Introducción a la Bioestadística",
            "Salud y Humanidades y Bioética",
            "Aprendizaje en Territorio 1"
        ],
        '2º semestre': [
            "Biología Celular y Molecular",
            "Aprendizaje en Territorio 2"
        ]
    }
    // Puedes agregar más años y semestres aquí
};

const mallaDiv = document.getElementById("malla");

for (const año in materias) {
    const añoDiv = document.createElement("div");
    añoDiv.className = "malla-año";

    const h2 = document.createElement("h2");
    h2.textContent = año;
    mallaDiv.appendChild(h2);

    const semestres = materias[año];
    let count = 0;
    for (const semestre in semestres) {
        const semDiv = document.createElement("div");
        semDiv.className = "semestre " + (count % 2 === 0 ? "rosado" : "morado");

        const h3 = document.createElement("h3");
        h3.textContent = semestre;
        semDiv.appendChild(h3);

        semestres[semestre].forEach(nombre => {
            const li = document.createElement("div");
            li.className = "materia";
            li.textContent = nombre;
            li.onclick = () => {
                li.classList.toggle("tachada");
            };
            semDiv.appendChild(li);
        });

        añoDiv.appendChild(semDiv);
        count++;
    }

    mallaDiv.appendChild(añoDiv);
}

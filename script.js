// Datos de las tablas para Masculinos y Femeninos
const conversionTable = {
    masculino: {
        libre: { 50: 0.60, 100: 1.60, 200: 3.50, 400: 6.70, 800: 12.90, 1500: 23.50 },
        espalda: { 50: 1.50, 100: 2.90, 200: 5.50, 400: 8.80 },
        braza: { 50: 0.70, 100: 2.40, 200: 5.40 },
        mariposa: { 50: 0.40, 100: 1.10, 200: 2.90 },
        estilos: { 100: 1.10, 200: 3.70, 400: 8.80 }
    },
    femenino: {
        libre: { 50: 0.40, 100: 1.10, 200: 2.50, 400: 6.20, 800: 11.00, 1500: 20.60 },
        espalda: { 50: 0.90, 100: 2.10, 200: 3.90 },
        braza: { 50: 0.50, 100: 1.40, 200: 4.40 },
        mariposa: { 50: 0.30, 100: 0.70, 200: 1.70 },
        estilos: { 100: 0.70, 200: 2.90, 400: 6.30 }
    }
};

// Actualiza las distancias dependiendo del estilo seleccionado
function updateDistances() {
    const swimStyle = document.getElementById("swimStyle").value;
    const distanceSelect = document.getElementById("distance");
    distanceSelect.innerHTML = ''; // Limpiar opciones

    const options = {
        libre: ['50', '100', '200', '400', '800', '1500'],
        espalda: ['50', '100', '200', '400'],
        braza: ['50', '100', '200', '400'],
        mariposa: ['50', '100', '200', '400'],
        estilos: ['100', '200', '400']
    };

    options[swimStyle].forEach(dist => {
        let opt = document.createElement('option');
        opt.value = dist;
        opt.innerHTML = dist + 'm';
        distanceSelect.appendChild(opt);
    });
}

// Función para realizar la conversión
function convertTime() {
    // Obtener los valores seleccionados
    const poolType = document.getElementById("poolType").value;
    const timerType = document.getElementById("timerType").value;
    const swimStyle = document.getElementById("swimStyle").value;
    const distance = document.getElementById("distance").value;
    const gender = document.getElementById("gender").value;
    const inputTime = document.getElementById("inputTime").value;

    // Convertir tiempo de entrada en segundos
    const [min, sec] = inputTime.split(":");
    let timeInSeconds = parseFloat(min) * 60 + parseFloat(sec);

    // Obtener el valor de conversión de las tablas
    const additionalTime = conversionTable[gender][swimStyle][distance];

    if (!additionalTime) {
        alert("Datos no disponibles para la selección actual.");
        return;
    }

    // Ajustar según el tipo de piscina
    if (poolType === "25to50") {
        timeInSeconds += additionalTime;  // Añadir tiempo de piscina corta a larga
    } else if (poolType === "50to25") {
        timeInSeconds -= additionalTime;  // Restar tiempo de piscina larga a corta
    }

    // Ajustar según el tipo de cronómetro (manual)
    if (timerType === "manual") {
        if (distance === "50") {
            timeInSeconds += 0.29;  // Sumar 29 centésimas para distancias de 50m
        } else {
            timeInSeconds += 0.19;  // Sumar 19 centésimas para distancias diferentes de 50m
        }
    }

    // Mostrar el resultado con dos dígitos para minutos y segundos
    const minutes = Math.floor(timeInSeconds / 60).toString().padStart(2, '0');
    const seconds = (timeInSeconds % 60).toFixed(2).toString().padStart(5, '0');
    document.getElementById("result").innerText = `${minutes}:${seconds}`;
}

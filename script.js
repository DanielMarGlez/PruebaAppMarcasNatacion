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
        estilos: ['200', '400']
    };

    options[swimStyle].forEach(dist => {
        let opt = document.createElement('option');
        opt.value = dist;
        opt.innerHTML = dist + 'm';
        distanceSelect.appendChild(opt);
    });
}

function quetipoes(poolType,timerType){
    if(poolType=="25"){
        if(timerType=="manual"){
            return "25m";
        }else{
            return "25e";
        }
    }else{
        if(timerType=="electronico"){
            return "50m";
        }else{
            return "50e";
        }
    }
}

// Función para realizar la conversión
function convertTime() {
    // Obtener los valores seleccionados
    const swimStyle = document.getElementById("swimStyle").value;
    const distance = document.getElementById("distance").value;
    const gender = document.getElementById("gender").value;
    const inputTime = document.getElementById("inputTime").value;
    const poolType = document.getElementById("poolType").value;
    const timerType = document.getElementById("timerType").value;

    // Convertir tiempo de entrada en segundos
    const [min, sec] = inputTime.split(":");
    let timeInSeconds = parseFloat(min) * 60 + parseFloat(sec);

    // Obtener el valor de conversión de las tablas
    const additionalTime = conversionTable[gender][swimStyle][distance];

    console.log(additionalTime);

    if (!additionalTime) {
        alert("Datos no disponibles para la selección actual.");
        return;
    };

    if(poolType != "50"){
        extraTime = 0.19;
    } else{
        extraTime = 0.29;
    }

    console.log(timeInSeconds,additionalTime,extraTime,inputTime);
    resultado(poolType,timerType,timeInSeconds, additionalTime, extraTime, inputTime);
    console.log(poolType,timerType);
}

function resultado(poolType,timerType,timeInSeconds,additionalTime,extraTime){
    let result25mM = 0, result25mE = 0, result50mM = 0, result50mE = 0;
    switch (quetipoes(poolType,timerType)) {
        case'25m':
            result25mM = timeInSeconds;
            result25mE = timeInSeconds + extraTime;
            result50mM = timeInSeconds + additionalTime;
            result50mE = timeInSeconds + extraTime + additionalTime;
            break;
        case"25e":
            result25mM = timeInSeconds - extraTime;
            result25mE = timeInSeconds;
            result50mM = (timeInSeconds + additionalTime) - extraTime;
            result50mE = timeInSeconds + additionalTime;
            break;
        case"50m":
            result25mM = timeInSeconds + additionalTime;
            result25mE = (timeInSeconds - additionalTime) + extraTime;
            result50mM = timeInSeconds;
            result50mE = timeInSeconds + extraTime;
            break;
        case"50e":
            result25mM = (timeInSeconds - additionalTime) - extraTime;
            result25mE = timeInSeconds - additionalTime;
            result50mM = timeInSeconds - extraTime;
            result50mE = timeInSeconds;
            break;
        default:
        console.log("Error: Tipo de piscina o cronómetro no válido"); 
        
    }
    console.log(result25mM, result25mE, result50mM, result50mE);

    document.getElementById('result25mM').innerText = formatTime(result25mM);
    document.getElementById('result25mE').innerText = formatTime(result25mE);
    document.getElementById('result50mM').innerText = formatTime(result50mM);
    document.getElementById('result50mE').innerText = formatTime(result50mE);   
}   



    //CONVERTIR TIEMPOS A FORMATO CORRECTO
    function formatTime(time) {
    const minutes = Math.floor(time/ 60);
    const seconds = (time % 60).toFixed(2);
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }

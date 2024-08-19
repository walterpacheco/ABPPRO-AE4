const apiKey = 'e0c15b8e93223e5c828fbf46a5d20e5f';

async function obtenerClima(ciudad, pais) {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad},${pais}&appid=${apiKey}`;
    
    try {
        const respuesta = await fetch(url);
        if (!respuesta.ok) {
            throw new Error('Error en la solicitud');
        }
        const datos = await respuesta.json();
        
        // Convertir temperatura de Kelvin a Celsius
        const tempActual = datos.main.temp - 273.15;
        const tempMax = datos.main.temp_max - 273.15;
        const tempMin = datos.main.temp_min - 273.15;

        mostrarClima(ciudad, tempActual, tempMax, tempMin);

        // Retornar una promesa después de 2 segundos
        return new Promise(resolve => {
            setTimeout(() => {
                resolve('Información Enviada');
            }, 2000);
        });

    } catch (error) {
        console.error('Error al obtener el clima:', error);
        mostrarError(`Error al obtener el clima para ${ciudad}, ${pais}`);
    }
}

function mostrarClima(ciudad, tempActual, tempMax, tempMin) {
    const resultDiv = document.getElementById('result');
    resultDiv.innerHTML = `
        <h2>Clima en ${ciudad}</h2>
        <p>Temperatura Actual: ${tempActual.toFixed(2)} °C</p>
        <p>Temperatura Máxima: ${tempMax.toFixed(2)} °C</p>
        <p>Temperatura Mínima: ${tempMin.toFixed(2)} °C</p>
    `;
}

function mostrarError(mensaje) {
    const resultDiv = document.getElementById('result');
    resultDiv.innerHTML = `<p id="error">${mensaje}</p>`;
}

// Manejo del formulario
document.getElementById('weatherForm').addEventListener('submit', async (event) => {
    event.preventDefault();
    const ciudad = document.getElementById('city').value.trim();
    const pais = document.getElementById('country').value.trim();

    // Validación extra para asegurar que los inputs no estén vacíos o incorrectos
    if (!ciudad || !pais) {
        mostrarError('Por favor, ingrese una ciudad y un país válidos.');
        return;
    }

    const mensaje = await obtenerClima(ciudad, pais);
    console.log(mensaje);
});

document.getElementById('get-weather').addEventListener('click', () => {
    
    document.getElementById('weather-result').innerHTML = '<p>Loading weather...</p>';
    document.getElementById('weather-result').style.opacity = '0';
    document.getElementById('weather-result').style.transition = 'opacity 0.5s';

    if (navigator.geolocation) {
        
        navigator.geolocation.getCurrentPosition(
            position => {
                const lat = position.coords.latitude;
                const lon = position.coords.longitude;

                
                displayWeather(lat, lon);
            },
            (error) => {
                
                handleGeolocationError(error);
                document.getElementById('weather-result').style.opacity = '1';
            },
            { enableHighAccuracy: true } 
        );
    } else {
        document.getElementById('weather-result').innerHTML = '<p class="error">Geolocation is not supported by this browser.</p>';
        document.getElementById('weather-result').style.opacity = '1';
    }
});


function handleGeolocationError(error) {
    if (error.code === error.PERMISSION_DENIED) {
        document.getElementById('weather-result').innerHTML = '<p class="error">Permission denied. Please allow location access in your browser settings.</p>';
    } else if (error.code === error.POSITION_UNAVAILABLE) {
        document.getElementById('weather-result').innerHTML = '<p class="error">Location information is unavailable.</p>';
    } else if (error.code === error.TIMEOUT) {
        document.getElementById('weather-result').innerHTML = '<p class="error">The request to get user location timed out.</p>';
    } else {
        document.getElementById('weather-result').innerHTML = '<p class="error">An unknown error occurred.</p>';
    }
}


function displayWeather(lat, lon) {
    let weatherCondition = "Clear sky";
    let temperature = 25; // Default temperature
    let city = "Current Location";

    
    if (lat > 40.0 && lon > -75.0) {
        city = "New York";
        weatherCondition = "Clear Sky";
        temperature = 22; 
        setBackground('clear');
    } else if (lat > 51.0 && lon > -0.1) {
        city = "London";
        weatherCondition = "Cloudy";
        temperature = 18;
        setBackground('cloudy');
    } else if (lat > 35.0 && lon < 139.0) {
        city = "Tokyo";
        weatherCondition = "Sunny";
        temperature = 26;
        setBackground('clear');
    } else {
        city = "Current Location";
        weatherCondition = "Mild";
        temperature = 20;
        setBackground('clear');
    }

    
    const weatherHTML = `
        <h2>Weather in ${city}</h2>
        <p><strong>Temperature:</strong> ${temperature}°C</p>
        <p><strong>Condition:</strong> ${weatherCondition}</p>
        <p><strong>Location:</strong> Latitude: ${lat.toFixed(2)}, Longitude: ${lon.toFixed(2)}</p>
    `;
    
    document.getElementById('weather-result').innerHTML = weatherHTML;
    document.getElementById('weather-result').style.opacity = '1';
}


function setBackground(condition) {
    const body = document.body;
    body.classList.remove('clear', 'cloudy', 'rain', 'snow');
    body.classList.add(condition);
}

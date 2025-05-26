const apiKey = "20c63620b3c84d80ad2140910252605";

async function getWeather() {
  const city = document.getElementById("cityInput").value.trim();
  const weatherResult = document.getElementById("weatherResult");

  // Reset and validate input
  weatherResult.style.opacity = 0;
  weatherResult.innerHTML = "";
  
  if (!city) {
    weatherResult.innerHTML = `<p style="color: red;">⚠️ Please enter a city name.</p>`;
    weatherResult.style.opacity = 1;
    return;
  }

  // Show loading state
  weatherResult.innerHTML = `<p>🔄 Fetching weather for <strong>${city}</strong>...</p>`;
  weatherResult.style.opacity = 1;

  const url = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}`;

  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error("City not found");

    const data = await response.json();

    // Animate the weather card
    weatherResult.style.opacity = 0;
    setTimeout(() => {
      weatherResult.innerHTML = `
        <h2>${data.location.name}, ${data.location.country}</h2>
        <p>🌡 Temp: ${data.current.temp_c} °C</p>
        <p>🌥 Condition: ${data.current.condition.text}</p>
        <img src="https:${data.current.condition.icon}" alt="weather icon" />
        <p>💧 Humidity: ${data.current.humidity}%</p>
        <p>💨 Wind: ${data.current.wind_kph} kph</p>
      `;
      weatherResult.style.animation = "fadeIn 1s ease forwards";
      weatherResult.style.opacity = 1;
    }, 300);
    
  } catch (error) {
    weatherResult.innerHTML = `<p style="color: red;">❌ Error: ${error.message}</p>`;
    weatherResult.style.opacity = 1;
  }
}

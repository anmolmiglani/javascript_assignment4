// script.js
document.addEventListener("DOMContentLoaded", function () {
  // Add student information dynamically
  const studentInfo = document.getElementById("student-info");
  studentInfo.textContent = "Student ID: 200534220 | Name: Anmol Miglani";

  // OpenWeatherMap API Key (Replace 'YOUR_API_KEY' with your actual API key)
  const apiKey = "979f51ba406cacb66e35ad07bd28b9c3";

  // Function to fetch weather data from OpenWeatherMap API
  function getWeather() {
    // Get the city name from the input field
    const cityInput = document.getElementById("cityInput");
    const city = cityInput.value;

    // Check if the city name is not empty
    if (city.trim() === "") {
      alert("Please enter a city name.");
      return;
    }

    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        // Display weather information with fading animations
        const weatherInfo = document.getElementById("weather-info");
        weatherInfo.innerHTML = `
                    <h2 class="animate__animated animate__fadeIn">${data.name}, ${data.sys.country}</h2>
                    <p class="animate__animated animate__fadeIn">Temperature: <span class="temp">${data.main.temp}</span>°C</p>
                    <p class="animate__animated animate__fadeIn">Weather: ${data.weather[0].description}</p>
                    <p class="animate__animated animate__fadeIn">Wind Speed: ${data.wind.speed} m/s</p>
                    <p class="animate__animated animate__fadeIn">Cloudiness: ${data.clouds.all}%</p>
                `;

        // Add cool animations for the temperature
        const temperature = document.querySelector(".temp");
        temperature.classList.add("animate__animated", "animate__fadeInUp");

        // Change temperature color dynamically based on its value
        const tempValue = parseFloat(data.main.temp);
        if (tempValue > 30) {
          temperature.style.color = "#e74c3c"; // Hot temperature, red color
        } else if (tempValue < 10) {
          temperature.style.color = "#3498db"; // Cold temperature, blue color
        } else {
          temperature.style.color = "#2ecc71"; // Moderate temperature, green color
        }
      })
      .catch((error) => console.error("Error fetching weather data:", error));
  }

  // Add event listener to the button
  const getWeatherButton = document.getElementById("getWeatherButton");
  getWeatherButton.addEventListener("click", getWeather);
});

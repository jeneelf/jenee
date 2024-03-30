function getWeather() {
  const apiKey = "0013d1727c79c04d63a754f1c51940b6";
  const city = document.getElementById("city").value;

  if (!city) {
    alert("Please enter a city");
    return;
  }

  const currentWeatherURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
  const forecastURL = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}`;

  fetch(currentWeatherURL)
    .then((response) => response.json())
    .then((data) => {
      displayWeather(data);
    })
    .catch((error) => {
      console.error("Error fetching current weather data:", error);
      alert("Error fetching current weather data. Try again.");
    });

  fetch(forecastURL)
    .then((response) => response.json())
    .then((data) => {
      displayHourlyForecast(data.list);
    })
    .catch((error) => {
      console.error("Error fetching hourly forecast data:", error);
      alert("Error fetching hourly forecast data. Try again.");
    });
}

function displayWeather(data) {
  const tempDivInfo = document.getElementById("temp-div");
  const weatherInfoDiv = document.getElementById("weather-info");
  const weatherIcon = document.getElementById("weather-icon");
  const hourlyForecastDiv = document.getElementById("hourly-forecast");

  // Clear previous content
  weatherInfoDiv.innerHTML = "";
  hourlyForecastDiv.innerHTML = "";
  tempDivInfo.innerHTML = "";

  if (data.cod === "404") {
    weatherInfoDiv.innerHTML = `<p>${data.message}</p>`;
  } else {
    const cityName = data.name;
    const temperature = Math.round(data.main.temp - 273.15);
    const description = data.weather[0].description;
    const iconCode = data.weather[0].icon;
    const iconURL = `https://openweathermap.org/img/wn/${iconCode}@4x.png`;

    const temperatureHTML = `<p>${temperature}°C</p>`;
    const weatherHTML = `<p>${cityName}</p><p>${description}</p>`;

    tempDivInfo.innerHTML = temperatureHTML;
    weatherInfoDiv.innerHTML = weatherHTML;
    weatherIcon.src = iconURL;
    weatherIcon.alt = description;

    showImage(temperature);

    document.getElementById("outfit-area").style.display = "flex"; // Show outfit area
  }
}

function displayHourlyForecast(hourlyData) {
  const hourlyForecastDiv = document.getElementById("hourly-forecast");
  const next24Hours = hourlyData.slice(0, 8);

  next24Hours.forEach((item) => {
    const dateTime = new Date(item.dt * 1000);
    const hour = dateTime.getHours();
    const temperature = Math.round(item.main.temp - 273.15);
    const iconCode = item.weather[0].icon;
    const iconURL = `https://openweathermap.org/img/wn/${iconCode}.png`;

    const hourlyItemHTML = `
          <div class="hourly-item">
            <span>${hour}:00</span>
            <img src="${iconURL}" alt="Hourly Weather Icon">
            <span>${temperature}°C</span>
          </div>`;
    hourlyForecastDiv.innerHTML += hourlyItemHTML;
  });
}

function showImage(temperature) {
  let imageSrc;
  if (temperature >= 0 && temperature <= 5) {
    imageSrc = "very-cold.jpg"; // Image for very cold temperature
  } else if (temperature > 5 && temperature <= 10) {
    imageSrc = "cold.jpg"; // Image for cold temperature
  } else if (temperature > 10 && temperature <= 15) {
    imageSrc = "moderate-cold.jpg"; // Image for moderate cold temperature
  } else if (temperature > 15 && temperature <= 20) {
    imageSrc = "moderate.jpg"; // Image for moderate temperature
  } else if (temperature > 20 && temperature <= 25) {
    imageSrc = "warm.jpg"; // Image for warm temperature
  } else {
    imageSrc = "hot.jpg"; // Image for hot temperature
  }
  const weatherIcon = document.getElementById("weather-icon");
  weatherIcon.style.display = "block";
  const outfitButtons = document.querySelectorAll(".outfit-button img");
  outfitButtons.forEach((img) => {
    img.src = imageSrc;
  });
}

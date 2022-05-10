// Format date

function formatDate(timestamp) {
  let date = new Date(timestamp);

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  let currentDate = date.getDate();
  let day = days[date.getDay()];
  let month = months[date.getMonth()];

  return `${day}, ${month} ${currentDate}`;
}

function formatTime(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  return `${hours}:${minutes}`;
}

function formatForecastDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[day];
}

function displayForecast(response) {
  let forecast = response.data.daily;

  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="col-12">`;
  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `<ul class="weather-forecast">
      <li class="forecast-day-wrapper">
              <div>
                <div>
                  <img src="https://raw.githubusercontent.com/niku153/Weather-application/main/media/${
                    forecastDay.weather[0].icon
                  }.svg" alt="" class="forecast-icons" />
                </div>
                <div class="forecast-day">${formatForecastDay(
                  forecastDay.dt
                )}</div>
              </div>
              <span class="temperature-range">
                <span class="temperature-maximum">${Math.round(
                  forecastDay.temp.max
                )}°</span>  
                <span class="temperature-minimum">${Math.round(
                  forecastDay.temp.min
                )}°</span>
              </span>
            </li>
  `;
    }
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  console.log(coordinates);
  let apiKey = "06bc256f164c93573001cb99d320c17d";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

// Display conditions for searched city
function displayTemperature(response) {
  let temperatureElement = document.querySelector("#current-temperature");
  let cityElement = document.querySelector("#current-city");
  let descriptionElement = document.querySelector("#weather-description");
  let windElement = document.querySelector("#wind");
  let rainfallElement = document.querySelector("#rainfall");
  let humidityElement = document.querySelector("#humidity");
  let sunriseElement = document.querySelector("#sunrise");
  let sunsetElement = document.querySelector("#sunset");
  let dateElement = document.querySelector("#current-date");
  let timeElement = document.querySelector("#current-time");
  let iconElement = document.querySelector("#current-condition-icon");

  celsiusTemperature = response.data.main.temp;

  temperatureElement.innerHTML = Math.round(celsiusTemperature);
  cityElement.innerHTML = `${response.data.name}, ${response.data.sys.country}`;
  descriptionElement.innerHTML = response.data.weather[0].main;
  windElement.innerHTML = `${Math.round(response.data.wind.speed)}km/h`;
  humidityElement.innerHTML = `${response.data.main.humidity}%`;
  sunriseElement.innerHTML = formatTime(response.data.sys.sunrise * 1000);
  sunsetElement.innerHTML = formatTime(response.data.sys.sunset * 1000);
  dateElement.innerHTML = formatDate(response.data.dt * 1000);
  timeElement.innerHTML = formatTime(response.data.dt * 1000);
  iconElement.setAttribute(
    "src",
    `https://raw.githubusercontent.com/niku153/Weather-application/main/media/${response.data.weather[0].icon}.svg`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);

  getForecast(response.data.coord);

  if (response.data.rain !== undefined) {
    rainfallElement.innerHTML = `${response.data.rain["1h"]}mm`;
  } else {
    rainfallElement.innerHTML = "0mm";
  }
}

// Retrieve data for searched city
function retrieveCityData(city) {
  let apiKey = "06bc256f164c93573001cb99d320c17d";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayTemperature);
}

function retrieveCityName(event) {
  event.preventDefault();
  let cityInputElement = document.querySelector("#search-input-box");
  retrieveCityData(cityInputElement.value);
}

let form = document.querySelector("#search-form");
form.addEventListener("submit", retrieveCityName);

// Get current location conditions
function getCurrentLocationTemperature(position) {
  let apiKey = "06bc256f164c93573001cb99d320c17d";
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
  axios.get(apiUrl).then(displayTemperature);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(getCurrentLocationTemperature);
}

let currentLocation = document.querySelector("#current-location-button");
currentLocation.addEventListener("click", getCurrentLocation);

// Convert to fahrenheit

function showFahrenheit(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#current-temperature");
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
  temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
}

let celsiusTemperature = null;

let fahrenheitLink = document.querySelector("#fahrenheit");
fahrenheitLink.addEventListener("click", showFahrenheit);

retrieveCityData("Perth");

// Convert to celsius

function showCelsius(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#current-temperature");
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
}

let celsiusLink = document.querySelector("#celsius");
celsiusLink.addEventListener("click", showCelsius);

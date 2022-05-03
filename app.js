//Challenge 1
//In your project, display the current date and time using JavaScript: Tuesday 16:00

/*let now = new Date();

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

let currentYear = now.getFullYear();
let currentDay = days[now.getDay()];
let currentMonth = months[now.getMonth()];
let currentDate = now.getDate();
let currentHour = now.getHours();
let currentMinutes = now.getMinutes();

let newDate = document.querySelector("#current-date");
newDate.innerHTML = `${currentDay}, ${currentDate} ${currentMonth} ${currentYear}`;

let newTime = document.querySelector("#current-time");
newTime.innerHTML = `${currentHour}:${currentMinutes}`;*/

//API + Geolocation JS
//In your project, when a user searches for a city (example: New York), it should display the name of the city on the result page and the current temperature of the city.

function displayTemperature(response) {
  console.log(response);
  let temperatureElement = document.querySelector("#current-temperature");
  let cityElement = document.querySelector("#current-city");
  let descriptionElement = document.querySelector("#weather-description");
  let windElement = document.querySelector("#wind");
  let rainfallElement = document.querySelector("#rainfall");
  let humidityElement = document.querySelector("#humidity");
  let sunriseElement = document.querySelector("#sunrise");
  let sunsetElement = document.querySelector("#sunset");
  //let dateElement = document.querySelector("current-date");
  let iconElement = document.querySelector("#current-condition-icon");

  celsiusTemperature = response.data.main.temp;

  temperatureElement.innerHTML = Math.round(celsiusTemperature);
  cityElement.innerHTML = `${response.data.name}, ${response.data.sys.country}`;
  descriptionElement.innerHTML = response.data.weather.main;
  windElement.innerHTML = Math.round(response.data.wind.speed);
  rainfallElement.innerHTML = `${response.data.rain["1h"]}mm`;
  humidityElement.innerHTML = response.data.main.humidity;
  sunriseElement.innerHTML = response.data.sys.sunrise * 1000;
  sunsetElement.innerHTML = response.data.sys.sunset * 1000;
  //dateElement.innerHTML = formatDate(response.data.dt * 1000);
  iconElement.setAttribute(
    "src",
    `https://raw.githubusercontent.com/niku153/Weather-application/main/media/${response.data.weather[0].icon}.svg`
  );
  icon.setAttribute("alt", response.data.weather[0].description);

  if ((rainfallElement = NaN || undefined || null)) {
    rainfallElement.innerHTML = "0mm";
  }
}

/*let temperature = Math.round(response.data.main.temp);
  temperatureElement.innerHTML = `${temperature}`;
  let newCity = response.data.name;
  let newCountryCode = response.data.sys.country;
  cityElement.innerHTML = `${newCity}, ${newCountryCode}`;
  console.log(response);*/

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

//Add a Current Location button. When clicking on it, it uses the Geolocation API to get your GPS coordinates and display and the city and current temperature using the OpenWeather API.

/*function getCurrentLocationTemperature(position) {
  let apiKey = "06bc256f164c93573001cb99d320c17d";
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
  axios.get(apiUrl).then(showTemperature);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(getCurrentLocationTemperature);
}

let currentLocation = document.querySelector("#current-location-button");
currentLocation.addEventListener("click", getCurrentLocation); */

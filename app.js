//Challenge 1
//In your project, display the current date and time using JavaScript: Tuesday 16:00

let now = new Date();

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
newTime.innerHTML = `${currentHour}:${currentMinutes}`;

//API + Geolocation JS
//In your project, when a user searches for a city (example: New York), it should display the name of the city on the result page and the current temperature of the city.

function showTemperature(response) {
  let temperature = Math.round(response.data.main.temp);
  let temperatureElement = document.querySelector("#current-temperature");
  temperatureElement.innerHTML = `${temperature}`;
  let newCity = response.data.name;
  let newCountryCode = response.data.sys.country;
  let cityElement = document.querySelector("#current-city");
  cityElement.innerHTML = `${newCity}, ${newCountryCode}`;
  console.log(response);
}

function searchCity(event) {
  event.preventDefault();
  let newCityInput = document.querySelector("#search-input-box");
  let apiKey = "06bc256f164c93573001cb99d320c17d";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${newCityInput.value}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTemperature);
}

let form = document.querySelector("#search-form");
form.addEventListener("submit", searchCity);

//Add a Current Location button. When clicking on it, it uses the Geolocation API to get your GPS coordinates and display and the city and current temperature using the OpenWeather API.

function getCurrentLocationTemperature(position) {
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
currentLocation.addEventListener("click", getCurrentLocation);

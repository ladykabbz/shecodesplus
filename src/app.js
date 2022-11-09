let now = new Date();
let weatherInput = document.querySelector("#main-weather");
let days = [
  "SUNDAY 🐈",
  "MONDAY🐈",
  "TUESDAY🐈",
  "WEDNESDAY🐈",
  "THURSDAY🐈",
  "FRIDAY🐈",
  "SATURDAY🐈",
];
let day = days[now.getDay()];
let hours = now.getHours();
let minutes = now.getMinutes();
weatherInput.innerHTML = `${day}<br>${hours}:${minutes}`;

//
//

function showTemperature(response) {
  let city = document.querySelector("h1");
  let temperature = document.querySelector("#temperature");
  city.innerHTML = response.data.name;
  temperature.innerHTML = `${Math.round(response.data.main.temp)}°C`;
}

function searchCity(city) {
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=f3009e4852fa0a079dab291dabf020c4`;
  axios.get(`${apiUrl}`).then(showTemperature);
}

function handleTemperature(e) {
  e.preventDefault();
  let searchInput = document.querySelector("#input");
  let city = `${searchInput.value}`;
  searchCity(city);
}

let form = document.querySelector("#location-input");
form.addEventListener("submit", handleTemperature);

let now = new Date();
let weatherInput = document.querySelector("#main-weather");
let days = [
  "SUNDAY ",
  "MONDAY",
  "TUESDAY",
  "WEDNESDAY",
  "THURSDAY",
  "FRIDAY",
  "SATURDAY",
];
let day = days[now.getDay()];
let hours = now.getHours();
let minutes = now.getMinutes();
weatherInput.innerHTML = `${day}`;

//
//
function displayForecast() {
  let forecastElement = document.querySelector("#forecast");

  let days = ["Thu", "Fri", "Sat", "Sun"];

  let forecastHTML = `<div class="row">`;
  days.forEach(function (day) {
    forecastHTML =
      forecastHTML +
      `
      <div class="col-2">
        <div class="weather-forecast-date">${day}</div>
        <img
          src="http://openweathermap.org/img/wn/50d@2x.png"
          alt=""
          width="42"
        />
        <div class="weather-forecast-temperatures">
          <span class="weather-forecast-temperature-max"> 18° </span>
          <span class="weather-forecast-temperature-min"> 12° </span>
        </div>
      </div>
  `;
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
  console.log(forecastHTML);
}
function getForecast(coordinates) {
  let apiKey = "f3009e4852fa0a079dab291dabf020c4";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

function showTemperature(response) {
  let city = document.querySelector("h1");
  let temperature = document.querySelector("#temperature");
  city.innerHTML = response.data.name;
  temperature.innerHTML = `${Math.round(response.data.main.temp)}°C`;
  let windElement = document.querySelector("#win");
  let humidityElement = document.querySelector("#hum");

  windElement.innerHTML = Math.round(response.data.wind.speed);
  humidityElement.innerHTML = response.data.main.humidity;

  getForecast(response.data.coord);
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

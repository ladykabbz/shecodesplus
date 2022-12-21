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
function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[day];
}
searchCity("Nairobi");
function displayForecast(response) {
  let forecast = response.data.daily;

  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row">`;
  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `
         
         <div class="row">
                    <div class="btn-group" role="group" aria-label="Basic outlined example">
       <button type="button" class="btn btn-outline-primary">
         <div class="col">

        <div class="weather-forecast-date">${formatDay(forecastDay.dt)}</div>
        <img
          src="http://openweathermap.org/img/wn/${
            forecastDay.weather[0].icon
          }@2x.png"
          alt=""
          width="42"
        />
        
        <div class="weather-forecast-temperatures">
          <span class="weather-forecast-temperature-max"> ${Math.round(
            forecastDay.temp.max
          )}°C </span>
          <span class="weather-forecast-temperature-min"> ${Math.round(
            forecastDay.temp.min
          )}°C </span>
          </button>
          </div>
        </div>
      </div>
  `;
    }
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
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

search("Nairobi");

function zero(i) {
  if (i < 10) {
    i = "0" + i;
  }
  return i;
}
function changeHeading2(userDay, userHour, userMin) {
  let change = document.querySelector("#date-time");
  change.innerHTML = userDay + " , " + userHour + ":" + userMin;
}
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

let dayNow = days[now.getDay()];
let time = zero(now.getHours());
let minutes = zero(now.getMinutes());
let dateTime = document.querySelector(
  "dateChange",
  changeHeading2(dayNow, time, minutes)
);

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return days[day];
}

function displayForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row">`;
  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `
      <div class="col-2">
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
          )}°</span>
          <span class="weather-forecast-temperature-min"> ${Math.round(
            forecastDay.temp.min
          )}° </span>
        </div>
      </div>
  `;
    }
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  console.log(coordinates);
  let apiKey = "8c48afa47a9a9c24f3500c7039d50aaa";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

function getTemp(response) {
  cTemp = response.data.main.temp;
  let cityName = document.querySelector("h1");
  cityName.innerHTML = response.data.name;
  let roundTemp = Math.round(response.data.main.temp);
  let changeTemp = document.querySelector("#temp-input");
  changeTemp.innerHTML = roundTemp;
  let changeHum = document.querySelector("#humidity-input");
  changeHum.innerHTML = response.data.main.humidity;
  let wind = document.querySelector("#wind-input");
  wind.innerHTML = response.data.wind.speed;
  let des = document.querySelector("#description");
  des.innerHTML = response.data.weather[0].description;

  let icon = document.querySelector("#cloud-icon");
  icon.setAttribute(
    "src",
    "https://openweathermap.org/img/wn/" +
      response.data.weather[0].icon +
      "@2x.png"
  );
  icon.setAttribute(
    "alt",
    "https://openweathermap.org/img/wn/" +
      response.data.weather[0].description +
      "@2x.png"
  );
  getForecast(response.data.coord);
}
function city(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#city-input");
  if (searchInput.value) {
    let apiKey = "722c38b8ba6b77e46ac2f3fa43642c17";
    let apiUrl =
      "https://api.openweathermap.org/data/2.5/weather?q=" +
      searchInput.value +
      "&appid=" +
      apiKey +
      "&units=metric";
    axios.get(apiUrl).then(getTemp);
  } else {
    alert("Type a city!");
  }
}
function getlocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(currentPosition);
}
function currentPosition(position) {
  let lat = position.coords.latitude;
  let long = position.coords.longitude;
  let apiKey = "722c38b8ba6b77e46ac2f3fa43642c17";
  let apiUrl =
    "https://api.openweathermap.org/data/2.5/weather?lat=" +
    lat +
    "&lon=" +
    long +
    "&appid=" +
    apiKey +
    "&units=metric";
  axios.get(apiUrl).then(getTemp);
}
function search(city) {
  let apiKey = "722c38b8ba6b77e46ac2f3fa43642c17";
  let apiUrl =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    city +
    "&appid=" +
    apiKey +
    "&units=metric";
  axios.get(apiUrl).then(getTemp);
}
function showCTemp(event) {
  event.preventDefault();
  let tempElement = document.querySelector("#temp-input");
  tempElement.innerHTML = Math.round(cTemp);
}
function showFTemp(event) {
  event.preventDefault();
  let tempElement = document.querySelector("#temp-input");
  //remove active class
  cLink.classList.remove("active");
  fLink.classList.add("active");
  let Ftepm = (cTemp * 9) / 5 + 32;
  tempElement.innerHTML = Math.round(Ftepm);
}
let cTemp = null;
let form = document.querySelector("#form-input");
form.addEventListener("submit", city);
let buttonWork = document.querySelector("button");
buttonWork.addEventListener("click", getlocation);
let fLink = document.querySelector("#deg-f");
fLink.addEventListener("click", showFTemp);
let cLink = document.querySelector("#deg-c");
cLink.addEventListener("click", showCTemp);
search("Allahabad");

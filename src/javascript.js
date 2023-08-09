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
function getTemp(response) {
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
let form = document.querySelector("#form-input");
form.addEventListener("submit", city);
let buttonWork = document.querySelector("button");
buttonWork.addEventListener("click", getlocation);

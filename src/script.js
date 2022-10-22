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

let currentTime = new Date();
let date = now.getDate();
let day = days[now.getDay()];
let month = months[now.getMonth()];
let hour = currentTime.getHours();
let minutes = currentTime.getMinutes();
{
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
}
let time = `${hour}:${minutes}`;

function formatDate(now) {
  return `${day}, <br/>${month} ${date}, ${time}`;
}
let updateH3 = document.querySelector("h3");
updateH3.innerHTML = `${formatDate(currentTime)}`;

// Show current position temperature & temp conversion

function weatherCondition(response) {
  let h1Temp = document.querySelector("#currentTemp");
  let currentCity = document.querySelector("#location");
  let yourLocation = response.data.name;
  let temperature = Math.round(response.data.main.temp);
  let cityHumidity = document.querySelector("#humidity");
  let cityWind = document.querySelector("#wind");
  let cityDescription = document.querySelector("#description");
  let weatherIcon = document.querySelector("#weather-icon");

  h1Temp.innerHTML = `${temperature}`;
  currentCity.innerHTML = `- ${yourLocation} -`;
  cityHumidity.innerHTML = "Humidity: " + response.data.main.humidity + "%";
  cityWind.innerHTML = "Wind speed: " + Math.round(response.data.wind.speed);
  cityDescription.innerHTML = response.data.weather[0].main;
  weatherIcon.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  weatherIcon.setAttribute("alt", response.data.weather[0].description);

  function convertToF(event) {
    event.preventDefault();
    let updateToFah = document.querySelector("#currentTemp");
    updateToFah.innerHTML = `${temperature}`;
  }

  function celsius(event) {
    event.preventDefault();
    let celsius = document.querySelector("#currentTemp");
    celsius.innerHTML = Math.round(((`${temperature}` - 32) * 5) / 9);
  }
  let buttonCel = document.querySelector("#celsius");
  let buttonFah = document.querySelector("#fahrenheit");

  buttonFah.addEventListener("click", convertToF);
  buttonCel.addEventListener("click", celsius);
}
// Search City & Temperature Input

function buttonSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#search-bar-form").value;

  searchCity(city);
}

function searchCity(city) {
  let units = "imperial";
  let apiKey = "8cac06f7ab6c10287cd06a316ff84a57";
  let apiEndPoint = `https://api.openweathermap.org/data/2.5/weather`;
  let apiUrl = `${apiEndPoint}?q=${city}&appid=${apiKey}&units=${units}`;

  axios.get(apiUrl).then(weatherCondition);
}

let buttonCity = document.querySelector("#submit-button");
buttonCity.addEventListener("click", buttonSubmit);

//Current Location
function showPosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let units = "imperial";
  let apiKey = "8cac06f7ab6c10287cd06a316ff84a57";
  let apiEndPoint = `https://api.openweathermap.org/data/2.5/weather`;
  let apiUrl = `${apiEndPoint}?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${units}`;

  axios.get(`${apiUrl}`).then(weatherCondition);
}

navigator.geolocation.getCurrentPosition(showPosition);

searchCity("Ketchikan");


let currentTime = new Date();
let days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
let hour = currentTime.getHours();
let minutes = currentTime.getMinutes();
let day = days[currentTime.getDay()];
let date = currentTime.getDate();
let month = currentTime.getMonth();
let year = currentTime.getFullYear();

let clock = document.querySelector("#time");
clock.innerHTML = `${hour}:${minutes}`;

let dayName = document.querySelector("#day");
dayName.innerHTML = day;

let currentDate = document.querySelector("#date");
currentDate.innerHTML = `${month + 1}/${date}/${year}`;



function showTemp(response){
  
  celsiusTemp = response.data.main.temp;
  
  document.querySelector("#city-name").innerHTML = response.data.name;
  document.querySelector(".condition").innerHTML = response.data.weather[0].description;
  document.querySelector(".temperature").innerHTML = Math.round(celsiusTemp) +"°";
  document.querySelector("#humidity").innerHTML = Math.round(response.data.main.humidity);
  document.querySelector("#wind-speed").innerHTML = Math.round(response.data.wind.speed);
  document.querySelector("#icon").setAttribute("src",`http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
  document.querySelector("#icon").setAttribute("alt", response.data.weather[0].description);

}

function search(city){
  let units = "metric";
  let apiKey = "bd5b4461863eddaa6ced0a0a67989e0a";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showTemp);
}

function handleSubmit(event){
  event.preventDefault();
  let city = document.querySelector("#search").value;
  search(city);
}

function currentCoords(position){
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let units = "metric";
  let apiKey = "bd5b4461863eddaa6ced0a0a67989e0a";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&APPID=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showTemp);
}

function currentPosition(event){
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(currentCoords);
}

function showFahrenheitTemp(event){
  event.preventDefault();
  let fahrenheitTemp = (celsiusTemp * 9)/ 5 + 32;
  document.querySelector(".temperature").innerHTML = `${Math.round(fahrenheitTemp)}°`;
}
function showCelsiusTemp(event){
  event.preventDefault();
  document.querySelector(".temperature").innerHTML = `${Math.round(celsiusTemp)}°`;
}

let celsiusTemp = null;

let searchCity = document.querySelector(".search-box").addEventListener("submit", handleSubmit);
document.querySelector(".current").addEventListener("click", currentPosition);

document.querySelector("#fahrenheit").addEventListener("click", showFahrenheitTemp);
document.querySelector("#celsius").addEventListener("click", showCelsiusTemp);


search("Milan");

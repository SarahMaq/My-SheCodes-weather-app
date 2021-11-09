
let currentTime = new Date();
let hour = currentTime.getHours();
let minutes = currentTime.getMinutes();
let days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
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

//make current location default?

function showTemp(response){
  document.querySelector("#city-name").innerHTML = response.data.name;
  document.querySelector(".weather").innerHTML = Math.round(response.data.main.temp) +"°";
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
let searchCity = document.querySelector(".search-box").addEventListener("submit", handleSubmit);

function currentCoords(position){
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  // console.log("workin?");
  let units = "metric";
  let apiKey = "bd5b4461863eddaa6ced0a0a67989e0a";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&APPID=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showTemp);
}

function currentPosition(event){
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(currentCoords);
}

document.querySelector(".current").addEventListener("click", currentPosition);

search("Milan");

//
// function tempDegreeF(){
//   let h1 = document.querySelector(".weather");
//   h1.innerHTML = "50°"; // change with search
// }

// function tempDegreeC(){
//   let h1 = document.querySelector(".weather");
//   h1.innerHTML = "20°"; // change with search
// }

// let tempF = document.querySelector("#fahrenheit");
// let tempC = document.querySelector("#celsius");

// tempF.addEventListener("click", tempDegreeF);
// tempC.addEventListener("click", tempDegreeC);

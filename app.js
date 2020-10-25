const menu = document.querySelector("nav");
const menuIcon = document.querySelector(".fa-bars");
const exitMenu = document.querySelector(".fa-angle-left");
const modeSwitch = document.querySelector(".switch");
const containerSwitch = document.querySelector(".container-switch");
const bkgdImage = document.querySelector("input[type=checkbox]");
const searchIcon = document.querySelector(".fa-search");
const search = document.querySelector("input[type=text]");
const body = document.querySelector("body");
const forecast = document.querySelector("#forecast");
const header = document.querySelector(".header");
const alertBox = document.querySelector(".alert-box");
const temperature = document.querySelector("#temperature");
const maxTemp = document.querySelector(".max-temp");
const minTemp = document.querySelector(".min-temp");
const tempDescription = document.querySelector(".temp-description");
const currentLocation = document.querySelector(".location");
// const icon = document.querySelector("#icon");
// const icon = new Skycons({ color: "green" });

menuIcon.addEventListener("click", () => {
  menu.classList.add("active-nav");
});

exitMenu.addEventListener("click", () => {
  menu.classList.remove("active-nav");
});

searchIcon.addEventListener("click", () => {
  search.classList.toggle("active-search");
});
search.addEventListener("blur", () => {
  search.classList.remove("active-search");
});

 onBackground();
containerSwitch.classList.add("inactive");
modeSwitch.classList.add("inactive");
let thereIsBkgd;

bkgdImage.addEventListener("click", () => {
  thereIsBkgd = bkgdImage.checked;
  if (!thereIsBkgd) {
    containerSwitch.classList.remove("inactive");
    modeSwitch.classList.remove("inactive");

    modeSwitch.addEventListener("click", () => {
      modeSwitch.classList.toggle("active-switch");
      modeSwitch.classList.contains("active-switch") ? dark() : light();
    });
  } else {
    onBackground();
    containerSwitch.classList.add("inactive");
    modeSwitch.classList.add("inactive");
  }
}); 



function onBackground() {
  body.style.background =
    'linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url("background/images (30).jpeg")';
  forecast.style.background = "inherit";
  header.style.background = "#0f0b465e";
  body.style.backgroundRepeat = "no-repeat";
  body.style.backgroundSize = "cover";
  body.style.color = "#fff";
  menu.style.color = "#000";
  search.style.borderBottom = "1px solid #fff";
  search.style.color = "#fff";
}

function dark() {
  body.style.background = "#000";
  body.style.color = "#fff";
  forecast.style.background = "inherit";
  header.style.background = "#111111";
  menu.style.color = "#fff";
  menu.style.background = "rgb(31, 31, 31)";
  search.style.borderBottom = "1px solid #fff";
  search.style.color = "#fff";
}

function light() {
  forecast.style.background = "inherit";
  body.style.background = "#fff";
  body.style.color = "#000";
  menu.style.color = "#000";
  header.style.background = "#ccccccb7";
  menu.style.background = "#cccccc";
  search.style.color = "#000";
  search.style.borderBottom = "1px solid #000";
}

// Data fetching
const weather = {};

weather.temperature = {
  unit: "celsius",
};

const KELVIN = 273;
let tempMax;
let tempMin;

const apiKey = "2ef5416b6e4369b6f731e854324a26be";
if ("geolocation" in navigator) {
  navigator.geolocation.getCurrentPosition(setPosition, showError);
} else {
  alertBox.style.visibility = "visible";
  alertBox.innerHTML = "<p>Browser doesn't Support Geolocation</p>";
}

// SET USER'S POSITION
function setPosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;

  getWeather(latitude, longitude);
}

// SHOW ERROR WHEN THERE IS AN ISSUE WITH GEOLOCATION SERVICE
function showError(error) {
  alertBox.style.visibility = "visible";
  alertBox.innerHTML = `<p> ${error.message} </p>`;
}

// GET WEATHER FROM API PROVIDER
function getWeather(latitude, longitude) {
  let api = `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}`;

  fetch(api)
    .then((response) => {
      let data = response.json();
      console.log(data);
      return data;
    })
    .then((data) => {
      weather.temperature.value = Math.floor(data.main.temp - KELVIN);
      tempMax = Math.floor(data.main.temp_max - KELVIN);
      tempMin = Math.floor(data.main.temp_min - KELVIN);
      weather.description = data.weather[0].description;
      weather.iconId = data.weather[0].icon;
      weather.city = data.name;
      weather.country = data.sys.country;
    })
    .then(() => {
      displayWeather();
    });
}
function displayWeather() {
  temperature.innerHTML = `${weather.temperature.value}°<span>C</span>`;
  //   icon.innerHTML = `<img src="icons/${weather.iconId}.png"/>`;
  tempDescription.innerHTML = weather.description;
  currentLocation.innerHTML = `${weather.city}, ${weather.country}`;
  maxTemp.innerHTML = `${tempMax}°<span>C</span>`;
  minTemp.innerHTML = `${tempMin}°<span>C</span>`;
  icon.set("icon", icon.PARTLY_CLOUDY_DAY);
  icon.play();
}

// let clickin = menu.addEventListener('click', (e)=>console.log(e))
// if(!clickin){
//   console.log('out')
// }

document.addEventListener("click", (e) => {
  let scrnWidth = e.clientX;
  if (scrnWidth > 252 && menu.classList.contains("active-nav")) {
    menu.classList.remove("active-nav");
  }
});

import { apiKey as weather_provider } from "./dateTime.js";
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
const icon = document.querySelector("#icon");
const shareOn = document.querySelector(".floatBtn");
const share = document.querySelector(".dev-gp-2");

let timeout;
share.addEventListener("mouseover", (e) => {
  shareOn.classList.add("share-on");
  shareOn.style.display = "flex";
  if ((shareOn.style.transfrom = "translate(-1%)")) {
    timeout = setTimeout(() => {
      shareOn.style.zIndex = 1;
    }, 100);
  }
});

shareOn.addEventListener("mouseleave", () => {
  shareOn.style.zIndex = -1;
  clearTimeout(timeout);

  setTimeout(() => {
    shareOn.classList.remove("share-on");
  }, 80);

  setTimeout(() => {
    shareOn.style.display = "none";
  }, 400);
});
menuIcon.addEventListener("click", () => {
  menu.classList.add("active-nav");
});

exitMenu.addEventListener("click", () => {
  menu.classList.remove("active-nav");
  if ((share.classList.contains = "share-on")) {
    shareOn.style.display = "none";
    shareOn.classList.remove("share-on");
  }
});

searchIcon.addEventListener("click", () => {
  let openSearch = search.classList.toggle("active-search");

  let screenWidth = window.matchMedia("(max-width:500px)");
  function hideName(screenWidth) {
    if (screenWidth.matches && openSearch) {
      document.querySelector("#name").style.visibility = "hidden";
    } else {
      document.querySelector("#name").style.visibility = "visible";
    }
  }
  screenWidth.addListener(hideName);
  hideName(screenWidth);
});
search.addEventListener("blur", () => {
  let closeSearch = search.classList.remove("active-search");

  let screenWidth = window.matchMedia("(max-width:500px)");
  function hideName(screenWidth) {
    if (screenWidth.matches && closeSearch) {
      document.querySelector("#name").style.visibility = "hidden";
    } else {
      document.querySelector("#name").style.visibility = "visible";
    }
  }
  screenWidth.addListener(hideName);
  hideName(screenWidth);
});

// onBackground();
// containerSwitch.classList.add("inactive");
// modeSwitch.classList.add("inactive");

// Data fetching
const weather = {};

weather.temperature = {
  unit: "celsius",
};

const KELVIN = 273;
let tempMax;
let tempMin;

if ("geolocation" in navigator) {
  navigator.geolocation.getCurrentPosition(setPosition, showError);
} else {
  alertBox.style.visibility = "visible";
  alertBox.innerHTML =
    "<p>Browser doesn't Support Geolocation, please upgrade your browser and try again</p>";
}

// SET USER'S POSITION
function setPosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;

  getWeather(latitude, longitude);
}

// SHOW ERROR WHEN THERE IS AN ISSUE WITH GEOLOCATION SERVICE
function showError(error) {
  let noInternet = "You're not connected";
  alertBox.style.visibility = "visible";

  if (error.code == 2) {
    alertBox.innerHTML = `<p> ${noInternet} </p>`;
  } else {
    alertBox.innerHTML = `<p> ${error.message} </p>`;
  }
}

// GET WEATHER FROM API PROVIDER
function getWeather(latitude, longitude) {
  let api = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${weather_provider}`;

  fetch(api)
    .then((response) => {
      let data = response.json();
      return data;
    })
    .then((data) => {
      configData(data);
    })
    .then(() => {
      displayWeather();
    });
}

function configData(data) {
  weather.temperature.value = Math.floor(data.main.temp - KELVIN);
  tempMax = Math.floor(data.main.temp_max - KELVIN);
  tempMin = Math.floor(data.main.temp_min - KELVIN);
  weather.description = data.weather[0].description;
  weather.iconId = data.weather[0].icon;
  weather.city = data.name;
  weather.country = data.sys.country;
  weather.wind = data.wind.speed;
  weather.pressure = data.main.pressure;
  weather.feelsLike = Math.floor(data.main.feels_like - KELVIN);
  weather.seaLevel = data.main.sea_level;
  weather.humidity = data.main.humidity;
}

function displayWeather() {
  let fahUnit = document.querySelector("#fahrinheit");
  setInterval(() => {
    if (fahUnit.checked) {
      let toFahrinheit = Math.floor((9 / 5) * weather.temperature.value + 35);
      temperature.innerHTML = `${toFahrinheit}<span id="deg">°</span><span class="SmallC">F</span>`;
    } else {
      temperature.innerHTML = `${weather.temperature.value}<span id="deg">°</span><span class="SmallC">C</span>`;
    }
  }, 100);

  icon.innerHTML = `<img src="SVGs/${weather.iconId}.svg" />`;
  tempDescription.innerHTML = weather.description;
  currentLocation.innerHTML = `${weather.city}, ${weather.country}`;
  maxTemp.innerHTML = `${tempMax}°<span>C</span>`;
  minTemp.innerHTML = `${tempMin}°<span>C</span>`;
  //

  document.querySelector("#wind").innerHTML = `${weather.wind} mph`;
  document.querySelector("#feels-like").innerHTML = ` ${weather.feelsLike}°`;
  document.querySelector("#pressure").innerHTML = `${weather.pressure}`;
  document.querySelector("#humidity").innerHTML = `${weather.humidity}%`;
  if (weather.seaLevel == undefined || weather.seaLevel == null) {
    let seaLevel = document.querySelector("#seaLevel");
    seaLevel.style.display = "none";
  } else {
    seaLevel.style.display = "flex";
    document.querySelector("#sea-level").innerHTML = `${weather.seaLevel}`;
  }

  //background Settings [onBckground]
  (() => {
    let syncBackgrondWithWeatherConditon = setInterval(() => {
      if (
        weather.description == "few clouds" ||
        weather.description == "scattered clouds" ||
        weather.description == "broken clouds" ||
        weather.description == "overcast clouds"
      ) {
        body.style.background =
          'linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url("background/cloudy.jpg")';
        body.style.backgroundRepeat = "no-repeat";
        body.style.backgroundSize = "cover";
      } else if (
        weather.description == "shower rain" ||
        weather.description == "rain" ||
        weather.description == "light rain" ||
        weather.description == "moderate rain" ||
        weather.description == "heavy intensity rain"
      ) {
        body.style.background =
          'linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url("background/rainny1.png")';
        body.style.backgroundRepeat = "no-repeat";
        body.style.backgroundSize = "cover";
      } else if (weather.description == "thunder storm") {
        body.style.background =
          'linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url("background/thunder storm.jpg")';
        body.style.backgroundRepeat = "no-repeat";
        body.style.backgroundSize = "cover";
      } else if (weather.description == "clear sky") {
        body.style.background =
          'linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url("background/clear sky1.jpg")';
        body.style.backgroundRepeat = "no-repeat";
        body.style.backgroundSize = "cover";
      } else {
        body.style.background =
          'linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url("background/images (30).jpeg")';
        body.style.backgroundRepeat = "no-repeat";
        body.style.backgroundSize = "cover";
      }

      forecast.style.background = "inherit";
      header.style.background = "#02001d6c";
      body.style.color = "#fff";
      menu.style.color = "#000";
      search.style.borderBottom = "1px solid #fff";
      search.style.color = "#fff";
      shareOn.style.background = "#cccccc";
    });

    function dark() {
      body.style.background = "#000";
      body.style.color = "#fff";
      forecast.style.background = "inherit";
      header.style.background = "#111111";
      menu.style.color = "#fff";
      menu.style.background = "rgb(31, 31, 31)";
      shareOn.style.background = "rgb(31, 31, 31)";
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
      shareOn.style.background = "#cccccc";
      search.style.color = "#000";
      search.style.borderBottom = "1px solid #000";
    }

    //BACKGROUND SWITCH
    setInterval(() => {
      let thereIsBkgd = bkgdImage.checked;
      if (!thereIsBkgd) {
        clearTimeout(syncBackgrondWithWeatherConditon);
        containerSwitch.classList.remove("inactive");
        modeSwitch.classList.remove("inactive");

        modeSwitch.addEventListener("click", () => {
          modeSwitch.classList.toggle("active-switch");
          modeSwitch.classList.contains("active-switch") ? dark() : light();
        });
      } else {
        modeSwitch.removeEventListener("click", () => {
          modeSwitch.classList.toggle("");
          // modeSwitch.classList.contains("active-switch") ? dark() : light();
        });
        containerSwitch.classList.add("inactive");
        modeSwitch.classList.add("inactive");
      }
    }, 500);
  })();
}

//search location
const form = document.querySelector("form");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  let inputVal = search.value;
  let errors;
  const weatherProvider = `https://api.openweathermap.org/data/2.5/weather?q=${inputVal}&appid=${weather_provider}`;
  fetch(weatherProvider)
    .then((res) => {
      if (!res.ok) {
        return (errors = `This City "${inputVal}" doesn't exist`);
      }
      alertBox.style.visibility = "hidden";
      return res.json();
    })
    .then((data) => {
      // errors = "";
      configData(data);
    })
    .then(() => {
      displayWeather();
    })

    .catch((err) => {
      alertBox.style.visibility = "visible";
      alertBox.innerHTML = `<p style="font-size:1em">${errors}</p>`;
    });
});

document.addEventListener("click", (e) => {
  let scrnWidth = e.clientX;
  if (scrnWidth > 252 && menu.classList.contains("active-nav")) {
    menu.classList.remove("active-nav");
    if ((share.classList.contains = "share-on")) {
      shareOn.style.display = "none";
      shareOn.classList.remove("share-on");
    }
  }
});

window.shareToFb = () => {
  return window.open(
    "https://www.facebook.com/sharer/sharer.php?u=https://ubtechweather.netlify.app/index.html",
    "_blank"
  );
};
window.tweetToTw = () => {
  return window.open("https://twitter.com/intent/tweet", "_blank");
};


setInterval(() => {
    let screenHeight = window.matchMedia("(max-height:550px)");
  if (screenHeight.matches) {
    let onreducedVh = window.innerHeight;
    let vhHeightbody = body.clientHeight;
    let x = vhHeightbody - onreducedVh;
    document.body.style.marginBottom = `${x}px`;
  }
},1000);

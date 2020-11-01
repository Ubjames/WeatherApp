//API key
const apiKey = "2ef5416b6e4369b6f731e854324a26be";
export {apiKey}

//date
(() => {
  const datePane = document.querySelector(".date");
  let today = new Date();
  let week = today.getDay();
  let day = today.getDate();
  let mth = today.getMonth();
  let year = today.getFullYear();
 

  var weekday = "";
  switch (week) {
    case 0:
      weekday = "Sun";
      break;
    case 1:
      weekday = "Mon";
      break;
    case 2:
      weekday = "Tue";
      break;
    case 3:
      weekday = "Wed";
      break;
    case 4:
      weekday = "Thur";
      break;
    case 5:
      weekday = "Fri";
      break;
    case 6:
      weekday = "Sat";
      break;
  }
  datePane.innerHTML = `${weekday} ${day}/${mth}/${year}`;
})();

/////////////////////////////////////////////////////////////////

//TIME
function showTime() {
  let date = new Date();
  let hours = date.getHours(); //0-23
  let minutes = date.getMinutes(); //0-59
  let seconds = date.getSeconds(); //0-59

  hours = addZero(hours);
  minutes = addZero(minutes);
  seconds = addZero(seconds);

  let time = document.querySelector(".time");
  time.innerHTML = `${hours}:${minutes}:${seconds}`;

  let timeformat = document.querySelectorAll("input[type=radio]");
  let _12hrs = timeformat[2].checked;
  let _24hrs = timeformat[3].checked;

  if (_12hrs) {
    let formatHours = convertFormat(hours);
    hours = checkTime(hours);
    time.innerHTML = `${hours}:${minutes}:${seconds} ${formatHours}`;
  } else {
    //    let formatHours = convertFormat(hours);
    //       hours = checkTime(hours);
    return time;
  }
}

function convertFormat(time) {
  let format = "AM";
  if (time >= 12) {
    format = "PM";
  }

  return format;
}

function checkTime(time) {
  if (time > 12) {
    time = time - 12;
  }
  if (time === 0) {
    time = 12;
  }
  return time;
}

function addZero(time) {
  if (time < 10) {
    time = "0" + time;
  }
  return time;
}

showTime();
setInterval(showTime, 1000);

//loader

window.addEventListener("load", ()=>{
  let loader = document.querySelector(".overlay");
  document.body.removeChild(loader);
})

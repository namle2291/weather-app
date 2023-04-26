function fetchData(key) {
  if (!key) {
    key = "Can Tho";
  }
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${key}&APPID=2078afdcca8d790c583320660dc90ffb&lang=vi`
  )
    .then((res) => res.json())
    .then((data) => {
      if (data) {
        showData(data);
      }
    })
    .catch((err) => {
      console.log(err);
    });
}

function showData(data) {
  const description = document.querySelector(".description");
  const temperature = document.querySelector(".temperature span");
  const himudity = document.querySelector(".himudity h5");
  const visibility = document.querySelector(".visibility h5");
  const cloud = document.querySelector(".cloud h5");
  const name = document.querySelector(".name");
  const time = document.querySelector(".time");
  const err = document.querySelector(".err");

  setInterval(() => {
    time.innerHTML = getTime();
  }, 1000);

  if (data.cod != 404) {
    name.innerHTML = data.name + ", " + data.sys.country;
    description.innerHTML = data.weather[0].description;
    himudity.innerHTML = data.main.humidity + "(%)";
    cloud.innerHTML = data.clouds.all + "(%)";
    visibility.innerHTML = data.visibility + "(m)";
    temperature.innerHTML = Math.floor(data.main.temp_max - 273.15);
    err.style.display = "none";
  } else {
    err.style.display = "block";
  }
}

function getTime() {
  let date = new Date();
  let hours = date.getHours();
  let minutes = date.getMinutes();
  let seconds = date.getSeconds();
  let day = date.getDate();
  let month = date.getMonth() + 1;
  let year = date.getFullYear();

  return (
    formatNumber(hours) +
    ":" +
    formatNumber(minutes) +
    ":" +
    formatNumber(seconds) +
    " - " +
    formatNumber(day) +
    "/" +
    formatNumber(month) +
    "/" +
    year
  );
}

function handleSearch() {
  const search = document.querySelector(".search input");
  search.addEventListener("change", (e) => {
    fetchData(e.target.value);
  });
}

function formatNumber(num) {
  if (num < 10) {
    return "0" + num;
  }
  return num;
}

fetchData();
handleSearch();

let userCity = "";

async function changeCity() {
  userCity = document.getElementById("name").value;
  getLocation();
}

async function getLocation() {
  /*let userIp = await (await fetch("https://api.ipify.org?format=json")).json();
  let userLocation = await (await fetch(`http://ip-api.com/json/${userIp.ip}`)).json();

  let userCity = userLocation.city;*/

  if (userCity != "") {
    let weather = await (
      await fetch(`https://weather.nicolorancan.com/api/weather?city=${userCity}`)
    ).json();

    document.getElementById("city-res").innerText = `${
      weather.city.country
    }, ${weather.city.name[0].toUpperCase()}${weather.city.name.substr(1)}`;

    for (let i = 0; i < weather.list.length; i++) {
      console.log(weather.list[i].weather[0].main);

      let card = document.createElement("div");
      card.className = "w-card";

      let cover = document.createElement("img");
      cover.src = `https://openweathermap.org/img/wn/${weather.list[i].weather[0].icon}@2x.png`;

      let title = document.createElement("h2");
      title.innerText = weather.list[i].weather[0].main;

      let description = document.createElement("p");
      description.innerText = weather.list[i].weather[0].description;

      let date = new Date(weather.list[i].dt_txt);

      let circl = document.createElement("div");
      circl.className = "circle";

      let absDate = document.createElement("p");
      let builder = "";

      if (date.getHours() < 10) builder += "0" + date.getHours() + ":00";
      else builder += date.getHours() + ":00";
      if (date.getDate() < 10) builder += " - 0" + date.getDate();
      else builder += " - " + date.getDate();

      if (date.getMonth() < 10) builder += "/0" + (Number(date.getMonth()) + 1);
      else builder += "/" + (Number(date.getMonth()) + 1);

      absDate.innerText = builder;
      absDate.className = "date";

      circl.appendChild(absDate);

      card.appendChild(circl);
      card.appendChild(cover);
      card.appendChild(title);
      card.appendChild(description);

      document.getElementById("carosel").appendChild(card);
    }
  }
}

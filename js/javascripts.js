(function () {
  let URL =
    "https://api.open-meteo.com/v1/forecast?latitude=-2.14&longitude=-79.97&hourly=temperature_2m&timezone=auto";
  fetch(URL)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      let timezone = data["timezone"]
      let timezoneHTML = document.getElementById("timezone0")
      timezoneHTML.textContent = timezone;
      
      let elevation = data["elevation"]
      let elevationHTML = document.getElementById("elevacion")
      elevationHTML.textContent = elevation;
     
      let latitude= data["latitude"]
      let latitudeHTML = document.getElementById("Latitud")
      latitudeHTML.textContent = latitude;
      
      let longitude= data["longitude"]
      let longitudeHTML = document.getElementById("Longitud")
      longitudeHTML.textContent = longitude;
      
    })
    .catch(console.error);
})();

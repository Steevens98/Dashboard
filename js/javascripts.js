let plot = (data) => { 
  const ctx = document.getElementById('myChart');
  const dataset = {
    labels: data.hourly.time, /* ETIQUETA DE DATOS */
    datasets: [{
        label: 'Temperatura semanal', /* ETIQUETA DEL GRÁFICO */
        data: data.hourly.temperature_2m, /* ARREGLO DE DATOS */
        fill: false,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1
    }]
  };
  const config = {
    type: 'line',
    data: dataset,
  };
  const chart = new Chart(ctx, config)
}

let uv = (data) => { 
  const ctx = document.getElementById('mybarChart');
  const dataset = {
    labels: data.daily.uv_index_max,/* ETIQUETA DE DATOS */
    datasets: [{
        label: 'Temperatura semanal', /* ETIQUETA DEL GRÁFICO */
        data: data.daily.uv_index_max, /* ARREGLO DE DATOS */
        fill: false,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1
    }]
  };
  const config = {
    type: 'bar',
    data: dataset,
  };
  const chart = new Chart(ctx, config)
}

let load = (data) => { 
  console.log(data);
  let timezone = data["timezone"]
  let timezoneHTML = document.getElementById("Timezone")
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
  
  plot(data)
  uv(data)
  
  
 }

 let loadInocar = () => {
      let URL_proxy = 'https://cors-anywhere.herokuapp.com/'
      let URL = URL_proxy +'https://www.inocar.mil.ec/mareas/consultan.php';
    fetch(URL)
     	.then(response => response.text())
        .then(data => {
           const parser = new DOMParser();
           const xml = parser.parseFromString(data,"text/html");
           let contenedorMareas = xml.getElementsByClassName('container-fluid')[0];
           let contenedorHTML = document.getElementById('table-container');
           contenedorHTML.innerHTML = contenedorMareas.innerHTML;
           console.log(xml);
      })
      .catch(console.error);
  }



(function () {
  let meteo = localStorage.getItem('meteo');
  if(meteo == null) {
  let URL =
    "https://api.open-meteo.com/v1/forecast?latitude=-2.14&longitude=-79.97&hourly=temperature_2m&daily=uv_index_max&current_weather=true&timezone=auto";
  fetch(URL)
    .then((response) => response.json())
    .then((data) => {
      load(data)
      localStorage.setItem("meteo", JSON.stringify(data))
      
    })
    .catch(console.error);
  }else{
    load(JSON.parse(meteo))
  }
  loadInocar();
})();

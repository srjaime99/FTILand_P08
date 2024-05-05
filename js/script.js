function cargarCabecera() {
    const header = document.createElement('div');
    header.id = 'header';
    header.innerHTML = `
        <div id="header">
            <!-- Sección Izquierda del Menú -->
            <div id="menu-left">
                <!-- <a href="index.html"><img src="logo.png" alt="FTILand Logo"></a> -->
            </div>
            <!-- Sección Centro del Menú -->
            <div id="menu-center"><h1>FTILand</h1></div>
            <!-- Sección Derecha del Menú -->
            <div id="menu-right">
                <ul>
                    <li><a href="atracciones.html">Atracciones</a></li>
                    <li><a href="espectaculos.html">Espectáculos</a></li>
                    <li><a href="favoritos.html">Favoritos</a></li>
                    <li><a href="sugerencias.html">Sugerencias</a></li>
                    <!-- Cambiar más adelante por botones, probablemente. 
                    Mirar si se puede bloquear enlace de la página actual.
                    Si no, añadirlo a cada página quitando cada una. -->
                </ul>
            </div>
        </div>
    `;
    document.body.insertBefore(header, document.body.firstChild);
}

function loadJSON(callback) {
    const xhr = new XMLHttpRequest();
    xhr.overrideMimeType("application/json");
    xhr.open("GET", "lib/ej3.json", true);
    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4 && xhr.status === 200) {
        callback(JSON.parse(xhr.responseText));
      }
    };
    xhr.send(null);
  }
  
  function loadXML() {
    const request = new XMLHttpRequest();
    try {
      request.open("GET", "lib/data.xml", false); // Sync!
      request.send()
      if (request.status === 200) {
      return request.responseXML;
  
      } else {
        const p = document.createElement("p");
        p.innerHTML = "Error: No ha funcionado el backend";
        document.body.append(p);
      }
    } catch (error) {
      console.log("Error leyendo el XML!");
      return null;
    } 
  }
  
  function init() {
    loadXML(); // Carga el XML
  
    loadJSON(function(data) {
      const tiemposEspera = data;
  
      const xmlData = loadXML();
      const table = document.getElementById("tabla");
  
      if (!!xmlData) {
        const areas = xmlData.getElementsByTagName("area"); 
        for (let area of areas) {
          const atracciones = area.getElementsByTagName("atraccion");
          for (let atraccion of atracciones) {
            const row = document.createElement("tr");
  
            const id = document.createElement("td");
            id.innerHTML = atraccion.getElementsByTagName("id")[0].textContent;
            row.append(id);
  
            const nombre = document.createElement("td");
            nombre.innerHTML = atraccion.getElementsByTagName("nombre_com")[0].textContent;
            row.append(nombre);
  
            const tipo = document.createElement("td");
            tipo.innerHTML = atraccion.getElementsByTagName("tipo")[0].textContent;
            row.append(tipo);
  
            const atraccionID = atraccion.getElementsByTagName("id")[0].textContent;
            const tiempoEspera = tiemposEspera[atraccionID];
  
            if (tiempoEspera) {
              const espera = document.createElement("td");
              espera.innerHTML = tiempoEspera[0] + " minutos";
              row.append(espera);
            } else {
              const espera = document.createElement("td");
              espera.innerHTML = "No disponible";
              row.append(espera);
            }
  
            // Botón para marcar como favorito
            const favorito = document.createElement("td");
            const boton = document.createElement("button");
            boton.textContent = "Marcar como favorito";
            boton.dataset.favorito = "false"; // Estado inicial
            boton.addEventListener("click", function() {
              if (boton.dataset.favorito === "false") {
                boton.dataset.favorito = "true";
                boton.style.backgroundColor = "green";
                boton.textContent = "Favorito";
              } else {
                boton.dataset.favorito = "false";
                boton.style.backgroundColor = "red";
                boton.textContent = "Marcar como favorito";
              }
            });
            favorito.append(boton);
            row.append(favorito);
  
            table.append(row);
          }
        }
      }
    });
  }


// Llama a la función para cargar la cabecera cuando se cargue la página
window.onload = cargarCabecera;
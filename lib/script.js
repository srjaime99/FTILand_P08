/*function cargarCabecera() {
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
}*/

function loadJSON() {
  const request = new XMLHttpRequest();
  try {
    request.open("GET", "lib/ej3.json", false); // Sync!
    request.send();
    if (request.status === 200) {
      return JSON.parse(request.responseText);
    } else {
      console.error("Error: No se pudo cargar el archivo JSON");
      return null;
    }
  } catch (error) {
    console.error("Error: No se pudo cargar el archivo JSON");
    return null;
  }
}

function loadXML() {
  const request = new XMLHttpRequest();
  try {
    request.open("GET", "lib/ej2.xml", false); // Sync!
    request.send();
    if (request.status === 200) {
      return request.responseXML;
    } else {
      console.error("Error: No se pudo cargar el archivo XML");
      return null;
    }
  } catch (error) {
    console.error("Error: No se pudo cargar el archivo XML");
    return null;
  }
}

function init() {
  // Datos JSON
  const jsonData = loadJSON();

  // Datos XML
  const xmlData = loadXML();

  if (!!jsonData && !!xmlData) {
    const areas = xmlData.querySelectorAll('area');
    for (let area of areas) {
      const nombreArea = area.querySelector('nombre').textContent;
      const atracciones = area.querySelectorAll('atraccion');

      // Crear tabla para el área actual
      const table = document.createElement("table");

      // Crear título para el área
      const titleRow = document.createElement("tr");
      const titleCell = document.createElement("th");
      titleCell.setAttribute("colspan", "5"); // Span de 5 columnas
      titleCell.textContent = nombreArea;
      titleRow.appendChild(titleCell);
      table.appendChild(titleRow);

      // Agregar titulares de columna
      const headerRow = document.createElement("tr");
      const headers = ["ID", "Nombre", "Tipo", "Tiempo de espera", "Favorito"];
      for (let headerText of headers) {
        const headerCell = document.createElement("th");
        headerCell.textContent = headerText;
        headerRow.appendChild(headerCell);
      }
      table.appendChild(headerRow);

      // Agregar filas de atracciones
      for (let atraccion of atracciones) {
        const id = atraccion.querySelector('id').textContent;
        const nombreCom = atraccion.querySelector('nombre_com').textContent;
        const tipo = atraccion.querySelector('tipo').textContent;
        let espera = 0;

        // Verificamos si el ID de la atracción existe en el JSON
        if (jsonData.hasOwnProperty(id)) {
          espera = jsonData[id][0];
        }

        const row = document.createElement("tr");

        const idCell = document.createElement("td");
        const idButton = document.createElement("button");
        idButton.textContent = id;
        idButton.style.backgroundColor = "white"; // Color por defecto

        idButton.addEventListener("click", function() {
          mostrarInfoAtraccion(id)
        });

        idCell.appendChild(idButton);
        row.appendChild(idCell);
/*
        const idCell = document.createElement("td");
        const idLink = document.createElement("a");
        idLink.textContent = id;
        idLink.href = `atraccion.html?id=${id}`; // Redirigir a atraccion.html con el ID de la atracción como parámetro
        idCell.appendChild(idLink);
*/
        const nombreComCell = document.createElement("td");
        nombreComCell.textContent = nombreCom;
        row.appendChild(nombreComCell);

        const tipoCell = document.createElement("td");
        tipoCell.textContent = tipo;
        row.appendChild(tipoCell);

        const esperaCell = document.createElement("td");
        esperaCell.textContent = espera;
        row.appendChild(esperaCell);

        const favoritoCell = document.createElement("td");
        const favoritoButton = document.createElement("button");
        favoritoButton.textContent = "Favorito";
        favoritoButton.style.backgroundColor = "red"; // Color por defecto
        favoritoButton.setAttribute("data-favorito", "false"); // Por defecto no es favorito

        favoritoButton.addEventListener("click", function() {
          const isFavorito = favoritoButton.getAttribute("data-favorito") === "true";
          if (isFavorito) {
            favoritoButton.style.backgroundColor = "red";
            favoritoButton.setAttribute("data-favorito", "false");
          } else {
            favoritoButton.style.backgroundColor = "green";
            favoritoButton.setAttribute("data-favorito", "true");
          }
        });

        favoritoCell.appendChild(favoritoButton);
        row.appendChild(favoritoCell);

        table.appendChild(row);
      }

      // Agregar tabla al documento
      document.getElementById("main").appendChild(table);
    }
  }
}

// Al seleccionar en atracciones el id de una atraccion, esta funcion se encarga de mostrar toda la info disponible de esta
function mostrarInfoAtraccion(atraccionElegida){
  // Datos JSON
  const jsonData = loadJSON();
  
  // Datos XML
  const xmlData = loadXML();

  // Comprueba que no haya habido errores de apertura
  if (!!jsonData && !!xmlData) {
    const areas = xmlData.querySelectorAll('area');

    for (let area of areas) {
      const atracciones = area.querySelectorAll('atraccion');

      for (let atraccion of atracciones) {
        const id = atraccion.querySelector('id').textContent;

        // Una vez encuentra la atraccion seleccionada extrae su información y crea un string para mostrarla
        if(id === atraccionElegida){
          const nombreCom = atraccion.querySelector('nombre_com').textContent;
          const estado = atraccion.querySelector('estado').textContent;
          const alt_min = atraccion.querySelector('alt_min').textContent;
          const alt_max = atraccion.querySelector('alt_max').textContent;
          const tipo = atraccion.querySelector('tipo').textContent;
          const nivel = atraccion.querySelector('nivel').textContent;
          const expres = atraccion.querySelector('expres').textContent;
          const ult_revis = atraccion.querySelector('ult_revis').textContent;
          
          // Los caracteres raros son para que no se mueva todo al cambiar la atraccion seleccionada
          let infoAtraccion = "឵឵឵ ឵឵឵឵឵ ឵឵឵឵឵ ឵឵឵឵឵ ឵឵឵឵឵ ឵឵឵឵឵ ឵឵឵឵឵ ឵឵឵឵឵ ឵឵឵឵឵ ឵឵឵឵឵ ឵឵឵឵឵ ឵឵឵឵឵ ឵឵឵឵឵ ឵឵឵឵឵ ឵឵឵឵឵ ឵឵឵឵឵ ឵឵឵឵឵ ឵឵឵឵឵ ឵឵឵឵឵ ឵឵឵឵឵ ឵឵឵឵឵ ឵឵឵឵឵ ឵឵឵឵឵឵឵឵ ឵឵឵឵឵ ឵឵឵឵឵ ឵឵឵឵឵ ឵឵ ឵឵឵឵឵ ឵឵឵឵឵ ឵឵឵឵឵ ឵឵឵឵឵ ឵឵឵឵឵ ឵឵឵឵឵ ឵឵឵឵឵ ឵឵឵឵឵ ឵឵឵឵឵ ឵឵឵឵឵ ឵឵឵឵឵ ឵឵឵឵឵ ឵឵឵឵឵ ឵឵឵឵឵ ឵឵឵឵឵ ឵឵឵឵឵ ឵឵឵឵឵ ឵឵឵឵឵ ឵឵឵឵឵ ឵឵឵឵឵ ឵឵឵឵឵ ឵឵឵឵឵ ឵឵឵឵឵ ឵឵឵឵឵ ឵឵឵឵឵ ឵឵឵឵឵ ឵឵឵឵឵ ឵឵឵឵឵ ឵឵឵឵឵ ឵឵឵឵឵ ឵឵឵឵឵ ឵឵឵឵឵ ឵឵឵឵឵ ឵឵឵឵឵ ឵឵឵឵឵ ឵឵឵឵឵ ឵឵឵឵឵ ឵឵឵឵឵ ឵឵឵឵឵ ឵឵឵឵឵ ឵឵឵឵឵ ឵឵឵឵឵ ឵឵឵឵឵ ឵឵឵឵឵ ឵឵឵឵឵ ឵឵឵឵឵ ឵឵឵឵឵ ឵឵឵឵឵ ឵឵឵឵឵ ឵឵឵឵឵ ឵឵឵឵឵ ឵឵"  +
          `\nNombre de la atraccion: ${nombreCom}` +
          `\nEstado: ${estado === "OP" ? "Operativa" : estado === "CE" ? "Cerrada" : "En obras"}` +
          `\nAltura minima: ${alt_min < 0.1 ? "No hay minimo" : alt_min + "m"}` +
          `\nAltura máxima: ${alt_max < 0.1 ? "No hay máximo" : alt_max + "m"}` +
          `\nTipo de atracción: ${tipo}` +
          `\nNivel: ${nivel}` +
          `\nTiene express: ${expres}` +
          `\nFecha de la ultima revisión: ${ult_revis}`;
          document.getElementById("main-right").innerText = infoAtraccion;
        }
      }
    }
  }
}

async function llamarAPI() {
  var url = "https://samuelencinas.dev/shows_parque/P08";
  
  const response = await fetch(url);
  const data = await response.json();

  /*fetch(url)
      .then(function(response) {
          if (!response.ok) {
              throw new Error('Error al hacer la solicitud. Código de estado: ' + response.status);
          }
          return response.json();
      })
      .then(function(data) {
          console.log(data); // Aquí obtienes los datos de la respuesta en formato JSON
      })
      .catch(function(error) {
          console.error('Error:', error);
      });*/
}


// Llama a la función para cargar la cabecera cuando se cargue la página
//window.onload = cargarCabecera;


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
      titleCell.setAttribute("colspan", "5");
      titleCell.textContent = nombreArea;
      titleRow.appendChild(titleCell);
      table.appendChild(titleRow);

      // Agregar titulares de columna
      const headerRow = document.createElement("tr");
      const headers = ["Nombre", "Tipo", "Tiempo de espera", "Tiempo de espera express", "Favorito"];
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
        const expres = atraccion.querySelector('expres').textContent;
        let espera = "";
        let esperaExpress = "";

        // Verificamos si el ID de la atracción existe en el JSON
        if (jsonData.hasOwnProperty(id)) {
          espera = jsonData[id][0];
          if (expres == "No"){
            esperaExpress = "No disponible";
          }else{
            esperaExpress = jsonData[id][1];
          }
        } else {
          espera = "Elemento no disponible";
          esperaExpress ="Elemento no disponible";
        }

        const row = document.createElement("tr");

        const nombreComCell = document.createElement("td");
        const nombreButton = document.createElement("button");
        nombreButton.textContent = nombreCom;
        nombreButton.style.backgroundColor = "white"; // Color por defecto

        nombreButton.addEventListener("click", function() {
          mostrarInfoAtraccion(jsonData, xmlData, id)
        });

        nombreComCell.appendChild(nombreButton);
        row.appendChild(nombreComCell);

        const tipoCell = document.createElement("td");
        tipoCell.textContent = tipo;
        row.appendChild(tipoCell);

        const esperaCell = document.createElement("td");
        esperaCell.textContent = espera;
        row.appendChild(esperaCell);

        const esperaExpressCell = document.createElement("td");
        esperaExpressCell.textContent = esperaExpress;
        row.appendChild(esperaExpressCell);

        const favoritoCell = document.createElement("td");
        const favoritoButton = document.createElement("button");
        favoritoButton.textContent = "Favorito";
        if(verEstadoFav(id)){
          favoritoButton.style.backgroundColor = "green";
        }else{
          favoritoButton.style.backgroundColor = "red";
        }

        favoritoButton.addEventListener("click", function() {
          if (verEstadoFav(id)) {
            favoritoButton.style.backgroundColor = "red";
            localStorage.setItem(id, false);
          } else {
            favoritoButton.style.backgroundColor = "green";
            localStorage.setItem(id, true);
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
function mostrarInfoAtraccion(jsonData, xmlData, atraccionElegida){
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
          //const ult_revis = atraccion.querySelector('ult_revis').textContent;
          
          // Los caracteres raros son para que no se mueva todo al cambiar la atraccion seleccionada
          let huecos = "឵឵឵ ឵឵឵឵឵ ឵឵឵឵឵ ឵឵឵឵឵ ឵឵឵឵឵ ឵឵឵឵឵ ឵឵឵឵឵ ឵឵឵឵឵ ឵឵឵឵឵ ឵឵឵឵឵ ឵឵឵឵឵ ឵឵឵឵឵ ឵឵឵឵឵ ឵឵឵឵឵ ឵឵឵឵឵ ឵឵឵឵឵ ឵឵឵឵឵ ឵឵឵឵឵ ឵឵឵឵឵ ឵឵឵឵឵ ឵឵឵឵឵ ឵឵឵឵឵ ឵឵឵឵឵឵឵឵ ឵឵឵឵឵ ឵឵឵឵឵ ឵឵឵឵឵ ឵឵ ឵឵឵឵឵ ឵឵឵឵឵ ឵឵឵឵឵ ឵឵឵឵឵ ឵឵឵឵឵ ឵឵឵឵឵ ឵឵឵឵឵ ឵឵឵឵឵ ឵឵឵឵឵ ឵឵឵឵឵ ឵឵឵឵឵ ឵឵឵឵឵ ឵឵឵឵឵ ឵឵឵឵឵ ឵឵឵឵឵ ឵឵឵឵឵ ឵឵឵឵឵ ឵឵឵឵឵ ឵឵឵឵឵ ឵឵឵឵឵ ឵឵឵឵឵ ឵឵឵឵឵ ឵឵឵឵឵ ឵឵឵឵឵ ឵឵឵឵឵ ឵឵឵឵឵ ឵឵឵឵឵ ឵឵឵឵឵ ឵឵឵឵឵ ឵឵឵឵឵ ឵឵឵឵឵ ឵឵឵឵឵ ឵឵឵឵឵ ឵឵឵឵឵ ឵឵឵឵឵ ឵឵឵឵឵ ឵឵឵឵឵ ឵឵឵឵឵ ឵឵឵឵឵ ឵឵឵឵឵ ឵឵឵឵឵ ឵឵឵឵឵ ឵឵឵឵឵ ឵឵឵឵឵ ឵឵឵឵឵ ឵឵឵឵឵ ឵឵឵឵឵ ឵឵឵឵឵ ឵឵឵឵឵ ឵឵឵឵឵ ឵឵឵឵឵ ឵឵"
          let infoAtraccion = 
          `\nNombre de la atraccion: ${nombreCom}
          \nEstado: ${estado === "OP" ? "Operativa" : estado === "CE" ? "Cerrada" : "En obras"}
          \nAltura minima: ${alt_min < 0.1 ? "No hay minimo" : alt_min + "m"}
          \nAltura máxima: ${alt_max < 0.1 ? "No hay máximo" : alt_max + "m"}
          \nTipo de atracción: ${tipo}
          \nNivel: ${nivel}
          \nTiene express: ${expres}`;
          document.getElementById("main-right").innerText = infoAtraccion;
        }
      }
    }
  }
}

// Llama a la función para cargar la cabecera cuando se cargue la página
//window.onload = cargarCabecera;
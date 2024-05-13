function mostrarFavoritos(){
    const xmlData = loadXML();
    const jsonData = loadJSON();
    let hayAlgunFav = false;

    if(!!jsonData && !!xmlData){
        const areas = xmlData.querySelectorAll('area');
        // Crear tabla para el área actual
        const table = document.createElement("table");

        // Agregar titulares de columna
        const headerRow = document.createElement("tr");
        const headers = ["Area", "Nombre", "Tipo", "Tiempo de espera"];
        for (let headerText of headers) {
            const headerCell = document.createElement("th");
            headerCell.textContent = headerText;
            headerRow.appendChild(headerCell);
        }
        table.appendChild(headerRow);

        for (let area of areas) {
            const nombreArea = area.querySelector('nombre').textContent;
            const atracciones = area.querySelectorAll('atraccion');

            // Agregar filas de atracciones
            for (let atraccion of atracciones) {
                const id = atraccion.querySelector('id').textContent;
                if(verEstadoFav(id)){
                    hayAlgunFav = true;
                    const nombreCom = atraccion.querySelector('nombre_com').textContent;
                    const tipo = atraccion.querySelector('tipo').textContent;
                    let espera = 0;

                    // Verificamos si el ID de la atracción existe en el JSON
                    if (jsonData.hasOwnProperty(id)) {
                        espera = jsonData[id][0];
                    } else {
                        espera = "Elemento no disponible";
                    }

                    const row = document.createElement("tr");

                    const areaCell = document.createElement("td");
                    areaCell.textContent = nombreArea;
                    row.appendChild(areaCell);

                    const nombreComCell = document.createElement("td");
                    nombreComCell.textContent = nombreCom;
                    row.appendChild(nombreComCell);

                    const tipoCell = document.createElement("td");
                    tipoCell.textContent = tipo;
                    row.appendChild(tipoCell);

                    const esperaCell = document.createElement("td");
                    esperaCell.textContent = espera;
                    row.appendChild(esperaCell);

                    /*const botonEliminarCell = document.createElement("td");
                    const eliminarButton = document.createElement("button");
                    eliminarButton.textContent = "Eliminar";
                    eliminarButton.style.backgroundColor = "white";
                    eliminarButton.addEventListener("click", function() {
                        localStorage.setItem(id, false);
                        mostrarFavoritos();
                    });
                    botonEliminarCell.appendChild(eliminarButton);
                    row.appendChild(botonEliminarCell);*/

                    table.appendChild(row);
                }
            }
        }
        if(hayAlgunFav){
            console.log("xd")
            document.getElementById("main").appendChild(table);
        }else{
            console.log("jamon")
            document.getElementById("main").innerText = "No has seleccionado ninguna atracción como favorita";
        }
    } else {
        document.getElementById("main").innerText = "Se ha producido un error al cargar el xml"
    }
}
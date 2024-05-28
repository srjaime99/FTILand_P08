document.addEventListener('DOMContentLoaded', (event) => {
    const jsonData = loadJSON();
    const xmlData = loadXML();
    cargarContenido(jsonData, xmlData)
  });

function cargarContenido(jsonData, xmlData){
    if (!!jsonData && !!xmlData) {
        const areas = xmlData.querySelectorAll('area');
        const areasContainer = document.getElementById('areas');
        
        areas.forEach(area => {
            areasContainer.appendChild(crearArea(area, jsonData));
        });
    }
}

function crearArea(area, jsonData){
    const nombreArea = area.querySelector('nombre').textContent;
    const atracciones = area.querySelectorAll('atraccion');
    
    const areaDiv = document.createElement('div');
    areaDiv.classList.add('cardGrande', 'mb-3');

    const areaHeader = document.createElement('div');
    areaHeader.classList.add('card-header', 'd-flex', 'justify-content-center');
    areaHeader.textContent = nombreArea;

    const areaBody = document.createElement('div');
    areaBody.classList.add('card-body');

    const rowDiv = document.createElement('div');
    rowDiv.classList.add('row');

    atracciones.forEach(atraccion => {
        rowDiv.appendChild(crearAtraccion(atraccion, jsonData));
    });

    areaBody.appendChild(rowDiv);
    areaDiv.appendChild(areaHeader);
    areaDiv.appendChild(areaBody);
    return areaDiv;
}

function crearAtraccion(atraccion, jsonData){
    const id = atraccion.querySelector('id').textContent;
    const nombreCom = atraccion.querySelector('nombre_com').textContent;
    const tipo = atraccion.querySelector('tipo').textContent;
    const estado = atraccion.querySelector('estado').textContent;
    const expres = atraccion.querySelector('expres').textContent;

    // Verificamos si el ID de la atracción existe en el JSON
    if (jsonData.hasOwnProperty(id)) {
        espera = jsonData[id][0] + "'";
        if (expres == "No"){
            esperaExpress = "No disponible";
        }else{
            esperaExpress = jsonData[id][1] + "'";
        }
    } else {
        espera = "Elemento no disponible";
        esperaExpress ="Elemento no disponible";
    }

    const atraccionDiv = document.createElement('div');
    atraccionDiv.classList.add('col-md-6', 'mb-2');

    atraccionDiv.innerHTML = `
        <div class="card h-100">
            <div class="card-body">
                <h5 class="card-title">${nombreCom}</h5>
                <p class="card-text"><strong>Tipo:</strong> ${tipo}</p>
                <p class="card-text"><strong>Espera:</strong> ${espera}</p>
                <p class="card-text"><strong>Espera Express:</strong> ${esperaExpress}</p>
            </div>
        </div>
    `;
    
    if (estado === "OP"){
        const favoriteIcon = document.createElement('i');

        favoriteIcon.classList.add('fa-heart', 'favorite-icon');
        if (verEstadoFav(id)) {
            favoriteIcon.classList.add('fas');
            favoriteIcon.classList.remove('far');
        } else {
            favoriteIcon.classList.add('far');
            favoriteIcon.classList.remove('fas');
        }

        favoriteIcon.addEventListener("click", function() {
            if (verEstadoFav(id)) {
                favoriteIcon.classList.remove('fas');
                favoriteIcon.classList.add('far');
                localStorage.setItem(id, 'false');
            } else {
                favoriteIcon.classList.remove('far');
                favoriteIcon.classList.add('fas');
                localStorage.setItem(id, 'true');
            }
        });

        atraccionDiv.querySelector('.card').appendChild(favoriteIcon);
    }else if(estado === "OB"){
        const textoObras = document.createElement('td');
        textoObras.textContent = "Atraccion en obras";
        textoObras.classList.add('texto-icon');
        atraccionDiv.querySelector('.card').appendChild(textoObras);
    }else{
        const textoNoDisponible = document.createElement('td');
        textoNoDisponible.textContent = "Atraccion cerrada";
        textoNoDisponible.classList.add('texto-icon');
        atraccionDiv.querySelector('.card').appendChild(textoNoDisponible);
    }
    
    return(atraccionDiv);
}

// Función para verificar el estado de favorito
function verEstadoFav(id) {
    return localStorage.getItem(id) === 'true';
}


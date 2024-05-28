document.addEventListener('DOMContentLoaded', (event) => {
    const jsonData = loadJSON();
    const xmlData = loadXML();
    cargarContenidoFavoritos(jsonData, xmlData)
  });

function cargarContenidoFavoritos(jsonData, xmlData){
    if (!!jsonData && !!xmlData) {
        const areas = xmlData.querySelectorAll('area');
        const areasContainer = document.getElementById('areas');
        
        areas.forEach(area => {
            console.log(crearAreaFavs(area, jsonData))
            hayFav = crearAreaFavs(area, jsonData)
            if(hayFav){
                areasContainer.appendChild(crearAreaFavs(area, jsonData));
            }
        });
    }
}

function crearAreaFavs(area, jsonData){
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

    let hayFavs = false
    atracciones.forEach(atraccion => {
        const id = atraccion.querySelector('id').textContent;
        if(verEstadoFav(id)){
            rowDiv.appendChild(crearAtraccionDetallada(atraccion, jsonData));
            hayFavs = true
        }
    });

    if(hayFavs){
        areaBody.appendChild(rowDiv);
        areaDiv.appendChild(areaHeader);
        areaDiv.appendChild(areaBody);
        return areaDiv;
    }else{
        return false;
    }
}

function crearAtraccionDetallada(atraccion, jsonData){
    const id = atraccion.querySelector('id').textContent;
    const nombreCom = atraccion.querySelector('nombre_com').textContent;
    const tipo = atraccion.querySelector('tipo').textContent;
    const estado = atraccion.querySelector('estado').textContent;
    const expres = atraccion.querySelector('expres').textContent;
    let altMin = atraccion.querySelector('alt_min').textContent;
    let altMax = atraccion.querySelector('alt_max').textContent;
    const nivel = atraccion.querySelector('nivel').textContent;

    altMin = altMin === "" ? altMin : "No hay minimo"
    altMax = altMax === "" ? altMax : "No hay máximo"

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
                <p class="card-text"><strong>Altura minima:</strong> ${altMin}</p>
                <p class="card-text"><strong>Altura máxima:</strong> ${altMax}</p>
                <p class="card-text"><strong>Nivel:</strong> ${nivel}</p>
                <p class="card-text"><strong>Espera:</strong> ${espera}</p>
                <p class="card-text"><strong>Espera Express:</strong> ${esperaExpress}</p>
            </div>
        </div>
    `;
    
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
    
    return(atraccionDiv);
}

// Función para verificar el estado de favorito
function verEstadoFav(id) {
    return localStorage.getItem(id) === 'true';
}


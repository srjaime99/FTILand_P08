function loadJSON() {
    const request = new XMLHttpRequest();
    try {
        request.open("GET", "data/ej3.json", false); // Sync!
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
        request.open("GET", "data/ej2.xml", false); // Sync!
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

function cambiarIDaNombreArea(id){
    id = id.substring(0, 3);
    if(id === "PLA"){
        return("Plaza Mayor")
    }else if(id === "TFW"){
        return("The Far West")
    }else if(id === "PIR"){
        return("Territorio Pirata")
    }else if(id === "CCL"){
        return("Cool Children Land")
    }else if(id === "FUT"){
        return("Calle Futura")
    }else{
        return("Algo ha salido mal")
    }
}

function verEstadoFav(id){
    if(localStorage.getItem(id) === null){
        localStorage.setItem(id, false);
        return false;
    }else if(localStorage.getItem(id) === "true"){
        return true;
    }else{
        return false;
    }
}
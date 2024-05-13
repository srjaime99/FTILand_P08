async function llamarAPI() {
    var url = "https://samuelencinas.dev/shows_parque/P08";
    
    const response = await fetch(url);
    const data = await response.json();
    return(data)
}

function solicitarInfo(){
    // Llamar a llamarAPI() y manejar la promesa resultante
    llamarAPI().then(data => {
        mostrarEspectaculos(data)
    }).catch(error => {
        // Manejar errores en caso de que la llamada a la API falle
        document.getElementById("main").innerText = "Error al llamar a la API, por favor vuelva a intentarlo\nSi el problema persiste contacte con soporte";
        console.error("Error al llamar a la API:", error);
    });
}

function mostrarEspectaculos(infoEspectaculos){
    document.getElementById("fecha").innerText = `Fecha: ${infoEspectaculos.date}\n\n`;

    // Aqui crear los botones y los liseners

    // Boton 0: por areas (default)
    const areasButton = document.createElement("button");
    areasButton.textContent = "Areas por separado";
    areasButton.style.backgroundColor = "white";
    areasButton.addEventListener("click", function() {
        ordenarShows(infoEspectaculos.shows, 0);
    });
    document.getElementById("botonesOrdenar").appendChild(areasButton);

    // Boton 1: solo si no han ocurrido todavia
    const tiempoButton = document.createElement("button");
    tiempoButton.textContent = "Quitar los pasados";
    tiempoButton.style.backgroundColor = "white";
    tiempoButton.addEventListener("click", function() {
        ordenarShows(infoEspectaculos.shows, 1);
    });
    document.getElementById("botonesOrdenar").appendChild(tiempoButton);

    // Boton 2: ordenados por horas
    const porHorasButton = document.createElement("button");
    porHorasButton.textContent = "Por horas";
    porHorasButton.style.backgroundColor = "white";
    porHorasButton.addEventListener("click", function() {
        ordenarShows(infoEspectaculos.shows, 2);
    });
    document.getElementById("botonesOrdenar").appendChild(porHorasButton);

    // Default
    ordenarShows(infoEspectaculos.shows, 0);
}

function ordenarShows(shows, modo){
    texto = "";
    switch(modo){
        case 0: // Muestra los shows por areas
            shows.forEach(show => {
                Object.keys(show).forEach(category => {
                    if (show[category].length > 0) {
                        show[category].forEach(item => {
                            if(item.hours.length !== 0){
                                texto += `\nArea: ${cambiarIDaNombreArea(category)}\nNombre: ${item.name}\nHoras: ${item.hours.join(", ")}\n`;
                            }
                        });
                    }
                });
            });
        break;

        case 1: // Solo si no han ocurrido todavia
            const ahora = new Date();
            const minutosActuales = ahora.getMinutes() + ahora.getHours()*60;
            shows.forEach(show => {
                Object.keys(show).forEach(category => {
                    if (show[category].length > 0){
                        show[category].forEach(item => {
                            if(item.hours.length !== 0){
                                horas = [];
                                item.hours.forEach(hora => {
                                    if(minutosActuales < parseInt(hora.substring(0, 2))*60 + parseInt(hora.substring(4, 6))){
                                        horas.push(hora);
                                    }
                                })
                                if(horas.length > 0){
                                    texto += `\nArea: ${cambiarIDaNombreArea(category)}\nNombre: ${item.name}\nHoras: ${horas.join(", ")}\n`;
                                }
                            }
                        });
                    }
                });
            });
        break;

        case 2: // Ordenados por horas
            let arrayEspectaculos = [];
            shows.forEach(show => {
                Object.keys(show).forEach(category => {
                    if (show[category].length > 0){
                        show[category].forEach(item => {
                            if(item.hours.length !== 0){
                                item.hours.forEach(hora => {
                                    arrayEspectaculos.push(`Area: ${cambiarIDaNombreArea(category)}\tNombre: ${item.name}\tHora: ${hora}`)
                                })
                            }
                        })
                    }
                });
            });
            let arrayEspectaculos2 = [];
            arrayEspectaculos.forEach(espectaculo => {
                let hora = parseInt(espectaculo.slice(-5, -3))*60 + parseInt(espectaculo.slice(-2));
                arrayEspectaculos2.push(`${hacerDe4cifras(hora.toString())}` + espectaculo);
            });
            arrayEspectaculos2.sort();
            arrayEspectaculos2.forEach(espectaculo => {
                texto += espectaculo.slice(4) + "\n";
            });
        break;
        default:
            texto = "Algo ha salido mal";
    }
    document.getElementById("main").innerText = texto;
}

function hacerDe4cifras(num){
    return(num.length > 3 ? num : hacerDe4cifras("0" + num))
}

solicitarInfo();
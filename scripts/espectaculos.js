async function llamarAPI() {
    var url = "https://samuelencinas.dev/shows_parque/P08";
    
    const timeoutPromise = new Promise((_, reject) => {
        setTimeout(() => reject(new Error("Timeout")), 5000);
    });

    try {
        const response = await Promise.race([fetch(url), timeoutPromise]);
        const data = await response.json();
        return data;
    } catch (error) {
        throw error;
    }
}

function solicitarInfo() {
    llamarAPI().then(data => {
        mostrarEspectaculos(data);
    }).catch(error => {
        if (error.message === "Timeout") {
            document.getElementById("main").innerText = "Parece que el servidor esta tardando en responder, vuelva a intentarlo";
        } else {
            document.getElementById("main").innerText = "Error al llamar a la API, por favor vuelva a intentarlo\nSi el problema persiste contacte con soporte";
        }
        console.error("Error al llamar a la API: ", error);
    });
}

function mostrarEspectaculos(infoEspectaculos) {
    const divBotones = document.getElementById("botonesOrdenar");

    const botones = [
        { text: "Espectaculos", mode: 0 },
        { text: "Esconder espectaculos que ya han ocurrido", mode: 1 },
        { text: "Ordenar por horas", mode: 2 }
    ];

    botones.forEach(buttonInfo => {
        const button = document.createElement("button");
        button.className = "btn btn-primary m-2";
        button.textContent = buttonInfo.text;
        button.addEventListener("click", function() {
            ordenarShows(infoEspectaculos.shows, buttonInfo.mode);
        });
        divBotones.appendChild(button);
    });

    ordenarShows(infoEspectaculos.shows, 0);
}

function ordenarShows(shows, modo) {
    const mainContainer = document.getElementById("main");

    let content = "";
    let index = 0;

    switch (modo) {
        case 0:
            content += '<div class="row">';

            shows.forEach(show => {
                Object.keys(show).forEach(category => {
                    if (show[category].length > 0) {
                        show[category].forEach(item => {
                            if (item.hours.length !== 0) {
                                content += crearTarjeta(category, item.name, item.hours.join(", "));
                                index += 1;
                                // Agregar una nueva fila cada dos elementos
                                if (index % 2 === 0) {
                                    content += '</div><div class="row">';
                                }
                            }
                        });
                    }
                });
            });

            // Cerrar la última fila si no es divisible exactamente por dos
            if (index % 2 !== 0) {
                content += '</div>';
            }
        break;
        case 1:
            const ahora = new Date();
            const minutosActuales = ahora.getMinutes() + ahora.getHours() * 60;
            content += '<div class="row">';

            shows.forEach(show => {
                Object.keys(show).forEach(category => {
                    if (show[category].length > 0) {
                        show[category].forEach(item => {
                            if (item.hours.length !== 0) {
                                let horas = item.hours.filter(hora => {
                                    return minutosActuales < parseInt(hora.substring(0, 2)) * 60 + parseInt(hora.substring(3, 5));
                                });
                                if (horas.length > 0) {
                                    content += crearTarjeta(category, item.name, horas.join(", "));
                                    index += 1;
                                    // Agregar una nueva fila cada dos elementos
                                    if (index % 2 === 0) {
                                        content += '</div><div class="row">';
                                    }
                                }
                            }
                        });
                    }
                });
            });

            if (index % 2 !== 0) {
                content += '</div>';
            }
        break;
        case 2:
            let arrayEspectaculos = [];
            content += '<div class="row">';

            shows.forEach(show => {
                Object.keys(show).forEach(category => {
                    if (show[category].length > 0) {
                        show[category].forEach(item => {
                            if (item.hours.length !== 0) {
                                item.hours.forEach(hora => {
                                    arrayEspectaculos.push({ category, name: item.name, hour: hora });
                                });
                            }
                        });
                    }
                });
            });

            arrayEspectaculos.sort((a, b) => {
                let aTime = parseInt(a.hour.substring(0, 2)) * 60 + parseInt(a.hour.substring(3, 5));
                let bTime = parseInt(b.hour.substring(0, 2)) * 60 + parseInt(b.hour.substring(3, 5));
                return aTime - bTime;
            });

            arrayEspectaculos.forEach((espectaculo) => {
                content += crearTarjeta(espectaculo.category, espectaculo.name, espectaculo.hour);
                // Agregar una fila nueva cada dos elementos
                index += 1
                if (index % 2 === 0) {
                    content += '</div><div class="row">';
                }
            });

            // Cerrar la última fila si no es divisible exactamente por dos
            if (arrayEspectaculos.length % 2 !== 0) {
                content += '</div>';
            }
            break;
        default:
            content = "<div class='alert alert-danger'>Algo ha salido mal</div>";
    }

    mainContainer.innerHTML = `
        <div class="row">
            <div class="col">
                ${content}
            </div>
        </div>
    `;
}

function crearTarjeta(category, name, hours) {
    return `
        <div class="card custom-card">
            <div class="card-body text-center">
                <h5 class="card-title">${name}</h5>
                <p class="card-text"><strong>Area:</strong> ${cambiarIDaNombreArea(category)}</p>
                <p class="card-text"><strong>Horas:</strong> ${hours}</p>
            </div>
        </div>
    `;
}

solicitarInfo();

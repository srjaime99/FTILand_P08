function cargarCabecera() {
    const header = document.createElement('div');
    header.id = 'header';
    header.innerHTML = `
        <div id="header">
            <!-- Sección Izquierda del Menú -->
            <style>
                #menu-left img {
                    width: 100px;
                    height: auto;
                }
            </style>
            <div id="menu-left">
                <a href="index.html"><img src="logo.png" alt="FTILand Logo"></a>
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

// Llama a la función para cargar la cabecera cuando se cargue la página
window.onload = cargarCabecera;
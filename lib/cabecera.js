// JavaScript para hacer que el menú sea responsive
const menuRight = document.getElementById('menu-right');
const menuBtn = document.getElementById('menu-btn');

menuBtn.addEventListener('click', toggleMenu);

function toggleMenu() {
    if (menuRight.style.display === 'none' || menuRight.style.display === '') {
        menuRight.style.display = 'block';
    } else {
        menuRight.style.display = 'none';
    }
}

// Cerrar el menú cuando se haga clic fuera de él
document.addEventListener('click', function(event) {
    const isClickInsideMenu = menuRight.contains(event.target) || menuBtn.contains(event.target);
    
    if (!isClickInsideMenu) {
        menuRight.style.display = 'none';
    }
});

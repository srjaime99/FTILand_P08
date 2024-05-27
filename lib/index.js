var map = L.map('map').setView([40.943175, -4.113473], 16);
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

var marker = L.marker([40.943175796357444, -4.113473768069194]).addTo(map);
marker.bindPopup("<b>FTILand</b><p>40.9431757, -4.1134737</p>").openPopup();

var polygon = L.polygon([
    [40.94243830384512, -4.114222063234903],
    [40.942665221690724, -4.114399089026786],
    [40.943135263309884, -4.114356173684704],
    [40.94352020869998, -4.113830460726682],
    [40.94386260560705, -4.11293996737148],
    [40.94344727185352, -4.112505449532903]
]).addTo(map);
//40.943175796357444, -4.113473768069194

const startScript = () => {
    if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(position => {
            console.log(`Latitud: ${position.coords.latitude}\nLongitud: ${position.coords.longitude}`);
            paintMap(position.coords.latitude, position.coords.longitude)
             // let datos = `<h1>Aquí estás!</h1>
            // <p>Lat: ${position.coords.latitude.toFixed(4)}</p>
            // <p>Long: ${position.coords.longitude.toFixed(4)}</p>`
            // document.body.innerHTML = datos;
        });
    } else {
      console.warn("Tu navegador no soporta Geolocalización!! ");
    }

}

const paintMap = (latitude, longitude) => {
    const MAPBOX_API = 'https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}'
    const ATTRIBUTION = 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>';
    // Este token será el que obtengamos en la web de Mapbox
    const ACCESS_TOKEN = 'pk.eyJ1Ijoic29seiIsImEiOiJja2FpYWJobjIwbzVtMnNvNTdmNGF4NHJ2In0.HP3anVetw1Hw0MxhQJPagQ';
    const mapId = 'map';
    const initialCoordinates = [latitude, longitude]; // Mi posición actual recibida por parámetros
    const map = L.map(mapId).setView(initialCoordinates, 13);
    L.tileLayer(MAPBOX_API, {
        attribution: ATTRIBUTION,
        maxZoom: 18,
        id: 'mapbox/streets-v11',
        tileSize: 512,
        zoomOffset: -1,
        accessToken: ACCESS_TOKEN
      }).addTo(map);
     
    L.marker([latitude, longitude], {backgroundColor: 'red'}).addTo(map);
    const plazaMayorCoordinates = [40.4168898,-3.7020553]
    L.marker(plazaMayorCoordinates, {color: '#338800'}).bindPopup("<b>Plaza Sol</b><br>Posición secundaria del mapa").addTo(map);

    let popup = L.popup();

    function onMapClick(e) {
        console.log(e.latlng)
        popup
            .setLatLng(e.latlng)
            .setContent("You clicked the map at " + Math.floor(e.latlng.lat) + " and " + Math.floor(e.latlng.lng))
            .openOn(map);
    }
    map.on('click', onMapClick);
}

startScript()
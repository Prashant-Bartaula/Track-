const socket =io();

//check if user browser has geolocation
if(navigator.geolocation){
    
    //watch position takes 3 arguments position, error, options
    navigator.geolocation.watchPosition((position)=>{
        const {latitude, longitude}=position.coords;

    socket.emit('send-location', {latitude, longitude});
    }, (error)=>{
        console.log(error);
    }, {
        enableHighAccuracy: true,
        timeout: 5000,//5 seconds
        maximumAge: Infinity,//prevents caching
    })
}

//leaflet map view 
const map=L.map('map').setView([0, 0], 10);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png?{foo}', {foo: 'bar', attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'}).addTo(map);

const markers={}

socket.on('receive-location', (data)=>{
    const {id, latitude, longitude}=data;
    console.log(latitude, longitude);
    map.setView([latitude, longitude], 20);

    if(markers[id]){
        markers[id].setLatLng([latitude, longitude]);
    }else{
        markers[id]=L.marker([latitude, longitude]).addTo(map).bindPopup(id).openPopup();
    }
})

socket.on('disconneted', (id)=>{
    if(markers[id]){
        map.removeLayer(markers[id]);
        delete markers[id];
    }
})
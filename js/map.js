//Initialise Leaflet Map 
var map =L.map('map').setView([-18.9,30.93], 7);

//Add Basemap to map 
var OpenTopoMap = L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
maxZoom: 17,
attribution: 'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
});

var googleStreets = L.tileLayer('http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}',{
    maxZoom: 20,
    subdomains:['mt0','mt1','mt2','mt3']
});

var googleHybrid = L.tileLayer('http://{s}.google.com/vt/lyrs=s,h&x={x}&y={y}&z={z}',{
    maxZoom: 20,
    subdomains:['mt0','mt1','mt2','mt3']
}).addTo(map);

var googleSat = L.tileLayer('http://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}',{
    maxZoom: 20,
    subdomains:['mt0','mt1','mt2','mt3']
});

var googleTerrain = L.tileLayer('http://{s}.google.com/vt/lyrs=p&x={x}&y={y}&z={z}',{
    maxZoom: 20,
    subdomains:['mt0','mt1','mt2','mt3']
});
//Add marker to map
var marker = L.marker([-18.9,30.95])//.addTo(map);


//Adding districts WMS layer [assignment ]
var districtsWms = L.tileLayer.wms("http://localhost:8080/geoserver/geodevelopment/wms", {
    layers:'geodevelopment:Zim-districts-WGS84',
    format: 'image/png',
    transparent: true,
    attribution: "",
    zIndex: 9,
});

//Adding treecover WMS layer [assignment ]
var treecoverWms = L.tileLayer.wms("http://localhost:8080/geoserver/geodevelopment/wms", {
    layers:'geodevelopment:Treecover',
    format: 'image/png',
    transparent: true,
    attribution: "",
    zIndex: 5,
});

//Adding Railwayline WMS layer [assignment ]
var railwaysWms = L.tileLayer.wms("http://localhost:8080/geoserver/geodevelopment/wms", {
    layers:'	geodevelopment:Railway Line ZIM',
    format: 'image/png',
    transparent: true,
    attribution: "",
    zIndex: 10,
});
//Adding Secondary Schools WMS layer [assignment ]
var schoolsWms = L.tileLayer.wms("http://localhost:8080/geoserver/geodevelopment/wms", {
    layers:'geodevelopment:Secondary Schools_ZIM',
    format: 'image/png',
    transparent: true,
    attribution: "",
    zIndex: 12,
});




//style of health facility 
var styleHealth ={radius: 1,
    fillColor :'black',
    color:'black',
}

//styling function for Landuse 
var landuseStyle ={
    color: 'red',
    opacity :0.5,
    fillColor:'*',
    weight:1,
}

//style for the roads [ assignment ]
roadStyle =  {
    color : 'black',
    weight :2,
    opacity :0.9
}

//Add GeoJSON layers and labels for Landuse 
var landuselayer = L.geoJson(landuses,{
    style: landuseStyle,
    onEachFeature:function (feature, layer) {
        
        area = (turf.area(feature)/1000000).toFixed(3)
        center_lat= turf.center(feature).latlng[lat]
        center_lng= turf.center(feature).latlng[lng]

        label = `Name :${feature.properties.LANDTYPE}<br>`
        label += `Area :${area}<br>`
        label += `Center :lng :${center_lng},lat :${center_lat}<br>`
        layer.bindPopup(label)
    }

});

//Add GeoJSON for Health facility layer
var health_facilities = L.geoJson(health_facilities,{pointToLayer:function(feature,latlng){
    return  L.circleMarker(latlng,styleHealth);
}});



//Add roads GeoJSON layer [ assignment ]
var roads = L.geoJson(roads, {
    style :roadStyle,
    onEachFeature:function(feature,layer){
        label =`ID :${feature.properties.ROADS_ID}`
        layer.bindPopup(label)
    }
});




//Basemaps
var baseLayers = {
    
   "Open Topo Map": OpenTopoMap,
    "Google Hybrid": googleHybrid,
    "Google Satellite": googleSat,
    "Google Streets": googleStreets,
    "Google Terrain": googleTerrain,
};

//Adding all layer including WMS  to control panel [assignment]
var overlays = {
     
     "Roads":roads,
     'Health Facilities':health_facilities,
     'Landuse':landuselayer,
     'Districts':districtsWms,
    'Schools in Zimbabwe':schoolsWms,
    'Railway Line':railwaysWms,
    'Treecover':treecoverWms
     
};


//Add baselayer control to map [assignment ]
L.control.layers(baseLayers,overlays,{collapsed : false} ).addTo(map);





//add Leaflet print to map  
L.control.browserPrint({position: 'topleft', title: 'Print ...'}).addTo(map);

//Coordinates on mouse move 
map.on('mousemove', function(e){
    console.log(e)
    $('#coordinate').html(`Lat:${e.latlng.lat.toFixed(3)}, Long :${e.latlng.lng.toFixed(3)}`)
    });
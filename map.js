	//	var map = L.map('map').setView([34.052235, -118.243683], 10);

/*
		L.tileLayer('https://{s}.tiles.mapbox.com/v3/{id}/{z}/{x}/{y}.png', {
			maxZoom: 18,
			attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, ' +
				'<a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
				'Imagery © <a href="http://mapbox.com">Mapbox</a>',
			id: 'examples.map-20v6611k'
		}).addTo(map);
    */
//L.geoJson(geojsonFeature).addTo(map);

var cities = "lacities.geojson";

function popUp(feature, layer) {
    layer.bindPopup(feature.properties.CITY_LABEL);
  }

var citiesLayer = new L.GeoJSON.AJAX("lacities.json");
var citiesLayer = new L.GeoJSON.AJAX("lacities.json", {dataType:"jsonp"});

/*
style:{
    fillColor:"#ff7f00",
    color: "#ff7f00",
    weight: 1,
    opacity: 1,
    fillOpacity: 0.05
    }   
*/

  var map = L.map('map').fitBounds(citiesLayer.getBounds());

var cupcakeTiles = L.tileLayer('http://a.tiles.mapbox.com/v3/lyzidiamond.map-ietb6srb/{z}/{x}/{y}.png', {
    maxZoom: 18
  });
cupcakeTiles.addTo(map);

  citiesLayer.addTo(map);


/*
    //  HIDE CERTAIN FEATURES
L.geoJson(geojsonFeature, {
    filter: function(feature, layer) {
        return feature.properties.POPULATION < 10000 ;
    }
}).addTo(map);
*/

 // ADD POPUP TO EACH FEATURE
/*
function onEachFeature(feature, layer) {
    if (feature.properties) {
        layer.bindPopup("CITY NAME: " + feature.properties.CITY_LABEL + ", Portal: " + feature.properties.portal);
    }
}

L.geoJson(citiesLayer, {
    onEachFeature: onEachFeature
}).addTo(map);

*/
    // COLOR BY portal
function getColor(portal) {
    return portal > 0 ? '#800026' :
                      '#0000FF';
}
function style(feature) {
    return {
        fillColor: getColor(feature.properties.Portal),
        weight: 2,
        opacity: 1,
        color: 'white',
        dashArray: '3',
        fillOpacity: 0.7
    };
}
L.geoJson(citiesLayer, {style: style}).addTo(map);

/*

    // COLOR BY POPULATION
function getColor(d) {
    return d > 999999 ? '#800026' :
           d > 500000  ? '#BD0026' :
           d > 250000  ? '#E31A1C' :
           d > 100000  ? '#FC4E2A' :
           d > 50000   ? '#FD8D3C' :
           d > 10000   ? '#FEB24C' :
           d > 1000   ? '#FED976' :
                      '#FFEDA0';
}
function style(feature) {
    return {
        fillColor: getColor(feature.properties.POPULATION),
        weight: 2,
        opacity: 1,
        color: 'white',
        dashArray: '3',
        fillOpacity: 0.7
    };
}
L.geoJson(cities, {style: style}).addTo(map);

/*


/*
 // ADD POPUP TO EACH FEATURE
function onEachFeature(feature, layer) {
    if (feature.properties) {
        layer.bindPopup("POPULATION IS: " + feature.properties.POPULATION);
    }
}

L.geoJson(geojsonFeature, {
    onEachFeature: onEachFeature
}).addTo(map);
*/

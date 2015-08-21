// https://www.mapbox.com/mapbox.js/example/v1.0.0/choropleth/
// https://www.mapbox.com/mapbox.js/example/v1.0.0/choropleth-joined-data-multiple-variables/


L.mapbox.accessToken = 'pk.eyJ1IjoibGVhcm5pbmduZXJkIiwiYSI6ImM0YzYyYjU3MTI5NmU0ZGIwOTg5NDMyMWJkYmIyNmQ1In0.0A7HsPEzc91rDR0rGRz33w';

var map = L.mapbox.map('map', 'learningnerd.n6ibmhde')
  .setView([34.052235, -118.243683], 10);

var popup = new L.Popup({ autoPan: false });


  function getStyle(feature) {
      return {
          weight: 2,
          opacity: 0.4,
          color: getLineColor(feature.properties.Portal),
          fillOpacity: 0.5,
          fillColor: getColor(feature.properties.Portal)
      };
  }

// get color depending on population density value
  function getColor(d) {
      return d === 1 ? '#88c300' : '#d97b7b';
  }

function getLineColor(d) {
      return d === 1 ? '#415c03' : '#7c3333';
  }

var closeTooltip;

  function mousemove(e) {
      var layer = e.target;

      popup.setLatLng(e.latlng);
      popup.setContent('<div class="marker-title">' + layer.feature.properties.CITY_LABEL + '</div> has' +
          layer.feature.properties.Portal + ' portal');

      if (!popup._map) popup.openOn(map);
      window.clearTimeout(closeTooltip);

      // highlight feature
      layer.setStyle({
          weight: 3,
          opacity: 0.3,
          fillOpacity: 0.9
      });

      if (!L.Browser.ie && !L.Browser.opera) {
          layer.bringToFront();
      }
  }

  function mouseout(e) {
      citiesLayer.resetStyle(e.target);
      closeTooltip = window.setTimeout(function() {
          map.closePopup();
      }, 100);
  }

  function zoomToFeature(e) {
      map.fitBounds(e.target.getBounds());
  }




  function onEachFeature(feature, layer) {
      layer.on({
          mousemove: mousemove,
          mouseout: mouseout,
          click: zoomToFeature
      });
  }  

var cities = "lacities.geojson";
        
        //Styles and loads the Hubs
        $.getJSON(cities, function(data) {
        var citiesLayer = L.geoJson(data,  {
      style: getStyle,
      onEachFeature: onEachFeature
  }).addTo(map);
        });


map.legendControl.addLegend(getLegendHTML());

  function getLegendHTML() {    
    return '<h2>Open data portals in LA County</h2><ul><li><span class="swatch" style="background:#88c300"></span> Cities with portals</li><li><span class="swatch" style="background:#d97b7b"></span> Cities without portals</li></ul>';
  }


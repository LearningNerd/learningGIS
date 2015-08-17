var map = L.map('map').setView([34.052235, -118.243683], 10);

L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
    maxZoom: 18,
    id: 'learningnerd.n6ibmhde',
    accessToken: 'pk.eyJ1IjoibGVhcm5pbmduZXJkIiwiYSI6ImM0YzYyYjU3MTI5NmU0ZGIwOTg5NDMyMWJkYmIyNmQ1In0.0A7HsPEzc91rDR0rGRz33w'
}).addTo(map);

var url = 'https://raw.githubusercontent.com/LearningNerd/learningGIS/gh-pages/lacities.geojson';

function load() {
  // Fetch just the contents of a .geojson file from GitHub by passing
  // `application/vnd.github.v3.raw` to the Accept header
  // As with any other AJAX request, this technique is subject to the Same Origin Policy:
  // http://en.wikipedia.org/wiki/Same_origin_policy the server delivering the request should support CORS.
  $.ajax({
    headers: {
      'Accept': 'application/vnd.github.v3.raw'
    },
    xhrFields: {
      withCredentials: false
    },
    dataType: 'json',
    url: url,
    success: function(geojson) {
        // On success add fetched data to the map.
        L.mapbox.featureLayer(geojson).addTo(map);
    }
  });
}

$(load);
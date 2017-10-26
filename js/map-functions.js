window.onload = function() {

  var capaSatelite = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/satellite-streets-v10/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoiZmFjdW5kb2JheWxlIiwiYSI6ImNqMnpkNzR4ODAwNDIyd3BybHVxbXk3emEifQ.sVR0_Ckb1UjZ1OUTCaFPnw", {
      attribution: 'Imágenes de <a href="http://www.mapbox.com/">Mapbox</a>.',
  });

  var map = L.map('map', {
    center: [-32.896114, -68.833125], zoom: 15,
    layers: [capaSatelite]
  });

  var baseStyle = {
    stroke: true,
    weight: 0.4
  };

  var paletteColors = {
    'FIRST_COLOR': '#fef0d9',
    'SECOND_COLOR': '#fdcc8a',
    'THIRD_COLOR': '#fc8d59',
    'FOUR_COLOR': '#e34a33',
    'FIVE_COLOR': '#b30000'
  };

  var geoJsonLayer = new L.GeoJSON.AJAX("data.geojson", {
      style: function(feature) {
          style = Object.assign({}, baseStyle);
          if (feature.properties.prob >= 0 && feature.properties.prob <= 0.20) {
            style.color = paletteColors.FIRST_COLOR;
          } else if (feature.properties.prob >= 0.20 && feature.properties.prob <= 0.40) {
            style.color = paletteColors.SECOND_COLOR;
          } else if (feature.properties.prob >= 0.40 && feature.properties.prob <= 0.60) {
            style.color = paletteColors.THIRD_COLOR;
          } else if (feature.properties.prob >= 0.60 && feature.properties.prob <= 0.80) {
            style.color = paletteColors.FOUR_COLOR;
          } else if (feature.properties.prob >= 0.80 && feature.properties.prob <= 1) {
            style.color = paletteColors.FIVE_COLOR;
          }
          return style;
      }
  }).addTo(map);
}



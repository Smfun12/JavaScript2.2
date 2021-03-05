let map;

function initMap() {
        map = new google.maps.Map(document.getElementById("map"), {
          center: { lat: 50.464338, lng: 30.519372 },
          zoom: 16,
        });
        var point	=	new	google.maps.LatLng(50.464379,30.519131);
        var marker	=	new	google.maps.Marker({
        position:	point,
        map:	map,
        icon:	"assets/images/map-icon.png"
        });
      }
//Коли сторінка завантажилась
google.maps.event.addDomListener(window,	 'load',	initMap);

exports.initMap = initMap;


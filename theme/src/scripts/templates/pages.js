/* 
  Page.js - for general Javascript
*/

// Schedule Mouse events
const schedule_items = document.querySelectorAll('.schedule-list [class^=col-');
schedule_items.forEach(items => {
  items.addEventListener('mouseenter', siblings_fade_out);
  items.addEventListener('mouseleave', siblings_fade_in);
})

/* 
  siblings_fade_out
  - Gets the current items id
  - Gathers all siblings and adds class
*/
function siblings_fade_out(items) {
  let current_item = event.target.id;
  let parent = Array.from(event.target.parentElement.childNodes);
  let current_siblings = parent.filter(item => { 
    return item.id !== current_item && item.classList != undefined;
  });
  
  current_siblings.forEach( item => { item.classList.add('non-active'); });
}

/* 
  siblings_fade_in
  - Removes active class
*/
function siblings_fade_in(items) {
  schedule_items.forEach(item => {
    if (item.classList.contains('non-active')) {
      item.classList.remove('non-active');
    }
  });
}

// Google Map Settings
function init_google_map(mapId, pinlat, pinlong) {
  // Map itself settings
  var map = new google.maps.Map(document.getElementById(mapId), {
    zoom: 15,
    center: {lat: pinlat, lng: pinlong},
    zoomControl: false,
    mapTypeControl: false,
    mapTypeControl: false,
    scaleControl: false,
    streetViewControl: false,
    rotateControl: false,
    fullscreenControl: false,
    styles: [
      {
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#212121"
          }
        ]
      },
      {
        "elementType": "labels.icon",
        "stylers": [
          {
            "visibility": "off"
          }
        ]
      },
      {
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#757575"
          }
        ]
      },
      {
        "elementType": "labels.text.stroke",
        "stylers": [
          {
            "color": "#212121"
          }
        ]
      },
      {
        "featureType": "administrative",
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#757575"
          }
        ]
      },
      {
        "featureType": "administrative.country",
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#9e9e9e"
          }
        ]
      },
      {
        "featureType": "administrative.land_parcel",
        "stylers": [
          {
            "visibility": "off"
          }
        ]
      },
      {
        "featureType": "administrative.locality",
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#bdbdbd"
          }
        ]
      },
      {
        "featureType": "landscape",
        "stylers": [
          {
            "color": "#393939"
          }
        ]
      },
      {
        "featureType": "poi",
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#757575"
          }
        ]
      },
      {
        "featureType": "poi.park",
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#181818"
          }
        ]
      },
      {
        "featureType": "poi.park",
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#616161"
          }
        ]
      },
      {
        "featureType": "poi.park",
        "elementType": "labels.text.stroke",
        "stylers": [
          {
            "color": "#1b1b1b"
          }
        ]
      },
      {
        "featureType": "road",
        "stylers": [
          {
            "color": "#282828"
          },
          {
            "saturation": 10
          },
          {
            "lightness": -10
          }
        ]
      },
      {
        "featureType": "road",
        "elementType": "geometry.fill",
        "stylers": [
          {
            "color": "#282828"
          }
        ]
      },
      {
        "featureType": "road",
        "elementType": "geometry.stroke",
        "stylers": [
          {
            "color": "#282828"
          }
        ]
      },
      {
        "featureType": "road",
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#8a8a8a"
          }
        ]
      },
      {
        "featureType": "road.arterial",
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#373737"
          }
        ]
      },
      {
        "featureType": "road.highway",
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#3c3c3c"
          }
        ]
      },
      {
        "featureType": "road.highway.controlled_access",
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#4e4e4e"
          }
        ]
      },
      {
        "featureType": "road.local",
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#616161"
          }
        ]
      },
      {
        "featureType": "transit",
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#757575"
          }
        ]
      },
      {
        "featureType": "water",
        "stylers": [
          {
            "color": "#2b2b2b"
          }
        ]
      },
      {
        "featureType": "water",
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#000000"
          }
        ]
      },
      {
        "featureType": "water",
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#3d3d3d"
          }
        ]
      }
    ]
  });

  // Marker information
  var marker = new google.maps.Marker({
    position: {lat: 40.7143614, lng: -74.00774990000001},
    map: map,
    icon: 'https://cdn.shopify.com/s/files/1/0307/9746/3685/files/icon-map-pin.svg?462',
    animation: google.maps.Animation.DROP,
    title: 'Tribeca Comedy Lounge',
  });

    // Click to og to google maps
  marker.addListener('click', function() {
    window.open('https://www.google.com/maps/place/Tribeca+Comedy+Lounge/@40.7143229,-74.0077669,15z/data=!4m2!3m1!1s0x0:0x21506053bef0645a?sa=X&ved=2ahUKEwi15_e3zpfnAhVN11kKHRfpDeIQ_BIwFXoECAsQCA', '_blank')
   });

  // Bounce on load
  function toggleBounce() {
    if (marker.getAnimation() !== null) {
      marker.setAnimation(null);
    } else {
      marker.setAnimation(google.maps.Animation.BOUNCE);
    }
  }
}

window.addEventListener('DOMContentLoaded', () => {
  setTimeout( () => {
    init_google_map('home-map', 40.7143614,-74.00774990000001);
  }, 400)
  
})

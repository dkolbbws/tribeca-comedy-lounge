/* 
  Page.js - for general Javascript
*/

let header = document.getElementById('bws-header');
window.addEventListener('scroll', () => {
  let scroll = window.pageYOffset;

  if (scroll > 100) {
    header.classList.add('sticky');
  } else if (scroll <= 99) {
    header.classList.remove('sticky');
  }
})

// Schedule Mouse events
const schedule_items = document.querySelectorAll('.schedule-list [class^=col-');
schedule_items.forEach(items => {
  items.addEventListener('mouseenter', siblings_fade_out);
  items.addEventListener('mouseleave', siblings_fade_in);
})
console.log(schedule_items);

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

// Home map variables
let home_map_pins = new Array();
let home_map_bool = false;
let home_map_object = {};
let home_map_features = {};

// Google Map Settings
function init_google_map(mapId, pinlat, pinlong) {
  // Map itself settings
  let map = new google.maps.Map(document.getElementById(mapId), {
    zoom: 15,
    center: {lat: pinlat, lng: pinlong},
    zoomControl: false,
    mapTypeControl: false,
    mapTypeControl: false,
    scaleControl: false,
    streetViewControl: false,
    rotateControl: false,
    fullscreenControl: false,
    mapTypeControl: false,
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
        "featureType": "landscape.man_made",
        "elementType": "geometry.fill",
        "stylers": [
          {
            "color": "#535353"
          },
          {
            "saturation": -10
          },
          {
            "lightness": -20
          }
        ]
      },
      {
        "featureType": "landscape.man_made",
        "elementType": "labels.text",
        "stylers": [
          {
            "color": "#8a8a8a"
          },
          {
            "lightness": 20
          }
        ]
      },
      {
        "featureType": "landscape.man_made",
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#8a8a8a"
          },
          {
            "lightness": 25
          }
        ]
      },
      {
        "featureType": "landscape.natural",
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#8a8a8a"
          },
          {
            "lightness": 15
          }
        ]
      },
      {
        "featureType": "landscape.natural.landcover",
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#8a8a8a"
          }
        ]
      },
      {
        "featureType": "poi",
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#8a8a8a"
          },
          {
            "lightness": 30
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
            "color": "#8a8a8a"
          },
          {
            "lightness": 25
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
        "elementType": "geometry.fill",
        "stylers": [
          {
            "color": "#2c2c2c"
          }
        ]
      },
      {
        "featureType": "road",
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#8a8a8a"
          },
          {
            "lightness": 15
          }
        ]
      },
      {
        "featureType": "road.arterial",
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#494949"
          },
          {
            "lightness": -20
          }
        ]
      },
      {
        "featureType": "road.highway",
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#3c3c3c"
          },
          {
            "lightness": -5
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
            "color": "#8a8a8a"
          }
        ]
      },
      {
        "featureType": "transit",
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#757575"
          },
          {
            "lightness": -35
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
            "color": "#8a8a8a"
          },
          {
            "lightness": 25
          }
        ]
      }
    ]
  });

  // Map object for scope
  home_map_object = map;

  // Hide the map to add all of the pins - then hide them
  map.__gm.Ma.style.transition = 'none';
  map.__gm.Ma.style.opacity = 0;

  // Pin bounce on load
  function toggleBounce() {
    if (marker.getAnimation() !== null) {
      marker.setAnimation(null);
    } else {
      marker.setAnimation(google.maps.Animation.BOUNCE);
    }
  }

  var icons = {
    tcl: {
      icon: 'https://cdn.shopify.com/s/files/1/0307/9746/3685/files/tcl_pin_2.svg?641'
    },
    regular: {
      icon: 'https://cdn.shopify.com/s/files/1/0307/9746/3685/files/currrent-map-pin.svg?641'
    },
    path: {
      icon: 'https://cdn.shopify.com/s/files/1/0307/9746/3685/files/currrent-map-pin.svg?641'
    }
  };

  var features = [
    {
      title: 'Tribeca Comedy Lounge',
      position: new google.maps.LatLng(40.7143151,-74.0077659),
      type: 'tcl',
      infoWindow: 
        `<div class="map_window">
          <p>Tribeca Comedy Lounge</p>
          <div class="bws-button-wrapper">
            <a href="https://www.google.com/maps/place/Tribeca+Comedy+Lounge/@40.7143191,-74.0099546,17z/data=!3m1!4b1!4m5!3m4!1s0x89c25a1f4b16e1f7:0x21506053bef0645a!8m2!3d40.7143151!4d-74.0077659" class="red" target="_blank">Get Directions</a>
          </div>
        </div>`
    }, {
      title: 'World Trade Center E',
      position: new google.maps.LatLng(40.7126452,-74.009898),
      type: 'regular',
      infoWindow: 
        `<div class="map_window">
          <p>World Trade E</p>
          <div class="bws-button-wrapper">
            <a href="https://www.google.com/maps/place/World+Trade+Center+Station/@40.7127692,-74.0098616,17.71z/data=!4m12!1m6!3m5!1s0x0:0x7f33d7e5a45131b9!2sWorld+Trade+Center+Station!8m2!3d40.7126452!4d-74.009898!3m4!1s0x0:0x7f33d7e5a45131b9!8m2!3d40.7126452!4d-74.009898" class="red" target="_blank">Get Directions</a>
          </div>
        </div>`
    }, {
      title: 'Chambers Street Station A C',
      position: new google.maps.LatLng(40.714305,-74.0084412),
      // position: new google.maps.LatLng(40.7144651,-74.0086036),
      type: 'regular',
      infoWindow: 
        `<div class="map_window">
          <p>Chambers St AC</p>
          <div class="bws-button-wrapper">
            <a href="https://www.google.com/maps/place/Chambers+Street+Station/@40.7155174,-74.0114114,17z/data=!3m1!4b1!4m5!3m4!1s0x89c25a1f204ccf73:0x1ab2757eb7b2e169!8m2!3d40.7155134!4d-74.0092227" class="red" target="_blank">Get Directions</a>
          </div>
        </div>`
    }, {
      title: 'Fulton Street Station 2 3',
      position: new google.maps.LatLng(40.7095648,-74.0063833),
      type: 'regular',
      infoWindow: 
        `<div class="map_window">
          <p>Fulton Station 2 3</p>
          <div class="bws-button-wrapper">
            <a href="https://www.google.com/maps/place/Fulton+Street+Station/@40.7091998,-74.0079743,17.47z/data=!4m12!1m6!3m5!1s0x0:0xd3127d75ae72e8fc!2sFulton+Center!8m2!3d40.709373!4d-74.0083258!3m4!1s0x89c25a1807690bc1:0x4222d970a6f11740!8m2!3d40.7095648!4d-74.0063833" class="red" target="_blank">Get Directions</a>
          </div>
        </div>`
    }, {
      title: 'Brooklyn Bridge 4 5 6',
      position: new google.maps.LatLng(40.7128214,-74.0042831),
      type: 'regular',
      infoWindow: 
        `<div class="map_window">
          <p>Brooklyn Bridge 4 5 6</p>
          <div class="bws-button-wrapper">
            <a href="https://www.google.com/maps/place/Brooklyn+Bridge+-+City+Hall+Subway+Station/@40.7122151,-74.0052509,16.96z/data=!4m5!3m4!1s0x89c25a222fcb050d:0x8300747c6c6fec23!8m2!3d40.7128214!4d-74.0042831" class="red" target="_blank">Get Directions</a>
          </div>
        </div>`
    }, {
      title: 'Chambers Street J Z',
      position: new google.maps.LatLng(40.7131116,-74.0040464),
      type: 'regular',
      infoWindow: 
        `<div class="map_window">
          <p>Chambers St J Z</p>
          <div class="bws-button-wrapper">
            <a href="https://www.google.com/maps/place/Chambers+St/@40.7129431,-74.0088383,17.16z/data=!4m8!1m2!2m1!1schamber+j+z!3m4!1s0x0:0x4e8cb404e99345c2!8m2!3d40.7131116!4d-74.0040464" class="red" target="_blank">Get Directions</a>
          </div>
        </div>`
    }, {
      title: 'City Hall R',
      position: new google.maps.LatLng(40.7135245,-74.0067101),
      type: 'regular',
      infoWindow: 
        `<div class="map_window">
          <p>City Hall R</p>
          <div class="bws-button-wrapper">
            <a href="https://www.google.com/maps/place/City+Hall+Station/@40.7135285,-74.0088988,17z/data=!4m12!1m6!3m5!1s0x89c25a18a8f1e8a7:0x354a2435f5095fd1!2sCity+Hall+Station!8m2!3d40.7135245!4d-74.0067101!3m4!1s0x89c25a18a8f1e8a7:0x354a2435f5095fd1!8m2!3d40.7135245!4d-74.0067101" class="red" target="_blank">Get Directions</a>
          </div>
        </div>`
    }, {
      title: 'World Trade Center Path',
      position: new google.maps.LatLng(40.7115741,-74.0114486),
      type: 'path',
      infoWindow: 
        `<div class="map_window">
          <p>World Trade Path</p>
          <div class="bws-button-wrapper">
            <a href="https://www.google.com/maps/place/World+Trade+Center/@40.7126492,-74.0120867,17z/data=!4m12!1m6!3m5!1s0x89c25a191cac2c15:0x7f33d7e5a45131b9!2sWorld+Trade+Center+Station!8m2!3d40.7126452!4d-74.009898!3m4!1s0x89c25a197b9fec67:0xdf170c5ccb9d0b00!8m2!3d40.7115741!4d-74.0114486" class="red" target="_blank">Get Directions</a>
          </div>
        </div>`
    }
  ];

  home_map_features = features;
  let marker = null;
  
  // Create markers.
  for (var i = 0; i < features.length; i++) {
    marker = new google.maps.Marker({
      position: features[i].position,
      icon: icons[features[i].type].icon,
      map: map,
      // animation: google.maps.Animation.DROP,
    });
    var content = features[i].infoWindow    
    var infowindow = new google.maps.InfoWindow();

    // Add each pins infor window
    google.maps.event.addListener(marker,'click', (function(marker,content,infowindow){ 
        return function() {
            infowindow.setOptions({
              content: content,
              maxWidth: 300
            });
            infowindow.open(map, marker);
        };
    })(marker,content,infowindow));

    home_map_bool = true;
  };
}

if (document.body.classList.contains('template-index')) {
  setTimeout( () => {
    let home_map_promise = new Promise((resolve,reject) => {
      init_google_map('home-map', 40.7143614,-74.00774990000001)
      if (home_map_bool) {
        resolve();
      }
    });
    
    home_map_promise
      .then( () => {
          set_map_pin_styles('home-map');
      })
      .then( () => {
        setTimeout( () => {
          // Shop the map
          home_map_object.__gm.Ma.style.transition = '400ms all cubic-bezier(0.255, 0.195, 0.135, 0.99)';
          home_map_object.__gm.Ma.style.opacity = 1;
        }, 400);
      })
  }, 400);
}

/* 
  set_map_pin_styles
  - Hides all but the first two map pins
  - Adds info window data to each pin
*/
function set_map_pin_styles(mapId) {
  setTimeout( () => {
    // Hide all pins except for TCL and the first subway
    let icons = Array.from(document.querySelectorAll('#home-map img[src*="currrent-map-pin.svg?641"]'));
    icons.forEach( (icon,index) => { 
      icon.setAttribute('id', index); 
      icon.classList.add('hide-marker')
      icon.setAttribute('data-window', home_map_features[index]);
      home_map_pins.push(icon);
    });
    let test = icons.filter( icon => { return icon.id == 0; });
    test[0].classList.remove('hide-marker');

    let tcl = document.querySelectorAll('#home-map img[src*="tcl_pin_2.svg?641"]');
    tcl[1].setAttribute('data-window', home_map_features[0].infoWindow)
  }, 400);
}

// Map Subway directions - changes copy and adjaccent map pin
let subway_links = document.querySelectorAll('.subway-list a');
let subway_description = document.getElementById('subway-station-copy');
for (let a =0; a < subway_links.length; a++) {
  subway_links[a].addEventListener('click', event => {
    event.preventDefault();
    if (event.target.classList.contains('active')) {
      return;
    } else {
      let copy = event.target.dataset.text;
    subway_description.classList.add('change-text');

    subway_links.forEach(link => { 
      link.classList.remove('active') 
    });
    event.target.classList.add('active');
    
    setTimeout( () => {
      subway_description.textContent = copy;
      subway_description.classList.remove('change-text');
    }, 400);

    home_map_pins.forEach( pin => { 
      pin.classList.add('hide-marker')
      pin.parentElement.style.opacity += 0;
    });

    home_map_pins[a].style.transition = '400ms all cubic-bezier(0.255, 0.195, 0.135, 0.99)';
    home_map_pins[a].parentElement.style.opacity += 1;
    home_map_pins[a].classList.remove('hide-marker');
    }
  })
}

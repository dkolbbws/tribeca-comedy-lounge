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
let marker = null;

// Google Map Settings
function initMap(mapId, pinlat, pinlong, zoomLevel) {
  // Map itself settings
  let map = new google.maps.Map(document.getElementById(mapId), {
    zoom: zoomLevel,
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
      // icon: 'https://cdn.shopify.com/s/files/1/0307/9746/3685/files/tcl_pin_2.svg?641'
      icon: 'https://cdn.shopify.com/s/files/1/0307/9746/3685/files/icon-map-pin-small.svg?2336'
      // icon: 'https://cdn.shopify.com/s/files/1/0307/9746/3685/files/icon-map-pin-small-logo.svg?2339'
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
          <p>World Trade - E</p>
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
          <p>Chambers St - A,C</p>
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
          <p>Fulton Station - 2,3</p>
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
          <p>Brooklyn Bridge - 4,5,6</p>
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
          <p>Chambers St - J,Z</p>
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
          <p>City Hall - R</p>
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
          <p>World Trade - Path</p>
          <div class="bws-button-wrapper">
            <a href="https://www.google.com/maps/place/World+Trade+Center/@40.7126492,-74.0120867,17z/data=!4m12!1m6!3m5!1s0x89c25a191cac2c15:0x7f33d7e5a45131b9!2sWorld+Trade+Center+Station!8m2!3d40.7126452!4d-74.009898!3m4!1s0x89c25a197b9fec67:0xdf170c5ccb9d0b00!8m2!3d40.7115741!4d-74.0114486" class="red" target="_blank">Get Directions</a>
          </div>
        </div>`
    }
  ];

  home_map_features = features;
  // let marker = null;
  
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

    // setTimeout( () => {
      home_map_bool = true;
    // }, 400);
  };
}


/* 
  set_map_pin_styles
  - Hides all but the first two map pins
  - Adds info window data to each pin
*/
function set_map_pin_styles(mapId) {
  setTimeout( () => {
    // Hide all pins except for TCL and the first subway
    let icons = Array.from(document.querySelectorAll('#subway-map img[src*="currrent-map-pin.svg?641"]'));
    icons.forEach( (icon,index) => { 
      icon.setAttribute('id', index); 
      icon.classList.add('hide-marker')
      icon.setAttribute('data-window', home_map_features[index]);
      home_map_pins.push(icon);
    });
    let test = icons.filter( icon => { return icon.id == 0; });
    test[0].classList.remove('hide-marker');
    // icons[0].classList.remove('hide-marker');

    let tcl = document.querySelectorAll('#subway-map img[src*="tcl_pin_2.svg?641"]');
    tcl[1].setAttribute('data-window', home_map_features[0].infoWindow);
  }, 800);
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
    
    // Get and close google maps info windows
    let maps = document.getElementById('subway-map');
    let windows = maps.querySelectorAll('button.gm-ui-hover-effect');
    windows.forEach(element => { element.click(); });
  })
}

if (document.body.classList.contains('template-index') || (document.body.classList.contains('template-page') && document.getElementById('contact') != undefined) ) {  
  setTimeout( () => {
    let home_map_promise = new Promise((resolve,reject) => {
      initMap('subway-map', 40.7143614,-74.00774990000001, 15)

      if (home_map_bool) {
        resolve();
      }
    });
    
    home_map_promise
      .then( () => {
        if(window.outerWidth >= 769) {
          set_map_pin_styles('subway-map');
        }
      })
      .then( () => {
        setTimeout( () => {
          // Shop the map
          home_map_object.__gm.Ma.style.transition = '400ms all cubic-bezier(0.255, 0.195, 0.135, 0.99)';
          home_map_object.__gm.Ma.style.opacity = 1;
        }, 600);
      })
  }, 800);
}

let faq_item = document.querySelectorAll('.faq-list a');
faq_item.forEach(item => {
  item.addEventListener('click', open_accordion);
});

function open_accordion(event) {
  event.preventDefault();

  let height = event.target.nextElementSibling.querySelector('.inner-faq-content').clientHeight;
  let wrapper = event.target.nextElementSibling;
  let line = event.target.parentElement.querySelector('.line');

  if (! event.target.classList.contains('active')) {  
    event.target.parentElement.classList.add('active');
    event.target.classList.add('active');
    gsap.to(wrapper, {duration: 0.7, ease: "Quint.easeInOut", height: height, onComplete: () => { wrapper.style.height = 'auto'; }});
    gsap.to(line, {duration: 0.4, delay: 0.2, ease: "Quint.easeInOut", scaleY: 1,});
  } else {
    event.target.parentElement.classList.remove('active');
    event.target.classList.remove('active');
    
    gsap.to(wrapper, {duration: 0.7, ease: "Quint.easeInOut", height: 0,});
    gsap.to(line, {duration: 0.5, ease: "Quint.easeInOut", scaleY: 0, onComplete: () => { wrapper.setAttribute('style', ''); }});
    
  }
}

let anchor = document.querySelectorAll('.anchor-scroll');
anchor.forEach( item => {
  item.addEventListener('click', scroll_to_element);
});

function scroll_to_element(event) {  
  event.preventDefault();

  let header = document.getElementById('bws-header');
  let target = event.target.getAttribute('href');  
  let distance = document.getElementById(target);
  distance = parseInt(distance.offsetTop) - parseInt(header.clientHeight);
  gsap.to(window, {duration: 1, ease: "Quint.easeInOut", delay: 0.2, scrollTo: distance, });
}

function current_slide(slide, slider) {
  let slides = slider;
  let current_slide = slide;

  for(let a = 0; a < slides.length; a++) {
    if (slides[a].classList.contains('active')) {
      current_slide = a;
    }
  }

  slide = current_slide;
  return slide;
}

function get_current_dot(dots) {
  let current = null;
  for (let a = 0; a < dots.length; a++) {
    if (dots[a].classList.contains('active')) {
      current = a;
    }
  }
  return current;
}

function next_arrow_click(id, sliderVar, prevArrow) {
  let current = null;
  let dots = document.querySelectorAll(id + ' .lSPager li');
  current = get_current_dot(dots);
  sliderVar.goToSlide(current + 1);

  if (current <= dots.length - 2) {
    sliderVar.goToSlide(current + 1);
    event.target.classList.remove('disabled');
    prevArrow.classList.remove('disabled');
  } 
  if (current == dots.length - 2) {
    event.target.classList.add('disabled');
  }
}

function prev_arrow_click(id, sliderVar, nextArrow) {
  let current = null;
  let dots = document.querySelectorAll(id + ' .lSPager li');
  current = get_current_dot(dots);

  if (current >= 1) {
    sliderVar.goToSlide(current - 1);
    event.target.classList.remove('disabled');
    nextArrow.classList.remove('disabled');
  } 
  if (current == 1) {
    event.target.classList.add('disabled');
  }
}

function slider_onAfterSlide(id, nextArrow, prevArrow) {
  let dots = document.querySelectorAll(id + ' .lSPager li');
  let current = get_current_dot(dots);

  if (current == 0) {
    prevArrow.classList.add('disabled');
  } else {
    prevArrow.classList.remove('disabled');
  }

  if (current == dots.length - 1) {
    nextArrow.classList.add('disabled');
  } else {
    nextArrow.classList.remove('disabled');
  }
}

function adjust_slider_load_height(el, sliderVar) {
  setTimeout( () => {
    // Adjust slder to match the tallest item
    let slider = Array.from(el[0].children);
            
    for(let a = 0; a < slider.length; a++) {
      slider[a] = slider[a].clientHeight
    }

    let tallest = slider.sort();
    sliderVar[0].style.minHeight = tallest[tallest.length - 1] + 'px';
  }, 400);
}

$(document).ready(function() {
  if (document.body.classList.contains('template-index')) {
    let next_arrow = document.querySelector('#home-section-eight .next');
    let prev_arrow = document.querySelector('#home-section-eight .prev');

    let home_one = null;
    home_one = $("#home-slider-one").lightSlider({
        item: 3,
        autoWidth: false,
        slideMove: 3, // slidemove will be 1 if loop is true
        slideMargin: 10,

        addClass: '',
        mode: "slide",
        // mode: "fade",
        useCSS: true,
        cssEasing: 'ease', //'cubic-bezier(0.25, 0, 0.25, 1)',//
        easing: 'cubic-bezier(0.25, 0, 0.25, 1)', //'for jquery animation',////

        speed: 1000, //ms'
        auto: false,
        loop: false,
        slideEndAnimation: true,
        pause: 2000,

        keyPress: true,
        controls: true,
        prevHtml: '',
        nextHtml: '',

        rtl:false,
        adaptiveHeight:false,

        vertical:false,
        // verticalHeight:500,
        vThumbWidth:100,

        thumbItem:10,
        pager: true,
        gallery: false,
        galleryMargin: 5,
        thumbMargin: 5,
        currentPagerPosition: 'middle',

        enableTouch:true,
        enableDrag:true,
        freeMove:true,
        swipeThreshold: 40,

        responsive : [
          {
            breakpoint: 768,
            settings: {
                item:2,
                slideMove:1,
              }
          },
          {
            breakpoint: 576,
            settings: {
                item:1,
                slideMove:1,
              }
          },
        ],

        onBeforeStart: function (el) {},
        onSliderLoad: function (el) {
          adjust_slider_load_height(el, home_one);
        },
        onBeforeSlide: function (el) {},
        onAfterSlide: function (el) {
          slider_onAfterSlide('#home-section-eight', next_arrow, prev_arrow);
        },
        onBeforeNextSlide: function (el) {},
        onBeforePrevSlide: function (el) {}
    });

    next_arrow.addEventListener('click', (event) => {
      next_arrow_click('#home-section-eight', home_one, prev_arrow);
    });

    prev_arrow.addEventListener('click', (event) => {
      prev_arrow_click('#home-section-eight', home_one, next_arrow);
    }); 

    // if ()
    // console.log(window, window.innerWidth, ' aefaefe');
    let next_arrow_events = document.querySelector('#home-section-two .next');
    let prev_arrow_events = document.querySelector('#home-section-two .prev');
    var home_events = $("#home-events-section-two-mobile").lightSlider({
      item: 1,
      autoWidth: false,
      slideMove: 1, // slidemove will be 1 if loop is true
      // slideMargin: 0,
      slideMargin: 50,

      addClass: '',
      mode: "slide",
      // mode: "fade",
      useCSS: true,
      cssEasing: 'ease', //'cubic-bezier(0.25, 0, 0.25, 1)',//
      easing: 'cubic-bezier(0.25, 0, 0.25, 1)', //'for jquery animation',////

      speed: 1000, //ms'
      auto: false,
      loop: false,
      slideEndAnimation: true,
      pause: 2000,

      keyPress: true,
      controls: true,
      prevHtml: '',
      nextHtml: '',

      rtl:false,
      adaptiveHeight:false,

      vertical:false,
      // verticalHeight:500,
      vThumbWidth:100,

      thumbItem:10,
      pager: true,
      gallery: false,
      galleryMargin: 5,
      thumbMargin: 5,
      currentPagerPosition: 'middle',

      enableTouch:true,
      enableDrag:true,
      freeMove:true,
      swipeThreshold: 40,

      responsive : [],

        onBeforeStart: function (el) {},
        onSliderLoad: function (el) {
          adjust_slider_load_height(el, home_events);
        },
        onBeforeSlide: function (el) {},
        onAfterSlide: function (el) {
          slider_onAfterSlide('#home-section-two', next_arrow_events, prev_arrow_events);
        },
        onBeforeNextSlide: function (el) {},
        onBeforePrevSlide: function (el) {}
    });
    
    next_arrow_events.addEventListener('click', (event) => {
      next_arrow_click('#home-section-two', home_events, prev_arrow_events);
    });

    prev_arrow_events.addEventListener('click', (event) => {
      prev_arrow_click('#home-section-two', home_events, next_arrow_events);
    }); 

    var home_comedians = $("#home-comedians-mobile-slider").lightSlider({
      item: 1,
      autoWidth: false,
      slideMove: 1, // slidemove will be 1 if loop is true
      // slideMargin: 0,
      slideMargin: 12,

      addClass: '',
      mode: "slide",
      // mode: "fade",
      useCSS: true,
      cssEasing: 'ease', //'cubic-bezier(0.25, 0, 0.25, 1)',//
      easing: 'cubic-bezier(0.25, 0, 0.25, 1)', //'for jquery animation',////

      speed: 1000, //ms'
      auto: false,
      loop: true,
      slideEndAnimation: true,
      pause: 2000,

      keyPress: true,
      controls: true,
      prevHtml: '',
      nextHtml: '',

      rtl:false,
      adaptiveHeight:false,

      vertical:false,
      // verticalHeight:500,
      vThumbWidth:100,

      thumbItem:10,
      pager: false,
      gallery: false,
      galleryMargin: 5,
      thumbMargin: 5,
      currentPagerPosition: 'middle',

      enableTouch:true,
      enableDrag:true,
      freeMove:true,
      swipeThreshold: 40,

      responsive : [],

        onBeforeStart: function (el) {},
        onSliderLoad: function (el) {
          adjust_slider_load_height(el, home_comedians);
        },
        onBeforeSlide: function (el) {},
        onAfterSlide: function (el) {
          slider_onAfterSlide('#home-section-six');
        },
        onBeforeNextSlide: function (el) {},
        onBeforePrevSlide: function (el) {}
    });
  } 

  if (document.body.classList.contains('template-product')) {
    let next_arrow = document.querySelector('#product-collection .next');
    let prev_arrow = document.querySelector('#product-collection .prev');

    let related_events = null;
    related_events = $("#mobile-related-events").lightSlider({
        item: 1,
        autoWidth: false,
        slideMove: 1, // slidemove will be 1 if loop is true
        slideMargin: 50,

        addClass: '',
        mode: "slide",
        // mode: "fade",
        useCSS: true,
        cssEasing: 'ease', //'cubic-bezier(0.25, 0, 0.25, 1)',//
        easing: 'cubic-bezier(0.25, 0, 0.25, 1)', //'for jquery animation',////

        speed: 1000, //ms'
        auto: false,
        loop: false,
        slideEndAnimation: true,
        pause: 2000,

        keyPress: true,
        controls: true,
        prevHtml: '',
        nextHtml: '',

        rtl:false,
        adaptiveHeight:false,

        vertical:false,
        // verticalHeight:500,
        vThumbWidth:100,

        thumbItem:10,
        pager: true,
        gallery: false,
        galleryMargin: 5,
        thumbMargin: 5,
        currentPagerPosition: 'middle',

        enableTouch:true,
        enableDrag:true,
        freeMove:true,
        swipeThreshold: 40,

        responsive : [],

        onBeforeStart: function (el) {},
        onSliderLoad: function (el) {
          adjust_slider_load_height(el, related_events);
        },
        onBeforeSlide: function (el) {},
        onAfterSlide: function (el) {
          slider_onAfterSlide('#product-collection', next_arrow, prev_arrow);
        },
        onBeforeNextSlide: function (el) {},
        onBeforePrevSlide: function (el) {}
    });

    next_arrow.addEventListener('click', (event) => {
      next_arrow_click('#product-collection', related_events, prev_arrow);
    });

    prev_arrow.addEventListener('click', (event) => {
      prev_arrow_click('#product-collection', related_events, next_arrow);
    }); 
  }

  if (document.body.classList.contains('template-article')) {
    var inner_comedians_related = $("#mobile-related-comedians").lightSlider({
      item: 1,
      autoWidth: false,
      slideMove: 1, // slidemove will be 1 if loop is true
      // slideMargin: 0,
      slideMargin: 12,
  
      addClass: '',
      mode: "slide",
      // mode: "fade",
      useCSS: true,
      cssEasing: 'ease', //'cubic-bezier(0.25, 0, 0.25, 1)',//
      easing: 'cubic-bezier(0.25, 0, 0.25, 1)', //'for jquery animation',////
  
      speed: 1000, //ms'
      auto: false,
      loop: true,
      slideEndAnimation: true,
      pause: 2000,
  
      keyPress: true,
      controls: true,
      prevHtml: '',
      nextHtml: '',
  
      rtl:false,
      adaptiveHeight:false,
  
      vertical:false,
      // verticalHeight:500,
      vThumbWidth:100,
  
      thumbItem:10,
      pager: false,
      gallery: false,
      galleryMargin: 5,
      thumbMargin: 5,
      currentPagerPosition: 'middle',
  
      enableTouch:true,
      enableDrag:true,
      freeMove:true,
      swipeThreshold: 40,
  
      responsive : [],
  
        onBeforeStart: function (el) {},
        onSliderLoad: function (el) {
          adjust_slider_load_height(el, inner_comedians_related);
        },
        onBeforeSlide: function (el) {},
        onAfterSlide: function (el) {
          slider_onAfterSlide('#comedians-related');
        },
        onBeforeNextSlide: function (el) {},
        onBeforePrevSlide: function (el) {}
    });
  }
});


// let xhr = new XMLHttpRequest();
// xhr.open('GET', 'https://tcl-stage-b.myshopify.com/admin/products/4510852907148/metafields.json');
// xhr.onreadystatechange = () => {
// 	if (xhr.readyState == 3) {
// 		setTimeout( () => {
// 			let p = document.createElement('p');
// 			p.innerHTML = 'Loading';
// 			p.classList.add('loading-message');
// 			document.body.append(p);
// 		}, 1000);
// 	} else if (xhr.readyState == 4) {
// 		setTimeout( () => {
// 		let loading = document.querySelector('.loading-message');
// 		loading.remove();

// 		let data = JSON.parse(xhr.responseText);
// 		console.log(data);
// 		add_to_page(data);
// 		}, 2000);
// 	}
// }
// xhr.send();

if (document.getElementById('contact') != undefined || document.getElementById('reservations')) {
  let inputs = document.querySelectorAll('.form-wrapper input');
  let textareas = document.querySelectorAll('.form-wrapper textarea');
  let selects = document.querySelectorAll('.form-wrapper select');

  inputs.forEach(item => {
    item.addEventListener('input', (event) => {
      console.log(event.target, event.target.type, event.target.value, event.target.value.length);
      if (event.target.type == "checkbox") {
        if (event.target.attributes.length <= 2) {
          event.target.setAttribute('checked', 'checked');
          event.target.parentElement.classList.add('input-filled');
        } else {
          event.target.removeAttribute('checked');
          event.target.parentElement.classList.remove('input-filled');
        }
      } else if (event.target.type == "date") {
        if (event.target.value.length > 0 && event.target.type != "checkbox") {
          event.target.nextElementSibling.classList.add('input-filled');
          event.target.classList.add('input-filled');
        } else {
          event.target.nextElementSibling.classList.remove('input-filled');
          event.target.classList.remove('input-filled');
        }
      } else {
        if (event.target.value.length > 0 && event.target.type != "checkbox") {
          event.target.nextElementSibling.classList.add('input-filled');

          // if (event.target)
        } else {
          event.target.nextElementSibling.classList.remove('input-filled');
        }
      }
    });

    item.addEventListener('focusin', (event) => {
      event.target.parentElement.classList.add('active-input');
    })

    item.addEventListener('focusout', (event) => {
      event.target.parentElement.classList.remove('active-input');
    })
  })

  textareas.forEach(item => {
    item.addEventListener('focusin', (event) => {
      let right = event.target.parentElement.querySelector('.right-corner');
      let left = event.target.parentElement.querySelector('.left-corner');
      right.classList.add('active');
      left.classList.add('active');

      event.target.parentElement.childNodes[5].classList.add('input-filled');
    });
  });

  textareas.forEach(item => {
    item.addEventListener('focusout', (event) => {
      let right = event.target.parentElement.querySelector('.right-corner');
      let left = event.target.parentElement.querySelector('.left-corner');
      right.classList.remove('active');
      left.classList.remove('active');

      textarea_value(event);
    });
  });
  
  textareas.forEach(item => {
    item.addEventListener('input', textarea_value);
  })

  function textarea_value(event) {
    if (event.target.value.length > 0) {
      event.target.classList.add('teeee')
      event.target.parentElement.childNodes[5].classList.add('input-filled');
    } else {
      event.target.parentElement.childNodes[5].classList.remove('input-filled');
    }
  }

  selects.forEach(item => {
    item.addEventListener('click', (event) => {
      event.target.nextElementSibling.classList.add('input-filled');
    })
  })
}

// $(document).ready(function() {
//   $('.js-hamburger').click(function(){
//     $('html').addClass('oh');
//     $('.js-nav-dropdown').addClass('active');
//   });

//   $('.js-m-nav-close').click(function(){
//     $('.js-nav-dropdown').removeClass('active');
//     $('html').removeClass('oh');
//   });
// });

// reverse array order and return
function reverse_array(arr) {
  let new_arr = new Array();
  for (let a = arr.length -1; a >= 0; a--) {
    new_arr.push(arr[a]);
  }
  return new_arr;
}

// Mobile Nav Elements
let nav_trigger = document.querySelector('.js-hamburger');
let nav_menu = document.querySelector('.js-nav-dropdown');
let h = document.querySelector('html');
let nav_close = document.querySelector('.js-m-nav-close');
let all_nav_items = nav_menu.querySelectorAll('.m-nav-item');
let reverse_all_nav_items = null;

// Open Mobile Nav
nav_trigger.addEventListener('click', (event) => {
  event.preventDefault();
  
  document.body.classList.add('oh');
  h.classList.add('oh');
  nav_menu.classList.add('active');
  nav_trigger.classList.add('active');

  // Animate Items In
  setTimeout( () => {
    let delays = 0.08;
    all_nav_items.forEach(item => {
      gsap.to(item, {duration: 0.08, opacity: 1, delay: delays, ease: "Quint.easeInOut", x: 0});
      delays += 0.08;
    });
  }, 200);

  // Reverse the order of the nav elements array
  reverse_all_nav_items = reverse_array(all_nav_items);
});

// Close Mobile Nav
nav_close.addEventListener('click', (event) => {
  event.preventDefault();

  let delays = 0.04;
  let full_delay = ((reverse_all_nav_items.length - 1) * delays) * 1000;
  full_delay += 200;

  // Animate Items Out
  reverse_all_nav_items.forEach(item => {
    gsap.to(item, {duration: 0.04, opacity: 0, delay: delays, ease: "Quint.easeInOut", x: -20});
    delays += 0.04;
  });

  setTimeout( () => {
    h.classList.remove('oh');
    document.body.classList.remove('oh');
    nav_menu.classList.remove('active');
    nav_trigger.classList.remove('active');
  }, full_delay);
});

if (document.body.classList.contains('template-cart')) {
  let plus = document.querySelectorAll('.product li .control .plus');
  let minus = document.querySelectorAll('.product li .control .minus'); 
  let control = document.querySelectorAll('.product li .control');

  // Temporary Cart Quantity Update
  control.forEach(item => {
    item.addEventListener('click', event => {
      event.preventDefault();
      
      if (event.target.classList.contains('control-plus')) {
        if (Number(item.textContent) >= 0) {
          let current = Number(item.textContent);
           current += 1;
           item.childNodes[3].innerText = current;
           item.childNodes[7].childNodes[1].value = current;
        } else {
          item.childNodes[3].innerText = 0;
          item.childNodes[7].childNodes[1].value = 0;
        }
      }

      if (event.target.classList.contains('control-minus')) {
        if (Number(item.textContent) != 0) {
          let current = Number(item.textContent);
           current -= 1;
          item.childNodes[3].innerText = current;
          item.childNodes[7].childNodes[1].value = current;
        } else {
          item.childNodes[3].innerText = 0;
          item.childNodes[7].childNodes[1].value = 0;
        }
      }
    });
  })
}

// Fixes ios bottom spacing due to the home button/safari bottom bar
if (navigator.userAgent.includes('iPad') || navigator.userAgent.includes('iPhone')) {
  let cart = document.getElementById('cart-dd');
  let checkout_button = cart.querySelector('.flex2 .button-wrapper');
  checkout_button.classList.add('adjust-form-ios');
}

// let contact_from = document.getElementById('contact_form');
// contact_from.addEventListener('submit', (event) => {
//   event.preventDefault();
//   console.log('stoppped');
// });


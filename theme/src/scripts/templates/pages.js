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

function init_google_map(mapId, lats, long) {
  var map = new google.maps.Map(document.getElementById(mapId), {
    zoom: 15,
    center: {lat: lats, lng: long},
    zoomControl: false,
    mapTypeControl: false,
    mapTypeControl: false,
    scaleControl: false,
    streetViewControl: false,
    rotateControl: false,
    fullscreenControl: false,
  });
}

window.addEventListener('DOMContentLoaded', () => {
  setTimeout( () => {
    init_google_map('home-map', 40.7143614,-74.00774990000001);
  }, 400)
  
})

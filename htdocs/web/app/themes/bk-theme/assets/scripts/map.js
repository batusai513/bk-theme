'use strict';

window.MapFactory = (function map(window, $){
  var mapStyles =[
    {
    featureType: 'poi',
    stylers: [
      { visibility: 'on' }
    ]
    },{
    featureType: 'transit',
    stylers: [
      { visibility: 'on' }
    ]
    },{
    featureType: 'road',
    stylers: [
      { lightness: '50' },
      { visibility: 'on' }
    ]
    },{
    featureType: 'landscape',
    stylers: [
      { lightness: '50' }
    ]
    }
  ];
    var $canvas = null,
        map = null,
        marker = null,
        service = null,
        infowindow = null,
        placeId = 'EjFDbC4gNzIgIzQ1LTY2LCBCYXJyYW5xdWlsbGEsIEF0bMOhbnRpY28sIENvbG9tYmlh',
        request = null,
        mapOptions = {
          zoom: 16,
          center:  new window.google.maps.LatLng(10.9948267,-74.8060464),
          mapTypeId: window.google.maps.MapTypeId.ROADMAP,
          disableDefaultUI: true
        };
    function init(cv){
      $canvas = $(cv);
      if($canvas.length !==0){
        map = new window.google.maps.Map($canvas[0], mapOptions);
        infowindow = new window.google.maps.InfoWindow();
        service = new window.google.maps.places.PlacesService(map);
        request = {
          location: map.getCenter(),
          radius: '500',
          query: 'B&K Constructors'
        };

        service.textSearch(request, callback)

        map.setOptions({
            styles: mapStyles
        });
      }
    }
    function callback(results, status){
      if(status == window.google.maps.places.PlacesServiceStatus.OK){
        var place = results[0];
        marker = new window.google.maps.Marker({
          position: place.geometry.location,
          map: map
        });
        infowindow.setContent(
          '<article>'+
            '<h1 class="zeta flush--bottom">' + place.name + '</h1><br>' +
            '<img style="vertical-align: top;" src="'+ place.photos[0].getUrl({'maxWidth': 65, 'maxHeight': 65}) +'" />' +
            'Direccion: ' + place.formatted_address + '<br>' +
          '</article>'  
        );
        infowindow.open(map, marker);
      }
    }
    return init;
})(window, jQuery);

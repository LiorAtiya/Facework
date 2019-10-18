      // Regular map
      function googleMap(_location1,_location2, _id) {
          this.location1 = _location1;
          this.location2 = _location2;
          this.id = _id;
        var var_location = new google.maps.LatLng(this.location1,this.location2);

        var var_mapoptions = {
            center: var_location,
            zoom: 14
        };

        var var_map = new google.maps.Map(document.getElementById(this.id),
            var_mapoptions);

        var var_marker = new google.maps.Marker({
            position: var_location,
            map: var_map,
            title: "Map"
        });
    }

    // Initialize maps
    google.maps.event.addDomListener(window, 'load',googleMap);

    googleMap(32.601364,35.283235,"map-container1");
    // googleMap(32.803866,35.545906,"map-container2");




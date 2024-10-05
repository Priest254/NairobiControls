
    var map = L.map('map');
    var osmLayer = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors'
    });
    var esriSatelliteLayer = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
        attribution: 'Imagery &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
    });

    // Note: Google Earth Pro layer is for demonstration purposes only and may not comply with Google's terms of service.
    var googleEarthProLayer = L.tileLayer('https://mt1.google.com/vt/lyrs=s&x={x}&y={y}&z={z}', {
        attribution: '© Google',
        maxZoom: 20
    });

    osmLayer.addTo(map);
    var currentLayer = osmLayer;
    var markers = L.markerClusterGroup();

    	function onLocationFound(e) {
            L.marker([e.latlng['lat'],e.latlng['lng']]).addTo(map);
        }

        function onLocationError(e) {
            alert(e.message);
        }

    map.on('locationfound', onLocationFound);
    map.on('locationerror', onLocationError);
    map.locate({setView: true, maxZoom: 20});

        function onLocationFound(e) {
    var radius = e.accuracy / 2;

    var marker = L.marker(e.latlng, { opacity: 1 }).addTo(map);

    L.circle(e.latlng, radius).addTo(map);

    // Function to toggle marker visibility
    function toggleMarker() {
        var currentOpacity = marker.options.opacity;
        if (currentOpacity > 0) {
            marker.setOpacity(0);
        } else {
            marker.setOpacity(1);
        }
    }

    // Set the interval to toggle the marker visibility
    setInterval(toggleMarker, 1000); // 1000 milliseconds = 1 second
}

//map.on('locationfound', onLocationFound);

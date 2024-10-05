markers = L.markerClusterGroup();
// Load and parse the CSV using Papa
Papa.parse('../back-end/data/Nairobi.csv',
{
    download: true,
    header: true,
    complete: function(results) {
        results.data.forEach(function(point) {
            var marker = L.marker([parseFloat(point.Y), parseFloat(point.X)]) .addTo(map);
            markers.addLayer(marker);
            map.addLayer(markers);

            var imDir1 = "images/" + point.Station + "(1).jpeg";
            var imDir2 = "images/" + point.Station + "(2).jpeg";

            // Check if image directories exist, otherwise use placeholder images
            var img1Exists = imageExists(imDir1);
            if (img1Exists == "Not Okay"){
              imDir1 = "images/NotFound.jpg"
            }
            else{
              imDir1 = imDir1
            }


            var img2Exists = imageExists(imDir2);
            if (img2Exists == "Not Okay"){
              imDir2 = "images/NotFound.jpg"
            }
            else{
              imDir2 = imDir2
            }



            var popupinfo = (
              // Previous slide button
              '<button onclick="prevSlide()" style="position: absolute; top: 25%; left: 0px; transform: translateY(70%); z-index: 1;">&lt;</button>' +
              // Next slide button
              '<button onclick="nextSlide()" style="position: absolute; top: 25%; right: 10px; transform: translateY(70%); z-index: 1;">&lt;</button>' +
              // Image container
              '<div class="photo-container">' +
              '<img class="popup-image" src="'+ imDir1 +'" alt="Image" style="display: block; width: 200px; height: 200px; border-radius: 5px; cursor: zoom-in;">' +
              '<img class="popup-image" src="'+ imDir2 +'" alt="Image" style="display: none; width: 200px; height: 200px; border-radius: 5px; cursor: zoom-in;">' +
              '</div>' +
              '<strong>Name:</strong> ' + point["Station Name"] + '<br>' +
              '<strong>Id:</strong> ' + point["Station"] + '<br>' +
              '<div style="background-color: #007BFF; color: white; padding: 10px; border-radius: 5px;">' +
              '<strong>Datum:</strong> ' + point["Datum"]+ '<br>' +
              '<strong>Northings (Y):</strong> ' + point["Northings"] + '<br>' +
              '<strong>Eastings (X):</strong> ' + point["Eastings"] + '<br>' +
              '<strong>Height (Z):</strong> ' + point["Heights"] +
              '</div>' +
              '<div style="margin-top: 10px;">' +
              '<div style="background-color: #D3D3D3; color: green; padding: 10px; border-radius: 5px;">' +
              '<strong>Longitude:</strong> ' + point["X"] + '<br>' +
              '<strong>Latitude:</strong>' + point["Y"] + '<br>' +
              '<strong>Description:</strong> ' + point["Type"] + '<br>' +
              '<strong>Status:</strong> ' + point["Condition"] + '<br>' +
              '<strong>Data Source:</strong> ' + point["Source"] + '<br>' +
              '<strong>Review:</strong>' + point["Reviews"] +
              '</div>' +
              '<br><button onclick="navigateToGoogleMaps(' + point.Y + ', ' + point.X + ')">Go To</button>' +
              '<button class="btn" style="background-color: #4CAF50; color: white; margin-left: 10px;" onclick="downloadPopupContent()">' +
              ' Download' +
              '</button>' +
              '<button onclick="updateReview(\'' + point.Station + '\')" >' + // Corrected line
              'Review' +
              '</button>'
          );


              marker.bindPopup(popupinfo);

      });
        }
})

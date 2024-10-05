function toggleMapLayer() {
    if (currentLayer === osmLayer) {
        map.removeLayer(osmLayer);
        esriSatelliteLayer.addTo(map);
        currentLayer = esriSatelliteLayer;
    } else if (currentLayer === esriSatelliteLayer) {
        map.removeLayer(esriSatelliteLayer);
        googleEarthProLayer.addTo(map);
        currentLayer = googleEarthProLayer;
    } else {
        map.removeLayer(googleEarthProLayer);
        osmLayer.addTo(map);
        currentLayer = osmLayer;
    }
}


function navigateToGoogleMaps(latitude, longitude)
 {
    var googleMapsUrl = 'https://www.google.com/maps?q=' + latitude + ',' + longitude;
     window.open(googleMapsUrl, '_blank');
}

// Function to toggle marker visibility
function toggleMarker() {
    var currentOpacity = marker.options.opacity;
    if (currentOpacity > 0) {
        marker.setOpacity(0);
    } else {
        marker.setOpacity(1);
    }
}

function downloadPopupContent()
 {
    // Get the popup content
    var popupContent = document.querySelector('.leaflet-popup-content');

    // Clone the popup content to avoid modifying the original
    var clonedContent = popupContent.cloneNode(true);
// Create a header with a table that includes a logo in the first cell
var header = document.createElement('div');
header.innerHTML = `
<style>
.header-table {
width: 100%; /* Full width of the container */
border-collapse: collapse; /* Removes the double border */
}
.header-table td {
border: 1px solid black;
padding: 8px;
vertical-align: middle; /* Aligns content to the middle vertically */
word-wrap: break-word; /* Ensures words wrap */
min-width: 160px; /* Minimum width for each cell */
}
</style>
<table class="header-table">
<tr>
<td>GEODETIC MARKER DESCRIPTION SHEET</td>
<td> KENYAN CONTROL NETWORK</td>
<td> NAIROBI AREA</td>
</tr>
</table>
`;
header.style.textAlign = 'center';
// Insert the header at the beginning of the cloned content
clonedContent.insertBefore(header, clonedContent.firstChild);

        var footer = document.createElement('div');
footer.innerHTML = `
<style>
.responsive-table {
width: 100%; /* Full width of the container */
border-collapse: collapse; /* Removes the double border */
}
.responsive-table td {
border: 1px solid black;
padding: 8px;
vertical-align: top; /* Aligns content to the top */
word-wrap: break-word; /* Ensures words wrap */
min-width: 180px; /* Set a minimum width for each cell */
}
</style>
<table class="responsive-table">
<tr>
<td>Datum: RGS Ellipsoid
     GRS80 Semi-major axis:
     6 378 249.145 m Semi-minor axis:
     6 356 514.866 m Inverse flattening (1/f):
     298.25722</td>
<td>Contact Agency: Ministry of Lands, Housing, and Urban Development. 1st Ngong Avenue, Nairobi, Nairobi</td>
<td>Projection: Transverse Mercator<br>
    Central Meridian: 39°E<br>
    Scale Factor: 0.9996<br>
    False Easting: 500,000 m<br>
    False Northing: 10,000,000 m</td>
</tr>
</table>
`;
footer.style.textAlign = 'center';
clonedContent.appendChild(footer);

    // Remove the buttons from the cloned content
    var buttons = clonedContent.querySelectorAll('button');
    buttons.forEach(function(button) {
        button.parentNode.removeChild(button);
    });

    // Get the images and place them side by side
    var images = clonedContent.querySelectorAll('.popup-image');
    var imageContainer = document.createElement('div');
    imageContainer.style.display = 'flex';
    imageContainer.style.justifyContent = 'center';
    images.forEach(function(image) {
        image.style.display = 'block';
        image.style.margin = '10 -40px'; // Add some space between the images
        imageContainer.appendChild(image);
    });

    clonedContent.querySelector('.photo-container').appendChild(imageContainer);

    // Center the rest of the information
    var infoContainers = clonedContent.querySelectorAll('div');
infoContainers.forEach(function(container) {
container.style.textAlign = 'center';
container.style.fontFamily = 'Arial, sans-serif'; // Use a consistent font
container.style.color = '#333'; // Use a consistent color
container.style.padding = '0px'; // Add padding for better spacing
container.style.fontSize = '16px'; // Set font size
container.style.lineHeight = '1.5'; // Set line height for readability
container.style.backgroundColor = '#f9f9f9'; // Add a light background color
container.style.border = '1px solid #ddd'; // Add a border for separation
container.style.marginBottom = '10px'; // Add margin at the bottom
});

    // Create a new style element
    var style = document.createElement('style');
    style.innerHTML = `
        body, html {
            height: 100%;
            margin: 0;
            font-family: Arial, sans-serif; // Use a consistent font
            color: #333; // Use a consistent color
        }

        #map {
            height: 100%;
            z-index: 0;
        }

        .reviews-text {
            margin-top: 10px;
            color: #5f9ea0;
            text-decoration: underline;
            cursor: pointer;
        }

        .review-input {
            display: none;
            width: 100%;
            margin-top: 10px;
        }
    `;

    // Append the style element to the cloned content
    clonedContent.appendChild(style);

    // Use html2pdf to create a PDF
    var opt = {
        margin:       1,
        filename:     'popupContent.pdf',
        image:        { type: 'jpeg', quality: 0.98 },
        html2canvas:  { scale: 2 },
        jsPDF:        { unit: 'in', format: 'letter', orientation: 'portrait' }
    };

    // New Promise-based usage:
    html2pdf().set(opt).from(clonedContent).save();
}

var slideshowIndex = 0; // Variable to keep track of the current image index in the slideshow

// Navigate to the next image in the slideshow
function nextSlide() {
  var images = document.querySelectorAll('.popup-image');
  images[slideshowIndex].style.display = 'none'; // Hide the current image
  slideshowIndex = (slideshowIndex + 1) % images.length; // Increment index and loop back if needed
  images[slideshowIndex].style.display = 'block'; // Display the next image
}

  // Navigate to the previous image in the slideshow
  function prevSlide() {
    var images = document.querySelectorAll('.popup-image');
    images[slideshowIndex].style.display = 'none'; // Hide the current image
    slideshowIndex = (slideshowIndex - 1 + images.length) % images.length; // Decrement index and loop back if needed
    images[slideshowIndex].style.display = 'block'; // Display the previous image
  }

  // Search for available controls
  function searchControl() {
      var controlName = prompt("Enter control point name:");
      if (controlName === null || controlName.trim() === '') return; // Exit if user cancels or leaves the input empty

      shp("../back-end/data/Nairobi").then(function(geojson) {
          var controlFound = false;
          geojson.features.forEach(function(feature) {
              var properties = feature.properties;
              if (properties && properties.Station === controlName.trim()) {
                  controlFound = true;
                  map.flyTo([parseFloat(properties.Y), parseFloat(properties.X)], 16);
                  // Zoom to the location if the point exists
              }
          });

          // Notify the user if the control point is not found
          if (!controlFound) {
              alert("Control point not found in the dataset.");
          }
      }).catch(function(error) {
          console.error(error);
      });
  }

  // Function to open the popup when the "Add Information" button is clicked
  //document.getElementById('addInfoBtn').onclick =
  function popMeUp () {
    document.getElementById('infoPopup').style.display = 'block';
  };

  // Function to handle the review input and update GeoJSON data
  function handleReviewInput(feature) {
      const review = prompt('Enter your review:');
      if (review !== null && review.trim() !== '') {
          feature.properties.Reviews = review.trim();
          console.log('Review updated:', review);
          // You can add code here to update the CSV or perform any other actions
          updateCSV(); // Placeholder function for updating CSV data
      } else {
          console.log('Review not provided or canceled.');
      }
  }

  // Define the updateReview function
  function updateReview(x) {
    // Create a pop-up modal for inputting review
    var reviewInput = prompt("Please enter your review:");

    if (reviewInput !== null) { // Check if the user clicked OK or Cancel
      // Get the point ID or any unique identifier (assuming point["Station"] contains it)
      console.log("UR: Forwarding to updater");
      // Send the review data to the server using AJAX
      sendReviewToServer(x, reviewInput);
      console.log("UR: Forwarded successfully");
    }
  }

  // Function to send review data to the server using AJAX
  function sendReviewToServer(pointId, review) {
    // Create a new XMLHttpRequest object
    var xhr = new XMLHttpRequest();
    console.log("STS: Receiving request to contact server ");

    // Define the request parameters for localhost
    xhr.open("POST", "http://127.0.0.1:5000/submit-review", true);
    console.log("STS: Receiced successfully");

    // Set the request header if needed (e.g., content-type)
    xhr.setRequestHeader("Content-Type", "application/json");

    // Define the data to send to the server (in this case, sending JSON data)
    console.log("STS: Preparing submission to Server");
    var data = JSON.stringify({ pointId: pointId, review: review });
    console.log("STS: Prepared data successfully");

    // Set up the callback function when the request is complete
    xhr.onreadystatechange = function() {
      if (xhr.readyState === XMLHttpRequest.DONE) {
        if (xhr.status === 200) {
          console.log("STS: Review submitted successfully!");
          // Optionally, perform any additional actions upon successful submission
        } else {
          console.error("STS: Error submitting review:", xhr.statusText);
          // Optionally, handle errors or display an error message to the user
        }
      }
    };

    // Send the data to the server
    xhr.send(data);
    console.log("STS: Submitted to server")
  }

// Async function to fetch and parse CSV data
async function fetchCSVData() {
    try {
        // Fetch the CSV file (replace with your actual URL)
        const response = await fetch('../back-end/data/Nairobi.csv');
        const csvText = await response.text();

        // Parse the CSV data using Papa Parse
        const parsedData = Papa.parse(csvText, {
            header: true, // Set this to true if your CSV has a header row
            skipEmptyLines: true, // Skip empty lines
        });

        return parsedData.data;
    } catch (error) {
        console.error('Error fetching or parsing CSV data:', error);
        return null;
    }
}

var isTableControl = false; // Variable to track the visibility state of the table

// Function to show all controls and populate table with data
async function showAllControls() {
    const tabulatedDataContainer = document.getElementById('tabulatedData');
    const dataTable = document.getElementById('dataTable');

    try {
        const csvData = await fetchCSVData(); // Fetch CSV data

        if (csvData && csvData.length > 0) {
            // Convert CSV data to GeoJSON format
            const geojson = {
                type: 'FeatureCollection',
                features: csvData.map(item => ({
                    type: 'Feature',
                    geometry: {
                        type: 'Point',
                        coordinates: [parseFloat(item.X), parseFloat(item.Y)],
                    },
                    properties: item,
                })),
            };

            // Toggle visibility of tabulated data container
            if (isTableControl) {
                // If table is visible, hide it
                tabulatedDataContainer.style.display = 'none';
                isTableControl = false;
            } else {
                // If table is hidden, show it and populate data
                tabulatedDataContainer.style.display = 'block';
                isTableControl = true;

            // Populate table with data from GeoJSON
            let tableHTML = `
                <tr id="tr1">
                    <th>Area</th>
                    <th>Station</th>
                    <th>Reviews</th>
                    <th class="invisible-column">X</th>
                    <th class="invisible-column">Y</th>
                </tr>
            `;
            // Sort the features array by the "Station Name" property
            geojson.features.sort((a, b) => a.properties['Station Name'].localeCompare(b.properties['Station Name']));

            geojson.features.forEach(feature => {
                tableHTML += `
                    <tr>
                        <td>${feature.properties['Station Name']}</td>
                        <td>${feature.properties['Station']}</td>
                        <td>${feature.properties['Reviews']}</td>
                        <td class="invisible-column">${feature.properties['X']}</td>
                        <td class="invisible-column">${feature.properties['Y']}</td>
                    </tr>
                `;
            });
            dataTable.innerHTML = tableHTML;

            // Toggle visibility of tabulated data container
            tabulatedDataContainer.style.display = 'block';
          }

        } else {
            console.log('CSV data is empty or invalid.');
        }
    } catch (error) {
        console.error('Error processing CSV data:', error);
    }
}

// Function to check if an image exists at the specified URL
function imageExists(url) {
    var http = new XMLHttpRequest();
    http.open('HEAD', url, false);
    http.send();
    if (http.status == 200){
      return "Okay"
    }
    else{
     return  "Not Okay"
    }
}

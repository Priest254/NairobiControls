// fetch.js
async function fetchShapefileData() {
    try {
        const response = await fetch('/shapefileData'); // Fetch shapefile data from server
        if (!response.ok) {
            throw new Error('Failed to fetch shapefile data.');
        }
        const geojson = await response.json(); // Parse JSON response
        return geojson;
    } catch (error) {
        console.error('Error fetching shapefile data:', error);
        return null;
    }
}

async function showAllControls() {
    const tabulatedDataContainer = document.getElementById('tabulatedData');
    const dataTable = document.getElementById('dataTable');
    const geojson = await fetchShapefileData(); // Fetch shapefile data

    if (geojson) {
        // Display tabulated data container
        tabulatedDataContainer.style.display = 'block';

        // Populate table with data from GeoJSON (customize as needed)
        dataTable.innerHTML = `
            <tr>
                <th>ID</th>
                <th>Name</th>
                <!-- Add more columns as needed -->
            </tr>
            ${geojson.features.map(feature => `
                <tr>
                    <td>${feature.properties.id}</td>
                    <td>${feature.properties.name}</td>
                    <!-- Add more properties as needed -->
                </tr>
            `).join('')}
        `;
    } else {
        // Handle error or display message to user
        console.log('Failed to fetch shapefile data.');
    }
}

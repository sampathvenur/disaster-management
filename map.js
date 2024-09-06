document.getElementById('sosButton').addEventListener('click', () => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(async (position) => {
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;

            const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}`);
            const data = await response.json();
            const city = data.address.city || data.address.town || data.address.village || 'Unknown';

            fetch('http://localhost:5000/api/sos', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ latitude, longitude, city }),
            })
            .then(response => response.json())
            .then(data => {
                alert('SOS sent successfully!');
                console.log('SOS data:', data);
                updateReports();
            })
            .catch(error => {
                console.error('Error sending SOS:', error);
            });
        }, (error) => {
            console.error('Error getting location:', error);
            alert('Unable to fetch your location.');
        });
    } else {
        alert('Geolocation is not supported by your browser.');
    }
});

function updateReports() {
    fetch('http://localhost:5000/api/sos')
        .then(response => response.json())
        .then(data => {
            const reportsList = document.querySelector('#reports-list');
            reportsList.innerHTML = '';
            data.forEach(sos => {
                const listItem = document.createElement('li');
                listItem.innerHTML = `<a href="https://www.openstreetmap.org/?mlat=${sos.latitude}&mlon=${sos.longitude}">SOS in ${sos.city}</a>`;
                reportsList.appendChild(listItem);
            });
        })
        .catch(error => {
            console.error('Error fetching SOS data:', error);
        });
}

document.addEventListener('DOMContentLoaded', updateReports);

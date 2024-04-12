// Function to fetch and display seasons
function fetchSeasons() {
  const dnames=document.getElementById('driverInfo');
  dnames.innerHTML = ''; // Clear previous driver info
  const seasonInfoContainer = document.getElementById('seasonInfo');
  seasonInfoContainer.innerHTML = ''; // Clear previous season info

  fetch('https://ergast.com/api/f1/seasons.json?limit=100')
  .then(response => response.json())
  .then(data => {
    const seasons = data.MRData.SeasonTable.Seasons.reverse(); // Reverse to display latest season first
    seasons.forEach(season => {
      const seasonInfo = document.createElement('div'); // Create div for each season
      seasonInfo.innerHTML = `
      <div class = 'seasonCard'>
        <h3>${season.season}</h3>
        <p>Click to view races</p>
       </div>
      `;
      seasonInfo.addEventListener('click', () => { // Add event listener to fetch races for clicked season
        fetchRaces(season.season);
      });
      seasonInfoContainer.appendChild(seasonInfo); // Append season info to container
    });
  })
  .catch(error => {
    console.error('Error fetching seasons:', error);
  });
}

// Function to clear home page content
function clearHome(){
  const driver = document.getElementById('driverInfo');
  const season = document.getElementById('seasonInfo'); 
  driver.innerHTML = ''; // Clear driver info
  season.innerHTML = ''; // Clear season info
} 

// Function to fetch and display races for a given season
function fetchRaces(season) {
  const driverInfoContainer = document.getElementById('seasonInfo');
  driverInfoContainer.innerHTML = ''; // Clear previous race info

  fetch(`https://ergast.com/api/f1/${season}/results.json`)
  .then(response => response.json())
  .then(data => {
    const races = data.MRData.RaceTable.Races;
    races.forEach(race => {
      const raceInfo = document.createElement('div'); // Create div for each race
      raceInfo.innerHTML = `
      <div class='raceCard'>
        <h3>${race.raceName}</h3>
        <p>Circuit: ${race.Circuit.circuitName}</p>
        <p>Date: ${race.date}</p>
        </div>
      `;
      driverInfoContainer.appendChild(raceInfo); // Append race info to container
    });
  })
  .catch(error => {
    console.error('Error fetching races:', error);
  });
}

// Function to search for a driver and display their information
function searchDriver() {
  const seasonInfoContainer = document.getElementById('seasonInfo');
  const searchInput = document.getElementById('searchInput').value;
  const driverInfoContainer = document.getElementById('driverInfo');
  const errorMessage = document.getElementById('errorMessage');
  driverInfoContainer.innerHTML = ''; // Clear previous driver info
  seasonInfoContainer.innerHTML = ''; // Clear season info
  errorMessage.style.display = 'none'; // Hide error message initially

  fetch(`https://ergast.com/api/f1/drivers/${searchInput}.json`)
  .then(response => response.json())
  .then(data => {
    const driver = data.MRData.DriverTable.Drivers[0]; // Get the first driver (assuming exact match)
    if (driver) {
      const driverInfo = document.createElement('div'); // Create div for driver info
      driverInfo.innerHTML = `
        <h2>${driver.givenName} ${driver.familyName}</h2>
        <p>Nationality: ${driver.nationality}</p>
        <p>Date of Birth: ${driver.dateOfBirth}</p>
        <p>Permanent Number: ${driver.permanentNumber || 'N/A'}</p>
      `;
      driverInfoContainer.appendChild(driverInfo); // Append driver info to container
    } else {
      errorMessage.style.display = 'block'; // Display error message if driver not found
    }
  })
  .catch(error => {
    console.error('Error fetching driver info:', error);
  });
}

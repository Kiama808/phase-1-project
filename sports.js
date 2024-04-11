function fetchSeasons() {
    const dnames=document.getElementById('driverInfo');
    dnames.innerHTML = '';
    const seasonInfoContainer = document.getElementById('seasonInfo');
    seasonInfoContainer.innerHTML = ''; 
  
    fetch('https://ergast.com/api/f1/seasons.json?limit=100')
    .then(response => response.json())
    .then(data => {
      const seasons = data.MRData.SeasonTable.Seasons.reverse(); 
      seasons.forEach(season => {
        const seasonInfo = document.createElement('div');
        seasonInfo.innerHTML = `
        <div class = 'seasonCard'>
          <h3>${season.season}</h3>
          <p>Click to view races</p>
         </div>
        `;
        seasonInfo.addEventListener('click', () => {
          fetchRaces(season.season);
        });
        seasonInfoContainer.appendChild(seasonInfo);
      });
    })
    .catch(error => {
      console.error('Error fetching seasons:', error);
    });
  }
  
  
  function fetchRaces(season) {
    const driverInfoContainer = document.getElementById('seasonInfo');
    driverInfoContainer.innerHTML = '';
  
    fetch(`https://ergast.com/api/f1/${season}/results.json`)
    .then(response => response.json())
    .then(data => {
      const races = data.MRData.RaceTable.Races;
      races.forEach(race => {
        const raceInfo = document.createElement('div');
        raceInfo.innerHTML = `
          <h3>${race.raceName}</h3>
          <p>Circuit: ${race.Circuit.circuitName}</p>
          <p>Date: ${race.date}</p>
        `;
        driverInfoContainer.appendChild(raceInfo);
      });
    })
    .catch(error => {
      console.error('Error fetching races:', error);
    });
  }
  
  
  function searchDriver() {
    const seasonInfoContainer = document.getElementById('seasonInfo');
    const searchInput = document.getElementById('searchInput').value;
    const driverInfoContainer = document.getElementById('driverInfo');
    const errorMessage = document.getElementById('errorMessage');
    driverInfoContainer.innerHTML = ''; 
    seasonInfoContainer.innerHTML = '';
    errorMessage.style.display = 'none'; 
  
    fetch(`https://ergast.com/api/f1/drivers/${searchInput}.json`)
    .then(response => response.json())
    .then(data => {
      const driver = data.MRData.DriverTable.Drivers[0];
      if (driver) {
        const driverInfo = document.createElement('div');
        driverInfo.innerHTML = `
          <h2>${driver.givenName} ${driver.familyName}</h2>
          <p>Nationality: ${driver.nationality}</p>
          <p>Date of Birth: ${driver.dateOfBirth}</p>
          <p>Permanent Number: ${driver.permanentNumber || 'N/A'}</p>
        `;
        driverInfoContainer.appendChild(driverInfo);
      } else {
        errorMessage.style.display = 'block'; 
      }
    })
    .catch(error => {
      console.error('Error fetching driver info:', error);
    });
  }
  
document.getElementById('fetch-button').addEventListener('click', fetchData);

setInterval(fetchData, 10000);

async function fetchData() {
  renderLoadingState();
  try {
    const response = await fetch('http://localhost:5050/users');
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    renderData(data);
  } catch (error) {
    console.error(error);
    renderErrorState();
  }
}

function renderErrorState() {
  const container = document.getElementById('data-container');
  container.innerHTML = '<p>Failed to load data</p>';
}

function renderLoadingState() {
  const container = document.getElementById('data-container');
  container.innerHTML = '<p>Loading...</p>';
}

function renderData(data) {
  const container = document.getElementById('data-container');
  container.innerHTML = '';

  if (data.players.length > 0) {
    data.players.forEach((player) => {
      const div = document.createElement('div');
      div.className = 'result-item';

      // Image mapping based on move
      const moveImages = {
        rock: 'images/Rock.png',
        paper: 'images/Page.png',
        scissors: 'images/Scissors.png',
      };

      div.innerHTML = `
        <img src="${moveImages[player.move]}" alt="${player.move}">
        <p>${player.name} chose ${player.move}</p>`;
      container.appendChild(div);
    });

    const winnerDiv = document.createElement('div');
    winnerDiv.className = 'result-item';
    winnerDiv.innerHTML = `<h2>Winner: ${data.winner}</h2>`;
    container.appendChild(winnerDiv);
  } else {
    container.innerHTML = '<p>No game in progress.</p>';
  }
}


// document.getElementById('fetch-button').addEventListener('click', fetchData);

// setInterval(fetchData, 10000);

// async function fetchData() {
// 	renderLoadingState();
// 	try {
// 		const response = await fetch('http://localhost:5050/users');
// 		if (!response.ok) {
// 			throw new Error('Network response was not ok');
// 		}
// 		const data = await response.json();
// 		renderData(data);
// 	} catch (error) {
// 		console.error(error);
// 		renderErrorState();
// 	}
// }

// function renderErrorState() {
// 	const container = document.getElementById('data-container');
// 	container.innerHTML = ''; // Clear previous data
// 	container.innerHTML = '<p>Failed to load data</p>';
// 	console.log('Failed to load data');
// }

// function renderLoadingState() {
// 	const container = document.getElementById('data-container');
// 	container.innerHTML = ''; // Clear previous data
// 	container.innerHTML = '<p>Loading...</p>';
// 	console.log('Loading...');
// }

// function renderData(data) {
// 	const container = document.getElementById('data-container');
// 	container.innerHTML = ''; // Clear previous data

// 	if (data.players.length > 0) {
// 		data.players.forEach((player) => {
// 			const div = document.createElement('div');
// 			div.className = 'item';
// 			div.innerHTML = `<p>${player.name} chose ${player.move}</p>`;
// 			container.appendChild(div);
// 		});
// 		const winnerDiv = document.createElement('div');
// 		winnerDiv.className = 'item';
// 		winnerDiv.innerHTML = `<h2>Winner: ${data.winner}</h2>`;
// 		container.appendChild(winnerDiv);
// 	} else {
// 		container.innerHTML = '<p>No players found.</p>';
// 	}
// }



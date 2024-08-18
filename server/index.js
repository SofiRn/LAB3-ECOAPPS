const express = require('express');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

let currentGame = {
  players: [],
  winner: null,
};

app.get('/users', (req, res) => {
  res.send(currentGame);
});

app.post('/user', (req, res) => {
  const { name, move } = req.body;
  const existingPlayer = currentGame.players.find(player => player.name === name);

  if (existingPlayer) {
    existingPlayer.move = move;
  } else {
    currentGame.players.push({ name, move });
  }

  if (currentGame.players.length === 2) {
    const winner = determineWinner(currentGame.players[0], currentGame.players[1]);
    currentGame.winner = winner;
    res.status(201).send({ message: 'Game Over', winner });

    // Reset the game after sending the response
    setTimeout(() => {
      currentGame = { players: [], winner: null };
    }, 5000);
  } else {
    res.status(201).send({ message: 'Move received' });
  }
});

function determineWinner(player1, player2) {
  const resultMap = {
    rock: { scissors: 'win', paper: 'lose' },
    paper: { rock: 'win', scissors: 'lose' },
    scissors: { paper: 'win', rock: 'lose' },
  };

  if (player1.move === player2.move) return 'Draw';
  return resultMap[player1.move][player2.move] === 'win' ? player1.name : player2.name;
}

app.listen(5050, () => {
  console.log(`Server is running on http://localhost:5050`);
});

// const express = require('express');
// const cors = require('cors');

// const app = express();
// app.use(express.json());
// app.use(cors());

// const db = {
//   players: [],
// };

// app.get('/users', (req, res) => {
//   res.send(db);
// });

// app.post('/user', (req, res) => {
//   const { name, move } = req.body;
//   const existingPlayer = db.players.find(player => player.name === name);
//   // db.players.push(body);

//   if (existingPlayer) {
//     existingPlayer.move = move; // Update the move if the player exists
//   } else {
//     db.players.push({ name, move });
//   }

//   if (db.players.length === 2) {
//     const winner = determineWinner(db.players[0], db.players[1]);
//     db.winner = winner;
//     res.status(201).send({ message: 'Game Over', winner });
//   } else {
//     res.status(201).send({ message: 'Move received' });
//   }
//   //   res.status(201).send({ message: 'Game Over', winner });
//   //   db.players = []; // Reset for next game
//   // } else {
//   //   res.status(201).send(body);
//   // }
// });

// function determineWinner(player1, player2) {
//   const moves = ['rock', 'paper', 'scissors'];
//   const resultMap = {
//     rock: { scissors: 'win', paper: 'lose' },
//     paper: { rock: 'win', scissors: 'lose' },
//     scissors: { paper: 'win', rock: 'lose' },
//   };

//   if (player1.move === player2.move) return 'Draw';
//   return resultMap[player1.move][player2.move] === 'win'
//     ? player1.name
//     : player2.name;
// }

// app.listen(5050, () => {
//   console.log(`Server is running on http://localhost:5050`);
// });


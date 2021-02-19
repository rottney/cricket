import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

function Square(props) {
  return (
    <button className="square" onClick={props.onClick}>
      {props.value}
    </button>
  );
}


class Board extends React.Component {
  constructor(props) {
    super(props);
    const NUM_PLAYERS = 2;  // will be provided...
    this.state = {
      squares: Array(7*NUM_PLAYERS).fill(null),
      scores: Array(NUM_PLAYERS).fill(0),
      closedAll: Array(NUM_PLAYERS).fill(false),
      won: Array(NUM_PLAYERS).fill(false),
    };
  }

  handleClick(i) {
    const NUM_PLAYERS = 2;  // I need to figure out how to refactor this...
    const squares = this.state.squares.slice();
    let scores = this.state.scores;
    let closedAll = this.state.closedAll;
    let won = this.state.won;

    if (this.state.squares[i] === null) {
      squares[i] = "/";
    }
    else if (this.state.squares[i] === "/") {
      squares[i] = "X";
    }
    else if (this.state.squares[i] === "X") {
      squares[i] = "Ⓧ";
    }
    else {
      scores = getScores(scores, squares, i, NUM_PLAYERS);
    }

    // Probably refactor this...
    closedAll[0] = true;
    for (let i = 0; i <= 12; i += 2) {
      if (squares[i] !== "Ⓧ") {
        closedAll[0] = false;
        i = 12;
      }
    }

    closedAll[1] = true;
    for (let i = 1; i <= 13; i += 2) {
      if (squares[i] !== "Ⓧ") {
        closedAll[1] = false;
        i = 13;
      }
    }

    this.setState(
      {
        squares: squares,
        scores: scores,
        closedAll: closedAll,
        won: won,
      }
    );
  }

  renderSquare(i) {
    return (
      <Square 
        value={this.state.squares[i]}
        onClick={() => this.handleClick(i)}
      />
    );
  }

  render() {
    // THIS WILL BE IN STATE
    const NUM_PLAYERS = 2;

    // Generate team names
    let teamNames = [];
    for (let i = 1; i <= NUM_PLAYERS; i++) {
      teamNames.push(<div className="score">Player {i}</div>);
    }

    // Generate board
    let board = [];

    for (let i = 0; i < 7; i++) {
      let row = [];

      for (let j = 0; j < NUM_PLAYERS; j++) {
        row.push(this.renderSquare(2*i + j));
      }

      let rowTag = 20 - i;
      if (rowTag === 14) {
        rowTag = "B";
      }

      board.push(<div className="board-row">{row} &emsp; {rowTag}</div>);
    }

    // Generate scores
    let scores = [];
    for (let i = 0; i < NUM_PLAYERS; i++) {
      scores.push(<div className="score">{this.state.scores[i]}</div>)
    }

    // Determine winner
    const winner = (
      <div className="status">
        {declareWinner(this.state.closedAll, this.state.scores)}
      </div>
    );

    return(
      <div>
        <div>{teamNames}</div>
        <div>{board}</div>
        <div>{scores}</div>
        <div>{winner}</div>
      </div>
    );
  }
}


class Game extends React.Component {
  render() {
    return (
      <div className="game">
        <div className="game-board">
          <Board />
        </div>
        <div className="game-info">
          <div>{/* status */}</div>
          <ol>{/* TODO */}</ol>
        </div>
      </div>
    );
  }
}

// ========================================

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);


function getScores(scores, squares, i, numPlayers) {
  if (numPlayers === 2) {
    return getScoresRegular(scores, squares, i);
  }

  return getScoresCutthroat(scores, squares, i, numPlayers);
}


function getScoresRegular(scores, squares, i) {
  if (i % 2 === 0 && squares[i + 1] !== "Ⓧ") {
    if (i === 12) {
      scores[0] += 25;
    }
    else {
      scores[0] += 20 - i/2;
    }
  }

  if (i % 2 === 1 && squares[i - 1] !== "Ⓧ"){
    if (i === 13) {
      scores[1] += 25;
    }
    else {
      scores[1] += 20 - (i - 1)/2;
    }
  }

  return scores;
}


function getScoresCutthroat(scores, squares, i, numPlayers) {
  // implementMe
  return scores;
}


function declareWinner(closedAll, scores) {
  // ONLY WORKS FOR 2 PLAYERS NOW
  if (closedAll[0] && scores[0] >= scores[1]) {
    return "Player 1 wins.";
  }

  if (closedAll[1] && scores[1] >= scores[0]) {
    return "Player 2 wins.";
  }

  return "";
}

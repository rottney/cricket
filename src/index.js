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
      if (i === 0 && squares[i + 1] !== "Ⓧ") {
        scores[0] += 20;
      }
      else if (i === 1 && squares[i - 1] !== "Ⓧ") {
        scores[1] += 20;
      }
      else if (i === 2 && squares[i + 1] !== "Ⓧ") {
        scores[0] += 19;
      }
      else if (i === 3 && squares[i - 1] !== "Ⓧ") {
        scores[1] += 19;
      }
      else if (i === 4 && squares[i + 1] !== "Ⓧ") {
        scores[0] += 18;
      }
      else if (i === 5 && squares[i - 1] !== "Ⓧ") {
        scores[1] += 18;
      }
      else if (i === 6 && squares[i + 1] !== "Ⓧ") {
        scores[0] += 17;
      }
      else if (i === 7 && squares[i - 1] !== "Ⓧ") {
        scores[1] += 17;
      }
      else if (i === 8 && squares[i + 1] !== "Ⓧ") {
        scores[0] += 16;
      }
      else if (i === 9 && squares[i - 1] !== "Ⓧ") {
        scores[1] += 16;
      }
      else if (i === 10 && squares[i + 1] !== "Ⓧ") {
        scores[0] += 15;
      }
      else if (i === 11 && squares[i - 1] !== "Ⓧ") {
        scores[1] += 15;
      }
      else if (i === 12 && squares[i + 1] !== "Ⓧ") {
        scores[0] += 25;
      }
      else if (i === 13 && squares[i - 1] !== "Ⓧ") {
        scores[1] += 25;
      }
      else {
        console.log("Invalid cell clicked...how is this even possible??")
      }
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

    for (let i = 0; i < 6; i++) {
      let row = [];
      row.push(
        <div>
          {this.renderSquare(2*i)}
          {this.renderSquare(2*i + 1)}
          &emsp; {20 - i}
        </div>
      );

      board.push(<div className="board-row">{row}</div>);
    }
    for (let i = 6; i < 7; i++) {
      let row = [];
      row.push(
        <div>
          {this.renderSquare(2*i)}
          {this.renderSquare(2*i + 1)}
          &emsp; B
        </div>
      );

      board.push(<div className="board-row">{row}</div>)
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

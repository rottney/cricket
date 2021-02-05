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
    this.state = {
      squares: Array(14).fill(null),
      player1Score: 0,
      player2Score: 0,
      player1ClosedAll: false,
      player2ClosedAll: false,
      player1Won: false,
      player2Won: false,
    };
  }

  handleClick(i) {
    const squares = this.state.squares.slice();
    var player1Score = this.state.player1Score;
    var player2Score = this.state.player2Score;
    var player1ClosedAll = this.state.player1ClosedAll;
    var player2ClosedAll = this.state.player2ClosedAll;
    var player1Won = this.state.player1Won;
    var player2Won = this.state.player2Won;

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
        player1Score += 20;
      }
      else if (i === 1 && squares[i - 1] !== "Ⓧ") {
        player2Score += 20;
      }
      else if (i === 2 && squares[i + 1] !== "Ⓧ") {
        player1Score += 19;
      }
      else if (i === 3 && squares[i - 1] !== "Ⓧ") {
        player2Score += 19;
      }
      else if (i === 4 && squares[i + 1] !== "Ⓧ") {
        player1Score += 18;
      }
      else if (i === 5 && squares[i - 1] !== "Ⓧ") {
        player2Score += 18;
      }
      else if (i === 6 && squares[i + 1] !== "Ⓧ") {
        player1Score += 17;
      }
      else if (i === 7 && squares[i - 1] !== "Ⓧ") {
        player2Score += 17;
      }
      else if (i === 8 && squares[i + 1] !== "Ⓧ") {
        player1Score += 16;
      }
      else if (i === 9 && squares[i - 1] !== "Ⓧ") {
        player2Score += 16;
      }
      else if (i === 10 && squares[i + 1] !== "Ⓧ") {
        player1Score += 15;
      }
      else if (i === 11 && squares[i - 1] !== "Ⓧ") {
        player2Score += 15;
      }
      else if (i === 12 && squares[i + 1] !== "Ⓧ") {
        player1Score += 25;
      }
      else if (i === 13 && squares[i - 1] !== "Ⓧ") {
        player2Score += 25;
      }
      else {
        console.log("Invalid cell clicked...how is this even possible??")
      }
    }

    // Probably refactor this...
    player1ClosedAll = true;
    for (let i = 0; i <= 12; i += 2) {
      if (squares[i] !== "Ⓧ") {
        player1ClosedAll = false;
        i = 12;
      }
    }

    player2ClosedAll = true;
    for (let i = 1; i <= 13; i += 2) {
      if (squares[i] !== "Ⓧ") {
        player2ClosedAll = false;
        i = 13;
      }
    }

    // this too..
    player1Won = false;
    if (player1ClosedAll && player1Score > player2Score) {
      player1Won = true;
    }

    player2Won = false;
    if (player2ClosedAll && player2Score > player1Score) {
      player2Won = true;
    }

    this.setState(
      {
        squares: squares,
        player1Score: player1Score,
        player2Score: player2Score,
        player1ClosedAll: player1ClosedAll,
        player2ClosedAll: player2ClosedAll,
        player1Won: player1Won,
        player2Won: player2Won,
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
    const header = 'Player 1\tPlayer 2';
    var winner = declareWinner(this.state.player1Won, this.state.player2Won);

    return (
      <div>
        <div className="score">Player 1</div>
        <div className="score">Player 2</div>
        <div className="board-row">
          {this.renderSquare(0)}
          &emsp; 20
          {this.renderSquare(1)}
        </div>
        <div className="board-row">
          {this.renderSquare(2)}
          &emsp; 19
          {this.renderSquare(3)}
        </div>
        <div className="board-row">
          {this.renderSquare(4)}
          &emsp; 18
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          &emsp; 17
          {this.renderSquare(7)}
        </div>
        <div className="board-row">
          {this.renderSquare(8)}
          &emsp; 16
          {this.renderSquare(9)}
        </div>
        <div className="board-row">
          {this.renderSquare(10)}
          &emsp; 15
          {this.renderSquare(11)}
        </div>
        <div className="board-row">
          {this.renderSquare(12)}
          &emsp; B
          {this.renderSquare(13)}
        </div>
        <div className="score">
          {this.state.player1Score}
        </div>
        <div className="score">
          {this.state.player2Score}
        </div>
        <div className="status">
          {winner}
        </div>
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

function declareWinner(player1Won, player2Won) {
  if (player1Won === true) {
    return "Player 1 won.";
  }
  if (player2Won === true) {
    return "Player 2 won.";
  }
  return "";
}

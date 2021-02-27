import React from 'react';
import Board from './Board.jsx';  
import './index.css';


class Game extends React.Component {
  constructor() {
    super();
    this.state = ({
      numPlayers: 0,
    });
  }

  handleClick(i) {
    this.setState({numPlayers: i});
  }

  render() {
    let numPlayers = this.state.numPlayers;

    if (numPlayers == 0) {
      return (
         <div class="dropdown">
          <button class="dropbtn"># Players:</button>
          <div class="dropdown-content">
            <a onClick={() => this.handleClick(2)}>2</a>
            <a onClick={() => this.handleClick(3)}>3</a>
            <a onClick={() => this.handleClick(4)}>4</a>
          </div>
        </div> 
      );
    }

    return (
      <div className="game">
        <div className="game-board">
          <Board 
            numPlayers={numPlayers}
          />
        </div>
        {/*<div className="game-info">
          <div>{}</div>
          <ol>{}</ol>
        </div>*/}
      </div>
    );
  }
}

export default Game;

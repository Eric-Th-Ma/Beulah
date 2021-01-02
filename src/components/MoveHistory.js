// src/components/GameArea.js
import PropTypes from "prop-types";
import React, { Component } from "react";
import Card from "./Card";

function OldMove({move, player}) {
  let message;
  if (move[1] !== "swap") {
    message = `${player[0].name} ${move[1]}ed.`;
  } else if (move[2].length > 1) {
    message = `${player[0].name} swapped their entire hand with the middle.`;
  } else {
    message = `${player[0].name} swapped one card with the middle.`
  }
  return (<div className="old-player-summary" key={player[0].name}>{message}</div>)
}

OldMove.propTypes = {
  move: PropTypes.array,
  player: PropTypes.array,
};

function LastMove({move, player}) {
  let message;
  if (move[1] !== "swap") {
    message = `${player[0].name} ${move[1]}ed.`;
  } else if (move[2].length > 1) {
    message = `${player[0].name} swapped their entire hand with the middle.`;
  } else {
    const cardIn = move[2][0];
    const cardOut = move[3][0];
    message = <div>
      {player[0].name} swapped    
      <Card 
        rank={cardIn.rank} 
        suit={cardIn.suit} 
        key={cardIn.rank + cardIn.suit} 
        concealed={false} 
        clickSwap={() => null}
      />    to the middle for    
      <Card 
        rank={cardOut.rank} 
        suit={cardOut.suit} 
        key={cardOut.rank + cardOut.suit} 
        concealed={false} 
        clickSwap={() => null}
      />.
    </div>;
  }
  return (<div className="player-summary" key={player[0].name}>{message}</div>)
}

LastMove.propTypes = {
  move: PropTypes.array,
  player: PropTypes.array,
};

export default class MoveHistory extends Component {
  constructor(props) {
    super(props);
    this.state = {hoverStatus: false };
  }

  render() {
    const lastMove = this.props.G.moveHistory.length - 1;
    let moveHistory = this.props.G.moveHistory.map(
      (move, index) => 
        (index == lastMove ? 
          <LastMove 
            player={this.props.gameMetadata.filter(
              playerData => move[0]==playerData.id
            )} 
            key={index}
            move={move}/> : 
          ((this.state.hoverStatus && index >= (lastMove-2)) ? 
            <OldMove 
              player={this.props.gameMetadata.filter(
                playerData => move[0]==playerData.id
              )} 
              key={index}
              move={move}/> : null))
    );
    moveHistory.reverse();
    return (<div  className="game-area"
                  onMouseEnter={()=>{
                    if (!this.state.hoverStatus) {
                      this.setState({hoverStatus: true})
                    }
                  }}
                  onMouseLeave={()=>{
                    if (this.state.hoverStatus) {
                      this.setState({hoverStatus: false})
                    }
                  }}>
                    {moveHistory}
                  </div>);
  }
}

MoveHistory.propTypes = {
  G: PropTypes.object,
  ctx: PropTypes.object,
  moves: PropTypes.object,
  playerID: PropTypes.string,
  gameMetadata: PropTypes.array,
};

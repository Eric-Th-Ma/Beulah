// src/components/GameArea.js
import PropTypes from "prop-types";
import React, { Component } from "react";
//import { getClassName } from "./_helperFunctions";
import Card from "./Card";
//import Chip from "./Chip";
//import PlayerStatus from "./PlayerStatus";

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
      {player[0].name} swapped    <Card 
        rank={cardIn.rank} 
        suit={cardIn.suit} 
        key={cardIn.rank + cardIn.suit} 
        concealed={false} 
        clickSwap={() => null}
      />    to the middle for    <Card 
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

export default class Override extends Component {
  constructor(props) {
    super(props);
    this.state = {
      approved: false, 
      value: "To set the number of chips for any player enter: \"PLAYER_#->#_OF_CHIPS\"\nTo set the number of chips in the middle enter: \"m->#_OF_CHIPS\"\nTo pass for the current player enter: \"pass\"\nTo end override mode enter: \"end\"\n"};
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    this.props.moves.handleOverride(this.state.value);
    event.preventDefault();
  }

  render() {
    if (this.state.approved && this.props.G.override[0]==-1) {
      this.setState({approved: false});
    }
    if (this.props.G.override[0]==this.props.playerID && this.props.G.override[1]>=(parseInt(this.props.ctx.numPlayers)-3)) {
      return (
        <form className="buttons" onSubmit={this.handleSubmit}>
          <label>
            Override text:
            <textarea value={this.state.value} onChange={this.handleChange} />
          </label>
          <input type="submit" value="Submit" />
        </form>
      );
    } else {
      return (
        <div className="buttons">
          <button 
            onClick={
              ()=>{
                if (!this.state.approved || this.props.G.override[0]==this.props.playerID) {
                  this.setState({approved: true});
                  this.props.moves.overrideRequest(this.props.playerID);
                }
              }
            }
          >
            {this.props.G.override[0]==-1 ?
              "Request override"
            : 
            (this.props.G.override[0]==this.props.playerID ?
              "Remove request for override"
            :
            (this.state.approved ?
              "Approved"
            :
              "Approve override request"
            ))}
          </ button>
        </div>
      );
    }
  }
}

Override.propTypes = {
  G: PropTypes.object,
  ctx: PropTypes.object,
  moves: PropTypes.object,
  playerID: PropTypes.string,
  gameMetadata: PropTypes.array,
};

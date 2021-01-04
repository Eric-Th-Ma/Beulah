// src/components/GameArea.js
import PropTypes from "prop-types";
import React, { Component } from "react";

export default class Override extends Component {
  constructor(props) {
    super(props);
    this.state = {
      approved: false, 
      value: "To set the # of chips for a player enter: \"[PLAYER_#]->[#_OF_CHIPS]\"\nIf changing which players have 0 chips enter: \"r-l\"\nTo set the number of chips in the middle enter: \"m->[#_OF_CHIPS]\"\nTo pass for the current player enter: \"pass\"\nTo end override mode enter: \"end\"\n"};
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

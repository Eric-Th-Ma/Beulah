// src/TienLenBoard.js

import React, { Component } from "react";
import PropTypes from "prop-types";

import GameArea from "./components/GameArea";
import PlayerArea from "./components/PlayerArea";
import MoveHistory from "./components/MoveHistory";
import Override from "./components/Override";

class TienLenBoard extends Component {
  render() {
    return (
      <div className="game">
        <GameArea {...this.props} />
        <PlayerArea {...this.props} />
        <MoveHistory {...this.props} />
        <Override {...this.props} />
      </div>
    );
  }
}

TienLenBoard.propTypes = {
  G: PropTypes.object,
  ctx: PropTypes.object,
  moves: PropTypes.object,
  playerID: PropTypes.string,
  credentials: PropTypes.string,
  isActive: PropTypes.bool,
  gameMetadata: PropTypes.array,
};

export default TienLenBoard;

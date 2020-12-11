// src/PlayerStatus.js
import React from "react";
import PropTypes from "prop-types";
import Chip from "./Chip";

export default function PlayerStatus({
  playerName,
  chipsLeft,
  className,
}) {
  return (
    <div className={className}>
      {playerName}
      <div>
        <Chip />: {chipsLeft}
      </div>
    </div>
  );
}

PlayerStatus.propTypes = {
  playerName: PropTypes.string,
  chipsLeft: PropTypes.number,
  className: PropTypes.string,
};

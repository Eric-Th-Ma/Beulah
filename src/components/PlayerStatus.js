// src/PlayerStatus.js
import React from "react";
import PropTypes from "prop-types";
import Emoji from "a11y-react-emoji";

export default function PlayerStatus({
  playerName,
  cardsLeft,
  className,
  winner,
}) {
  return (
    <div className={className}>
      {playerName}
      {winners(winner, cardsLeft)}
    </div>
  );
}

function winners(winner, cardsLeft) {
  switch (winner) {
    case 0:
      return (
        <div>
          <Emoji symbol="🥇" label="1st place" />
        </div>
      );
    case 1:
      return (
        <div>
          <Emoji symbol="🥈" label="2nd place" />
        </div>
      );
    case 2:
      return (
        <div>
          <Emoji symbol="🥉" label="3rd place" />
        </div>
      );
    default:
      return (
        <div>
          <Emoji symbol="🂠" label="cards left" />: {cardsLeft}
        </div>
      );
  }
}

PlayerStatus.propTypes = {
  playerName: PropTypes.string,
  cardsLeft: PropTypes.number,
  className: PropTypes.string,
  winner: PropTypes.number,
};

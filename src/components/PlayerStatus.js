// src/PlayerStatus.js
import React from "react";
import PropTypes from "prop-types";
import Emoji from "a11y-react-emoji";

export default function PlayerStatus({
  playerName,
  chipsLeft,
  className,
  //winner,
}) {
  return (
    <div className={className}>
      {playerName}
      <div>
        <Emoji symbol="🂠" label="cards left" />: {chipsLeft}
      </div>
    </div>
  );
}

/*function winners(winner, chipsLeft) {
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
          <Emoji symbol="🂠" label="cards left" />: {chipsLeft}
        </div>
      );
  }
}*/

PlayerStatus.propTypes = {
  playerName: PropTypes.string,
  chipsLeft: PropTypes.number,
  className: PropTypes.string,
  winner: PropTypes.number,
};

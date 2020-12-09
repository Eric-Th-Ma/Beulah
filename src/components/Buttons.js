import React from "react";
import PropTypes from "prop-types";
import { validPlay } from "../moves/cardPlayMoves";

//const _ = require("lodash");

export default function Buttons(props) {
  const currentPlayer = props.ctx.currentPlayer === props.playerID;
  let buttons1 = [];
  let buttons2 = [];
  let allButtons = []

  buttons1.push(clearStagingAreaButton(props));
  buttons1.push(fillStagingAreaButton(props));

  buttons2.push(playCardsButton(props));
  if (currentPlayer) {
    buttons2.push(passTurnButton(props));
    buttons2.push(knockButton(props));
  }

  allButtons.push(<div className="center-container" key="buttons1">
    {buttons1}
  </div>);
  allButtons.push(<div className="center-container" key="buttons2">
    {buttons2}
  </div>);
  return (
    <div>
      {allButtons}
    </div>
  );
}

function clearStagingAreaButton(props) {
  return (
    <button
      className="button"
      key="clearStagingArea"
      onClick={() => props.moves.clearStagingArea()}
    >
      Clear Swap Area
    </button>
  );
}

function fillStagingAreaButton(props) {
  return (
    <button
      className="button"
      key="fillStagingArea"
      onClick={() => props.moves.fillStagingArea()}
    >
      Swap All Cards
    </button>
  );
}

function playCardsButton(props) {
  const currentPlayer = props.ctx.currentPlayer;
  const playerID = props.playerID;
  let stagingArea = props.G.players[playerID].stagingArea;
  let stagingBackArea = props.G.players[playerID].stagingBackArea;
  /*let threeSpadesInHand = _.find(props.G.players[playerID].hand, {
    rank: "3",
    suit: "S",
  });*/
  const p = validPlay(
    stagingArea,
    stagingBackArea,
    props.G.roundType
  );
  if (playerID !== currentPlayer) {
    if (stagingBackArea.length !== 0) {
      return (
        <button className="wait" key="playcards">
          PUT CENTER CARDS BACK UNTIL YOUR TURN
        </button>
      );
    } else {
      return (
        <button className="wait" key="playcards">
          Not Your Turn
        </button>
      );
    }
  } else if (typeof p === "string") {
    return (
      <button className="disabled" disabled={true} key="playcards">
        {p}
      </button>
    );
  } else {
    return (
      <button key="playcards" onClick={() => props.moves.cardsToCenter()}>
        Confirm Swap
      </button>
    );
  }
}

function passTurnButton(props) {
  const playerID = props.playerID;
  let stagingArea = props.G.players[playerID].stagingArea;
  let stagingBackArea = props.G.players[playerID].stagingBackArea;
  if (stagingBackArea.length + stagingArea.length == 0) {
    return (
      <button
        className="button"
        key="passTurn"
        onClick={() => props.moves.passTurn()}
      >
        Pass Turn
      </button>
    );
  } else {
    return (
      <button className="disabled" disabled={true} key="passTurn">
        Clear Cards Before Passing
      </button>
    );
  }
}

function knockButton(props) {
  const playerID = props.playerID;
  let stagingArea = props.G.players[playerID].stagingArea;
  let stagingBackArea = props.G.players[playerID].stagingBackArea;
  if (stagingBackArea.length + stagingArea.length == 0) {
    return (
      <button
        className="button"
        key="knock"
        onClick={() => props.moves.passTurn()}
      >
        Knock!
      </button>
    );
  } else {
    return (null);
  }
}

Buttons.propTypes = {
  G: PropTypes.object,
  ctx: PropTypes.object,
  moves: PropTypes.object,
  playerID: PropTypes.string,
};

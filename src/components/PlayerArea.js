// src/components/PlayerArea.js
import PropTypes from "prop-types";
import React from "react";
import Buttons from "./Buttons";
import { getClassName } from "./_helperFunctions";
import CardArea from "./CardArea";
import useWindowDimensions from './useWindowDimensions';
import PlayerStatus from "./PlayerStatus";

export default function PlayerArea(props) {
  const { height, width } = useWindowDimensions();
    const wide = width > height;
    let playerArea = [];
    const playerID = props.playerID;
    playerArea.push(
      <div className="center-container" key="stagingArea">
      {props.gameMetadata.map(playerData => playerData.id==playerID ?
        <PlayerStatus
          playerName={playerData.name}
          chipsLeft={props.G.chipsLeft[playerID]}
          className="my-status"
        /> : null)}
      </div>
    );
    playerArea.push(
      <div className="center-container" key="stagingArea">
        <CardArea
          className={getClassName(
            props,
            props.playerID,
            "staging-back-area"
          )}
          group="center"
          roundType={props.G.roundType}
          listName="stagingBackArea"
          cards={props.G.players[playerID].stagingBackArea}
          setList={props.moves.relocateCards}
          clickSwap={props.moves.clickSwap}
        />
        {wide ?
          <CardArea
            className={getClassName(
              props,
              props.playerID,
              "staging-area"
            )}
            group="hand"
            listName="stagingArea"
            cards={props.G.players[playerID].stagingArea}
            setList={props.moves.relocateCards}
            clickSwap={props.moves.clickSwap}
          /> : null
        }
      </div>
    );
    if (!wide) {
      playerArea.push(
        <div className="center-container" key="stagingBackArea">
          <CardArea
            className={getClassName(
              props,
              props.playerID,
              "staging-area"
            )}
            group="hand"
            listName="stagingArea"
            cards={props.G.players[playerID].stagingArea}
            setList={props.moves.relocateCards}
            clickSwap={props.moves.clickSwap}
          />
        </div>
      );
    }
    playerArea.push(
      <div key="buttons">
        <Buttons {...props} />
      </div>
    );
    playerArea.push(
      <div className="center-container" key="hand">
        <CardArea
          className={getClassName(props, playerID, "hand")}
          listName="hand"
          group="hand"
          cards={props.G.players[playerID].hand}
          setList={props.moves.relocateCards}
          clickSwap={props.moves.clickSwap}
        />
      </div>
    );
    return (
      <div className={getClassName(props, playerID, "player-area")}>
        {playerArea}
      </div>
    );
  }

PlayerArea.propTypes = {
  G: PropTypes.object,
  ctx: PropTypes.object,
  moves: PropTypes.object,
  playerID: PropTypes.string,
  gameMetadata: PropTypes.array,
};

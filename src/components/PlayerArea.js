// src/components/PlayerArea.js
import PropTypes from "prop-types";
import React from "react";
import Buttons from "./Buttons";
import { getClassName } from "./_helperFunctions";
import CardArea from "./CardArea";
import useWindowDimensions from './useWindowDimensions';

export default function PlayerArea(props) {
  const { height, width } = useWindowDimensions();
    const wide = width > height;
    let playerArea = [];
    const playerID = props.playerID;
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

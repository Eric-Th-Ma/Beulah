// src/components/GameArea.js
import PropTypes from "prop-types";
import React, { Component } from "react";
//import { getClassName } from "./_helperFunctions";
import CardArea from "./CardArea";
//import PlayerStatus from "./PlayerStatus";

export default class GameArea extends Component {
  render() {
    //const playerID = this.props.playerID;
    //const pID = playerID ? parseInt(playerID) : 0;
    let gameArea = [];
    let centerRow = [];
    /*
    for (let i of [2, 3, "center", 1, 0]) {
      if (i === "center") {
        const center = this.props.ctx.gameover ? (
          <div key="center" className="round-type">
            Game Over!
          </div>
        ) : (
          <div key="center" className="round-type">
            {this.props.G.roundType=="Opening Round" ? this.props.G.roundType : null}
            <CardArea
              className="center"
              group="center"
              cards={this.props.G.center}
              listName="centerCards"
              setList={this.props.moves.relocateMiddleCards}
              roundType={this.props.G.roundType}
            />
          </div>
        );
        centerRow.push(center);
      } else {
        const index = (i + pID) % this.props.ctx.numPlayers;
        const indexString = index.toString();
        const playerStatusClassName = getClassName(
          this.props,
          indexString,
          "player-status"
        );
        if (i === 2 || (i === 0 && !playerID)) {
          gameArea.push(
            <div className="center-container" key={indexString}>
              <PlayerStatus
                playerName={indexString}
                cardsLeft={this.props.G.cardsLeft[index]}
                className={playerStatusClassName}
                winner={this.props.G.winners.findIndex(x => x === indexString)}
              />
            </div>
          );
        } else if (i % 2 === 1) {
          centerRow.push(
            <div key={indexString}>
              <PlayerStatus
                playerName={indexString}
                cardsLeft={this.props.G.cardsLeft[index]}
                className={playerStatusClassName}
                winner={this.props.G.winners.findIndex(x => x === indexString)}
              />
            </div>
          );
          if (i === 1) {*/
            const center = this.props.ctx.gameover ? (
              <div key="center" className="round-type">
                Game Over!
              </div>
            ) : (
              <div key="center" className="round-type">
                {this.props.G.roundType=="Opening Round" ? this.props.G.roundType : null}
                <CardArea
                  className="center"
                  group="center"
                  cards={this.props.G.center}
                  listName="centerCards"
                  setList={this.props.moves.relocateMiddleCards}
                  roundType={this.props.G.roundType}
                />
              </div>
            );
            centerRow.push(center);
            gameArea.push(
              <div key="centerRow" className="center-row">
                {centerRow}
              </div>
            );/*
          }
        }
      }
    }*/
    return <div className="game-area">{gameArea}</div>;
  }
}

GameArea.propTypes = {
  G: PropTypes.object,
  ctx: PropTypes.object,
  moves: PropTypes.object,
  playerID: PropTypes.string,
};

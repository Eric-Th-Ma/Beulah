// src/components/GameArea.js
import PropTypes from "prop-types";
import React, { Component } from "react";
//import { getClassName } from "./_helperFunctions";
import CardArea from "./CardArea";
import Chip from "./Chip";
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
            let chips = [];
            let wild = (this.props.G.middleChips - (this.props.G.middleChips <= 13))%13 + (this.props.G.middleChips <= 13)
            for (let i = 0; i < wild; i++) {
              chips.push(<Chip key={i}/>)
            }
            const center = /*this.props.ctx.gameover ? (
              <div key="center" className="round-type">
                Game Over!
              </div>
            ) :*/ (
              <div key="center" className="round-type">
                {chips}
                {this.props.gameMetadata.map(playerData => 
                  !this.props.G.end ? 
                    (playerData.id==this.props.ctx.currentPlayer ? 
                    <div key={playerData.id}>It is {playerData.name}&apos;s turn</div> : 
                    null) : 
                  <div key={playerData.id}>{playerData.name}&apos;s hand
                    <CardArea
                    className="center"
                    cards={this.props.G.players[parseInt(playerData.id)].hand}
                    setList={this.props.moves.relocateCards}
                    />
                    <button
                      className="button"
                      key="pickLoser"
                      onClick={() => this.props.moves.pickLoser(parseInt(this.props.playerID), parseInt(playerData.id))}
                    >
                      {playerData.name} lost
                    </button>
                  </div>)}
                {this.props.G.end ? <div>Center:</div> : null}
                <CardArea
                  className="center"
                  group="center"
                  cards={this.props.G.center}
                  listName="centerCards"
                  setList={this.props.moves.relocateMiddleCards}
                  roundType={this.props.G.roundType}
                  clickSwap={this.props.moves.clickSwap}
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
  gameMetadata: PropTypes.array,
};

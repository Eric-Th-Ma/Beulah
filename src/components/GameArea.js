// src/components/GameArea.js
import PropTypes from "prop-types";
import React, { Component } from "react";
//import { getClassName } from "./_helperFunctions";
import CardArea from "./CardArea";
import Chip from "./Chip";
//import PlayerStatus from "./PlayerStatus";

export default class GameArea extends Component {
  render() {
    let gameArea = [];
    let centerRow = [];
    let chips = [];
    let wild = (this.props.G.middleChips - (this.props.G.middleChips <= 13))%13 + (this.props.G.middleChips <= 13)
    for (let i = 0; i < wild; i++) {
      chips.push(<Chip key={i}/>)
    }
    const center = this.props.ctx.gameover ? (
      <div key="center" className="round-type">
        Game Over! {this.props.gameMetadata.map(
          playerData => 
          this.props.G.turnOrder[playerData.id]!==null ? 
          playerData.name : 
          null)
        } Wins!
      </div>
    ) : (
      <div key="center" className="round-type">
        {chips}
        {this.props.gameMetadata.map(playerData => 
          !this.props.G.end ? 
            (playerData.id==this.props.ctx.currentPlayer ? 
            <div key={playerData.id}>It is {playerData.name}&apos;s turn</div> : 
            null) : 
            (this.props.G.chipsLeft[playerData.id] > 0 ?
            <div key={playerData.id} className="player-summary">
              <div>
                <div className="left">{playerData.name}&apos;s hand</div>
                <button
                  className="inline-button"
                  key="pickLoser"
                  onClick={() => this.props.moves.pickLoser(parseInt(this.props.playerID), parseInt(playerData.id))}
                >
                  {this.props.G.loserMatrix[parseInt(this.props.playerID)][parseInt(playerData.id)] ? 
                    <div>Undo Pick</div> : <div>{playerData.name} Lost</div>
                  }
                </button>
              </div>
              <CardArea
              className="center"
              cards={this.props.G.players[parseInt(playerData.id)].hand}
              setList={this.props.moves.relocateCards}
              clickSwap={(a,b,c,d)=>[a,b,c,d]}
              />
            </div> : null)
          )
        }
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
    );
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

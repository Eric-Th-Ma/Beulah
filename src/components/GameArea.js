// src/components/GameArea.js
import PropTypes from "prop-types";
import React, { Component } from "react";
import CardArea from "./CardArea";
import CenterChips from "./CenterChips";

export default class GameArea extends Component {
  render() {
    let gameArea = [];
    let centerRow = [];
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
        <div key="status-info" className="status-info">
        <CenterChips middleChips={this.props.G.middleChips}/>
        {this.props.gameMetadata.map(playerData => 
          !this.props.G.end ? 
            (playerData.id==this.props.ctx.currentPlayer ? 
            <div className="announcement" key={playerData.id}>It is {playerData.name}&apos;s turn</div> : 
            (playerData.id==this.props.G.knock ? 
            <div key={playerData.id} className="announcement">{playerData.name} Knocked</div> : 
            null)) : null
          )
        }
        </div>
        {this.props.G.end ? 
        <div>
        {this.props.gameMetadata.map(playerData =>
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
            </div> : null))}<div>Center:</div></div> : null}
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
  credentials: PropTypes.string,
  isActive: PropTypes.bool,
  gameMetadata: PropTypes.array,
};

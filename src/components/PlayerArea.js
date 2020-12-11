// src/components/PlayerArea.js
import PropTypes from "prop-types";
import React, { Component } from "react";
import Buttons from "./Buttons";
import { getClassName } from "./_helperFunctions";
import CardArea from "./CardArea";
//import useWindowDimensions from './useWindowDimensions';
import PlayerStatus from "./PlayerStatus";

export default class PlayerArea extends Component {
  constructor(props) {
    super(props);
    this.state = { width: 0, height: 0, hoverStatus: false };
    this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
  }
  
  componentDidMount() {
    this.updateWindowDimensions();
    window.addEventListener('resize', this.updateWindowDimensions);
  }
  
  componentWillUnmount() {
    window.removeEventListener('resize', this.updateWindowDimensions);
  }
  
  updateWindowDimensions() {
    this.setState({ width: window.innerWidth, height: window.innerHeight });
  }

  render() {
    const height = this.state.height;
    const width = this.state.width;
    const wide = width > height;
    let playerArea = [];
    const playerID = this.props.playerID;
    playerArea.push(
      <div 
        className="center-container" 
        key="playerStatus" 
        onMouseEnter={()=>{
        if (!this.state.hoverStatus) {
          this.setState({hoverStatus: true})
        }
        }}
        onMouseLeave={()=>{
          if (this.state.hoverStatus) {
            this.setState({hoverStatus: false})
          }
        }}
      >
      {this.props.gameMetadata.map(playerData => (playerData.id==playerID || this.state.hoverStatus) ?
        <PlayerStatus
          playerName={playerData.name}
          chipsLeft={this.props.G.chipsLeft[playerData.id]}
          className="my-status"
          key={playerData.name}
        /> : null)}
      </div>
    );
    if (this.props.G.turnOrder[playerID] === null) {
      return (
        <div className={getClassName(this.props, playerID, "player-area")}>
          {playerArea}
        </div>
      );
    }
    playerArea.push(
      <div className="center-container" key="stagingArea">
        <CardArea
          className={getClassName(
            this.props,
            this.props.playerID,
            "staging-back-area"
          )}
          group="center"
          roundType={this.props.G.roundType}
          listName="stagingBackArea"
          cards={this.props.G.players[playerID].stagingBackArea}
          setList={this.props.moves.relocateCards}
          clickSwap={this.props.moves.clickSwap}
        />
        {wide ?
          <CardArea
            className={getClassName(
              this.props,
              this.props.playerID,
              "staging-area"
            )}
            group="hand"
            listName="stagingArea"
            cards={this.props.G.players[playerID].stagingArea}
            setList={this.props.moves.relocateCards}
            clickSwap={this.props.moves.clickSwap}
          /> : null
        }
      </div>
    );
    if (!wide) {
      playerArea.push(
        <div className="center-container" key="stagingBackArea">
          <CardArea
            className={getClassName(
              this.props,
              this.props.playerID,
              "staging-area"
            )}
            group="hand"
            listName="stagingArea"
            cards={this.props.G.players[playerID].stagingArea}
            setList={this.props.moves.relocateCards}
            clickSwap={this.props.moves.clickSwap}
          />
        </div>
      );
    }
    playerArea.push(
      <div key="buttons">
        <Buttons {...this.props} />
      </div>
    );
    playerArea.push(
      <div className="center-container" key="hand">
        <CardArea
          className={getClassName(this.props, playerID, "hand")}
          listName="hand"
          group="hand"
          cards={this.props.G.players[playerID].hand}
          setList={this.props.moves.relocateCards}
          clickSwap={this.props.moves.clickSwap}
        />
      </div>
    );
    return (
      <div className={getClassName(this.props, playerID, "player-area")}>
        {playerArea}
      </div>
    );
  }
}

PlayerArea.propTypes = {
  G: PropTypes.object,
  ctx: PropTypes.object,
  moves: PropTypes.object,
  playerID: PropTypes.string,
  gameMetadata: PropTypes.array,
};

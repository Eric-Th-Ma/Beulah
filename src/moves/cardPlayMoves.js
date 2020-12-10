// src/moves/cardPlayMoves.js
//import { Combinations } from "../constants";

//const _ = require("lodash");

export function validPlay(stagingArea, stagingBackArea, roundType) {
  if ((stagingBackArea.length === 1 && stagingArea.length === 1 && roundType!=="Opening Round") || (stagingBackArea.length === 5 && stagingArea.length === 5)) {
    return true;
  } else if (roundType == "Opening Round") {
    return "Take them all or pass";
  } else {
    return "Swap 1 for 1 or 5 for 5";
  }
}

export function cardsToCenter(G, ctx) {
  const currentPlayer = ctx.currentPlayer;
  let stagingBackArea = G.players[currentPlayer].stagingBackArea;
  let stagingArea = G.players[currentPlayer].stagingArea;
  G.roundType=""

  G.center = G.center.concat(stagingArea);
  G.players[currentPlayer].hand = G.players[currentPlayer].hand.concat(stagingBackArea);
  G.players[currentPlayer].stagingBackArea = [];
  G.players[currentPlayer].stagingArea = [];
  //G.cardsLeft[currentPlayer] -= G.center.length;
  /*if (G.cardsLeft[currentPlayer] === 0) {
    // won the game
    G.winners.push(currentPlayer);
    // get rid of any existing winner markers
    G.turnOrder = G.turnOrder.map(x => (x === "W" ? null : x));
    G.turnOrder[parseInt(ctx.currentPlayer)] = "W";
  }*/
  nextTurn(G, ctx);
}

export function passTurn(G, ctx) {
  //G.turnOrder[parseInt(ctx.currentPlayer)] = null;
  nextTurn(G, ctx);
}

export function knockTurn(G, ctx) {
  G.knock = ctx.currentPlayer;

  nextTurn(G, ctx);
}

function nextTurn(G, ctx) {
  let currentPlayer = parseInt(ctx.currentPlayer);
  let nextPlayer = findNextPlayer(G.turnOrder, currentPlayer);
  if (nextPlayer == G.knock) {
    G.end = true;
  }
  if (nextPlayer == 0) {
    G.roundType=""
  }
  //let removeNulls = G.turnOrder.filter(x => x !== null); ERIC
  /*
  if (nextPlayer === "W" && removeNulls.length !== 1) {
    // next player has already won, more players left in turn order
    // need to remove winning "W" marker
    G.turnOrder = G.turnOrder.map(x => (x === "W" ? null : x));
    nextPlayer = findNextPlayer(G.turnOrder, currentPlayer);
    removeNulls = G.turnOrder.filter(x => x !== null);
  } else if (nextPlayer === "W" && removeNulls.length === 1) {
    // next player has already won, no more players left in turn order
    // need to pass free play to player after "W"

    // remove winners from turn order
    /*G.turnOrder = [0, 1, 2, 3].map(x =>
      G.winners.includes(x.toString()) ? null : x
    );
    G.roundType = Combinations.ANY;

    // find player after winner
    currentPlayer = parseInt(G.winners[G.winners.length - 1]);
    nextPlayer = findNextPlayer(G.turnOrder, currentPlayer);
  }*/
  ctx.events.endTurn({ next: nextPlayer });
  //removeNulls = G.turnOrder.filter(x => x !== null); ERIC
}

function findNextPlayer(turnOrder, currentPlayer) {
  let playerList = turnOrder
    .slice(currentPlayer + 1, turnOrder.length)
    .concat(turnOrder.slice(0, currentPlayer + 1));
  return playerList.find(i => i !== null).toString();
}

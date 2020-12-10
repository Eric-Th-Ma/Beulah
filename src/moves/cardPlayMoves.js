// src/moves/cardPlayMoves.js
import { Suits, Ranks, /*Combinations*/ } from "../constants";
import { compareCards } from "../moves/helper-functions/cardComparison";

const _ = require("lodash");

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
  G.consecPasses = 0;
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
  if (G.roundType !== "Opening Round") {
    G.consecPasses = G.consecPasses + 1;
  }
  nextTurn(G, ctx);
}

export function knockTurn(G, ctx) {
  G.knock = ctx.currentPlayer;
  G.consecPasses = 0;
  nextTurn(G, ctx);
}

export function pickLoser(G, ctx, picker, picked) {
  let neededToLose = 2;
  G.loserMatrix[picker][picked] = true;
  let losses = countLosers(G.loserMatrix);
  for (let i = 0; i < losses.length; i++) {
    if (losses[i]>=neededToLose) {
      nextGame(G, ctx, i);
    }
  }
}

function nextGame(G, ctx, loser) {
  console.log("next game");
  G.middleChips = G.middleChips + G.chipsLeft[loser]
  if (loser==G.knock) {
    G.chipsLeft[loser] = (G.chipsLeft[loser]-2) > 0 ? G.chipsLeft[loser]-2 : 0;
  } else {
    G.chipsLeft[loser] = G.chipsLeft[loser]-1;
  }
  G.middleChips = G.middleChips - G.chipsLeft[loser]
  if (G.chipsLeft[loser]==0) {
    let beulahChip = true;
    for (let i = 0; i < G.chipsLeft.length; i++) {
      if (G.chipsLeft[i] == 0 && i != loser) {
        beulahChip = false;
      }
    }
    if (beulahChip) {
      G.chipsLeft[loser] = G.chipsLeft[loser]+1;
    }
  }
  let centerCards;
  let players;
  [centerCards, players] = deal(ctx);
  G.center = centerCards;
  G.players = players;
  G.knock = -1;
  G.end = false;
  G.roundType = "Opening Round";
  G.consecPasses = 0;
  G.loserMatrix = loserMatrix(ctx.numPlayers)
}

const loserMatrix = (numberPlayers) => {
  let loseMat = [];
  for (let num1 of [...Array(numberPlayers).keys()]) {
    for (let num2 of [...Array(numberPlayers).keys()]) {
      loseMat[num1] = [];
      loseMat[num1][num2] = false;
    }
  }
  return loseMat;
}

const deal = (ctx) => {
  let deck = [];
  for (let suit of Suits) {
    for (let rank of Ranks) {
      deck.push({ suit: suit, rank: rank });
    }
  }
  for (let i = 10; i > 0; i--) {
    deck = ctx.random.Shuffle(deck);
  }
  const chunkedDeck = _.chunk(deck, 5).map(x => x.sort(compareCards));

  let centerCards = chunkedDeck[0];

  const players = {};
  for (let i = 1; i <= ctx.numPlayers; i++) {
    players[i-1] = {
      hand: chunkedDeck[i],
      stagingArea: [],
      stagingBackArea: [],
    };
  }
  return [centerCards, players];
}

function countLosers(loseMat) {
  let losses = [0,0,0,0,0,0,0,0,0,0];
  for (let pickersList of loseMat) {
    for (let i = 0; i < pickersList.length; i++) {
      if (pickersList[i]) {
        losses[i] = losses[i]+1;
      }
    }
  }
  return losses;
}

function nextTurn(G, ctx) {
  let currentPlayer = parseInt(ctx.currentPlayer);
  let nextPlayer = findNextPlayer(G.turnOrder, currentPlayer);
  if (nextPlayer == G.knock || G.consecPasses == ctx.numPlayers) {
    G.end = true;
  }
  if (nextPlayer == G.firstPlayer) {
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

// src/moves/cardPlayMoves.js
import { Suits, Ranks } from "../constants";
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
  G.moveHistory.push(([currentPlayer,"swap",stagingArea,stagingBackArea]));
  G.roundType=""

  G.center = G.center.concat(stagingArea);
  G.players[currentPlayer].hand = G.players[currentPlayer].hand.concat(stagingBackArea);
  G.players[currentPlayer].stagingBackArea = [];
  G.players[currentPlayer].stagingArea = [];
  G.consecPasses = 0;
  nextTurn(G, ctx);
}

export function passTurn(G, ctx) {
  if (G.roundType !== "Opening Round") {
    G.consecPasses = G.consecPasses + 1;
  }
  G.moveHistory.push(([ctx.currentPlayer,"pass",null,null]));
  nextTurn(G, ctx);
}

export function knockTurn(G, ctx) {
  G.knock = ctx.currentPlayer;
  G.consecPasses = 0;
  G.moveHistory.push(([ctx.currentPlayer,"knock",null,null]));
  nextTurn(G, ctx);
}

export function pickLoser(G, ctx, picker, picked) {
  let neededToLose = 2;
  G.loserMatrix[picker][picked] = !G.loserMatrix[picker][picked];
  let losses = countLosers(G.loserMatrix);
  for (let i = 0; i < losses.length; i++) {
    if (losses[i]>=neededToLose) {
      nextGame(G, ctx, i);
    }
  }
}

export function handleOverride(G, ctx, overrideText) {
  for (let overrideLine of overrideText.split(/\r?\n/)) {
    if (overrideLine.length==4 && overrideLine.substring(1,3)=="->") {
      if (overrideLine.substring(0,1)=="m") {
        G.middleChips=parseInt(overrideLine.substring(3,4));
      } else {
        G.chipsLeft[parseInt(overrideLine.substring(0,1))]=parseInt(overrideLine.substring(3,4));
      }
    } else if (overrideLine.length==5 && overrideLine.substring(0,3)=="m->") {
      G.middleChips=parseInt(overrideLine.substring(3,5));
    } else if (overrideLine=="end") {
      G.override=[-1,0];
    } else if (overrideLine=="pass") {
      passTurn(G, ctx);
    } else if (overrideLine=="r-l") {
      for (let i = 0; i < G.turnOrder.length; i++) {
        G.turnOrder[i] = G.chipsLeft[i]<=0 ? null : i;
      }
    }
  }
}

function nextGame(G, ctx, loser) {
  G.middleChips = G.middleChips + G.chipsLeft[loser]
  if (loser==G.knock) {
    G.chipsLeft[loser] = (G.chipsLeft[loser]-2) > 0 ? G.chipsLeft[loser]-2 : 0;
  } else {
    G.chipsLeft[loser] = G.chipsLeft[loser]-1;
  }
  G.middleChips = G.middleChips - G.chipsLeft[loser]
  if (G.chipsLeft[loser]==0) {
    if (G.beulahChip) {
      G.chipsLeft[loser] = G.chipsLeft[loser]+1;
      G.beulahChip = false;
    } else {
      G.turnOrder = G.turnOrder.map(x => loser==x ? null : x);
    }
  }
  let centerCards;
  let players;
  [centerCards, players] = deal(ctx);
  G.center = centerCards;
  G.players = players;
  G.knock = -1;
  G.roundType = "Opening Round";
  G.consecPasses = 0;
  G.loserMatrix = loserMatrix(ctx.numPlayers);
  G.moveHistory = [];
  G.end = false;
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
  if (nextPlayer == G.knock || G.consecPasses == (G.turnOrder.filter(x => x!==null).length)) {
    G.end = true;
  }
  if (nextPlayer == G.firstPlayer) {
    G.roundType=""
  }
  ctx.events.endTurn({ next: nextPlayer });
}

function findNextPlayer(turnOrder, currentPlayer) {
  let playerList = turnOrder
    .slice(currentPlayer + 1, turnOrder.length)
    .concat(turnOrder.slice(0, currentPlayer + 1));
  return playerList.find(i => i !== null).toString();
}

// src/TienLen.js

import { /*PlayerView,*/ Stage } from "boardgame.io/core";
import { Suits, Ranks, /*Combinations*/ } from "./constants";
import { cardsToCenter, passTurn, knockTurn, pickLoser } from "./moves/cardPlayMoves";
import { clickSwap, relocateCards, relocateMiddleCards, clearStagingArea, fillStagingArea } from "./moves/cardAreaMoves";
import { compareCards } from "./moves/helper-functions/cardComparison";
const _ = require("lodash");

const TienLen = {
  name: "Beulah",
  setup: setUp,
  moves: {
    relocateCards: relocateCards,
    clickSwap: clickSwap,
    relocateMiddleCards: relocateMiddleCards,
    clearStagingArea: clearStagingArea,
    fillStagingArea: fillStagingArea,
    cardsToCenter: cardsToCenter,
    passTurn: passTurn,
    knockTurn: knockTurn,
    pickLoser: pickLoser,
  },
  stages: {
    notTurn: {
      moves: { relocateCards, clickSwap, relocateMiddleCards, clearStagingArea, fillStagingArea, pickLoser},
    },
  },
  turn: {
    order: {
      first: G => G.firstPlayer,
    },
    activePlayers: {
      currentPlayer: { stage: Stage.NULL },
      others: { stage: "notTurn" },
    },
  },
  //playerView: PlayerView.STRIP_SECRETS,
  phases: {
    "in-round": {
      start: true,
      endIf: G => {if (G.end){return true;}},
      onEnd: (G, ctx) => {
        G.firstPlayer = (G.firstPlayer+1)%ctx.numPlayers;
        while (G.turnOrder[G.firstPlayer]===null) {
          G.firstPlayer = (G.firstPlayer+1)%ctx.numPlayers;
        }
      },
      next: "not-in-round",
    },
    "not-in-round": {
      endIf: G => {if (!G.end){return true;}},
      onEnd: (G, ctx) => {
        while (G.turnOrder[G.firstPlayer]===null) {
          G.firstPlayer = (G.firstPlayer+1)%ctx.numPlayers;
        }
        ctx.currentPlayer=G.firstPlayer.toString();
      },
      next: "in-round",
    },
  },
  endIf: G => {
    const chips = G.chipsLeft;
    let winner = -1;
    for (let i=1; i<=chips.length; i++) {
      if (chips[(i-1)]>0) {
        if (winner == -1) {
          winner = i;
        } else {
          winner = null;
        }
      }
    }
    return winner;
  },
  minPlayers: 2,
  maxPlayers: 9,
};

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

let deck = [];
for (let suit of Suits) {
  for (let rank of Ranks) {
    deck.push({ suit: suit, rank: rank });
  }
}

const deal = (ctx) => {
  //const n = ctx.random.Die(ctx.numPlayers);
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

const chipsLeftFunc = (numberPlayers) => {
  let returnCardsLeft = [];
  for (let num of [...Array(numberPlayers).keys()]) {
    returnCardsLeft.push(3);
    returnCardsLeft[num] = 3;
  }
  return returnCardsLeft;
}

function setUp(ctx) {
  let centerCards;
  let players;
  [centerCards, players] = deal(ctx);

  return {
    turnOrder: [...Array(ctx.numPlayers).keys()],
    center: centerCards,
    players: players,
    knock: -1,
    end: false,
    beulahChip: true,
    roundType: "Opening Round",
    consecPasses: 0,
    moveHistory: [],
    firstPlayer: 0,
    chipsLeft: chipsLeftFunc(ctx.numPlayers),
    loserMatrix: loserMatrix(ctx.numPlayers),
    middleChips: 0,
  };
}

export default TienLen;

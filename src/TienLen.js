// src/TienLen.js

import { /*PlayerView,*/ Stage } from "boardgame.io/core";
import { Suits, Ranks, /*Combinations*/ } from "./constants";
import { cardsToCenter, passTurn, knockTurn } from "./moves/cardPlayMoves";
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
  },
  stages: {
    notTurn: {
      moves: { relocateCards, clickSwap, relocateMiddleCards, clearStagingArea, fillStagingArea },
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
  phases: makePhases(),
  minPlayers: 1,
  maxPlayers: 9,
};

function makePhases() {
  let phases = {};
  for (let i = 0; i<=13; i++) {
    phases[i]= {
      start: i==0,
      endIf: G => {if (G.end){return G.knock;}},
      /*onEnd: (G, ctx) => {
        let centerCards;
        let players;
        [centerCards, players] = deal(ctx);
        G.firstPlayer = (G.firstPlayer+1)%G.turnOrder.length;
        ctx.currentPlayer=G.firstPlayer;
        G.center = centerCards;
        G.players = players;
        G.knock = -1; // might change ERIC
        G.end = false;
        G.roundType = "Opening Round";
      },*/
      next: (i%13)+1,
    }
  }
  return phases;
}

const loserMatrix = (numberPlayers) => {
  let loseMat = {};
  for (let num1 of [...Array(numberPlayers).keys()]) {
    for (let num2 of [...Array(numberPlayers).keys()]) {
      loseMat[num1] = {};
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
  let returnCardsLeft = {};
  for (let num of [...Array(numberPlayers).keys()]) {
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
    roundType: "Opening Round",
    //winners: [],
    firstPlayer: 0,
    chipsLeft: chipsLeftFunc(ctx.numPlayers),
    loserMatrix: loserMatrix(ctx.numPlayers)
  };
}

export default TienLen;

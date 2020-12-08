// src/TienLen.js

import { PlayerView, Stage } from "boardgame.io/core";
import { Suits, Ranks, /*Combinations*/ } from "./constants";
import { cardsToCenter, passTurn, tienLenPlay } from "./moves/cardPlayMoves";
import { relocateCards, relocateMiddleCards, clearStagingArea, fillStagingArea } from "./moves/cardAreaMoves";
import { compareCards } from "./moves/helper-functions/cardComparison";
const _ = require("lodash");

const TienLen = {
  name: "Beulah",
  setup: setUp,
  moves: {
    relocateCards: relocateCards,
    relocateMiddleCards: relocateMiddleCards,
    clearStagingArea: clearStagingArea,
    fillStagingArea: fillStagingArea,
    cardsToCenter: cardsToCenter,
    passTurn: passTurn,
    tienLenPlay: tienLenPlay,
  },
  stages: {
    tienLen: { moves: { tienLenPlay } },
    notTurn: {
      moves: { relocateCards, relocateMiddleCards, clearStagingArea, fillStagingArea },
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
  playerView: PlayerView.STRIP_SECRETS,
  endIf: G => {
    if (G.winners.length === 3) {
      let w = G.winners.concat(
        ["0", "1", "2", "3"].filter(x => !G.winners.includes(x))
      );
      return { winners: w };
    }
  },
  minPlayers: 1,
  maxPlayers: 9,
};

function setUp(ctx) {
  let deck = [];
  for (let suit of Suits) {
    for (let rank of Ranks) {
      deck.push({ suit: suit, rank: rank });
    }
  }

  //const n = ctx.random.Die(ctx.numPlayers);
  for (let i = 10; i > 0; i--) {
    deck = ctx.random.Shuffle(deck);
  }
  const chunkedDeck = _.chunk(deck, 5).map(x => x.sort(compareCards));

  let centerCards = chunkedDeck[0];

  const players = {};

  let firstPlayer;
  for (let i = 1; i <= ctx.numPlayers; i++) {
    //if (_.find(chunkedDeck[i], { rank: "3", suit: "S" })) {
    firstPlayer = 0// i;
    //}
    players[i-1] = {
      hand: chunkedDeck[i],
      stagingArea: [],
      stagingBackArea: [],
    };
  }
  console.log(ctx.numPlayers);

  const cardsLeftFunc = () => {
    let returnCardsLeft = {};
    for (let num of [...Array(ctx.numPlayers).keys()]) {
      returnCardsLeft[num] = 5;
    }
    return returnCardsLeft;
  }

  return {
    turnOrder: [...Array(ctx.numPlayers).keys()],
    center: centerCards,
    players: players,
    roundType: "Opening Round",
    winners: [],
    firstPlayer: firstPlayer,
    cardsLeft: cardsLeftFunc(),
  };
}

export default TienLen;

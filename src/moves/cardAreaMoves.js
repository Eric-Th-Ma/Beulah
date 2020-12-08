// src/moves/cardAreaMoves.js

export function relocateCards(G, ctx, cards, source) {
  const players = G.players;
  const playerID = ctx.playerID;
  players[playerID][source] = cards;
}

export function relocateMiddleCards(G, ctx, cards) {
  G.center = cards;
}

export function clearStagingArea(G, ctx) {
  const players = G.players;
  const playerID = ctx.playerID;
  players[playerID].hand = players[playerID].hand.concat(
    players[playerID].stagingArea
  );
  players[playerID].stagingArea = [];
  G.center = G.center.concat(
    players[playerID].stagingBackArea
  );
  players[playerID].stagingBackArea = [];
}

export function fillStagingArea(G, ctx) {
  const players = G.players;
  const playerID = ctx.playerID;
  players[playerID].stagingArea = players[playerID].stagingArea.concat(
    players[playerID].hand
  );
  players[playerID].hand = [];
  players[playerID].stagingBackArea = players[playerID].stagingBackArea.concat(
    G.center
  );
  G.center = [];
}

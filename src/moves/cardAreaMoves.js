// src/moves/cardAreaMoves.js

export function relocateCards(G, ctx, cards, source) {
  const players = G.players;
  const playerID = ctx.playerID;
  players[playerID][source] = cards;
}

export function clickSwap(G, ctx, card, source, group) {
  const players = G.players;
  const playerID = ctx.playerID;
  const remove = (array, card) => {
    let index = -1;
    for (let i = 0; i < array.length; i++) {
      if (array[i].rank == card.rank && array[i].suit == card.suit){
        index = i;
      }
    }
    if (index > -1) {
      array.splice(index, 1);
    }
    return array;
  }
  if (group=="center") {
    if (source=="centerCards") {
      G.center = remove(G.center, card);
      players[playerID]["stagingBackArea"] = players[playerID]["stagingBackArea"].concat([card]);
    } else {
      players[playerID][source] = remove(players[playerID][source], card);
      G.center = G.center.concat([card]);
    } 
  } else {
    const inSource = source=="hand" ? "stagingArea" : "hand";
    players[playerID][source] = remove(players[playerID][source], card);
    players[playerID][inSource] = players[playerID][inSource].concat([card]);
  }
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

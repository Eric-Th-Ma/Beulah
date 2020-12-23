// src/Card.js
import React from "react";
import Card from "./Card";
import { ReactSortable } from "react-sortablejs";
import PropTypes from "prop-types";

export default function CardArea({
  cards,
  className,
  listName,
  setList,
  group,
  roundType,
  clickSwap
}) {
  let x = (group=="center" && roundType=="Opening Round");
  return (
    <ReactSortable
      multiDrag={false}
      group={group}
      dragoverBubble={true}
      selectedClass={"selected-card"}
      list={cards}
      setList={newCards => setList(newCards, listName)}
      className={className}
      ghostClass={"ghost-card"}
      disabled={false}
    >
      {cards.map(card => (
        <Card 
          rank={card.rank} 
          suit={card.suit} 
          key={card.rank + card.suit} 
          concealed={x} 
          clickSwap={() => clickSwap(card, listName, group)}
        />
      ))}
    </ReactSortable>
  );
}

CardArea.propTypes = {
  cards: PropTypes.array,
  className: PropTypes.string,
  setList: PropTypes.func,
  group: PropTypes.string,
  listName: PropTypes.string,
  roundType: PropTypes.string,
  clickSwap: PropTypes.func,
};

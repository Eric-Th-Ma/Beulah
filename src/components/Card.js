// src/Card.js
import React from "react";
import PropTypes from "prop-types";

const requestImageFile = require.context("../assets/cards", true, /.svg$/);
export default function Card({ rank, suit, concealed, clickSwap }) {
  return (
    <img
      className="card"
      src={requestImageFile(`./${concealed ? "1B" : rank + suit}.svg`).default}
      alt={rank + suit}
      onClick={() => clickSwap()}
    />
  );
}

Card.propTypes = {
  rank: PropTypes.string,
  suit: PropTypes.string,
  concealed: PropTypes.bool,
  clickSwap: PropTypes.func.isRequired,
};

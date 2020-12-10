// src/Card.js
import React from "react";

const requestImageFile = require.context("../assets/other", true, /.png$/);
export default function Chip() {
  return (
    <span className="chip-container">
      <img className="chipimg" src={requestImageFile(`./pokerChip.png`).default}></img>
    </span>
  );
}

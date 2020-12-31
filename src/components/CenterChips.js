// src/CenterChips.js
import PropTypes from "prop-types";
import React from "react";
import Chip from "./Chip";

export default function CenterChips(props) {
  let chips = [[]]
  let wild = props.middleChips==0 ? 0 : (props.middleChips - 1)%13 + 1
  for (let i = 0; i < wild; i++) {
    if (chips[chips.length-1].length>=5) {
      chips.push([]);
    }
    chips[chips.length-1].push(<Chip key={i}/>)
  }
  return (
    chips.map((chipsSet, i)=><div key={i}>{chipsSet}</div>)
  );
}

CenterChips.propTypes = {
  middleChips: PropTypes.number,
}

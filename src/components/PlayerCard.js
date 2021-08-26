import React, { Component } from "react";
import styles from "./styles.css";
const classNames = require("classnames");

const positionKeyMap = {
  QB: "Quarterback",
  WR: "Wide Receiver",
  RB: "Running Back",
  TE: "Tight End",
  DST: "Defense",
  K: "Kicker",
};

export const PlayerCard = (props) => {
  const { name, Position, Team, FilterKey, Tier, Id, isDrafted } = props;
  return (
    <div
      class={classNames("playerCard", { isDrafted: isDrafted })}
      onClick={() => props.draftPlayer(Id)}
    >
      <div className="playerTopRow">
        <h3 class="playerCardName">{name}</h3>
        <div class="playerCardPosRank" />
      </div>
      <div class="playerCardPosition">{positionKeyMap[FilterKey]}</div>
      <div class="playerCardTeam">{Team}</div>
    </div>
  );
};

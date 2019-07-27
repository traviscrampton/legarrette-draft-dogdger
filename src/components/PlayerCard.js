import React, { Component } from "react"
import styles from "./styles.css"

export const PlayerCard = props => {
  const { name, Position, Team, PosRank } = props
  return (
    <div class="playerCard">
      <h3 class="playerCardName">{name}</h3>
      <div class="playerCardPosRank">{PosRank}</div>
      <div class="playerCardTeam">{Team}</div>
      <div class="playerCardPosition">{Position}</div>
    </div>
  )
}

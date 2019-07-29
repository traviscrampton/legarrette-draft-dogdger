import React, { Component } from "react"
import { PlayerCard } from "./PlayerCard"

export const Players = props => {
  let isDrafted
  return props.players.map((player, index) => {
    isDrafted = props.draftedIds.includes(player.Id)
    return (
      <PlayerCard
        {...player}
        draftPlayer={props.draftPlayer}
        unDraftPlayer={props.unDraftPlayer}
        isDrafted={isDrafted}
      />
    )
  })
}

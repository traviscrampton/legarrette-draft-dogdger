import React, { Component } from "react"
import {PlayerCard} from "./PlayerCard"


export  const Players = (props) => {
  return props.players.map((player, index) => {
    return <PlayerCard {...player} />
  })
}
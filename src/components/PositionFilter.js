import React from "react"
import { PositionChip } from "./PositionChip"
import styles from "./styles.css"

export const PositionFilter = props => {
  return (
    <div class="positionsFilter">
      {props.positions.map((position, index) => {
        return <PositionChip index={index} position={position} toggleFilter={props.toggleFilter} />
      })}
    </div>
  )
}

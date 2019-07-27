import React from "react"
const classNames = require("classnames")

export const PositionChip = props => {
  const {
    index,
    position: { name, selected }
  } = props
  return (
    <div class={classNames("positionChip", { selected: selected })} onClick={() => props.toggleFilter(index)}>
      <div>{name}</div>
    </div>
  )
}

import React, { Component } from "react"
import { players } from "../data/players"
import { filterPositions } from "../data/filterPositions"
import { Players } from "./Players"
import { PositionFilter } from "./PositionFilter"
import styles from "./styles.css"

class Legarette extends Component {
  constructor(props) {
    super(props)

    this.state = {
      players: players,
      filterPositions: filterPositions
    }
  }

  toggleFilter = (index) =>{
    let filter = this.state.filterPositions[index]
    filter = Object.assign({}, filter, { selected: !filter.selected})

    let filterPositions = [...this.state.filterPositions]
    filterPositions[index] = filter

    this.setState({ filterPositions })
  }

  getPlayers = () => {
    let activeFilters = this.state.filterPositions.filter((filter) => {
      return filter.selected
    }).map((filter) => {
      return filter.name
    })

    if (activeFilters.length === 0) {
      return this.state.players
    }

    return this.state.players.filter((player) => {
      return activeFilters.includes(player.FilterKey)
    })
  }

  render() {
    return (
      <div class="appContainer">
        <h1>Legarette Draft Dodger</h1>
        <PositionFilter positions={this.state.filterPositions} toggleFilter={this.toggleFilter} />
        <Players players={this.getPlayers()} />
      </div>
    )
  }
}

export default Legarette

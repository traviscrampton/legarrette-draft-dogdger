import React, { Component } from "react"
import { players } from "../data/players"
import { filterPositions } from "../data/filterPositions"
import { Players } from "./Players"
import { PositionFilter } from "./PositionFilter"
import { SearchBar } from "./SearchBar"
import { db, fyrebase } from "../firebase"
import legarrettelogo from "../legarrettelogo.png"
import styles from "./styles.css"
const classNames = require("classnames")

class Legarette extends Component {
  constructor(props) {
    super(props)

    this.state = {
      players: players,
      filterPositions: filterPositions,
      searchBarText: "",
      draftedIds: [],
      hideDraftedIds: false,
      isFocused: false
    }
  }

  componentWillMount() {
    this.getInitialData()
    this.setupListener()
  }

  getInitialData() {
    db.collection("drafted")
      .doc("garrett")
      .get()
      .then(doc => {
        const data = doc.data()
        const { ids } = data

        this.setState({
          draftedIds: ids
        })
      })
  }

  setupListener() {
    const ref = db.collection("drafted").doc("garrett")

    ref.onSnapshot(doc => {
      const data = doc.data()
      const { ids } = data

      this.setState({
        draftedIds: ids
      })
    })
  }

  draftPlayer = id => {
    let draftedIds = this.state.draftedIds.includes(id)
      ? this.state.draftedIds.filter(playerId => {
          return id !== playerId
        })
      : [...this.state.draftedIds, id]

    this.setState({
      draftedIds
    })

    db.collection("drafted")
      .doc("garrett")
      .set({ ids: draftedIds })
      .then(param => console.log("param", param))
      .catch(error => console.log("error", error))
  }

  unDraftPlayer = id => {
    let draftedIds = this.state.draftedIds.filter(playerId => {
      return id !== playerId
    })

    this.setState({
      draftedIds
    })
  }

  toggleFilter = index => {
    let filter = this.state.filterPositions[index]
    filter = Object.assign({}, filter, { selected: !filter.selected })

    let filterPositions = [...this.state.filterPositions]
    filterPositions[index] = filter

    this.setState({ filterPositions })
  }

  updateSearchBarText = e => {
    this.setState({ searchBarText: e.currentTarget.value })
  }

  getPlayers = () => {
    let { players } = this.state
    let activeFilters = this.state.filterPositions
      .filter(filter => {
        return filter.selected
      })
      .map(filter => {
        return filter.name
      })

    if (activeFilters.length !== 0) {
      players = players.filter(player => {
        return activeFilters.includes(player.FilterKey)
      })
    }

    players = this.state.searchBarText.length > 0 ? this.filterList(players) : players

    return players
  }

  escapeRegExp(s) {
    return s.replace(/[-/\\^$*+?.()|[\]{}]/g, "\\$&")
  }

  filterList(list) {
    const words = this.state.searchBarText
      .split(/\s+/g)
      .map(s => s.trim())
      .filter(s => !!s)
    const hasTrailingSpace = this.state.searchBarText.endsWith(" ")
    const searchRegex = new RegExp(
      words
        .map((word, i) => {
          if (i + 1 === words.length && !hasTrailingSpace) {
            // The last word - ok with the word being "startswith"-like
            return `(?=.*\\b${this.escapeRegExp(word)})`
          } else {
            // Not the last word - expect the whole word exactly
            return `(?=.*\\b${this.escapeRegExp(word)}\\b)`
          }
        })
        .join("") + ".+",
      "gi"
    )
    return list.filter(item => {
      return searchRegex.test(item.name)
    })
  }

  handleBlur = () => {
    this.setState({ isFocused: false })
  }

  handleFocus = () => {
    this.setState({ isFocused: true })
  }

  toggleShowDrafted = () => {
    const { hideDraftedIds } = this.state

    this.setState({
      hideDraftedIds: !hideDraftedIds
    })
  }

  getLastPlayer = () => {
    let lastId = this.state.draftedIds[this.state.draftedIds.length - 1]
    return this.state.players.find(player => {
      return player.Id === lastId
    })
  }

  lastDraftedPlayer = () => {
    if (this.state.draftedIds.length === 0) return
    let lastPlayer = this.getLastPlayer()

    return (
      <div className="lastDraftedPlayer">
        Last Drafted: {lastPlayer.name}, {lastPlayer.FilterKey}
      </div>
    )
  }

  showDraftedToggle() {
    const text = this.state.hideDraftedIds ? "Show Drafted Players" : "Hide Drafted Players"
    return (
      <div
        className={classNames("draftedToggle", { hideDrafted: !this.state.hideDraftedIds })}
        onClick={this.toggleShowDrafted}>
        <div>
          {text} ({this.state.draftedIds.length})
        </div>
      </div>
    )
  }

  render() {
    return (
      <div class={classNames("appContainer", { hideDraftedIds: this.state.hideDraftedIds })}>
        <h1>
          <img src={legarrettelogo} className="legarrettelogo" />
          Federation Legarrett
        </h1>
        <SearchBar
          updateSearchBarText={this.updateSearchBarText}
          handleBlur={this.handleBlur}
          handleFocus={this.handleFocus}
          isFocused={this.state.isFocused}
          searchBarText={this.state.searchBarText}
        />
        {this.showDraftedToggle()}
        <PositionFilter positions={this.state.filterPositions} toggleFilter={this.toggleFilter} />
        {this.lastDraftedPlayer()}
        <Players
          players={this.getPlayers()}
          draftPlayer={this.draftPlayer}
          undraftPlayer={this.undraftPlayer}
          draftedIds={this.state.draftedIds}
        />
      </div>
    )
  }
}

export default Legarette

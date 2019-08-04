import React from "react"
import MaterialIcon, { colorPalette } from "material-icons-react"
import styles from "./styles.css"
const classNames = require("classnames")

export const SearchBar = props => {
  return (
    <div className={classNames("searchBar", { isFocused: props.isFocused })}>
      <MaterialIcon icon="search" />
      <input
        type="text"
        onFocus={props.handleFocus}
        onBlur={props.handleBlur}
        value={props.searchBarText}
        onChange={props.updateSearchBarText}
      />
    </div>
  )
}

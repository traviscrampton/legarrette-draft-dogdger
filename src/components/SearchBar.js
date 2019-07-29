import React from "react"
import MaterialIcon, {colorPalette} from 'material-icons-react';
import styles from "./styles.css"
const classNames = require("classnames")

export const SearchBar = props => {
  return (
    <div className="searchBar">
      <MaterialIcon icon="search" />
      <input type="text" value={props.searchBarText} onChange={props.updateSearchBarText} />
    </div>
  )
}

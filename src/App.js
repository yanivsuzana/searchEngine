import './App.css'
import React, { useState } from 'react'
import DataResults from './components/dataResults/DataResults'
import AutoComplete from './components/autoComplete/AutoComplete'
import { searchItems } from './mock/data.json'

const App = () => {
  const [data] = useState(searchItems)
  const [searchResults, setSearchResults] = useState()
  const handleResultChange = (searchResult) => {
    setSearchResults(searchResult)
  }

  return (
    <div className="App">
      <div className="container">
        <AutoComplete
          searchItems={data}
          handleDataResults={handleResultChange}
        />
      </div>
      <DataResults searchResult={searchResults} />
    </div>
  )
}

export default App

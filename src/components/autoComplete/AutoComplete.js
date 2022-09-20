import React from 'react'
import { useEffect, useRef, useState } from 'react'
import { MAX_SEARCH_RESULTS } from '../../constants/settings'

const AutoComplete = ({ searchItems, handleDataResults }) => {
  const [suggestionList, setSuggestList] = useState()
  const [resultHistory, setResultHistory] = useState([])
  const [searchTermValue, setSearchTerm] = useState('')
  const [showResults, setShowResults] = useState(false)
  const [showHistoryResults, setShowHistoryResults] = useState(false)
  const inputRef = useRef()

  useEffect(() => {
    const localStore = localStorage.getItem('dataHistorySearch')
    const data = localStore ? JSON.parse(localStore) : []
    setResultHistory(data)
  }, [])

  useEffect(() => {
    inputRef.current?.focus()
    localStorage.setItem('dataHistorySearch', JSON.stringify(resultHistory))
  }, [resultHistory])

  const handleMouseEnter = () => {
    setShowHistoryResults(!showResults)
  }

  const hideHistory = () => {
    setShowHistoryResults(false)
  }

  const hideList = () => {
    setShowHistoryResults(false)
  }

  const handleClick = (item) => {
    setShowResults(false)
    setShowHistoryResults(false)
    setSearchTerm(item.searchTerm)
    handleDataResults(item.results)
    const tempItem=item;
    tempItem.historyItem = 1
    const isAlreadyIncluded = resultHistory.find(
      (p) => p.searchTerm === item.searchTerm
    )
    if (!isAlreadyIncluded) {
      setResultHistory((prevArray) => [...prevArray, tempItem])
    }
  }

  const handleKeyPress = ({ target, charCode }) => {
    if (charCode === 13) {
      let dataRes = searchItems.filter((item) =>
        item.searchTerm.includes(target.value)
      )
      let concatRes = []
      dataRes.forEach((item) => {
        concatRes = concatRes.concat(item.results)
      })
      handleDataResults(concatRes)
      setShowResults(false)
    }
  }
  const handleChange = (e) => {
    setSearchTerm(e.target.value)
    setShowHistoryResults(false)
    if (!e.target.value) {
      setSuggestList('')
      setShowResults(false)
    } else {
      let filteredResult = searchItems.filter((item) =>
        item.searchTerm.includes(e.target.value)
      )
      setSuggestList(filteredResult)
      setShowResults(!!filteredResult.length)
    }
  }

  return (
    <React.Fragment>
      <div className="autocomplete">
        <input
          ref={inputRef}
          type="text"
          placeholder="Search Ex: java"
          onFocus={hideHistory}
          onChange={handleChange}
          onMouseEnter={handleMouseEnter}
          onKeyPress={handleKeyPress}
          value={searchTermValue}
        />
      </div>
      <div
        onMouseLeave={hideList}
        className={showHistoryResults ? 'result-history' : ''}
      >
        {showHistoryResults &&
          resultHistory?.map((item, i) => {
            if (i >= MAX_SEARCH_RESULTS) return null
            return (
              <div key={i} onClick={() => handleClick(item)}>
                <div className="history-clock"></div>
                <div>{item.searchTerm}</div>
              </div>
            )
          })}
      </div>
      <div className={showResults ? 'result-list' : ''}>
        {showResults &&
          suggestionList?.map((item, i) => (
            <div key={i} onClick={() => handleClick(item)}>
              {item.searchTerm}
            </div>
          ))}
      </div>
    </React.Fragment>
  )
}

export default AutoComplete

import { MAX_SEARCH_RESULTS } from '../../constants/settings'

const DataResults = ({ searchResult }) => {
  return (
    <div className="result-table">
      {searchResult?.map((item, i) => {
        if (i >= MAX_SEARCH_RESULTS) return null
        return (
          <div key={i} className="row">
            <div>{item.link} <span role="text"> › ...</span></div>
            <a rel="noreferrer" href={item.link} target="_blank">
              <h3> {item.name} </h3>
            </a>
            <div>{item.description}</div>
          </div>
        )
      })}
    </div>
  )
}

export default DataResults

import React, { useState, useEffect, Fragment } from 'react';
import {databaseRef} from "../initialize-firebase";

function AutomobilesTable() {
  const [autoData, setAutoData] = useState([]);
  const [filteredAutoData, setFilteredAutoData] = useState([]);
  const [searchValue, setSearchValue] = useState("");

  const [idOrderAsc, setIdOrderAsc] = useState(true);
  const [manufacturerOrderAsc, setManufacturerOrderAsc] = useState(null);
  const [modelOrderAsc, setModelOrderAsc] = useState(null);

  // getting data from firebase
  useEffect(() => {
    databaseRef.once('value', snapshot => {
      setAutoData(snapshot.val())
    }).catch(error => console.log(error.message))
  }, []);

  // when searchValue changes, search the data and assign it to separate state value
  useEffect(() => {
    let searchResults = [];
    for (let i = 0; i < autoData.length; i++) {
      // stringify number value because filter will break otherwise
      autoData[i].id = autoData[i].id.toString()
      // turn obj values into filterable array
      let currentObjValues = Object.values(autoData[i]);
      // search each index of array for substring being searched
      const filteredArray = currentObjValues.filter(arrayValue => arrayValue.toLowerCase().includes(searchValue.toLowerCase()))
      // push filtered results to new array so we don't destroy the data from firebase
      if (filteredArray.length) {
        searchResults.push(autoData[i])
      }
    }
    // set filtered results to searchValue in state
    setFilteredAutoData([...searchResults])
  }, [searchValue, autoData]);

  function handleSorting(element, orderAsc, setOrderAsc) {
    autoData.sort((a, b) => {
      if (orderAsc) {
        return a[element] > b[element] ? -1 : 1;
      } else {
        return a[element] > b[element] ? 1 : -1;
      }
    });
    // keeping track of which columns are ascending or descending in state
    setOrderAsc(orderAsc !== null ? !orderAsc : true)
    setAutoData([...autoData])
  }

  // when input value changes, update searchValue in state with that value
  function handleSearchInput(e) {
    setSearchValue(e.target.value)
  }

  // render appropriate carret icon depending on current ascending/descending state of column
  function renderIcon(order) {
    if (order === null || order) {
      return <svg data-icon="caret-up" className="icon caret-up" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path fill="currentColor" d="M288.662 352H31.338c-17.818 0-26.741-21.543-14.142-34.142l128.662-128.662c7.81-7.81 20.474-7.81 28.284 0l128.662 128.662c12.6 12.599 3.676 34.142-14.142 34.142z"></path></svg>
    } else if (order === false) {
      return <svg data-icon="caret-down" className="icon caret-down" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path fill="currentColor" d="M31.3 192h257.3c17.8 0 26.7 21.5 14.1 34.1L174.1 354.8c-7.8 7.8-20.5 7.8-28.3 0L17.2 226.1C4.6 213.5 13.5 192 31.3 192z"></path></svg> 
    }
  }

  return (
    <Fragment>
      <input type="text" className="searchField" placeholder="Seatch automobile data" value={searchValue} onChange={handleSearchInput} />
      <div className="tableWrapper">
        <div className="headers row">
          <div className="id cell" onClick={() => handleSorting('id', idOrderAsc, setIdOrderAsc)}>
            <span>ID</span>
            {renderIcon(idOrderAsc)}
          </div>
          <div className="manufacturer cell" onClick={() => handleSorting('manufacturer', manufacturerOrderAsc, setManufacturerOrderAsc)}>
            <span>Manufacturer</span>
            {renderIcon(manufacturerOrderAsc)}
          </div>
          <div className="model cell" onClick={() => handleSorting('model', modelOrderAsc, setModelOrderAsc)}>
            <span>Model</span>
            {renderIcon(modelOrderAsc)}
          </div>
        </div>
        {/* if the search input has a value, display filtered data. otherwise, display data from firebase */}
        {(searchValue ? filteredAutoData : autoData).map(automobile => {
          const {
            id,
            manufacturer,
            model
          } = automobile;
          return (
            <div className="row" key={id}>
              <div className="id cell">{id}</div>
              <div className={manufacturer === 'Ford' ? 'manufacturer cell bold' : 'manufacturer cell'}>{manufacturer}</div>
              <div className="model cell">{model.toUpperCase()}</div>
            </div>
          );
        })}
      </div>
    </Fragment>
  );
  
}

export default AutomobilesTable;

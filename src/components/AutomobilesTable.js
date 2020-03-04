import React, { useState, useEffect } from 'react';
import {databaseRef} from "../initialize-firebase";

function AutomobilesTable() {

  const [autoData, setAutoData] = useState([]);
  const [idOrderAsc, setIdOrderAsc] = useState(true);
  const [manufacturerOrderAsc, setManufacturerOrderAsc] = useState(null);
  const [modelOrderAsc, setModelOrderAsc] = useState(null);

  useEffect(() => {
    console.log('in useEffect')
    databaseRef.once('value', snapshot => {
      setAutoData(snapshot.val())
    }).catch(error => console.log(error.message))
  }, []);


  function handleSorting(element, orderAsc, setOrderAsc) {
    let comparer = 0;

    autoData.sort((a, b) => {
      if (!orderAsc) {
        if (a[element] > b[element]) {
          return 1;
        } 
        if (a[element] < b[element]) {
          return  -1;
        }
      } else if (orderAsc) {
        if (a[element] > b[element]) {
          return -1;
        } 
        if (a[element] < b[element]) {
          return  1;
        }
      }
      
      return 0;
    })

    setOrderAsc(orderAsc !== null ? !orderAsc : true)
    setAutoData([...autoData])
  }

  function renderIcon(order) {
    if (order === null || order) {
      return <svg data-icon="caret-up" class="icon caret-up" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path fill="currentColor" d="M288.662 352H31.338c-17.818 0-26.741-21.543-14.142-34.142l128.662-128.662c7.81-7.81 20.474-7.81 28.284 0l128.662 128.662c12.6 12.599 3.676 34.142-14.142 34.142z"></path></svg>
    } else if (order === false) {
      return <svg data-icon="caret-down" class="icon caret-down" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path fill="currentColor" d="M31.3 192h257.3c17.8 0 26.7 21.5 14.1 34.1L174.1 354.8c-7.8 7.8-20.5 7.8-28.3 0L17.2 226.1C4.6 213.5 13.5 192 31.3 192z"></path></svg> 
    }
  }

  return (
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
      {autoData.map(automobile => {
        const {
          id,
          manufacturer,
          model
        } = automobile;

        return (
          <div className="row" key={id}>
            <div className="id cell">{id}</div>
            <div className="manufacturer cell">{manufacturer}</div>
            <div className="model cell">{model}</div>
          </div>
        );
      })}
    </div>
  );
  
}

export default AutomobilesTable;

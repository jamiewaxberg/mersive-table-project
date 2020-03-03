import React, { useState, useEffect } from 'react';
import {databaseRef} from "../initialize-firebase";

function AutomobilesTable() {

  const [autoData, setAutoData] = useState([]);

  useEffect(() => {
    databaseRef.once('value', snapshot => {
      setAutoData(snapshot.val())
    }).catch(error => console.log(error.message))
  });


  function handleSorting(element) {
    const sortedAutoData = autoData.sort((a, b) => -1)
    // console.log(sortedAutoData)
    setAutoData(sortedAutoData)
    console.log(autoData)
  }

  return (
    <div className="tableWrapper">
      <div className="headers row">
        <div className="id cell" onClick={() => handleSorting('id')}>ID</div>
        <div className="manufacturer cell">Manufacturer</div>
        <div className="model cell">Model</div>
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

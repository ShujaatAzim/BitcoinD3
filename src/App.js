import React, { useState, useEffect } from 'react';
import BitcoinChart from './BitcoinChart';

const App = () => {

  const [data, setData] = useState([])
  const [clicked, setClicked] = useState(false)
  const [filter, setFilter] = useState(30)

  useEffect(() => {
    getData()
    // eslint-disable-next-line
  }, [])

  const getData = () => {
    fetch("https://api.coindesk.com/v1/bpi/historical/close.json")
    .then(resp => resp.json())
    .then(d => setData(Object.keys(d.bpi).map(date => {
      return {
        date: new Date(date),
        price: d.bpi[date]
      };
    })))
    .catch(error => console.log(error))
  }

  return (
    <div style={{ textAlign: "center" }}>
      <h2 style={{ textAlign: "center" }}>Interactive BitCoin Price Chart</h2>
      <BitcoinChart filter={filter} data={data} />
      <br />
      <br />
      <h4>Some filters:</h4>
      <div style={{ marginLeft: "20vw", marginRight: "20vw", display: "flex", justifyContent: "space-around" }}>
        { clicked ? 
        <div>
          <button disabled={!clicked} onClick={() => {setData(getData);setClicked(false);setFilter(30)}}>Reset Filters</button>
        </div> :
        <div>
          <button disabled={clicked} onClick={() => {setData(data.slice(-5));setClicked(true);setFilter(5)}}>Last 5 Days</button>
          <button disabled={clicked} onClick={() => {setData(data.slice(-10));setClicked(true);setFilter(10)}}>Last 10 Days</button>
          <button disabled={clicked} onClick={() => {setData(data.slice(-15));setClicked(true);setFilter(15)}}>Last 15 Days</button>
          <button disabled={clicked} onClick={() => {setData(data.slice(-20));setClicked(true);setFilter(20)}}>Last 20 Days</button>
          <button disabled={clicked} onClick={() => {setData(data.slice(-25));setClicked(true);setFilter(25)}}>Last 25 Days</button>
        </div>
        }
      </div>
    </div>
  );
}

export default App;

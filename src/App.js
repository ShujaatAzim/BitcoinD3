import React, { useState, useEffect } from 'react';
import Chart from './Chart';

const App = () => {

  const [data, setData] = useState([])

  useEffect(() => {
    fetch("https://api.coindesk.com/v1/bpi/historical/close.json")
    .then(resp => resp.json())
    .then(d => setData(Object.keys(d.bpi).map(date => {
      return {
        date: new Date(date),
        price: d.bpi[date]
      };
    })))
    .catch(error => console.log(error))
  }, [])

  return (
    <div>
      <h2 style={{ textAlign: "center" }}>30 Day Bitcoin Price Chart</h2>
      <Chart data={data} />
    </div>
  );
}

export default App;

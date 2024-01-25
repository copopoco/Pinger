import React, { useState, useEffect } from 'react';

function App() {
  const [intervalId, setIntervalId] = useState(null);

  const startFetching = () => {
    if (!intervalId) {
      let randomInterval = Math.floor(Math.random() * 9) + 1;
      console.log(`Fetching started with interval of ${randomInterval} minutes`); // Random value between 1 and 9
      const id = setInterval(async () => {
        try {
          const response = await fetch(`${import.meta.env.VITE_APP_RENDER_URL}/api/v1/movie/watched/getall/65a594a89842761d81a9`);
          const data = await response.json();
          console.log(data);
          randomInterval = Math.floor(Math.random() * 9) + 1;
          console.log(`Fetching started with interval of ${randomInterval} minutes`);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      }, randomInterval * 60 * 1000); // Convert minutes to milliseconds

      setIntervalId(id);

    }
  };

  const stopFetching = () => {
    if (intervalId) {
      clearInterval(intervalId);
      setIntervalId(null);
      console.log('Fetching stopped');
    }
  };



  return (
    <>
      <div>
        <button onClick={startFetching}>Start Fetching</button>
        <button onClick={stopFetching}>Stop Fetching</button>
      </div>
    </>
  );
}

export default App;

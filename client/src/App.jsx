import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar/sidebar';
import Main from './components/Main/main';

const App = () => {

    // const [status, setStatus] = useState("");

  // useEffect(() => {
  //   fetch("/")
  //     .then(res => res.json())
  //     .then(data => setStatus(data.status));
  // }, []);

  return (
    <>
      <Sidebar />
      <Main />
    </>
  );
};

export default App;
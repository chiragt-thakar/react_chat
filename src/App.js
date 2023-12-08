import React, { useState,useEffect } from 'react';
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Login from './components/Login'
import Navbar from './components/Navbar';
import Card from './components/Card';
import Registration from './components/Registration';
import GroupContainer from './grp_components/GroupContainer';
import Groupchat from './pages/Groupchat';

export default function App() {
const [socket_id, setSocket] = useState('');
function getsocket(sck) {
  setSocket(sck)
  console.log('sck is ',sck)
}
useEffect(() => {
  // Define the getsocket function
  function getsocket(sck) {
    setSocket(sck);
    console.log('sck is ', sck);
  }

  // Call the getsocket function with a simulated socket connection
  // getsocket({ id: 'some_unique_id' });

  // Cleanup logic if needed

  // Specify dependencies for the useEffect hook
}, []);

	return (
		<>
		<BrowserRouter>
		{/* <Navbar></Navbar> */}
      <Routes>
        <Route exact path="/" element={<Registration />} />
        <Route exact path="/register" element={<Registration />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/home" element={<Card getsocket={getsocket}/>} />
        <Route exact path="/group" element={<Groupchat socket_id={socket_id} />} />
        <Route
          path="/GroupContainer/:id"
          element={ <GroupContainer socket={socket_id}/>}
          exact
        />
      </Routes>
    </BrowserRouter>
		</>
	);
}
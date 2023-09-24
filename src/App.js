import React from 'react';
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Login from './components/Login'
import Navbar from './components/Navbar';
import Card from './components/Card';
import Registration from './components/Registration';

export default function App() {

	return (
		<>
		<BrowserRouter>
		{/* <Navbar></Navbar> */}
      <Routes>
        <Route exact path="/" element={<Registration />} />
        <Route exact path="/register" element={<Registration />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/home" element={<Card />} />
      </Routes>
    </BrowserRouter>
		</>
	);
}
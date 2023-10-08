import React, { useEffect, useState } from "react";
 import { useCookies } from 'react-cookie';
 import axios from "axios";
import Navbar2 from './Navbar2'
import { Link, useNavigate } from "react-router-dom";

export default function Card() {


  const [cookies, setCookie] = useCookies(['user']);
  const [userData, setUserData] = useState(null);


  useEffect(() => {
    // Fetch user data when the component mounts
    async function fetchUserData() {
      try {
        const response = await axios.get("http://localhost:3001/api/home", { withCredentials: true });
        setUserData(response.data); // Set user data in state
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    }

    fetchUserData();
  }, []);




  useEffect(() => {
    if (userData) {
      setCookie('name', userData.userName, { path: '/' })
    };
  }, [userData, setCookie]);
  console.log("this is 2 ", userData)

  const Name = () => <div>Home Page</div>; 

return (
  <>
    <div className="super_parent container-fluid ">
      <div className="row">
        <Navbar2></Navbar2>

        <div className="col-1"></div>

        <div className="col-6">
          <div className="chat">
            <div className="chat_header">
              <Name></Name>
            </div>
            <div className="chat_history"></div>
            <div className="chat_send"></div>
          </div>
        </div>

        <div className="col-1"></div>

        <div className="col-3">
          <div className="list">
            <div className="list_header"></div>
            <div className="list_body"></div>
          </div>
        </div>
      </div>
    </div>

  </>
);
}
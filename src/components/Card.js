import React, { useEffect, useState } from "react";
// import { useCookies } from 'react-cookie';
// import axios from "axios";

export default function Card() {


  //   const [cookies, setCookie] = useCookies(['user']);
  //  const [userData, setUserData] = useState(null);


  //  useEffect(() => {
  //   // Fetch user data when the component mounts
  //   async function fetchUserData() {
  //     try {
  //       const response = await axios.get("http://localhost:3001/api/home", { withCredentials: true });
  //       setUserData(response.data); // Set user data in state
  //     } catch (error) {
  //       console.error("Error fetching user data:", error);
  //     }
  //   }

  //   fetchUserData();
  // }, []);




  //   useEffect(() => {
  //     if (userData) {
  //       setCookie('name', userData.userName, { path: '/' });
  //          console.log("this is 2 ",userData)
  //       }
  //     }, [userData, setCookie]);

  return (
    <>
      <div className="super_parent container-fluid ">
        <div className="row">
          <div className="col-1 icon">

            <div className="mynav">
              {/* <a className="active " href="#"><i className="fa fa-home"></i></a> */}
              <a href="#" className="nav_i"><img src="https://www.w3schools.com/howto/img_avatar2.png" alt="Avatar" className="avatar"></img></a>
              <a href="#" className="nav_i"><i className="fa fa-home"></i></a>
              <a href="#" className="nav_i">C</a>
              <a href="#" className="nav_i">D</a>
              <a href="#" className="nav_i">M</a>
              <a href="#" className="nav_i">Q</a>
              <a href="#" className="nav_i"><i class="fa fa-sign-out" aria-hidden="true"></i></a>
              {/* <i class="fa fa-sign-in" aria-hidden="true"></i> */}
              {/* for sign in  */}
            </div>
          </div>

          <div className="col-1"></div>

          <div className="col-6">
            <div className="chat">
              <div className="chat_header"></div>
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
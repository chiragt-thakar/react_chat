import React, { useEffect, useState,useRef } from "react";

import { useCookies } from 'react-cookie';
import axios from "axios";
import Navbar2 from './Navbar2'
 import { Link, useNavigate } from "react-router-dom";
import UserList from "./UserList";
import io from 'socket.io-client';
import ChatContainer from "./ChatContainer";
import Welcome from "./Welcome";
// const socket = io('http://localhost:3001');
export default function Card({getsocket}) {
  const navigate = useNavigate();

  const socket = useRef(null);

  const [cookies, setCookie] = useCookies(['name']);
  const [selectedUser, setSelectedUser] = useState('');
  const [userData, setUserData] = useState(null);
  const [socket_id, setsocket] = useState("");
  const [currentChat, setCurrentChat] = useState(undefined); //logic for welcome component rendering
  const [currentUser, setCurrentUser] = useState(undefined);

 

 
  useEffect(() => {
    if (currentUser) {
      console.log("card currentUser",currentUser)
      socket.current = io('http://localhost:3001');
      console.log("card socket",socket)
      socket.current.emit("add-user", currentUser);
      setsocket(socket.current);
       getsocket(socket.current);
    }
  }, [currentUser]);
  useEffect(() => {
    // if (typeof cookies.name === 'undefined' || cookies.name === null) {
    // navigate("/login");
    // } else {
     console.log("You are already logged in.",socket_id);
     setCurrentUser(cookies.name);
    //  getsocket(socket_id);
    // }
 }, [getsocket]);

  // socket.on("connect", () => {
  //   console.log(socket.id); // x8WIv7-mJelg7on_ALbx
  // });
  // useEffect(() => {


  //   socket.on("msgRecive", (message, user) => {
  //     setMessage(message)
  //     console.log("this is socket message ", message)
  //   });

  // }, [Message])


  // socket.on("disconnect", () => {
  //   console.log(socket.id); // undefined
  // });


  // const sel_user = (response) => {
  //   setSelectedUser(response);
  //   console.log('selected user is ', selectedUser);
  // }

 
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
      setCookie('name', userData._id, { path: '/' })
    };
  }, [userData, setCookie]);
  console.log("this is 2 ", userData)

  const handleChatChange = (user_id,user) => {
    setCurrentChat(user_id);
    setSelectedUser(user);
     console.log("cht,chat",user)
   };

  // const Name = () => <div>Home Page</div>; 

  return (
    <>
      <div className="super_parent container-fluid ">
        <div className="row">
         
          <Navbar2></Navbar2>

          <div className="col-1 "></div>

          {currentChat === undefined ? (
            <Welcome />
          ) : (
             <ChatContainer currentChat={currentChat} socket={socket} userName={selectedUser}/>



       
          )}

          <div className="col-1"></div>

          <UserList  changeChat={handleChatChange}></UserList>
        </div>
      </div>

    </>
  );
}
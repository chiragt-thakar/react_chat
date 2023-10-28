import React, { useEffect, useState } from "react";
import { useCookies } from 'react-cookie';
import axios from "axios";
import Navbar2 from './Navbar2'
// import { Link, useNavigate } from "react-router-dom";
import UserList from "./UserList";
import io from 'socket.io-client';
import ChatInput from "./ChatInput";
const socket = io('http://localhost:3001');
export default function Card() {

  const [Message, setMessage] = useState("")
  socket.on("connect", () => {
    console.log(socket.id); // x8WIv7-mJelg7on_ALbx
    
  
  });
  useEffect(() => {
    
  
    socket.on("msgRecive",(message,user)=>{
    setMessage(message)
    console.log("this is socket message ",message)
    });
   
  }, [Message])
  
  
  socket.on("disconnect", () => {
    console.log(socket.id); // undefined
  });
  

  const [cookies, setCookie] = useCookies(['user']);
  const [selectedUser, setSelectedUser] = useState('');
  const [userData, setUserData] = useState(null);
 
    
    const sel_user =(response)=>{
      setSelectedUser(response);
      console.log('selected user is ',selectedUser);
    }
   
    const handleSendMsg = async(msg)=>{
      socket.emit("sendMessage",msg,selectedUser)
      console.log("Message is ", msg,selectedUser);
    }

    
  
    
  
  

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

  // const Name = () => <div>Home Page</div>; 

  return (
    <>
      <div className="super_parent container-fluid ">
        <div className="row">
          <Navbar2></Navbar2>

          <div className="col-1 "></div>

          <div className="col-6">
            <div className="chat">
              <div className="chat_header">
                {/* <Name></Name> */}
              </div>
              <div className="chat_history">
                <span>{Message}</span>
              </div>
             <ChatInput  handleSendMsg={handleSendMsg}></ChatInput>
            </div>
          </div>

          <div className="col-1"></div>

          <UserList user={sel_user}></UserList>
        </div>
      </div>

    </>
  );
}
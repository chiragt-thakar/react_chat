import React, { useEffect, useState, useRef } from "react";
import Navbar2 from '../components/Navbar2'

import Welcome from "../grp_components/Welcome";

import { useCookies } from 'react-cookie';
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import io from 'socket.io-client';

function Groupchat(socket_id) {
    const socket = 1
    const handleChatChange = () => {
        console.log("hello")
    }
    const currentChat = () => {
        console.log("hello")
    }
    const selectedUser = () => {
        console.log("hello")
    }
    useEffect(() => {
      console.log("this is group socket",socket_id)
      
    }, [])
    
    return (
        <>
            <div className="super_parent container-fluid ">
                <div className="row">

                    <Navbar2></Navbar2>

                    <div className="col-1 "></div>
                  
     <Welcome></Welcome>
                </div>
            </div>
        </>
    )
}

export default Groupchat
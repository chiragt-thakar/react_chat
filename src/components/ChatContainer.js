import { React, useState, useRef, useEffect } from 'react'
import ChatInput from "./ChatInput";
import { useCookies } from 'react-cookie';
import axios from "axios";
import { v4 as uuidv4 } from "uuid";

function ChatContainer({ currentChat, socket }) {
    const [first, setfirst] = useState("")
    const [cookies] = useCookies(['name']);
    const [messages, setMessages] = useState([]);
    const scrollRef = useRef();
    const [arrivalMessage, setArrivalMessage] = useState(null);

    useEffect(() => {
        // Fetch user data when the component mounts
        async function fetchmsg() {
          try {
            const response = await axios.post("http://localhost:3001/api/getMessage  ", {from: cookies.name,to: currentChat._id,}, { withCredentials: true });
            setMessages(response.data);
        } catch (error) {
            console.error("Error fetching user data:", error);
          }
        }
        fetchmsg();
      }, []);



//     useEffect(async () => {
// async function getmsg(){
//         const response = await axios.post("http://localhost:3001/api/getMessage  ", {from: cookies.name,to: currentChat._id,}, { withCredentials: true });
//         setMessages(response.data);
//     }
//     getmsg();
//     }, [currentChat]);

    const handleSendMsg = async (msg) => {
        
            console.log("mmm", msg)
            console.log("ccc", cookies.name)
            console.log("current cgat", currentChat)
            console.log(socket)
            socket.current.emit("send-msg", {
                to: currentChat,
                from: cookies.name,
                msg,
            });

      
        await axios.post("http://localhost:3001/api/addMessage  ", {
            from: cookies.name,
            to: currentChat,
            message: msg,
        }, { withCredentials: true });

        const msgs = [...messages];
        msgs.push({ fromSelf: true, message: msg });
        setMessages(msgs);
    };
    useEffect(() => {
        if (socket.current) {
            socket.current.on("msg-recieve", (msg) => {
                console.log("socket recieve",msg);
                setfirst(msg)
                setArrivalMessage({ fromSelf: false, message: msg });
            });
        }
    }, []);

    useEffect(() => {
        arrivalMessage && setMessages((prev) => [...prev, arrivalMessage]);
      }, [arrivalMessage]);
    
      useEffect(() => {
        scrollRef.current?.scrollIntoView({ behavior: "smooth" });
      }, [messages]);

    return (
        <>     <div className="col-6">
            <div className="chat">
                <div className="chat_header">
                    {/* <Name></Name> */}{ }
                </div>
                <div className="chat_history">
                <div className="chat-messages">
        {messages.map((message) => {
          return (
            <div ref={scrollRef} key={uuidv4()}>
              <div
                className={`message ${
                  message.fromSelf ? "sended" : "recieved"
                }`}
              >
                <div className="content ">
                  <p>{message.message}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
                </div>
                <ChatInput handleSendMsg={handleSendMsg}></ChatInput>
            </div>
        </div></>
    )
}

export default ChatContainer
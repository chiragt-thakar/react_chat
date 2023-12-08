import React from 'react'
import Navbar2 from '../components/Navbar2'
import { useParams } from 'react-router-dom';
import SendChat from './SendChat';
import { useCookies } from 'react-cookie';
import { v4 as uuidv4 } from "uuid";



function GroupContainer(socket) {
  const [cookies] = useCookies(['name']);
  const [messages, setMessages] = React.useState([]);
  const [chatroomID, setchatroomId] = React.useState("");
  const userId = cookies.name;
  const { id } = useParams();


        
        
        React.useEffect(() => {
          // console.log("the match is :-", match.params.id)
          setchatroomId(id)
           console.log(userId)
      console.log(socket)
        if (socket ) {
          socket.socket.emit("joinRoom", {
            id,
          });
        }
    
        return () => {
          //Component Unmount
          if (socket && socket.socket.emit) {
            socket.socket.emit("leaveRoom", {
              id,
            });
          }
        };
        //eslint-disable-next-line
      }, []);


       React.useEffect(() => {
      //   // const token = localStorage.getItem("CC_Token");
      //   // if (token) {
      //   //   const payload = JSON.parse(atob(token.split(".")[1]));
      //   //   setUserId(payload.id);
      //   // }
         if (socket) {
           socket.socket.on("newMessage", (message) => {
             const newMessages = [...messages, message];
             setMessages(newMessages);
           });
         }
      //   //eslint-disable-next-line
       }, [messages]);
  return (
    <>    
     <div className="super_parent container-fluid ">
                <div className="row">

                    <Navbar2></Navbar2>

                    <div className="col-1 "></div>
                  
                    <div className="col-6">
    <div className="chat">
        <div className="chat_header">
            {/* <Name></Name> */}{ }
            <span className='nameTitle mx-5 my-5'>{}</span>
        </div>
        <div className="chat_history">
        <div className="chat-messages">
{/* {messages.map((message) => {
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
})} */}
 {messages.map((message, i) => (

              
                <div key={i}
                className={`message ${
                userId == message.usermId ? "sended" : "recieved"
                }`}
              >
                 <div className="content ">
                  {/* <p>{message.message}</p> */}
                  <p>{message.usermId }</p>
                  {/* <p>{userId}</p> */}
                </div>
              </div>
                
            
          ))}
</div>
        </div>
        {/* <ChatInput></ChatInput> */}
       <SendChat socket={socket} chatroomID={chatroomID}></SendChat>
    </div>
</div>
                </div>
            </div>
     </>
  )
}

export default GroupContainer
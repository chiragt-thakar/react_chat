import React, { useState } from 'react'
// import { BsEmojiSmileFill } from "react-icons/bs";

function ChatInput({handleSendMsg}) {

    // const[msg,setmsg] = useState("");

    // const handleEmojiClick = (event, emojiObject) => {
    //     let message = msg;
    //     message += emojiObject.emoji;
    //     setMsg(message);
    //   };

    const [msg, setMsg] = useState("");

    

    const sendChat = (event) => {
        event.preventDefault();
        if (msg.length > 0) {
           handleSendMsg(msg);
          setMsg("");
          console.log("this is chat",msg)
        }
      };
    return (
        <> <div className="chat_send d-flex">

            <div className="col-sm-2 my-2">😎</div>
            {/* <form> */}
            {/* <div className="col-sm-1"></div> */}
            <form className="col-sm-10 my-2 d-flex" onSubmit={sendChat}>
               
                    <input className="form-control form-control d-inline" type="text" placeholder="Enter Message..."   onChange={(e) => setMsg(e.target.value)} />
                    <button className="btn mx-1" type='submit'>
                        <i class="fa fa-paper-plane send_btn" aria-hidden="true"></i>
                    </button>
              

            </form>
            {/* <div className="col-sm-1"></div> */}
            {/* <div className="col-sm-2 my-2">
      <div className="fa fa-paper-plane send_btn"></div> */}
            {/* <i className="fa fa-paper-plane send_btn" aria-hidden="true"></i> */}
            {/* </div> */}
            {/* </form> */}

        </div></>
    )
}

export default ChatInput
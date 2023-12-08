import React, { useState } from 'react';
import InputEmoji from 'react-input-emoji'


function ChatInput({ handleSendMsg }) {
  const [msg, setMsg] = useState("");
  function handleOnEnter (text) {
    console.log('enter', text)
  }


  const sendChat = (event) => {
    event.preventDefault();
    if (msg.length > 0) {
      handleSendMsg(msg);
      setMsg("");
      console.log("this is chat", msg);
    }
  };

  return (
    <>
      <div className="chat_send d-flex">
        {/* <div className="col-sm-2 my-2">
          <button onClick={() => setShowEmojiPicker(!showEmojiPicker)}>😀</button>

          {showEmojiPicker && (
            <EmojiPicker onEmojiClick={handleEmojiSelect} />
          )}
        </div> */}
        <form className="col-sm-12  d-flex" onSubmit={sendChat}>
        <button className="btn " type='submit'>
            <i className="fa fa-paper-plane send_btn" aria-hidden="true"></i>
          </button>
          <InputEmoji
            type='text'
            className="form-control form-control d-inline zzz "
            placeholder="Enter Message..."
            value={msg}
            onChange={setMsg}
             onEnter={handleOnEnter}
            // onChange={(e) => setMsg(e.target.value)}
          />
          <div className=""></div>
         
        </form>
      </div>
    </>
  );
}

export default ChatInput;

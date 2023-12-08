import React from 'react';

function SendChat({ socket, chatroomID }) {
  const messageRef = React.useRef();

  const sendMessage = () => {
    console.log("send chat userid",chatroomID)
    if (socket) {
      socket.socket.emit("chatroomMessage", {
        chatroomID,
        message: messageRef.current.value,
      });

      messageRef.current.value = "";
    }
  };

  return (
    <>
      <div className="chat_send d-flex">
        <div className="col-sm-2 my-2">😎</div>
        <form className="col-sm-10 my-2 d-flex" onSubmit={(e) => { e.preventDefault(); sendMessage(); }}>
          <input
            className="form-control d-inline"
            type="text"
            placeholder="Enter Message..."
            ref={messageRef}
          />
          <button className="btn mx-1" type="submit">
            <i className="fa fa-paper-plane send_btn" aria-hidden="true"></i>
          </button>
        </form>
      </div>
    </>
  );
}

export default SendChat;

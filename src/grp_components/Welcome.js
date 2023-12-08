import {React,useState,createRef} from 'react'

import axios from "axios";
import makeToast from '../Toaster';
import GroupList from './GroupList';

function Welcome() {

  const chatroomNameRef = createRef();
  const descriptionRef = createRef();
  
  const [grpId, setgrpId] = useState('')
  const [grpName, setgrName] = useState('')
  function changeGroup(id,name) {
    setgrpId(id);
    setgrName(name);
    console.log('id ane = name  is ', id,name);
  }
  const createGroup = async () => {
    const value = {
      chatroomName: chatroomNameRef.current.value,
      description: descriptionRef.current.value
    }

    try {
      let { data } = await axios.post(
        "http://localhost:3001/api/createGroup",
        value
        , { withCredentials: true }
      );
      if(!data.err){
console.log(data)
        makeToast("success", data.msg);
      }
      else{

        makeToast("error", data.msg);
      }

    } catch (err) {
     
      // makeToast("error", err.msg);
      
    }
  }


  return (
    <>
      <div className="col-6" >
        {/* <div className="w_chat" style={{ border: '2px solid yellow' }}>
          <h1>This is the welcome page</h1>
        </div> */}

        <div className="grp_card">
          <div className="grp_cardHeader">Create Group</div>
          <div className="grp_cardBody">
            <div className="grp_inputGroup">
              <label className="grp_label" htmlFor="email">Group Name</label>
              <input
                type="text"
                className='grp_input'
                name="grp_name"
                id="grp_name"
                // placeholder="abc@example.com"

                ref={chatroomNameRef}
              />
            </div>
            <div className="grp_inputGroup">
              <label className="grp_label" htmlFor="password">Description</label>
              <input
                type="text-area"
                className='grp_input'
                name="desc"
                id="desc"
                // placeholder="Description"
                ref={descriptionRef}
              />
            </div>
            <button
              className='grp_button'
              onClick={createGroup}
            >Login</button>
          </div>
        </div>

      </div>
      <GroupList changeGroup={changeGroup}></GroupList>
    </>
  )
}

export default Welcome
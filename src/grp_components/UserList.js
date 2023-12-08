import {React,useState,useEffect} from 'react'
import axios from "axios";
export default function UserList({changeChat}) {

  const [Data, setData] = useState([]);
  const [currentSelected, setCurrentSelected] = useState(undefined);

  
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.post("http://localhost:3001/api/userlist");
        // Assuming the response.data is an array of users
        setData(response.data);
        
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    fetchData();
  }, []);
  
 function get_user(event){
  const selectedValue = event.target.getAttribute('value');
  console.log(selectedValue);
}
const changeCurrentChat = (index, contact) => {
 
  setCurrentSelected(index);
  console.log("current selected index ",contact)
  changeChat(index,contact);
};
  return (
    <>
     <div className="col-3 ">
          <div className="list">
            <div className="list_header">
              <span className='user_list'>User List</span>
            </div>
            <div className="list_body card ">
            
            <ul className='list-group list-group-flush'>
            {Data?.map((item) => (
              <li key={item._id}
              //  className='list-group-item' 
               className={`list-group-item ${item._id === currentSelected ? "selected" : ""
              }`}
               onClick={()=>changeCurrentChat(item._id,item.userName)}>{item.userName}</li>
            ))}
          </ul>
      
            </div>
          </div>
        </div>
    </>
  )
}

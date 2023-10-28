import {React,useState,useEffect} from 'react'
import axios from "axios";
export default function UserList({user}) {

  const [Data, setData] = useState([]);
  
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
  user(selectedValue);
  console.log(selectedValue);
 }
  return (
    <>
     <div className="col-3 ">
          <div className="list">
            <div className="list_header"></div>
            <div className="list_body card ">
            
            <ul className='list-group list-group-flush'>
            {Data?.map((item) => (
              <li value={item._id} className='list-group-item' onClick={get_user}>{item.userName}</li>
            ))}
          </ul>
      
            </div>
          </div>
        </div>
    </>
  )
}

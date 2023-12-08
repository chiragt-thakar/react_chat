import {React,useState,useEffect} from 'react'
import { Link } from "react-router-dom";
import axios from "axios";

function GroupList({changeGroup}) {
    const [Data, setData] = useState([]);
    const [currentSelected, setCurrentSelected] = useState(undefined);

    useEffect(() => {
        async function fetchData() {
          try {
            const response = await axios.post("http://localhost:3001/api/groupList");
            // Assuming the response.data is an array of users
            console.log("grp ",response)
            setData(response.data);
            
          } catch (error) {
            console.error("Error fetching data:", error);
          }
        }
    
        fetchData();
      }, []);

      const changeCurrentGroup = (index, contact) => {
 
        setCurrentSelected(index);
        console.log("current selected index ",contact)
        changeGroup(index,contact);
      };
  return (
    <>
     <div className="col-3 ">
          <div className="list">
            <div className="list_header">
              <span className='user_list'>Group List</span>
            </div>
            <div className="list_body card ">
            
            <ul className='list-group list-group-flush'>
            {Data?.map((item) => (
              <li key={item._id}
              //  className='list-group-item' 
               className={`list-group-item ${item._id === currentSelected ? "selected" : ""
              }`}
               onClick={(e)=>{ e.stopPropagation();changeCurrentGroup(item._id,item.grpName)}}><span>{item.grpName}</span><Link to={"/GroupContainer/" + item._id}>
               <div className="join">Join</div>
             </Link></li>
            ))}
          </ul>
      
            </div>
          </div>
        </div>
    </>
  )
}

export default GroupList
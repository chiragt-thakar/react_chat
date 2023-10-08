import {React,useEffect} from 'react'
import { useCookies } from "react-cookie";
import { Link } from "react-router-dom";
import axios from "axios";


function Navbar() {
  const [cookies,setCookie] = useCookies(['name']);

  // const [cookies] = useCookies(["user"]);
  useEffect(() => {
    console.log("this is cookies")
        console.log(cookies.name)
    //    if (cookies.jwt) {
    //       console.log("jwt is ",)
    //       console.log(cookies.jwt)
    //            //navigate("/");
    //        }
        }, [cookies])

        async function handleLogout() {
          try {
            // Perform the logout action here, e.g., clearing the authentiation token
            // You can make a request to your server for this purpose
            // Example:
          const data= await axios.get("http://localhost:3001/api/logout",{ withCredentials: true });
      
            // Delete the 'name' cookie
            setCookie('name', '', { path: '/register', expires: new Date(0) });
      
         // const data= await axios.get("http://localhost:3001/api/logout");
            console.log("Error logging out",data);
            // After logging out, you can redirect the user to the login page or perform other actions
          } catch (error) {
            console.error("Error logging out:", error);
          }
        }

        
  return (
   <><nav className="navbar navbar-expand-lg navbar-light bg-light sticky-top">
   <div className="container-fluid">
     <Link className="navbar-brand" to="/">Navbar</Link>
     <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
       <span className="navbar-toggler-icon"></span>
     </button>
     <div className="collapse navbar-collapse" id="navbarSupportedContent">
       <ul className="navbar-nav me-auto mb-2 mb-lg-0">
         <li className="nav-item">
           <Link className="nav-link active" aria-current="page" to="/">Home</Link>
         </li>
         <li className="nav-item">
           <Link className="nav-link" to="/register">Registration</Link>
         </li>
         <li className="nav-item">
           <Link className="nav-link" to="/Login">Login</Link>
         </li>
     
         <li className="nav-item">
           <a className="nav-link " href="#" tabIndex="-1" aria-disabled="true">Disabled</a>
         </li>
       </ul>
       {/* <form className="d-flex">
         <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
         <button className="btn btn-outline-success" type="submit">Search</button>
       </form> */}
       {cookies.name ?
   (<><span>{cookies.name}</span>
     <button type="button" onClick={handleLogout} className="btn btn-secondary mx-3">Logout</button>
</>):
       <Link to="/Login"><button type="button" className="btn btn-primary me-4">Login</button>
</Link>
  }
     </div>
   </div>
 </nav></>
  )
}

export default Navbar
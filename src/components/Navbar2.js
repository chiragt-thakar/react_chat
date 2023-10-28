import {React,useEffect} from 'react'
import { useCookies } from "react-cookie";
import { Routes, Route, BrowserRouter, Link } from "react-router-dom";
import axios from "axios";



function Navbar2() {
    const [cookies, setCookie] = useCookies(['name']);

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
            const data = await axios.get("http://localhost:3001/api/logout", { withCredentials: true });

            // Delete the 'name' cookie
            setCookie('name', '', { path: '/register', expires: new Date(0) });

            // const data= await axios.get("http://localhost:3001/api/logout");
            console.log("Error logging out", data);
            // After logging out, you can redirect the user to the login page or perform other actions
        } catch (error) {
            console.error("Error logging out:", error);
        }
    }

    return (
        <>
        {/* <span>{cookies.name}</span> */}
            <div className="col-1 icon">

                <div className="mynav">
                    {/* <a className="active " href="#"><i className="fa fa-home"></i></a> */}
                    <Link to="#" className="nav_i"><img src="https://www.w3schools.com/howto/img_avatar2.png" alt="Avatar" className="avatar"></img></Link>
                    <Link to="#" className="nav_i"><i className="fa fa-home"></i></Link>
                    <Link to="#" className="nav_i"><i class="fa fa-user" aria-hidden="true"></i></Link>
                    <Link to="#" className="nav_i"><i class="fa fa-users" aria-hidden="true"></i></Link>
                    <Link to="#" className="nav_i">M</Link>
                    <Link to="#" className="nav_i">Q</Link>
                    {/* <a href="#" className="nav_i"><i class="fa fa-sign-out" aria-hidden="true"></i></a> */}
                    {/* <i class="fa fa-sign-in" aria-hidden="true"></i> */}
                    {/* for sign in  */}
                    {/* <Link to={'/logout'}  onClick={handleLogout} className="fa fa-sign-out nav_i"></Link> */}
                    {cookies.name ?
                        (<>
                        {/* <span>{cookies.name}</span> */}
                    <Link  onClick={handleLogout} className="fa fa-sign-out nav_i"></Link>
                        </>) :
                        <Link to="/Login" className="fa fa-sign-in nav_i">
                        </Link>
                    }
                </div>
            </div>

        </>
    )
}

export default Navbar2
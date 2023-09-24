import React, { useState,  } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
//import { useCookies } from "react-cookie";
import { Link, useNavigate } from "react-router-dom";
function Registration() {

    const navigate = useNavigate();
    //  const [cookies] = useCookies(["cookie-name"]);
    //   useEffect(() => {
    //   if (cookies.jwt) {
    //      console.log("jwt is ",)
    //      console.log(cookies.jwt)
    //           //navigate("/");
    //       }
    //   }, [cookies, navigate])
    const [values, setValues] = useState({ name: "", email: "", password: "", confirmPassword: "" });
    const generateError = (error) =>
        // console.log(error);
        toast.error(error, {
            position: "bottom-right",
        });
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setValues({ ...values, [name]: value });
    };
    const handelSubmit = async (event) => {
        event.preventDefault();
        //console.log(event)
        try {
           // console.log(values);
            const { data } = await axios.post(
                "http://localhost:3001/api/registration",
values
                ,{ withCredentials: true }
            );

            console.log("this is data");
            console.log(data);
            if (data) {
                if (data.errors) {
                    const { email, password } = data.errors;
                    if (email) generateError(email);
                    else if (password) generateError(password);
                } else {
                    navigate("/login");
                }
            }
        }
        catch (ex) {
            console.log(ex);
        }
    }
    return (
        <>
            <section
                className="vh-100 bg-image"
                style={{
                    backgroundImage: `url('https://mdbcdn.b-cdn.net/img/Photos/new-templates/search-box/img4.webp')`,
                    backgroundSize:"cover"
                }}
            >
                <div className="mask d-flex align-items-center h-100 gradient-custom-3">
                    <div className="container h-100">
                        <div className="row d-flex justify-content-center align-items-center h-100">
                            <div className="col-12 col-md-9 col-lg-7 col-xl-6">
                            <div className="card" style={{ borderRadius: '15px', backgroundColor: 'rgba(0, 0, 0, 0.3)' }}>
                                    <div className="card-body p-5">
                                        <h2 className="text-uppercase text-center mb-5">Create an account</h2>

                                        <form onSubmit={handelSubmit}>
                                            <div className="form-outline mb-4">
                                                <input type="text" name="name" id="form3Example1cg" className="form-control form-control-lg" onChange={handleInputChange
                                                } />
                                                <label className="form-label text-white" htmlFor="form3Example1cg">
                                                    Your Name
                                                </label>
                                            </div>

                                            <div className="form-outline mb-4">
                                                <input type="email" name="email" id="form3Example3cg" className="form-control form-control-lg" onChange={handleInputChange
                                                } />
                                                <label className="form-label text-white" htmlFor="form3Example3cg">
                                                    Your Email
                                                </label>
                                            </div>

                                            <div className="form-outline mb-4">
                                                <input type="password" name="password" id="form3Example4cg" className="form-control form-control-lg" onChange={handleInputChange
                                                } />
                                                <label className="form-label text-white" htmlFor="form3Example4cg">
                                                    Password
                                                </label>
                                            </div>

                                            <div className="form-outline mb-3">
                                                <input type="password" name="confirmPassword" id="form3Example4cdg" className="form-control form-control-lg" onChange={handleInputChange
                                                } />
                                                <label className="form-label text-white" htmlFor="form3Example4cdg">
                                                    Repeat your password
                                                </label>
                                            </div>

                                            {/* <div className="form-check d-flex justify-content-center mb-3">
                                                <input className="form-check-input me-2" type="checkbox" value="" id="form2Example3cg" />
                                                <label className="form-check-label" htmlFor="form2Example3g">
                                                    I agree all statements in <a href="#!" className="text-body"><u>Terms of service</u></a>
                                                </label>
                                            </div> */}

                                            <div className="d-flex justify-content-center">
                                                <button
                                                    type="submit"
                                                    className="btn btn-success btn-block btn-lg gradient-custom-4 text-body"
                                                >
                                                    Register
                                                </button>
                                            </div>

                                            <p className="text-center  mt-3 mb-0" style={{ color: 'white' }}>
                                                Have already an account? <Link to="/Login" className="fw-bold text-body"><u>Login here</u></Link>
                                            </p>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Registration
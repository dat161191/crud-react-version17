import React, { useEffect, useState } from "react";
import { loginUser } from "../../service/UserService";
import { toast } from 'react-toastify';
import { NavLink, useNavigate } from "react-router-dom";
import { useContext } from 'react';
import { UserContext } from "../../context/UserContext";

const Login = () => {
    const { loginContext } = useContext(UserContext);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isShowPass, setIsShowPass] = useState(false);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    useEffect(() => {
        if (localStorage.getItem("token")) {
            navigate("/");
            toast.info("Please logout to login!")
        }
    }, [])

    const handleChangeEmail = (event) => {
        setEmail(event.target.value);
    }
    const handleChangePassword = (event) => {
        setPassword(event.target.value);
    }
    const handleLogin = async () => {
        // console.log(email, password);
        if (!email || !password) {
            toast.warning("Email or Password is blank! Please complete all information!");
            return;
        }
        setLoading(true);
        let result = await loginUser(email.trim(), password.trim());
        // if (!result) {
        //     setLoading(true);
        // } else {
        //     setLoading(false);
        // }
        // console.log("check login=>", result);
        if (result && result.token) {
            loginContext(email, result.token);
            navigate("/");
            toast.success("Login is success!");
        } else if (result && result.status === 400) {
            toast.error("Error: " + result.data.error);
        }
        setLoading(false);
    }
    const handleEnter = (event) => {
        // if ((!email || !password) && event.keyCode === 13) {
        //     toast.info("Please do not leave the input fields blank!");
        // }
        if (event && event.keyCode === 13) {
            event.preventDefault();
            handleLogin();
        }
    }
    return (
        <div
            style={{
                backgroundImage: "url(https://c4.wallpaperflare.com/wallpaper/500/677/198/white-tiger-4k-8k-wallpaper-preview.jpg)",
                backgroundRepeat: "no-repeat", backgroundSize: "cover", height: "100vh"
            }}>
            <div className="login col-12 col-sm-4">
                <form className=" form">
                    <div className="title">Login</div>
                    {/* <div className="filed px-2">Email or username : eve.holt@reqres.in : cityslicka </div> */}
                    <div className="filed px-2">Email or username : eve.holt@reqres.in ; cityslicka</div>


                    <div className="px-2">
                        <input className="my-1" placeholder="Email or username"
                            // value={email} onChange={(event) => setEmail(event.target.value)} />
                            value={email} onChange={(event) => handleChangeEmail(event)}
                            onKeyDown={(event) => handleEnter(event)} />

                    </div>

                    <div className="position-relative px-2">
                        <input type={isShowPass === true ? "text" : "password"}
                            className="my-1" placeholder="password"
                            // value={password} onChange={(event) => setPassword(event.target.value)} />
                            value={password} onChange={(event) => handleChangePassword(event)}
                            onKeyDown={(event) => handleEnter(event)} />
                        <i className={isShowPass === true ? "bi bi-eye position-absolute" : "bi bi-eye-slash position-absolute"}
                            onClick={() => setIsShowPass(!isShowPass)}></i>
                    </div>
                    <div className="d-flex align-items-center justify-content-lg-center px-2">
                        <button className={email && password ? "active" : " "}
                            disabled={email && password ? false : true} onClick={() => handleLogin()} type="button">
                            Login &nbsp;&nbsp;
                            {loading && <i className="fa-solid fa-spinner fa-spin-pulse"></i>}
                        </button>
                    </div>
                    <div className="text-center my-1">
                        <NavLink style={{ textDecoration: 'none', color: "white", fontSize: "20px" }} exact="true" to="/" activeclassname="active">
                            <i className="bi bi-house-heart-fill"></i>  Home
                        </NavLink>
                    </div>
                </form>
            </div>
        </div>
    )
};
export default Login;
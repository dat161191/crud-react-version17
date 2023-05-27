import React, { useState } from "react";
import { Container } from "react-bootstrap";
import { NavLink } from "react-router-dom";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isShowPass, setIsShowPass] = useState(false)
    return (
        <div
            style={{
                backgroundImage: "url(https://c4.wallpaperflare.com/wallpaper/788/765/277/nature-landscape-mountains-mist-wallpaper-thumb.jpg)",
                backgroundRepeat: "no-repeat", backgroundSize: "cover", minHeight: "100vh"
            }}>
            <div className="login col-12 col-sm-4">
                <div className="title">Login</div>
                <div className="filed">Email or username</div>
                <div>
                    <input className="my-1" placeholder="Email or username"
                        value={email} onChange={(event) => setEmail(event.target.value)} />
                </div>
                <div className="position-relative">
                    <input type={isShowPass == true ? "text" : "password"}
                        className="my-1" placeholder="password"
                        value={password} onChange={(event) => setPassword(event.target.value)} />
                    <i className={isShowPass == true ? "bi bi-eye position-absolute" : "bi bi-eye-slash position-absolute"}
                        onClick={() => setIsShowPass(!isShowPass)}></i>
                </div>
                <div className="d-flex align-items-center justify-content-lg-center">
                    <button className={email && password ? "active" : " "}
                        disabled={email && password ? false : true}>Login</button>
                </div>
                <div className="text-center my-1">
                    <NavLink style={{ textDecoration: 'none', color: "white", fontSize: "20px" }} exact="true" to="/" activeclassname="active">
                        <i class="bi bi-house-heart-fill"></i> Home
                    </NavLink>
                </div>
            </div>
        </div>
    )
};
export default Login;
import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from '../component/Home';
import Login from '../component/login-logout/Login';
import { ListUser } from '../component/users-call-api/ListUser';
import ListClock from '../component/clock-conect-be/ListClock';
import ListUserRouter from "./ListUserRouter";
import ListClockRoute from "./ListClockRoute";
const AppRouter = () => {
    return (
        <>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/users" element={
                    <ListUserRouter>
                        <ListUser />
                    </ListUserRouter>
                } />
                <Route path="/clocks" element={
                    <ListClockRoute pathClocks='/clocks'>
                        <ListClock />
                    </ListClockRoute>
                } />
            </Routes>


        </>
    )
}
export default AppRouter;
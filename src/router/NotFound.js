import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { toast } from 'react-toastify';

const NotFound = () => {
    useEffect(() => {
        toast.info("You entered the wrong path!");
    },[])
    // toast.info("You entered the wrong path!");
    return (
        < div className="text-center" >
            <img src="https://www.vizion.com/wp-content/uploads/2018/09/shutterstock_479042983.jpg" alt="NotFound" style={{ width: "100vh" }} />
        </div >

    )
}
export default NotFound;
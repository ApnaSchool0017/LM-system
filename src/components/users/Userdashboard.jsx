import React from "react";
import { Outlet } from "react-router-dom";
import Usersidebar from "./Usersidebar";
import Usernavbar from "./Usernavbar";

function Userdashboard(){
    return(
        <div className="flex">
            {/* sidebar */}
            <div className="basis-[20%] h-screen  fixed top-0 left-0 right-[80%] bg-black">
                <Usersidebar/>
            </div>
            {/* main */}
            <div className="basis-[80%] ml-[20%] h-[100vh] bg-yellow-50">
                <Usernavbar/>
                <Outlet/>
            </div>

        </div>
    )
}

export default Userdashboard;
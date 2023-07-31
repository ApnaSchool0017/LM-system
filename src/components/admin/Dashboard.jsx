import React from "react";
import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";

function Dashboard(){
    return(
        <div className="flex">
            {/* sidebar */}
            <div className="basis-[20%] h-screen  fixed top-0 left-0 right-[80%] bg-black">
                <Sidebar/>
            </div>
            {/* main */}
            <div className="basis-[80%] ml-[20%] h-[100vh] bg-yellow-50">
                <Navbar/>
                <Outlet/>
            </div>

        </div>
    )
}

export default Dashboard;
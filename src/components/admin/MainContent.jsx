import React from "react";
import { Link } from "react-router-dom";
import task from "../../assets/t.png";
import user from "../../assets/u8.png";

function MainContent() {
  return (
    <div className="flex-col">
      {/* heading */}
      <div className="w-[95%] bg-[#982176] px-4 py-4 mx-6 my-8 rounded-lg">
        <p className="font-bold text-2xl text-white">Dashboard</p>
      </div>
      {/* cards */}
      <div className="flex justify-center gap-12 w-[95%] mx-6 mt-12 overflow-hidden">
        <div >
          <div className="flex-col items-center h-[300px] w-[440px]  justify-center bg-[#982176] rounded-xl flex-shrink-0">
            <Link to="/Dashboard/task">
              <img src={task} className="h-[80%] w-full " alt="Task" />
              <p className="font-bold text-2xl text-center text-white">Tasks</p>
            </Link>
          </div>
        </div>

        <div>
          <div className="flex-col items-center justify-center h-[300px] w-[440px]  bg-[#982176] rounded-xl flex-shrink-0">
            <Link to="/Dashboard/users">
              <img src={user} className="h-[80%] w-full pt-6" alt="Task" />
              <p className="font-bold text-2xl text-center  text-white">Users</p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MainContent;

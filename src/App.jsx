import { Route, Router, Routes } from "react-router-dom";
import LoginForm from "./components/LoginForm";
import SignUp from "./components/SignUp";
import Dashboard from "./components/admin/Dashboard";
import User from "./components/admin/User";
import Sidebar from "./components/admin/Sidebar";
import Chat from "./components/admin/Chat";
import MainContent from "./components/admin/MainContent";
import Task from "./components/admin/Task";
import Userdashboard from "./components/users/Userdashboard";
import Usertodo from "./components/users/Usertodo";
import Userchat from "./components/users/Userchat";


function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<LoginForm />} />
        <Route path="/signup" element={<SignUp />} />

        <Route path="/Dashboard/" element={<Dashboard />}>
          <Route index element={<MainContent/>}/>
          <Route path="users" element={<User/>}/>
          <Route path="task" element={<Task/>}/>
          <Route path="chat" element={<Chat/>}/>
        </Route>

        <Route path="/userdashboard/" element={<Userdashboard />}>
          <Route index element={<Usertodo/>}/>
          <Route path="userchat" element={<Userchat/>}/>
        </Route>
      </Routes>
    </>
  );
}

export default App;

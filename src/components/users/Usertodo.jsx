import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

function Usertodo() {
  const [user, setUser] = useState([]);
  const [tasks, setTasks] = useState([]);

  const [pendings, setPendings] = useState([]);
  const [ends, setEnds] = useState([]);

  const fetchUserData = async () => {
    try {
      const response = await axios.get("http://localhost:5000/user?login=yes");
      if (
        response.status === 200 &&
        response.data &&
        response.data.length > 0
      ) {
        const user = response.data[0];
        setUser(user);
        setTasks(user.tasks);
      } else {
        setTasks([]);
      }
    } catch (error) {
      console.error("Error fetching user:", error);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleDrop = (event) => {
    event.preventDefault();
    const id = event.dataTransfer.getData("id");
    const item = tasks.find((item) => item.id === parseInt(id));
    if (item) {
      setPendings([...pendings, item]);
      const filteredTasks = tasks.filter((item) => item.id !== parseInt(id));
      setTasks(filteredTasks);
    }
  };

  const handleEndDrop = (event) => {
    event.preventDefault();
    const id = event.dataTransfer.getData("id");
    const item = pendings.find((item) => item.id === parseInt(id));
    if (item) {
      setEnds([...ends, item]);
      const filteredPendings = pendings.filter(
        (item) => item.id !== parseInt(id)
      );
      setPendings(filteredPendings);
    }
  };

  const handleDeleteTask = async (userId, taskId) => {
    try {
      await axios.delete(
        `http://localhost:5000/user/${userId}/tasks/${taskId}`
      );
      const updatedEnds = ends.filter((task) => task.id !== taskId);
      setEnds(updatedEnds);
    } catch (error) {
      console.error("Error deleting task:", error);
      toast.error("Error deleting task:");
    }
  }

  return (
    <div>
      <h1 className="font-bold text-2xl px-4 mt-4">User Todo</h1>

      <div className="grid grid-cols-3 gap-4 bg-white mt-2 mx-6 rounded-md px-2 py-4 h-[78vh] shadow-lg">
        {/* todos */}
        <div className="p-2 bg-[#7c1c62] rounded-lg">
          {tasks.length === 0 ? (
            <p className="text-center font-bold text-xl text-white pt-4">
              No Tasks for you.
            </p>
          ) : (
            <div className="flex flex-col">
              <div>
                <h2 className="font-bold text-white text-lg ml-2">Todos</h2>
              </div>
              <div>
                <ul>
                  {tasks.map((task) => (
                    <li
                      key={task.id}
                      id={task.id}
                      draggable
                      onDragStart={(event) =>
                        event.dataTransfer.setData("id", event.currentTarget.id)
                      }
                      className="px-2 py-4 text-gray-400 rounded my-2 bg-[#5e154b]"
                    >
                      {task.taskText}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>
        {/* pendings */}
        <div
          id="pendings-section"
          className="p-2 bg-[#7c1c62] rounded-lg"
          onDragOver={handleDragOver}
          onDrop={handleDrop}
        >
          <div className="flex flex-col">
            <div>
              <h2 className="font-bold text-white text-lg ml-2">Pendings</h2>
            </div>
            <div>
              <ul>
                {pendings.map((task) => (
                  <li
                    key={task.id}
                    id={task.id}
                    draggable
                    onDragStart={(event) =>
                      event.dataTransfer.setData("id", event.currentTarget.id)
                    }
                    className="px-2 py-4 text-gray-400 rounded my-2 bg-[#5e154b]"
                  >
                    {task.taskText}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        {/* ends */}
        <div
          id="end-section"
          className="p-2 bg-[#7c1c62] rounded-lg"
          onDragOver={handleDragOver}
          onDrop={handleEndDrop}
        >
          <div className="flex flex-col">
            <div>
              <h2 className="font-bold text-white text-lg ml-2">End</h2>
            </div>
            <div>
              <ul>
                {ends.map((task) => (
                  <li
                    key={task.id}
                    id={task.id}
                    draggable
                    onDragStart={(event) =>
                      event.dataTransfer.setData("id", event.currentTarget.id)
                    }
                    className="px-2 py-4 text-gray-400 rounded my-2 bg-[#5e154b]"
                  >
                    {task.taskText}
                    <span
                      onClick={() => handleDeleteTask(user.id, task.id)}
                      className="ml-6 text-white cursor-pointer"
                    >
                      ❌
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Usertodo;

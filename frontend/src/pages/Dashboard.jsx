import React, { useEffect, useState } from "react";
import axios from "axios";

function Dashboard() {
  const [profile, setProfile] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");

  const token = localStorage.getItem("token");

  const fetchData = async () => {
    try {
      const profileRes = await axios.get("http://localhost:5000/api/profile", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setProfile(profileRes.data);

      const tasksRes = await axios.get("http://localhost:5000/api/tasks", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTasks(tasksRes.data);
    } catch (error) {
      console.error(error);
    }
  };

  const addTask = async () => {
    if (!newTask) return;
    const { data } = await axios.post(
      "http://localhost:5000/api/tasks",
      { title: newTask },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    setTasks([...tasks, data]);
    setNewTask("");
  };

  const toggleTask = async (id, completed) => {
    const { data } = await axios.put(
      `http://localhost:5000/api/tasks/${id}`,
      { completed: !completed },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    setTasks(tasks.map((t) => (t._id === id ? data : t)));
  };

  const deleteTask = async (id) => {
    await axios.delete(`http://localhost:5000/api/tasks/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    setTasks(tasks.filter((t) => t._id !== id));
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="dashboard">
      <h2>Welcome, {profile?.name}</h2>
      <p>Email: {profile?.email}</p>

      <div className="card p-3 shadow mt-4">
        <h4>Your Tasks</h4>
        <div className="d-flex mb-2">
          <input
            type="text"
            className="form-control me-2"
            placeholder="New task..."
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
          />
          <button className="btn btn-primary" onClick={addTask}>Add</button>
        </div>
        <ul className="list-group">
          {tasks.map((task) => (
            <li key={task._id} className="list-group-item d-flex justify-content-between align-items-center">
              <span
                style={{ textDecoration: task.completed ? "line-through" : "none", cursor: "pointer" }}
                onClick={() => toggleTask(task._id, task.completed)}
              >
                {task.title}
              </span>
              <button className="btn btn-sm btn-danger" onClick={() => deleteTask(task._id)}>Delete</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Dashboard;

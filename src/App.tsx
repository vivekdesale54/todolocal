import { useState, useEffect } from "react";
import "./App.css";

function App() {
  // Core tasks state
  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem("tasks");
    return saved ? JSON.parse(saved) : [];
  });

  // Input for new task
  const [newTask, setNewTask] = useState("");

  // Filter state (All | Active | Completed)
  const [filter, setFilter] = useState("All");

  // Persist tasks to localStorage
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  // Add task
  const addTask = () => {
    if (!newTask.trim()) return;
    const newTaskObj = {
      id: Date.now(),
      text: newTask,
      completed: false,
    };
    setTasks([...tasks, newTaskObj]);
    setNewTask("");
  };

  // Toggle complete
  const toggleTask = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  // Delete task
  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  // Filter tasks
  const filteredTasks = tasks.filter((task) => {
    if (filter === "Active") return !task.completed;
    if (filter === "Completed") return task.completed;
    return true;
  });

  return (
    <div className="bg-gradient-to-b from-amber-100 to-indigo-500 w-screen h-screen p-6 text">
      <div className="flex flex-col items-center">
        <h1 className="text-2xl font-bold text-slate-900 mb-4">Tasks</h1>

        {/* Input */}
        <div className="flex gap-2 mb-4">
          <input
            className="bg-white text-slate-900 p-2 rounded"
            type="text"
            placeholder="Add a task"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
          />
          <button
            onClick={addTask}
            className="bg-indigo-600 text-white px-4 py-2 rounded"
          >
            Add
          </button>
        </div>

        {/* Filter buttons */}
        <div className="flex gap-2 mb-4">
          {["All", "Active", "Completed"].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-3 py-1 rounded ${
                filter === f ? "bg-slate-900 text-white" : "bg-white text-gray-300"
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        {/* Task list */}
        <ul className="w-full max-w-md">
          {filteredTasks.map((task) => (
            <li
              key={task.id}
              className="flex justify-between items-center bg-white p-2 mb-2 rounded shadow text-slate-900"
            >
              <span
                onClick={() => toggleTask(task.id)}
                className={`cursor-pointer ${
                  task.completed ? "line-through text-gray-500" : ""
                }`}
              >
                {task.text}
              </span>
              <button
                onClick={() => deleteTask(task.id)}
                className="text-red-500"
              >
                ❌
              </button>
            </li>
          ))}
        </ul>

        {/* Task counter */}
        <p className="mt-4 text-slate-800">
          {tasks.filter((t) => !t.completed).length} tasks left
        </p>
      </div>
    </div>
  );
}

export default App;


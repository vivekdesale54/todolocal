
import { useState, useEffect} from "react";
import "./App.css";

function App() {
  //Core tasks
 const [tasks, setTasks] = useState(() => {
  const saved = localStorage.getItem("tasks");
  return saved ? JSON.parse(saved) : [];
})

//Input or new task
const [newtask, setNewTask] = useState('');

//Filter tasks
const [filter, setFilter] = useState("All")
useEffect(() => {
  localStorage.setItem("tasks", JSON.stringify(tasks))
}, [tasks])

//Add tasks
const addTask = () => {
  if(!newtask.trim()) return;
  const newtaskObject = {
    id: Date.now(),
    text: newtask,
    completed: false,
  };
  setTasks([...tasks, newtaskObject]);
  setNewTask("")
}
//Toggle completed 

  const toggleTask = (id: any) => {
    setTasks(
      tasks.map((task: any) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };
 //Delete the task
const deleteTask = (id: any) => {
  setTasks(tasks.filter((task: any) => task.id !== id))
}
//Filter Tasks
const FilterTasks = tasks.filter((task: any) => {
  if(task === "Active") return !task.completed;
  if(task === "Completed") return task.completed;
  return true
})

return(
  <>
    <div className="bg-gradient-to-b from-amber-200 to-violet-500 h-screen w-screen">
      <div className="flex items-center flex-col pt-30">
        {/* input */}
        <h1 className="pb-5 text-slate-800">Tasks Manager</h1>
        <div className="flex gap-2 mb-4">
        <input className="text-center border-1 text-slate-800" type="text" value={newtask} placeholder="Add tasks" onChange={(e) => setNewTask(e.target.value)}/>
        <button className="text-white ml-5 px-4 py-2 rounded" onClick={addTask}>Add a task</button>
        </div>

        {/* Filter buttons */}  
        <div className="flex gap-4 mb-4">
          {["All", "Active", "Completed"].map((f) => (
            <button key={f} onClick={()=> setFilter(f)} className={`px-3 py-1 rounded ${filter === f ? 'bg-gray-600': 'bg-black'}`}>{f}</button>
          ))}
        </div>

        {/* task list */}
        <ul className="w-full max-w-md">{FilterTasks.map((task: any) => (
          <li key={task.id} className="flex justify-between items-center bg-white p-2 mb-2 rounded shadow text-slate-900"><span onClick={() => toggleTask(task.id)} className={`cursor-pointer ${
                  task.completed ? "line-through text-gray-500" : ""
                }`}>{task.text} </span>
                <button onClick={() => deleteTask(task.id)} className="text-red-500">❌</button>
                </li>
        ) )}</ul>
        {/* task Completed */}
        <p>
          {tasks.filter((t : any) => !t.completed).length} tasks left
        </p>
      </div>  
    </div>
  </>
)
}


export default App;


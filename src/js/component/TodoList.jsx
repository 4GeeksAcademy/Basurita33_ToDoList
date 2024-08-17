import React, { useState, useEffect } from "react";

const TodoList = () => {
  const [tasksList, setTasksList] = useState([]);
  const [task, setTask] = useState("");
  const userName = "bruno_beceiro";

  const createUser = () => {
    fetch(`https://playground.4geeks.com/todo/users/${userName}`, {
      method: "POST",
    })
      .then((response) => response.json())
      .then(() => {
        getListTasks();
        console.log("User created");
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const getListTasks = () => {
    fetch(`https://playground.4geeks.com/todo/users/${userName}`)
      .then((response) => {
        if (!response.ok) {
          createUser();
          console.log("User not found, creating user");
        } else {
          return response.json();
        }
      })
      .then((data) => {
        console.log("Fetched data:", data)
        setTasksList(data.todos || []);
        console.log("Tasks list updated:", data.todos);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const createTask = () => {
    if (!task.trim()) return;
    fetch(`https://playground.4geeks.com/todo/todos/${userName}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        label: task,
        is_done: false,
      }),
    })
      .then((response) => {
        return response.json();
      })
      .then(() => {
        getListTasks();
        setTask("");
        console.log("Task created");
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const deleteTask = (index) => {
    const taskId = tasksList[index]?.id; 

  if (!taskId) {
    console.error("Task ID not found");
    return;
  }

  fetch(`https://playground.4geeks.com/todo/todos/${taskId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  })
  .then(async (response) => {
    if (!response.ok) {
      const error = await response.text();
      return Promise.reject(error);
    }
    return response.text();
  })
  .then(() => {
    getListTasks(); 
    console.log("Task deleted");
  })
  .catch((error) => {
    console.error("Error deleting task:", error);
  });
  
  };

  useEffect(() => {
    getListTasks();
  }, []);

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      createTask();
    }
  };

  return (
    <div>
      <input
        className="task-input"
        type="text"
        value={task}
        onChange={(event) => setTask(event.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Enter a new task"
      />
      <ul className="task-ul">
        {tasksList.map((task, index) => (
          <li className="task-li" key={index}>
            {task.label}
            <button className="delete-button" onClick={() => deleteTask(index)}>
              ×
            </button>
          </li>
        ))}
      </ul>
      <div className="tasks-count">
        {tasksList.length} task{tasksList.length > 1 ? "s" : ""} left
      </div>
    </div>
  );
};

export default TodoList;

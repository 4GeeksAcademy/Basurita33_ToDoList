import React from "react";
import TodoList from "./TodoList";

const App = () => {
	return (
    <div className="app-container text-center">
		<h1 className="app-header">My To-Do List</h1>
		<TodoList />
	</div>
	);
}

export default App;

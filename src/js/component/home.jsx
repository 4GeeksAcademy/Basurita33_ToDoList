import React from "react";
import Tasks from "./tasks";


const Home = () => {
	return (
		<div className="list-container text-center">
			<h1 className="h1">My To-Do List</h1>
			<Tasks />
		</div>
	);
};

export default Home;

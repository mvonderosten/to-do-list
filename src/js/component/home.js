import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

//include images into your bundle
import rigoImage from "../../img/rigo-baby.jpg";
import { Header } from "../component/header";
import { Card } from "../component/card";

//create your first component

export function Home() {
	const [list, setList] = useState([]);
	const [content, setContent] = useState();

	function getToDo() {
		fetch("https://assets.breatheco.de/apis/fake/todos/user/mark", {
			method: "GET"
		})
			.then(resp => {
				return resp.json();
			})
			.then(data => {
				setList(data);
				console.log("getToDo", data);
			});
	}

	function saveToDo(listToSave) {
		fetch("https://assets.breatheco.de/apis/fake/todos/user/mark", {
			method: "PUT",
			body: JSON.stringify(listToSave),
			headers: {
				"Content-Type": "application/json"
			}
		})
			.then(resp => {
				return resp.json();
			})
			.then(data => {
				console.log("saveToDo", data);
				getToDo();
			});
	}

	useEffect(() => {
		getToDo();
	}, []);

	return (
		<>
			<h1>To Do List</h1>
			<h2>What Do I Have To Do?</h2>
			<div className="card-body">
				<div>
					<input
						className="center-block"
						value={content}
						onChange={e => setContent(e.target.value)}
						onKeyPress={e => {
							if (e.key === "Enter") {
								saveToDo(
									list.concat({
										label: content,
										done: false
									})
								);
								setContent("");
							}
						}}
					/>
					{list.map((item, index) => {
						return (
							<div
								key={index}
								className="card-body d-flex justify-content-center">
								<div
									key={index}
									onClick={() =>
										saveToDo(list.filter(e => e !== item))
									}>
									<Card one={item.label} two={item.done} />
								</div>
							</div>
						);
					})}
				</div>
			</div>
		</>
	);
}

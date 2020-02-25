import React, { useState } from "react";
import PropTypes from "prop-types";

export function Card(props) {
	const [list, setlist] = useState([]);
	const [content, setContent] = useState();
	const [remove, setRemove] = useState("");

	return (
		<div className="card">
			<div className="card-body">
				<div>
					<div className="result">
						{props.one} {props.two}
					</div>
				</div>
			</div>
		</div>
	);
}

Card.propTypes = {
	one: PropTypes.string,
	two: PropTypes.bool
};

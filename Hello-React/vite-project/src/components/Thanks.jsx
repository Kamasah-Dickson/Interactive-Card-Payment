import React from "react";
import verifiedImg from "../images/icon-complete.svg";

export default function Thanks(props) {
	let { theRender } = props;

	return (
		<div className="thank-you">
			<img className="thanks" src={verifiedImg} alt="Thank you" />
			<h1>THANK YOU!</h1>
			<p>We've added your card details</p>
			<button onClick={() => theRender()}>Continue</button>
		</div>
	);
}

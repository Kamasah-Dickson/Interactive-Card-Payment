import React from "react";
import Thanks from "./Thanks";
import InputMask from "react-input-mask";
import me from "../images/Kamasah.jpg";

export function Background() {
	const [windowWidth, setWindowWidth] = React.useState(window.innerWidth);

	const [bgRendering, setbgRedering] = React.useState(true);

	function removeEvent() {
		return setWindowWidth(window.innerWidth);
	}

	React.useEffect(() => {
		window.addEventListener("resize", removeEvent);
		windowWidth > 840 ? setbgRedering(false) : setbgRedering(true);

		return () => window.removeEventListener("resize", removeEvent);
	}, [windowWidth]);

	return (
		<div
			className={bgRendering ? "background small" : " background large"}
		></div>
	);
}

export const Grid = () => {
	const [errors, setErrors] = React.useState({
		nameError: "",
		monthError: "",
		yearError: "",
		cvcError: "",
		cvcError2: "",
		cardNumberError: "",
	});
	const [theDefault, settheDefault] = React.useState({
		cardName: "Kamasah Dickson",
		cardNumber: "5930 3510 8200 3003",
		expiryMonth: "30",
		expiryYear: "28",
		cvc: "003",
	});
	const [details, setDetails] = React.useState({
		cardName: "",
		cardNumber: "",
		expiryMonth: "",
		expiryYear: "",
		cvc: "",
	});

	function creditCard(event) {
		setDetails((prevDetails) => ({
			...prevDetails,
			[event.target.name]: event.target.value,
		}));
	}

	const [theRender, setTheRender] = React.useState({ render: true });

	function handleSubmit(e) {
		e.preventDefault();
		let verify = verifyData();
		if (verify) {
			setTheRender((prev) => ({
				...prev,
				render: !theRender.render,
			}));
		}
	}
	function passToggle() {
		setTheRender((prev) => ({
			...prev,
			render: !theRender.render,
		}));
		setDetails((prev) => ({
			cardName: "",
			cardNumber: "",
			expiryMonth: "",
			expiryYear: "",
			cvc: "",
		}));
	}

	function verifyData() {
		if (details.cardNumber == "") {
			setErrors((prev) => ({
				...prev,
				cardNumberError: "Can't be blank",
			}));
			return false;
		}
		let findText = details.cardNumber.split(" ");
		let finalText = findText.join("");
		let verifyCVC = finalText.slice(finalText.length - 3);
		if (Number(finalText)) {
			setErrors((prev) => ({
				...prev,
				cardNumberError: "",
			}));

			if (finalText.length < 16) {
				setErrors((prev) => ({
					...prev,
					cardNumberError: "Wrong or incorrect credit card",
				}));
				return false;
			}
		} else {
			setErrors((prev) => ({
				...prev,
				cardNumberError: "Wrong format,numbers only",
			}));
		}

		if (Number(details.cardName)) {
			setErrors((prev) => ({
				...prev,
				nameError: "cardholder must be a name",
			}));
			return false;
		}

		if (details.cvc === "") {
			setErrors((prev) => ({
				...prev,
				cvcError: "Can't be blank",
			}));
			setErrors((prev) => ({
				...prev,
				cvcError2: "",
			}));

			return false;
		} else {
			setErrors((prev) => ({
				...prev,
				cvcError: "",
			}));
		}

		if (!Number(details.cvc)) {
			setErrors((prev) => ({
				...prev,
				cvcError: "Numbers only",
			}));
			setErrors((prev) => ({
				...prev,
				cvcError2: "",
			}));
			return false;
		}
		if (details.cvc !== verifyCVC || details.cvc.length < 3) {
			setErrors((prev) => ({
				...prev,
				cvcError2: "invalid!! cvc should be last three digits of card number",
			}));
			setErrors((prev) => ({
				...prev,
				cvcError: "",
			}));
			return false;
		} else {
			setErrors((prev) => ({
				...prev,
				cvcError2: "",
			}));
		}
		if (details.expiryMonth === "") {
			setErrors((prev) => ({
				...prev,
				monthError: "Can't be blank",
			}));
			return false;
		} else {
			setErrors((prev) => ({
				...prev,
				monthError: "",
			}));
		}

		if (!Number(details.expiryMonth)) {
			setErrors((prev) => ({
				...prev,
				monthError: "Numbers only",
			}));

			return false;
		}

		if (!Number(details.expiryYear)) {
			setErrors((prev) => ({
				...prev,
				yearError: "Numbers only",
			}));
			if (details.expiryYear === "") {
				setErrors((prev) => ({
					...prev,
					yearError: "Can't be blank",
				}));
			}

			return false;
		} else {
			setErrors((prev) => ({
				...prev,
				yearError: "",
			}));
		}
		if (details.expiryYear.length < 2) {
			setErrors((prev) => ({
				...prev,
				yearError: "invalid year",
			}));
			return false;
		}

		return true;
	}

	return (
		<div className="grid-parent">
			<div className="left-container">
				<div className="flex-cards">
					<div className="bottom">
						<div className="overlay2">
							{details.cvc ? details.cvc : theDefault.cvc}
						</div>
					</div>
					<div className="top">
						<div className="overlay">
							<div className="credit">
								<div className="top-section">
									<div className="circle">
										<a href="https://www.frontendmentor.io/profile/Kamasah-Dickson">
											<img src={me} alt="Github" />
										</a>
									</div>
									<div className="circle2"></div>
								</div>
								<div className="bottom-section">
									<div className="card-input">
										{details.cardNumber
											? details.cardNumber
											: theDefault.cardNumber}
									</div>
									<div className="user">
										<div className="name">
											{details.cardName.length < 17
												? details.cardName
												: details.cardName.slice(0, 17) + "..."}
											{details.cardName ? "" : theDefault.cardName}
										</div>
										<div className="date">
											{details.expiryMonth
												? details.expiryMonth
												: theDefault.expiryYear}
											/
											{details.expiryYear
												? details.expiryYear
												: theDefault.expiryMonth}
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div className="right-container">
				{theRender.render ? (
					<form action="post" onSubmit={handleSubmit}>
						<label htmlFor="card-name">
							CARDHOLDER NAME
							<div className="input">
								<input
									type="text"
									id="card-name"
									placeholder="e.g Kamasah Dickson"
									name="cardName"
									onChange={creditCard}
									required
								/>
								<span>{errors.nameError}</span>
							</div>
						</label>
						<label htmlFor="card-number">
							CARD NUMBER
							<div className="input">
								<InputMask
									mask="**** **** **** ****"
									alwaysShowMask={false}
									maskPlaceholder=""
									placeholder="e.g 1234 5678 9123 00000"
									name="cardNumber"
									id="card-number"
									onChange={creditCard}
									type="tel"
								/>
								<span>{errors.cardNumberError}</span>
							</div>
						</label>
						<div className="date-input">
							<div>
								<label htmlFor="card-date">EXP.DATE (MM/YY)</label>
								<div className="date">
									<div className="error-wrapper">
										<div className="month input">
											<input
												type="tel"
												onChange={creditCard}
												placeholder="MM"
												id="card-month"
												name="expiryMonth"
												maxLength={2}
											/>
										</div>
										<span>{errors.monthError}</span>
									</div>
									<div className="error-wrapper">
										<div className="year input">
											<input
												type="tel"
												onChange={creditCard}
												placeholder="YY"
												id="card-year"
												maxLength="2"
												name="expiryYear"
											/>
										</div>
										<span>{errors.yearError}</span>
									</div>
								</div>
							</div>

							<div className="cvc">
								<label htmlFor="card-date">CVC</label>
								<div className="error-wrapper">
									<div className="input">
										<input
											type="tel"
											onChange={creditCard}
											placeholder="e.g. 123"
											id="card-cvc"
											name="cvc"
											maxLength={3}
										/>
									</div>
									<span>{errors.cvcError}</span>
								</div>
							</div>
							<span>{errors.cvcError2}</span>
						</div>
						<button type="submit">Confirm</button>
					</form>
				) : (
					<Thanks theRender={passToggle} />
				)}
			</div>
		</div>
	);
};

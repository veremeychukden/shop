import './button.scss';

const BUTTON_TYPES_CLASSES = {
	google: 'google-sign-in',
	inverted: 'inverted'
}

const Button = ({ children, buttonType, ...buttonOptions }) => {
	return (
		<button className={`button-container ${BUTTON_TYPES_CLASSES[buttonType]}`} {...buttonOptions}>
			{children}
		</button>
	);
}

export default Button;
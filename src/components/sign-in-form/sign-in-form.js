import { useState } from "react";
import { signInUserWithEmailAndPassword, signInWithGooglePopup } from "../../utils/firebase/firebase";
import Button, { BUTTON_TYPES_CLASSES } from "../button/button";
import FormInput from "../form-input/form-input";
import { SignInContainer, ButtonsContainer } from './sign-in-form.styles';

const defaultFormFields = {
	email: '',
	password: ''
};

const SignInForm = () => {
	const [formFields, setFormFields] = useState(defaultFormFields);
	const { email, password } = formFields;

	const signInWithGoogle = async () => {
		await signInWithGooglePopup();
	}

	const handleChange = (event) => {
		const { name, value } = event.target;
		setFormFields({ ...formFields, [name]: value })
	}

	const resetFormFields = () => {
		setFormFields(defaultFormFields);
	}

	const handleSubmit = async (event) => {
		event.preventDefault();

		try {
			await signInUserWithEmailAndPassword(email, password);
			resetFormFields();
		} catch (error) {
			switch (error.code) {
				case 'auth/wrong-password':
					alert('Incorrect password');
					break;
				case 'auth/user-not-found':
					alert('No user assoiciated with this email');
					break;
				default:
					console.log(error);
			}
		}
	}

	return (
		<SignInContainer>
			<h2>Already have an account?</h2>
			<span>Sign in with your email and password</span>
			<form onSubmit={handleSubmit}>
				<FormInput
					label="Email"
					type="email"
					required
					onChange={handleChange}
					name="email"
					value={email}
				/>

				<FormInput
					label="Password"
					type="password"
					required
					onChange={handleChange}
					name="password"
					value={password}
				/>
				<ButtonsContainer>
					<Button type="submit">Sign in</Button>
					<Button type="button" buttonType={BUTTON_TYPES_CLASSES.google} onClick={signInWithGoogle}>Google sign in</Button>
				</ButtonsContainer>
			</form>
		</SignInContainer>
	)
}

export default SignInForm;
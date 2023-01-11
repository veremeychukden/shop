import { useState } from "react";
import { createUserDocumentFromAuth, signInUserWithEmailAndPassword, signInWithGooglePopup } from "../../utils/firebase/firebase";
import Button from "../button/button";
import FormInput from "../form-input/form-input";
import './sign-in-form.scss';

const defaultFormFields = {
	email: '',
	password: ''
};

const SignInForm = () => {
	const [formFields, setFormFields] = useState(defaultFormFields);
	const { email, password } = formFields;

	const signInWithGoogle = async () => {
		const { user } = await signInWithGooglePopup();
		await createUserDocumentFromAuth(user);
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
			const response = await signInUserWithEmailAndPassword(email, password);
			console.log(response);
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
		<div className="sign-in-container">
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
				<div className="buttons-container">
					<Button type="submit">Sign in</Button>
					<Button type="button" buttonType="google" onClick={signInWithGoogle}>Google sign in</Button>
				</div>
			</form>
		</div>
  )
}

export default SignInForm;
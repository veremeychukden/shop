import { initializeApp } from 'firebase/app';
import { getAuth, signInWithRedirect, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore';

const firebaseConfig = {
	apiKey: "AIzaSyA7wQj0HN2ulAviDna8GW3q_a9-muIC5zA",
	authDomain: "shop-db-47f8d.firebaseapp.com",
	projectId: "shop-db-47f8d",
	storageBucket: "shop-db-47f8d.appspot.com",
	messagingSenderId: "780680575307",
	appId: "1:780680575307:web:b39f2d33ab4d90890d50ce"
};

const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();
provider.setCustomParameters({
	prompt: 'select_account'
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth) => {
	const userDocRef = doc(db, 'users', userAuth.uid);
	const userSnapshot = await getDoc(userDocRef);

	if (!userSnapshot.exists()) {
		const { displayName, email } = userAuth;
		const createdAt = new Date();

		try {
			await setDoc(userDocRef, {
				displayName,
				email,
				createdAt
			})
		} catch (error) {
			console.log('Error creating the user', error.message)
		}
	}

	return userDocRef;
}
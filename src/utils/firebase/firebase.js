import { initializeApp } from 'firebase/app';
import { 
	getAuth, 
	signInWithPopup, 
	GoogleAuthProvider, 
	createUserWithEmailAndPassword, 
	signInWithEmailAndPassword, 
	signOut,
	onAuthStateChanged
} from 'firebase/auth';
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

const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
	prompt: 'select_account'
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, googleProvider);

export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth, additionalInfo = {}) => {
	if (!userAuth) return;

	const userDocRef = doc(db, 'users', userAuth.uid);
	const userSnapshot = await getDoc(userDocRef);

	if (!userSnapshot.exists()) {
		const { displayName, email } = userAuth;
		const createdAt = new Date();

		try {
			await setDoc(userDocRef, {
				displayName,
				email,
				createdAt,
				...additionalInfo
			})
		} catch (error) {
			console.log('Error creating the user', error.message)
		}
	}

	return userDocRef;
}

export const createAuthUserWithEmailAndPassword = async (email, password) => {
	if (!email || !password) return;
	return await createUserWithEmailAndPassword(auth, email, password);
}

export const signInUserWithEmailAndPassword = async (email, password) => {
	if (!email || !password) return;
	return await signInWithEmailAndPassword(auth, email, password);
}

export const signOutUser = async () => await signOut(auth);

export const onAuthStateChangedListener = (callback) => onAuthStateChanged(auth, callback);
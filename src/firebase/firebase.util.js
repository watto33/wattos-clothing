import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

const config = {
	apiKey: 'AIzaSyAHvyLU-L_Xbz9SJkL1kViTw7vMxiTiZ3o',
	authDomain: 'wattos-shopping-db.firebaseapp.com',
	databaseURL: 'https://wattos-shopping-db.firebaseio.com',
	projectId: 'wattos-shopping-db',
	storageBucket: 'wattos-shopping-db.appspot.com',
	messagingSenderId: '951941462436',
	appId: '1:951941462436:web:e48d5166487e322f02a931',
	measurementId: 'G-WXB7LJQ290',
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
	if (!userAuth) return;

	const userRef = firestore.doc(`users/${userAuth.uid}`);

	const snapshot = await userRef.get();

	if (!snapshot.exists) {
		const { displayName, email } = userAuth;
		const createdAt = new Date();

		try {
			await userRef.set({
				displayName,
				email,
				createdAt,
				...additionalData,
			});
		} catch (error) {
			console.log('Error creating user', error.message);
		}
	}

	return userRef;
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;

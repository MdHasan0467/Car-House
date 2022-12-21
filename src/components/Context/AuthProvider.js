import React, { createContext, useEffect, useState } from 'react';
import {
	createUserWithEmailAndPassword,
	updateProfile,
	signInWithEmailAndPassword,
	signInWithPopup,
	GoogleAuthProvider,
	onAuthStateChanged,
	signOut,
	getAuth,
} from 'firebase/auth';
import app from '../firebase/firebase.init';

export const AuthContext = createContext();

const auth = getAuth(app);
const AuthProvider = ({ children }) => {
	const [user, setUser] = useState(null);
	const [loading, setLoading] = useState(true);
	const [logUser, setLogUser] = useState();

	const googleProvider = new GoogleAuthProvider();
	//!<===================================>
	//!<===================================>

	useEffect(() => {
		fetch(`https://assignment-twelve-server.vercel.app/users/${user?.email}`)
			.then((res) => res.json())
			.then((result) => {
				console.log(result);
				setLogUser(result);
			});
	}, [user?.email]);

	//! Create User....
	const createSignUp = (email, password) => {
		setLoading(true);
		return createUserWithEmailAndPassword(auth, email, password);
	};
	//!......................................

	//! User profile....
	const userprofile = (name, photoURL) => {
		return updateProfile(auth.currentUser, {
			displayName: name,
			photoURL: photoURL,
		});
	};
	//!......................................

	// onAuthStateChanged method onekta server er moto kaj kore,.,,,, user change hocce kina seita kheyal rakhe & sei onujaee output dekhay
	useEffect(() => {
		const unSubscribe = onAuthStateChanged(auth, (currentUser) => {
			// console.log('user inside auth state change', currentUser);
			setUser(currentUser);
			setLoading(false);
		});
		return () => {
			unSubscribe();
		};
	}, []);

	//! Log in....
	const logIn = (email, password) => {
		setLoading(true);
		return signInWithEmailAndPassword(auth, email, password);
	};
	//!......................................

	//! Google Log in....
	const googleSignUp = () => {
		setLoading(true);
		return signInWithPopup(auth, googleProvider);
	};
	//!......................................

	//! LogOut...
	const logOut = () => {
		setLoading(true);
		return signOut(auth);
	};
	//!......................................

	const authInfo = {
		logUser,
		user,
		loading,
		createSignUp,
		userprofile,
		logIn,
		googleSignUp,
		logOut,
	};
	return (
		<AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
	);
};

export default AuthProvider;

import { useState, useEffect, useContext } from 'react';

import { makeStyles } from '@material-ui/core';
import { uploadJakun } from '../../TukarJakunAPI';

import Misc from '../../misc/useMisc';

import Context from '../../Context';

function JakunAdd() {
	const { redirectToLogin } = Misc();
	const { state, dispatch } = useContext(Context);
	const { user } = state;

	console.log(state);
	const [ jakun, setJakun ] = useState({
		ownerId: user,
		faculty: '',
		size: '',
		condition: '',
		description: '',
		contact: ''
	});

	console.log(user);

	// Enum for options
	const size = [ 'S', 'M', 'L', 'XL' ];
	const faculty = [ 'FASILKOM', 'FT', 'FIA' ];
	const condition = [ 'UNTOUCHED', 'MODIFIED' ];

	useEffect(
		() => {
			if (user) {
				return;
			}
			dispatch({
				type: 'dialogError',
				payload: { title: '403: Forbidden', message: 'Looks like your session is up.\n Please re-login to continue.', action: 'Login', redirect: '/login' }
			});
// redirectToLogin('/login');
		},
		[ redirectToLogin, dispatch, user ]
	);

	const useStyles = makeStyles((theme) => ({
		formControl: {
			minWidth: 120
		},
	}));

	const handleChange = ({ target }) => {
		const { name, value } = target;
		setJakun((prev) => ({
			...prev,
			[name]: value
		}));
	};

	const handleSubmit = (event) => {
		event.preventDefault();
		uploadJakun(jakun)
			.then((res) => {
				dispatch({type: 'snackbarSuccess', payload:'Your Jakun is successfully uploaded'})
			})
			.catch((err) => {
				if (err.response.status === 400) {
					dispatch({ type: 'snackbarError', payload: 'Please fill all of the fields' });
				}
				if (err.response.status === 403) {
					dispatch({
						type: 'dialogError',
						payload: { title: '403: Forbidden', message: 'Looks like your session is up.\n Please re-login to continue.', action: 'Login', redirect: '/login' }
					});
				}
			});
	};

	const classes = useStyles();


	return {
		jakun,
		handleChange,
		handleSubmit,
		classes,
		faculty,
		size,
		condition
	};
}

export default JakunAdd;

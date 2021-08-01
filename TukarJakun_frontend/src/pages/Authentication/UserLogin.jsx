import { useContext, useEffect, useState } from 'react';
import { login } from '../../TukarJakunAPI';
import { useHistory } from 'react-router';
import jwt from 'jwt-decode';
import Context from '../../Context';

function UserLogin() {
	const { state, dispatch } = useContext(Context);
	const { user } = state;

	const initialStateValue = {
		username: '',
		password: ''
	};

	const [ value, setValue ] = useState(initialStateValue);

	useEffect(
		() => {
			if (localStorage.getItem('Authorization')) {
				dispatch({
					type: 'dialogError',
					payload: {
						title: `You're already logged in.`,
						message: `Hey ${user}, you're still logged in.\nLet's go back to the landing page.`,
						action: `Go back!`,
						redirect: '/'
					}
				})
			}
		},
		[ dispatch, user ]
	);

	const handleChange = ({ target }) => {
		const { name, value } = target;
		setValue((prev) => ({
			...prev,
			[name]: value
		}));
	};

	const history = useHistory();

	const handleSubmit = (event) => {
		event.preventDefault();
		dispatch({ type: 'hitProcess' });
		console.log('Login clicked');
		console.log(value);
		login(value)
			.then((res) => {
				console.log(res);
				localStorage.setItem('Authorization', res.data.jwt);
				const user = jwt(`Bearer ${res.data.jwt}`);
				localStorage.setItem('USER', user.sub);
				dispatch({
					type: 'dialogSuccess',
					payload: {
						title: `Login Success!`,
						message: `Welcome back, ${user.sub}!`,
						action: 'Explore Jakun',
						redirect: '/'
					}
				});
			})
			.catch((error) => {
				console.log('salah login', error);
				if (value.username !== '' && value.password !== '') {
					dispatch({ type: 'loginFailed' });
				} else {
					dispatch({ type: 'snackbarError', payload: 'Please fill the fields' });
				}
			});
		// uploadJakun(jakun)
		// 	.then((res) => {
		// 		console.log('sent bro', res);
		// 		setOpen(true);
		// 	})
		// 	.catch((err) => {
		// 		console.log('error broo', err);
		// 	});
	};

	console.log(user);
	return { handleChange, handleSubmit, value, history };
}

export default UserLogin;

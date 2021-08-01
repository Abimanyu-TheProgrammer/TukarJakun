import { useContext, useEffect, useState } from 'react';
import { register } from '../../TukarJakunAPI';
import Context from '../../Context';
import useMisc from '../../misc/useMisc';

function Register() {
	const {dispatch} = useContext(Context);
	const {redirectImmediate} = useMisc();

	const [ value, setValue ] = useState({
		username: '',
		password: '',
		roles: '',
		active: 'true'
	});

	// For Snackbar
	const roles = [ 'ADMIN' ];

	const handleChange = ({ target }) => {
		const { name, value } = target;
		setValue((prev) => ({
			...prev,
			[name]: value
		}));
	};

	const handleSubmit = (event) => {
		event.preventDefault();
		console.log('Register clicked');
		register(value).then((res) => {
			dispatch({type: 'snackbarSuccess', payload: `Welcome, ${value.username}`})
			redirectImmediate("/login");
		}).catch((error) => {
			console.log('salah login', error);
			if(error.response.status === 400) {
				dispatch({type: 'snackbarError', payload: 'Please fill all of the fields'})
			}
			if(error.response.status === 403) {
				dispatch({type: 'snackbarError', payload: 'User already exists'})				
			}
		});
	};

	useEffect(
		() => {
			if (localStorage.getItem('Authorization')) {
				dispatch({
					type: 'dialogError',
					payload: {
						title: `You're still logged in.`,
						message: 'To register a new user, \nplease logout first.',
						action: 'logout',
						redirect: '/login'
					}
				});
				localStorage.clear();
			}
		},
		[ dispatch ]
	);

	return {
		handleSubmit,
		handleChange,
		value,
		roles
	};
}
export default Register;

// useReducer()
const initialState = {
	user: localStorage.getItem('USER') || '',
	isLoggedIn: false,
	snackbarMessage: '',
	isLoading: false,
	openSnackbar: false,
	openDialog: false,
	dialogTitle: '',
	dialogAction: '',
	dialogRedirect: '',
	severity: 'error',
	action: false
};

// Notes:
// If you want to use InitialFunction, please return ALL OF THE OTHER STATE
// So the other state can always be accessed with useContext
const initialFunction = (initialState) => {
	let {
		isLoading,
		openSnackbar,
		openDialog,
		dialogTitle,
		dialogAction,
		dialogRedirect,
		user,
		isLoggedIn,
		snackbarMessage,
		severity,
		action
	} = initialState;
	if (isLoading !== false) {
		isLoading = false;
	}
	if (openSnackbar !== false) {
		openSnackbar = false;
	}
	if (openDialog !== false) {
		openDialog = false;
	}
	return {
		isLoading,
		openSnackbar,
		openDialog,
		dialogTitle,
		dialogAction,
		dialogRedirect,
		user,
		isLoggedIn,
		snackbarMessage,
		severity,
		action
	};
};

// Notes:
// Please return all of the other state using ...state
// So the other state can always be accessed with useContext
const globalReducer = (state, action) => {
	switch (action.type) {
		case 'hitProcess':
			return {
				...state,
				isLoading: true
			};
		case 'snackbarClose':
			return {
				...state,
				openSnackbar: false,
				severity: 'error'
			};
		case 'loginSuccess':
			return {
				...state,
				isLoading: false,
				user: localStorage.getItem('USER'),
				snackbarMessage: 'Welcome back!',
				openSnackbar: true,
				severity: 'success'
			};

		case 'loginFailed':
			return {
				...state,
				isLoading: false,
				severity: 'error',
				snackbarMessage: 'Incorrect Username or Password',
				openSnackbar: true
			};

		case 'snackbarSuccess':
			return {
				...state,
				isLoading: false,
				severity: 'success',
				snackbarMessage: action.payload,
				openSnackbar: true
			};
		case 'snackbarError':
			return {
				...state,
				isLoading: false,
				severity: 'error',
				snackbarMessage: action.payload,
				openSnackbar: true
			};

		case 'dialogSuccess':
			return {
				...state,
				isLoading: false,
				severity: 'success',
				snackbarMessage: action.payload.message,
				openDialog: true,
				dialogTitle: action.payload.title,
				dialogAction: action.payload.action,
				dialogRedirect: action.payload.redirect
			};

		case 'dialogError':
			return {
				...state,
				isLoading: false,
				severity: 'error',
				snackbarMessage: action.payload.message,
				openDialog: true,
				dialogTitle: action.payload.title,
				dialogAction: action.payload.action,
				dialogRedirect: action.payload.redirect
			};
		case 'dialogClose':
			return {
				openDialog: false
			};
		default:
			return state;
	}
};

export { initialFunction, initialState, globalReducer };

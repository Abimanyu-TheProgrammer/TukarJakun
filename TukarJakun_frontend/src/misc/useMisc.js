import { useCallback } from 'react';
import { useHistory } from 'react-router';


function useMisc() {
	const history = useHistory();

	const redirectTo = useCallback(path => {
		setTimeout(function() {
			history.push(path);
			window.location.reload(true);
		}, 4000);
	}, [history])

    const redirectToLogin = useCallback((loginpath) => {
		setTimeout(function() {
			localStorage.removeItem('Authorization');
			localStorage.removeItem('USER');
			history.push(loginpath);
			window.location.reload(true);
		}, 4000);
	}, [history]);

	const redirectImmediate = useCallback(loginpath => {
		history.push(loginpath);
	}, [history]);

	const errorHandler = useCallback((error) => {
		if (error.response) {
			if (error.response.status === 403) {
				redirectToLogin('/login');
			}
			if (error.response.status === 404) {
				redirectTo("/");
			}
		}
	}, [redirectToLogin, redirectTo]);



	return { errorHandler, redirectToLogin, redirectTo, redirectImmediate };
}

export default useMisc;

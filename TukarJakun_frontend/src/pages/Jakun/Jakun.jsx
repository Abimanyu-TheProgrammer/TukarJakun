import React, { useCallback, useContext } from 'react';
import JakunList from './JakunList';

import { useState, useEffect } from 'react';
import { fetchJakun } from '../../TukarJakunAPI';
import JakunSearch from './JakunSearch';

import { Box, CircularProgress } from '@material-ui/core';

import Context from '../../Context';

function Jakun() {

	const { state, dispatch } = useContext(Context);

	const { isLoading, user } = state;
	const [ jakuns, setJakuns ] = useState([]);

	const fetchData = useCallback(
		() => {
			dispatch({ type: 'hitProcess' });
			fetchJakun()
				.then((res) => {
					if (res) {
						console.log(res);
						setJakuns(res.data);
						dispatch({
							type: 'snackbarSuccess',
							payload: `There ${
								res.data.length > 1 ? 'are' :
								'is'} ${res.data.length} Jakun availabe.`
						});
					} else {
						console.log('cors');
					}
				})
				.catch((e) => {
					if (e.response) {
						if (e.response.status === 404) {
							console.log('Gaada jakunnya');
							dispatch({
								type: 'snackbarError',
								payload: `There's no Jakun availabe.`
							});
						}
						if (e.response.status === 403) {
							console.log(e.response);
							dispatch({
								type: 'dialogError',
								payload: {
									title: '403: Forbidden',
									message: 'Looks like your session is up. Please re-login to continue.',
									action: 'Login',
									redirect: '/login'
								}
							});
						}
					}
				});
		},
		[ dispatch ]
	);

	useEffect(
		() => {
			if (user) {
				fetchData();
			}
		},
		[ fetchData, user ]
	);

	return (
		<div>
			<JakunList jakuns={jakuns} loading={isLoading}>
				<JakunSearch setJakuns={setJakuns} fetchData={fetchData} />
				{isLoading && (
					<Box
						display="flex"
						justifyContent="center"
						alignItems="center"
						css={{ height: 'calc(100vh - 24em)' }}
					>
						<CircularProgress />
					</Box>
				)}
			</JakunList>
			<br /> <br />
		</div>
	);
}

export default Jakun;

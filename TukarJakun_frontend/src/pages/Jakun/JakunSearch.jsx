import { TextField } from '@material-ui/core';
import React, { useState, useEffect, useCallback } from 'react';

import { getFindDetail } from '../../TukarJakunAPI';

function JakunSearch(props) {
	const { setJakuns, fetchData } = props;

	const [ searchTerm, setSearchTerm ] = useState('');
	const handleChange = (e) => {
		setSearchTerm(e.target.value);
	};

	const findJakun = useCallback(
		() => {
			getFindDetail(searchTerm)
				.then((res) => {
					console.log(res.data);
					setJakuns(res.data);
				})
				.catch((e) => {
					console.log('Not found: ', e);
					setJakuns([]);
				});
		},
		[ searchTerm, setJakuns ]
	);

	useEffect(
		() => {
			console.log(searchTerm);
			if (searchTerm) {
				findJakun();
			} else {
				fetchData();
			}
		},
		[ searchTerm, findJakun, fetchData ]
	);

	return (
		<div>
			<form action="GET">
				<TextField
					name="query"
					value={searchTerm}
					label="Search"
					fullWidth
					onChange={handleChange}
					placeholder="Find Jakun by owner, size, or faculty"
                    variant='outlined'
					size='small'
                />
			</form>
		</div>
	);
}

export default JakunSearch;

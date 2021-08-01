import { useCallback, useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getJakunDetail } from '../../TukarJakunAPI';
import { deleteJakun } from '../../TukarJakunAPI';

import { swapJakun } from '../../TukarJakunAPI';

import useMisc from '../../misc/useMisc';

import Context from '../../Context';

function JakunDetail() {
	const { state, dispatch } = useContext(Context);
	const { user } = state;
	const { redirectTo, errorHandler } = useMisc();

	let { ownerId } = useParams();

    	// Swap button
	const [ added, setAdded ] = useState(false);
	const [ jakun, setJakun ] = useState({
		ownerId: '',
		faculty: '',
		size: '',
		condition: '',
		description: '',
		contact: '',
		savedByUser: []
	});

	const handleDetail = useCallback(
		(id) => {
			getJakunDetail(id)
				.then((res) => {
					console.log(res);
					setJakun(res.data);
					if (res.data.savedByUser.includes(user)) {
						setAdded(true);
					}
				})
				.catch((e) => {
					console.log(e);
					errorHandler(e);
				});
		},
		[ errorHandler, user ]
	);

	const handleDelete = (item) => {
		deleteJakun(item)
			.then((res) => {
				console.log(res);
				dispatch({type:'snackbarSuccess', payload:'Successfully deleted.'})
				redirectTo("/");
			})
			.catch((e) => {
				console.log('Error when deleting');
				errorHandler(e);
                dispatch({type: 'snackbarError', payload: 'Delete feature is still under maintenance'})
			});
	};

	const handleSwap = useCallback(() => {
		dispatch({type: 'hitProcess'})
		swapJakun(user, ownerId)
		.then(() => {
			setAdded(true);
			dispatch({type: 'snackbarSuccess', payload: 'Successfully added to the watchlist'})
		})
		.catch(error => {
			dispatch({type: 'snackbarError', payload: 'Something wrong..'})
		});
	}, [user, ownerId, dispatch]);

	useEffect(
		() => {
			handleDetail(ownerId);
		},
		[ ownerId, handleDetail, added ]
	);

	return { ownerId, jakun, handleDelete, added, setAdded, handleSwap };
}

export default JakunDetail;

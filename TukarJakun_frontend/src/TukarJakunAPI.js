// const urlHero = 'https://adpro-group-stage.herokuapp.com/api';
// const urlHero = 'http://localhost:8080/api';
const urlHero = process.env.REACT_APP_BACKEND_URL + '/api';
// const urlOri = process.env.REACT_APP_BACKEND_URL;

const JWT = localStorage.getItem('Authorization');
console.log(JWT)

const headerDefault = () => {
	return {
		headers: {
			'Access-Control-Allow-Origin': '*',
			'Content-Type': 'application/json'
		}
	};
};

const headerJWT = (token) => {
	return {
		headers: {
			'Access-Control-Allow-Origin': '*',
			'Content-Type': 'application/json',
			Authorization: `Bearer ${token}`
		}
	};
};

const axios = require('axios');

export const fetchJakun = async () => {
	const url = urlHero + '/all-jakun';

	return await axios.get(url, headerJWT(JWT));
};

export const login = async (data) => {
	const url = urlHero + '/authenticate';

	return await axios.post(url, JSON.stringify(data), headerDefault());
};

export const register = async (data) => {
	const url = urlHero + '/register';

	return await axios.post(url, JSON.stringify(data), headerDefault());
};


export const deleteJakun = async (item) => {
	const url = urlHero;

	return await axios.delete(`${url}/${item.ownerId}`, headerJWT(JWT));
};

export const getJakunDetail = async (id) => {
	const url = urlHero;

	return await axios.get(`${url}/${id}`, headerJWT(JWT));
};

export const getFindDetail = async (keywords) => {
	const url = urlHero + `/search/${keywords}`;

	return await axios.get(url, headerJWT(JWT));
};

export const swapJakun = async (username, id) => {
	const url = urlHero + `/${id}/interested`

	const data = {
		"username": `${username}`
}

	return await axios.post(url, data, headerJWT(JWT));
}


export const uploadJakun = async (data) => {
	const url = urlHero + '/add-jakun';

	return await axios.post(url, JSON.stringify(data), headerJWT(JWT));
};

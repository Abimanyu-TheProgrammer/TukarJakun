import React, { lazy } from 'react';

import HomeIcon from '@material-ui/icons/Home';
import AddBox from '@material-ui/icons/AddBox';
import { ExitToApp } from '@material-ui/icons';

const Landing = lazy(() => import('./pages/Jakun/Jakun'));
const JakunAdd = lazy(() => import('./pages/Jakun/JakunAddP'));
const Detail = lazy(() => import('./pages/Jakun/JakunDetailP'));
const UserLogin = lazy(() => import('./pages/Authentication/UserLoginP'));
const Register = lazy(() => import('./pages/Authentication/RegisterP'));

export const urls = [
	{
		id: 0,
		label: 'Home',
		path: '/',
		component: Landing,
		icon: <HomeIcon />
	},
	{
		id: 1,
		label: 'Upload',
		path: '/upload',
		component: JakunAdd,
		icon: <AddBox />
	},
];

export const hiddenUrls = [
	{
		id: 0,
		label: 'detail',
		path: '/jakun-detail/:ownerId',
		component: Detail,
		icon: <HomeIcon />
	},
	{
		id: 1,
		label: 'register',
		path: '/register',
		component: Register,
		icon: <HomeIcon />
	},
	{
		id: 2,
		label: 'login',
		path: '/login',
		component: UserLogin,
		icon: <ExitToApp />
	}
];

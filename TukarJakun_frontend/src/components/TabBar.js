import React, { useState, Fragment, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Link, useLocation } from 'react-router-dom';
import { urls as pages } from '../urls';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

const useStyles = makeStyles({
	root: {
		width: '100%',
		position: 'fixed',
		bottom: '0em',
		zIndex: 10001,
		backgroundColor: 'rgba(255,255,255,.7)',
		backdropFilter: 'blur(10px)',
		height: '6em'
	},
	child: {
		height: '4em',
		top: '0em'
	}
});

export default function TabBar() {
	let location = useLocation();
	const [ path, setPath ] = useState(location.pathname);
	const classes = useStyles();

	const handleChange = (event, newPath) => {
		setPath(newPath);
	};

	useEffect(
		() => {
			console.log(location);
			setPath(location.pathname);
		},
		[ path, location ]
	);
	// It is a MUST to declare 'value' because the parent will read the value from its children
	// If we don't declare the 'value, they'll use default value, which is index.
	// We want our value var to be pathname, so we declare each child's value with path
	// If we don't declare it, the child will return int as their value and the useState will receive different state type.

	return (
		<Fragment>
			<BottomNavigation value={path} onChange={handleChange} showLabels className={classes.root}>
				{pages.map(({ path, label, icon }, key) => (
					<BottomNavigationAction
						key={key}
						label={label}
						value={path}
						icon={icon}
						component={Link}
						to={path}
						className={classes.child}
					/>
				))}
				{
					localStorage.getItem('Authorization') ? <BottomNavigationAction
						label="Logout"
						value="/logout"
						icon={<ExitToAppIcon />}
						component={Link}
						to="/login"
						onClick={() => {
							localStorage.removeItem('Authorization');
							localStorage.removeItem('USER');
							window.location.reload(true);
						}}
						className={classes.child}
					/> :
					<BottomNavigationAction
						label="Login"
						value="/login"
						icon={<ExitToAppIcon />}
						component={Link}
						to="/login"
						className={classes.child}
					/>}
			</BottomNavigation>
		</Fragment>
	);
}

import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import MenuIcon from '@material-ui/icons/Menu';
import { urls as pages } from '../urls';
import { Link } from 'react-router-dom';

import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';

const useStyles = makeStyles({
	appBar: {
		backgroundColor: 'rgba(255,255,255, .5)',
		backdropFilter: 'blur(10px)',
		boxShadow: 'none'
	},
	logoImgContainer: {
		position: 'block',
		left: 0,
		overflow: 'hidden',
		height: '3em',
		marginLeft: '-2em'
	},
	logoImg: {
		maxHeight: '100%'
		// margin: '.5em'
	},
	logoTxt: {
		marginLeft: '-1em',
		color: 'black'
	},
	toggleBurger: {
		position: 'absolute',
		right: 0
	},
	drawer: {
		backgroundColor: 'rgba(0,0,0, .1)',
		backdropFilter: 'blur(5px)',
		boxShadow: 'none'
	},
	list: {
		width: 250
	},
	fullList: {
		width: 'auto'
	}
});

export default function SwipeableTemporaryDrawer(props) {
	const { logo } = props;
	const classes = useStyles();
	const [ state, setState ] = useState({
		right: false
	});
	const [ value, setValue ] = useState(window.location.pathname);

	const history = useHistory();

	const handleChange = (event, newValue) => {
		setValue(newValue);
	};

	const toggleDrawer = (anchor, open) => (event) => {
		if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
			return;
		}

		setState({ ...state, [anchor]: open });
	};

	const list = (anchor) => (
		<div
			className={clsx(classes.list, {
				[classes.fullList]: anchor === 'top' || anchor === 'bottom'
			})}
			role="presentation"
			onClick={toggleDrawer(anchor, false)}
			onKeyDown={toggleDrawer(anchor, false)}
		>
			<Container>
				<br />
				<br />
				<Typography variant="h5">Menu</Typography>
				<br />
				<br />
			</Container>
			<Divider />
			<List onChange={handleChange} value={value}>
				{pages.map(({ label, path, component, icon }, index) => (
					<ListItem
						value={path}
						selected={window.location.pathname === path}
						button
						key={index}
						component={Link}
						to={path}
						variant="primary"
					>
						<ListItemIcon>{icon}</ListItemIcon>
						<ListItemText primary={label} />
					</ListItem>
				))}
				{
					!localStorage.getItem('Authorization') ? <ListItem
						value="/login"
						selected={window.location.pathname === '/login'}
						button
						component={Link}
						to="/login"
						variant="primary"
					>
						{/* <ListItemIcon>{icon}</ListItemIcon> */}
						<ListItemText primary="Login" />
					</ListItem> :
					<ListItem
						selected={window.location.pathname === '/login'}
						button
						component={Button}
						onClick={() => {
							localStorage.removeItem('Authorization');
							window.location.reload(true);
						}}
						variant="primary"
					>
						{/* <ListItemIcon>{icon}</ListItemIcon> */}
						<ListItemText primary="Logout" />
					</ListItem>}
			</List>
		</div>
	);

	return (
		<div>
			{[ 'right' ].map((anchor) => (
				<React.Fragment key={anchor}>
					<AppBar className={classes.appBar}>
						<Toolbar>
							<Button label="TukarJakun" onClick={() => history.push('/')}>
								<div className={classes.logoImgContainer}>
									<img src={logo} alt="" className={classes.logoImg} />
								</div>
							</Button>
							<div className={classes.logoTxt}>
								<Typography>TukarJakun</Typography>
							</div>
							{/* <Typography className={classes.logoTxt}>Haz Lazuardi</Typography> */}
							<Button onClick={toggleDrawer(anchor, true)} className={classes.toggleBurger}>
								<MenuIcon />
							</Button>
						</Toolbar>
					</AppBar>
					<SwipeableDrawer
						anchor={anchor}
						open={state[anchor]}
						onClose={toggleDrawer(anchor, false)}
						onOpen={toggleDrawer(anchor, true)}
						ModalProps={{
							BackdropProps: {
								classes: {
									root: classes.drawer
								}
							}
						}}
						value=""
					>
						{list(anchor)}
					</SwipeableDrawer>
				</React.Fragment>
			))}
		</div>
	);
}

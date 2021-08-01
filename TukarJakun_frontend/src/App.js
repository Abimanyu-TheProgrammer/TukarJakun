import './App.css';
import { Route, BrowserRouter as Router } from 'react-router-dom';
import React, { Fragment, Suspense, useMemo, useReducer } from 'react';
import { CssBaseline, Snackbar, ThemeProvider, withWidth } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { HazTheme } from './theme';
import { urls, hiddenUrls } from './urls';

import Drawer from './components/Drawer';
import TabBar from './components/TabBar';
import logo from './logo.svg';
// PWA IOS
// import useIsIOS from './useIsIOS';
import PWAPrompt from 'react-ios-pwa-prompt';

// Context
import Context from './Context';
import { globalReducer, initialState, initialFunction } from './Reducer';
import MuiAlert from '@material-ui/lab/Alert';
import AlertDialogSlide from './components/AlertDialogSlide';

const theme = HazTheme;
const useStyles = makeStyles((theme) => ({
	content: {
		position: 'absolute',
		top: '0em',
		[theme.breakpoints.up('sm')]: {
			position: 'absolute',
			top: '4em',
			paddingBottom: 0
		},
		width: '100%',
		paddingBottom: '8em',
		maxWidth: '1360px',
		margin: '0, .5, 0, .5'
	},
	formControl: {
		minWidth: 120
	},
	snackbar: {
		[theme.breakpoints.down('xs')]: {
			bottom: 110
		}
	}
}));
const pages = urls;
const hiddenPages = hiddenUrls;

const FallBackSuspense = () => {
	return <h1>Loading..</h1>;
};

function Alert(props) {
	return <MuiAlert elevation={6} variant="filled" {...props} />;
}

function App(props) {
	const [ state, dispatch ] = useReducer(globalReducer, initialState, initialFunction);
	const { openSnackbar, severity, snackbarMessage } = state;

	const classes = useStyles();

	const providerValue = useMemo(() => ({ state, dispatch }), [ state, dispatch ]);

	// PWA IOS
	// const { prompt } = useIsIOS();
	return (
		<Fragment>
			<Context.Provider value={providerValue}>
				<CssBaseline />
				<ThemeProvider theme={theme}>
					{/* {prompt && alert('Install PWA')} */}
					<Snackbar
						open={openSnackbar}
						autoHideDuration={4000}
						className={classes.snackbar}
						onClose={() => dispatch({ type: 'snackbarClose' })}
					>
						<Alert severity={severity} onClose={() => dispatch({ type: 'snackbarClose' })}>
							{snackbarMessage}
						</Alert>
					</Snackbar>
					<PWAPrompt
						promptOnVisit={1}
						timesToShow={5}
						copyClosePrompt="Close"
						permanentlyHideOnDismiss={false}
						debug={false}
					/>
					<Router>
						<Suspense fallback={<FallBackSuspense />}>
							<AlertDialogSlide open={openSnackbar} message={snackbarMessage} />
								{true && props.width === 'xs' && <TabBar logo={logo} />}

								{true && props.width !== 'xs' && <Drawer logo={logo} />}
								<div className={classes.content}>
									{/* Ini pages parent */}
									{pages.map(({ path, component }, key) => (
										<Route exact path={path} component={component} key={key} />
									))}
									{/* Ini untuk pages yang gaada di drawer */}
									{hiddenPages.map(({ path, component }, key) => (
										<Route exact path={path} component={component} key={key} />
									))}
								</div>
						</Suspense>
					</Router>
				</ThemeProvider>
			</Context.Provider>
		</Fragment>
	);
}

export default withWidth()(App);

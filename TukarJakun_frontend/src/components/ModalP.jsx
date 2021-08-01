import { Backdrop, Box, Button, makeStyles, Paper, Typography, withWidth } from '@material-ui/core';
import React from 'react';

function ModalP(props) {

	const useStyles = makeStyles({
		modalPaperMobile: {
			bottom: '0px',
			width: '100%',
			zIndex: '10000000',
			borderRadius: '1em 1em 0 0',
			padding: '1em 1em 4em 1em',
			backgroundColor: '#FAAF02'
		},
		modalPaperDesktop: {
			width: '375px',
			zIndex: '10000000',
			borderRadius: '1em',
			padding: '1em 1em 1em 1em',
			backgroundColor: '#FAAF02'
		},
		button: {
			margin: '1em 0 1em 0'
		}
	});

	const classes = useStyles();

	return (
		<div>
			<Backdrop open>
				<Box
					margin="auto"
					display="flex"
					alignItems={

							props.width === 'xs' ? 'flex-end' :
							'center'
					}
					justifyContent="center"
					style={{ height: '100vh', width: '100vw', zIndex: '10000000', position: 'fixed' }}
				>
					<Paper
						className={

								props.width === 'xs' ? classes.modalPaperMobile :
								classes.modalPaperDesktop
						}
					>
						<Typography variant="h5">"OOPS! 404"</Typography>
						<Typography variant="body">This is the description</Typography>

						<Button className={classes.button} fullWidth color="secondary" variant="contained">
							Login
						</Button>

						<Button fullWidth color="secondary" variant="outlined">
							Sign up
						</Button>
					</Paper>
				</Box>
			</Backdrop>
		</div>
	);
}

export default withWidth()(ModalP);

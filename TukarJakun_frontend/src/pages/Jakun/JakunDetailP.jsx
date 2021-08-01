import React, { Fragment} from 'react';

import JakunDetail from './JakunDetail';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { Avatar, Box, Button, Chip, Container, makeStyles, Typography } from '@material-ui/core';

function JakunDetailP() {
	const { ownerId, handleDelete, jakun, added, handleSwap } = JakunDetail();

	const useStyles = makeStyles((theme) => ({
		root: {
			display: 'flex',
			justifyContent: 'flex-start',
			flexWrap: 'wrap',
			'& > *': {
				margin: theme.spacing(0.25)
			}
		}
	}));

	const classes = useStyles();


	return (
		<Fragment>
			<Container maxWidth="xs">
				<br />
				<br />
				<Typography variant="h4">Jakun Details</Typography>
				<br />
				<Paper style={{ padding: '1em' }}>
					<Grid container spacing={2}>
						<Grid item xs={12}>
							<Typography variant="subtitle1">
								<b>OwnerId:</b> <br />
								{jakun.ownerId}
							</Typography>
						</Grid>
						<Grid item xs={12}>
							<Typography variant="subtitle1">
								<b>Faculty:</b> <br /> {jakun.faculty}{' '}
							</Typography>
						</Grid>
						<Grid item xs={12}>
							<Typography variant="subtitle1">
								<b>Size:</b> <br />
								{jakun.size}
							</Typography>
						</Grid>
						<Grid item xs={12}>
							<Typography variant="subtitle1">
								<b>Condition:</b> <br />
								{jakun.condition}
							</Typography>
						</Grid>
						<Grid item xs={12}>
							<Typography variant="subtitle1">
								<b>Description:</b> <br />
								{jakun.description}
							</Typography>
						</Grid>
						<Grid item xs={12}>
							<Typography variant="subtitle1">
								<b>Contact:</b> <br /> {jakun.contact}
							</Typography>
						</Grid>
						<Grid item xs={12}>
							<Typography variant="subtitle1">
								<b>Watchlist:</b>{' '}
							</Typography>
							<Box className={classes.root}>
								{jakun.savedByUser.map((user) => {
									return (
										<Chip
											avatar={<Avatar>{user[0]}</Avatar>}
											label={user}
											onClick={() => console.log('ClickChip')}
											css={{ margin: '1em' }}
											variant="outlined"
										/>
									);
								})}
							</Box>
						</Grid>
						<Grid item xs={12} variant="primary">
							<Grid container spacing={2}>
								{ownerId === localStorage.getItem('USER') && (
									<Grid item xs={6}>
										<Button
											color="secondary"
											variant="outlined"
											fullWidth
											onClick={() => handleDelete(jakun)}
										>
											Delete
										</Button>
									</Grid>
								)}
								<Grid
									item
									xs={

											ownerId === localStorage.getItem('USER') ? 6 :
											12
									}
								>
									<Button
										color={

												added ? '' :
												'primary'
										}
										disabled={added}
										fullWidth
										variant="contained"
										onClick={handleSwap}
									>
										{
											added ? 'Added' :
											'Swap'}
									</Button>
								</Grid>
							</Grid>
						</Grid>
					</Grid>
				</Paper>
			</Container>
		</Fragment>
	);
}

export default JakunDetailP;

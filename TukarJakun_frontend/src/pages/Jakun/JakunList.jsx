import { Box, Typography } from '@material-ui/core';
import { React, Fragment } from 'react';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import Container from '@material-ui/core/Container';
import { useHistory } from 'react-router-dom';

function JakunList(props) {
	const { jakuns, loading } = props;
	const history = useHistory();

	const handleClick = (ownerId) => {
		history.push(`/jakun-detail/${ownerId}`);
	};

	return (
		<div>
			<Container>
				<br />
				<br />
				<Typography variant="h4">Available Jakun</Typography>
				<br />
				{props.children}
				<br />
				<Grid container spacing={2}>
					{jakuns &&
						jakuns.map((key, index) => (
							<Fragment key={index}>
								<Grid item xs={6}>
									<Paper onClick={() => handleClick(key.ownerId)}>
										<CardActionArea>
											<CardContent>
												<div>
													<Typography variant="h4" color="primary">
														{key.size}
													</Typography>
													<Typography variant="body1" color="textPrimary">
														{key.faculty}
													</Typography>
													<br />
													<Typography variant="body2" color="textPrimary">
														{key.ownerId}
													</Typography>
												</div>
											</CardContent>
										</CardActionArea>
									</Paper>
								</Grid>
							</Fragment>
						))}
					{!loading &&
					jakuns.length === 0 && (
						<Box
							display="flex"
							justifyContent="center"
							alignItems="center"
							css={{ height: 'calc(100vh - 20em)', width: '100%' }}
						>
							<Typography>Not found</Typography>
						</Box>
					)}
				</Grid>
			</Container>
		</div>
	);
}

export default JakunList;

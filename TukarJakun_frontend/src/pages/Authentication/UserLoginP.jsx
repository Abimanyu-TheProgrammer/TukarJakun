import React, { useContext } from 'react';
import { Fragment } from 'react';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Context from '../../Context';
import UserLogin from './UserLogin';

function UserLoginP() {
	const { handleChange, handleSubmit, value, history } = UserLogin();
	const { state } = useContext(Context);
	const { isLoading } = state;
	return (
		<Fragment>
			<form onSubmit={handleSubmit} action="post" noValidate autoComplete="true">
				<Container maxWidth="xs">
					<br />
					<br />
					<Typography variant="h4">Login</Typography>
					<br />
					<Paper style={{ padding: '1em' }}>
						<Grid container spacing={2}>
							<Grid item xs={12}>
								<TextField
									title="usernameForm"
									name="username"
									value={value.username}
									label="Username"
									fullWidth
									onChange={handleChange}
								/>
							</Grid>
							<Grid item xs={12}>
								<TextField
									title="passwordForm"
									name="password"
									value={value.password}
									label="Password"
									fullWidth
									onChange={handleChange}
									type="password"
								/>
							</Grid>
							<Grid item xs={12} variant="primary">
								<Grid container spacing={1}>
									<Grid item xs={12}>
										<Button
											title="loginBtn"
											color="primary"
											variant="contained"
											type="submit"
											fullWidth
											disableElevation
											disabled={isLoading}
										>
											Login
										</Button>
									</Grid>
									<Grid item xs={12}>
										<Button
											title="registerInLoginBtn"
											onClick={() => history.push('/register')}
											variant="outlined"
											color="primary"
											fullWidth
											disableElevation
										>
											Don't have an account
										</Button>
									</Grid>
								</Grid>
							</Grid>
						</Grid>
					</Paper>
				</Container>
			</form>
		</Fragment>
	);
}

export default UserLoginP;

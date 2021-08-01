import React from 'react';

import { Fragment } from 'react';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import { makeStyles, FormControl, InputLabel, Select, MenuItem } from '@material-ui/core';

import Register from './Register';
import { useHistory } from 'react-router';

function RegisterP() {
	const { handleSubmit, handleChange, value, roles } = Register();

	const history = useHistory();

	const useStyles = makeStyles((theme) => ({
		formControl: {
			minWidth: 120
		},
		snackbar: {
			[theme.breakpoints.down('xs')]: {
				bottom: 110
			}
		}
	}));
	const classes = useStyles();

	return (
		<Fragment>
			<form onSubmit={handleSubmit} action="post" noValidate autoComplete="true">
				<Container maxWidth="xs">
					<br />

					<br />
					<Typography variant="h4">Register</Typography>
					<br />
					<Paper style={{ padding: '1em' }}>
						<Grid container spacing={2}>
							<Grid item xs={12}>
								<TextField
									title='usernameForm'
									name="username"
									value={value.username}
									label="Username"
									fullWidth
									onChange={handleChange}
								/>
							</Grid>
							<Grid item xs={12}>
								<TextField
									title='passwordForm'
									name="password"
									value={value.password}
									label="Password"
									fullWidth
									onChange={handleChange}
									type="password"
								/>
							</Grid>
							<Grid item xs={12}>
								<FormControl className={classes.formControl}>
									<InputLabel id="rolesSelect">Roles</InputLabel>
									<Select
										title='rolesOptions'
										labelId="rolesSelect"
										name="roles"
										value={value.roles}
										label="Roles"
										onChange={handleChange}
										autoWidth={true}
										displayEmpty
										labelWidth={3}
									>
										{roles.map((roles, index) => (
											<MenuItem key={index} value={roles}>
												{roles}
											</MenuItem>
										))}
									</Select>
								</FormControl>
							</Grid>
							<Grid item xs={12} variant="primary">
								<Grid container spacing={1}>
									<Grid item xs={12}>
										<Button
											title='registerBtn'
											color="primary"
											variant="contained"
											type="submit"
											fullWidth
											disableElevation
										>
											Register
										</Button>
									</Grid>
									<Grid item xs={12}>
										<Button
											title='loginInRegisterBtn'
											onClick={() => history.push('/login')}
											variant="outlined"
											color="primary"
											fullWidth
											disableElevation
										>
											Already have an account
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

export default RegisterP;

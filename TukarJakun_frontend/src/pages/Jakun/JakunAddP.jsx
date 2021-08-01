import React, { Fragment } from 'react';
import JakunAdd from './JakunAdd';

import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import { Button, Container, FormControl, InputLabel, Typography } from '@material-ui/core';
// import { Redirect, useHistory } from 'react-router-dom';

function JakunAddP() {
	const { jakun, handleChange, handleSubmit, classes, faculty, size, condition } = JakunAdd();

	return (
		<Fragment>
			<form onSubmit={handleSubmit} action="post" noValidate autoComplete="true">
				<Container maxWidth="xs">
					<br />
					<br />
					<Typography variant="h4">Upload Jakun</Typography>
					<br />
					<Paper style={{ padding: '1em' }}>
						<Grid container spacing={2}>
							{/* <Grid item xs={12}>
								<TextField
									name="ownerId"
									value={jakun.ownerId}
									label="OwnerID"
									fullWidth
									onChange={handleChange}
								/>
							</Grid> */}
							<Grid item xs={12}>
								<TextField
									name="description"
									value={jakun.description}
									label="Description"
									fullWidth
									onChange={handleChange}
								/>
							</Grid>
							<Grid item xs={12}>
								<FormControl className={classes.formControl}>
									<InputLabel id="facultySelect">Faculty</InputLabel>
									<Select
										labelId="facultySelect"
										name="faculty"
										value={jakun.faculty}
										label="Faculty"
										onChange={handleChange}
										autoWidth={true}
										displayEmpty
										labelWidth={3}
									>
										{faculty.map((faculty, index) => (
											<MenuItem key={index} value={faculty}>
												{faculty}
											</MenuItem>
										))}
									</Select>
								</FormControl>
							</Grid>
							<Grid item xs={12}>
								<FormControl className={classes.formControl}>
									<InputLabel id="sizeSelect">Size</InputLabel>
									<Select
										labelId="sizeSelect"
										name="size"
										value={jakun.size}
										label="Size"
										onChange={handleChange}
										autoWidth={true}
										displayEmpty
										labelWidth={3}
									>
										{size.map((size, index) => (
											<MenuItem key={index} value={size}>
												{size}
											</MenuItem>
										))}
									</Select>
								</FormControl>
							</Grid>
							<Grid item xs={12}>
								<FormControl className={classes.formControl}>
									<InputLabel id="conditionSelect">Condition</InputLabel>
									<Select
										labelId="conditionSelect"
										name="condition"
										value={jakun.condition}
										label="Condition"
										onChange={handleChange}
										autoWidth={true}
										displayEmpty
										labelWidth={3}
									>
										{condition.map((condition, index) => (
											<MenuItem key={index} value={condition}>
												{condition}
											</MenuItem>
										))}
									</Select>
								</FormControl>
							</Grid>
							<Grid item xs={12}>
								<TextField
									name="contact"
									value={jakun.contact}
									label="Contact"
									fullWidth
									onChange={handleChange}
								/>
							</Grid>
							<Grid item xs={12}>
								<Button color="primary" variant="contained" type="submit" fullWidth>
									Upload
								</Button>
							</Grid>
						</Grid>
					</Paper>
				</Container>
			</form>
		</Fragment>
	);
}

export default JakunAddP;

import React, { useContext } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Context from '../Context';
import { useHistory } from 'react-router';

export default function AlertDialogSlide() {
  const history = useHistory();
  const {state, dispatch} = useContext(Context);
  const {openDialog, dialogTitle, dialogAction, dialogRedirect, snackbarMessage} = state;

  console.log(dialogRedirect);

  console.log(state);

  			// backgroundColor: '#FAAF02'

  const handleClick = () => {
    history.push(dialogRedirect);
    window.location.reload(true);
    dispatch({type: 'dialogClose'})
  }
	return (
		<div>
			<Dialog
				PaperProps={{
          style: {
			  minWidth: '343px',
			  maxWidth: '375px'
          }
        }}
        open={openDialog}
				keepMounted
				onClose={() => dispatch({type: 'snackbarClose'})}
				aria-labelledby="alert-dialog-slide-title"
				aria-describedby="alert-dialog-slide-description"
			>
				<DialogTitle id="alert-dialog-slide-title">{dialogTitle}</DialogTitle>
				<DialogContent>
					<DialogContentText id="alert-dialog-slide-description">
					{snackbarMessage}
					</DialogContentText>
				</DialogContent>
				<DialogActions>
					<Button
						fullWidth
						variant="contained"
						color="primary"
						disableElevation
						onClick={handleClick}
					>
						{dialogAction}
					</Button>
				</DialogActions>
				<br />
			</Dialog>
		</div>
	);
}

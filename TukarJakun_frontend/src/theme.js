import { createMuiTheme } from '@material-ui/core';

export const HazTheme = createMuiTheme({
	palette: {
		primary: {
			main: '#FAAF02',
		},
		secondary: {
			main:  '#01579b'
		}
	},
	shape: {
		borderRadius: 5
	},
	overrides: {
        MuiButton: {
            root: {
                textTransform: 'none'
            }
        }
    },
});

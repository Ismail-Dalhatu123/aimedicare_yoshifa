import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
	typography: {
		fontFamily: 'inherit',
	},
	palette: {
		primary: {
			main: '#067f81',
		},
	},
	components: {
		MuiButton: {
			styleOverrides: {
				root: {
					textTransform: 'none',
				},
			},
		},
	},
});

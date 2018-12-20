import React from 'react';
import ReactDOM from 'react-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './redux/store';

import 'typeface-roboto';
import './main.css';

import App from './app';

const theme = createMuiTheme({
	palette: {
		primary: {
			// light: will be calculated from palette.primary.main,
			main: '#141414'
			// dark: will be calculated from palette.primary.main,
			// contrastText: will be calculated to contrast with palette.primary.main
		},
		secondary: {
			main: '#F44336'
			// dark: will be calculated from palette.secondary.main,
		}

		// error: will use the default color
	},
	typography: {
		useNextVariants: true
	}
});

class Index extends React.Component {
	render() {
		return (
			<BrowserRouter>
				<Provider store={store}>
					<MuiThemeProvider theme={theme}>
						<CssBaseline />
						<App />
					</MuiThemeProvider>
				</Provider>
			</BrowserRouter>
		);
	}
}

ReactDOM.render(<Index />, document.getElementById('root'));

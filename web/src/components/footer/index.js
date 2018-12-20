import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

import { styles } from './styles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { loadCSS } from 'fg-loadcss/src/loadCSS';

class Footer extends React.Component {
	componentDidMount() {
		loadCSS(
			'https://use.fontawesome.com/releases/v5.1.0/css/all.css',
			document.querySelector('#insertion-point-jss')
		);
	}
	render() {
		const { classes } = this.props;
		return (
			<Grid container>
				<Grid item xs={12} sm={3} className={classes.footerLeft}>
					<img src='/assets/notflix.png' className={classes.image} alt='#' />
					<Typography
						style={{ color: 'white', transform: 'translateY(-50px)' }}
					>
						Netflox Inc &copy; 2018
					</Typography>
				</Grid>
				<Grid item xs={12} sm={9} className={classes.footerRight}>
					<Grid container style={{ height: '100%' }}>
						<Grid item xs={12} sm={3} className={classes.footerRightContent}>
							<Button variant='contained' color='primary'>
								Menu
							</Button>
							<Button style={{ height: 50, color: 'white' }}>Home</Button>
							<Button style={{ height: 50, color: 'white' }}>
								Categories
							</Button>
						</Grid>
						<Grid item xs={12} sm={3} className={classes.footerRightContent}>
							<Button variant='contained' color='primary'>
								GET APPS ON
							</Button>
							<Button
								className='fab fa-google-play fa-2x'
								style={{ height: 50, color: 'white' }}
							>
								{' '}
							</Button>
						</Grid>
						<Grid item xs={12} sm={3} className={classes.footerRightContent}>
							<Button variant='contained' color='primary'>
								Follow Us
							</Button>
							<Button
								className='fab fa-facebook fa-2x'
								style={{ height: 50, color: 'white' }}
							>
								{' '}
							</Button>
							<Button
								className='fab fa-instagram fa-2x'
								style={{ height: 50, color: 'white' }}
							>
								{' '}
							</Button>
						</Grid>
						<Grid
							item
							xs={12}
							sm={3}
							className={classes.footerRightContent}
							style={{ justifyContent: 'flex-start' }}
						>
							<Button variant='contained' color='secondary'>
								SUBSCRIBE
							</Button>
						</Grid>
					</Grid>
				</Grid>
			</Grid>
		);
	}
}

export default withStyles(styles)(Footer);

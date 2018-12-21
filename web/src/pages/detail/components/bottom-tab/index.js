import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import FavoriteIcon from '@material-ui/icons/Favorite';
import LocalMovies from '@material-ui/icons/LocalMovies';
import Movie from '@material-ui/icons/Movie';
import { styles } from './style';

class BottomTab extends React.Component {
	state = {
		value: 0
	};

	handleChange = (event, value) => {
		this.setState({ value });
		this.props.getRenderState(value);
	};

	changeColor = (value) => {
		let color = 'white';
		if (this.state.value !== value) {
			color = '#AC2F25';
		}

		return { color };
	};

	render() {
		const { classes } = this.props;
		const { value } = this.state;

		return (
			<BottomNavigation value={value} onChange={this.handleChange} showLabels className={classes.root}>
				<BottomNavigationAction
					className={classes.navigation}
					style={this.changeColor(0)}
					label='Movie'
					icon={<Movie />}
				/>
				<BottomNavigationAction
					style={this.changeColor(1)}
					className={classes.navigation}
					label='Popular'
					icon={<LocalMovies />}
				/>
				<BottomNavigationAction
					style={this.changeColor(2)}
					className={classes.navigation}
					label='Related'
					icon={<FavoriteIcon />}
				/>
			</BottomNavigation>
		);
	}
}

BottomTab.propTypes = {
	classes: PropTypes.object.isRequired
};

export default withStyles(styles)(BottomTab);

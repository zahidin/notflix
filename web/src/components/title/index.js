import React from 'react';
import { Typography } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

import { styles } from './styles';

class Title extends React.Component {
	render() {
		const { classes } = this.props;
		return (
			<Typography
				variant={this.props.variant || 'h4'}
				className={classes.title}
				style={{
					borderLeft: this.props.noLeft || '10px solid #F44336'
				}}
			>
				{this.props.children}
			</Typography>
		);
	}
}

export default withStyles(styles)(Title);

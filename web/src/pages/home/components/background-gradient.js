import React from 'react';
import { withStyles } from '@material-ui/core/styles';

import { styles } from './background-gradient-styles';

class BackgroundGradient extends React.Component {
	render() {
		const { classes } = this.props;
		return <div className={classes.gradient} />;
	}
}

export default withStyles(styles)(BackgroundGradient);

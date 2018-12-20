import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

import { styles } from './styles';
import SelectCategories from '../select-categories';

class Main extends React.Component {
	render() {
		const { classes } = this.props;
		return (
			<div>
				<div className={classes.root}>
					<Typography className={classes.text} variant='h3'>
						Movies
					</Typography>
					<SelectCategories getCategory={this.props.getCategory} />
				</div>
			</div>
		);
	}
}

export default withStyles(styles)(Main);

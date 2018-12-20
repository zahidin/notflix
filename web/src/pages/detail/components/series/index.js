import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { connect } from 'react-redux';

import ListMovie from '../../../../components/list-movie';
import { ALL_POPULARS } from '../../../../redux/actions/popular';

import { styles } from './styles';
import { data } from '../../../../dummy-data';

class Popular extends React.Component {
	componentDidMount() {
		this.props.dispatch(ALL_POPULARS());
	}

	renderLoading(classes) {
		// if (!this.props.popular.results) return <CircularProgress className={classes.progress} color='secondary' />;
		return <ListMovie title='Popular' data={data} />;
	}

	render() {
		const { classes } = this.props;
		return (
			<Grid container className={classes.root}>
				{this.renderLoading(classes)}
			</Grid>
		);
	}
}

const mapStateToProps = (state) => ({
	popular: state.popularReducer
});

const withStylesConnect = withStyles(styles)(Popular);

export default connect(mapStateToProps)(withStylesConnect);

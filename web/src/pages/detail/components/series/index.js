import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { connect } from 'react-redux';
import CircularProgress from '@material-ui/core/CircularProgress';

import { ALL_POPULARS } from '../../../../redux/actions/popular';
import HorizontalList from '../../../../components/horizontal-list';

import { styles } from './styles';

class Popular extends React.Component {
	componentDidMount() {
		this.props.dispatch(ALL_POPULARS());
	}

	renderLoading(classes) {
		if (!this.props.popular.results) return <CircularProgress className={classes.progress} color='secondary' />;
		return <HorizontalList title='Popular' data={this.props.popular} type='ALL_POPULARS' />;
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

import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import CircularProgress from '@material-ui/core/CircularProgress';

import { connect } from 'react-redux';
import { styles } from './styles';
import HorizontalList from '../../../../components/horizontal-list';
import { GET_CATEGORY } from '../../../../redux/actions/category';

class Related extends React.Component {
	componentDidMount() {
		this.props.dispatch(GET_CATEGORY(this.props.category, 10));
	}

	renderLoading(classes) {
		if (!this.props.categories) return <CircularProgress className={classes.progress} color='secondary' />;
		return (
			<HorizontalList title={this.props.category} data={{ results: this.props.categories }} type='ALL_POPULARS' />
		);
	}
	render() {
		const { classes } = this.props;
		console.log(this.props.categories);
		return (
			<Grid container className={classes.root}>
				{this.props.categories && this.renderLoading(classes)}
			</Grid>
		);
	}
}

const mapStateToProps = (state) => ({
	categories: state.categoryReducer.data
});

const withStylesConnect = withStyles(styles)(Related);

export default connect(mapStateToProps)(withStylesConnect);

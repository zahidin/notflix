import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';

import Main from './components/main/';
import NewReleases from '../../components/horizontal-list';
import Category from './components/category';
import { styles } from './styles';

class Categories extends React.Component {
	state = {
		category: 'Action'
	};

	getCategory = (val) => {
		this.setState({
			category: val
		});
	};

	render() {
		const { classes } = this.props;
		return (
			<div className={classes.root}>
				<Main getCategory={this.getCategory} />
				<Category category={this.state.category} />
				<NewReleases data={this.props.popular} type='ALL_POPULARS' title='Popular' />
				<NewReleases data={this.props.trending} type='ALL_TRENDINGS' title='New Relases' />
			</div>
		);
	}
}

const withStylesCategories = withStyles(styles)(Categories);

const mapStateToProps = (state) => ({
	popular: state.popularReducer,
	trending: state.trendingReducer,
	categories: state.categoryReducer
});
export default connect(mapStateToProps)(withStylesCategories);

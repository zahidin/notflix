import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { GET_CATEGORY } from '../../../../redux/actions/category';

import { styles } from './styles';
import CardList from '../../../../components/cardlist';
import _ from 'lodash';
import { data } from '../../../../dummy-data';
import { Animate } from 'react-simple-animate';

const props = {
	startStyle: {
		transform: 'scale(0.1)',
		opacity: 0
	},
	endStyle: {
		transform: 'scale(1)',
		opacity: 1
	},
	durationSeconds: 0.5,
	easeType: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)'
};

class Category extends React.Component {
	componentDidMount() {
		this.props.dispatch(GET_CATEGORY(this.props.category, 30));
	}

	render() {
		const { classes } = this.props;
		const { categories } = this.props;
		const validCategoris = categories.length ? categories : [];
		return (
			<div className={classes.root}>
				{validCategoris.map((item, key) => (
					<Animate
						play={true}
						{...props}
						key={key}
						render={({ style }) => {
							return <CardList item={item} styles={style} />;
						}}
					/>
				))}
			</div>
		);
	}
}

const mapStateToProps = (state) => ({
	categories: state.categoryReducer.data
});

const withStylesCategories = connect(mapStateToProps)(Category);

export default withStyles(styles)(withStylesCategories);

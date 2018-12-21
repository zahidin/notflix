import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import ListItem from '@material-ui/core/ListItem';
import List from '@material-ui/core/List';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';
import { connect } from 'react-redux';
import { ALL_CATEGORIES, GET_CATEGORY } from '../../../../redux/actions/category';

import CircularProgress from '@material-ui/core/CircularProgress';

import { styles } from './index-style';
import Title from '../../../../components/title';
import CategoryContent from './category-content';

class CategoryList extends React.Component {
	state = {
		categories: {
			name: 'Action',
			id: 'Action'
		}
	};

	isActive = (id) => {
		return id === this.state.categories.id;
	};

	handleClick = (item) => () => {
		this.props.dispatch(GET_CATEGORY(item, 30));
		this.setState({
			categories: {
				name: item,
				id: item
			}
		});
	};

	componentDidMount() {
		this.props.dispatch(ALL_CATEGORIES());
		this.props.dispatch(GET_CATEGORY('Action', 30));
	}

	renderListCategories = (classes) =>
		this.props.categories.results.map((item, key) => (
			<List
				className={classes.root}
				key={key}
				style={{
					backgroundColor: 'transparent'
				}}
			>
				<ListItem
					button
					onClick={this.handleClick(item.genre)}
					style={{
						background: this.isActive(item.genre)
							? 'linear-gradient(to right , #F44336, #F4433655,  #0A0B0A)'
							: '#0A0B0A00'
					}}
				>
					<ListItemText color='red'>
						<Typography style={{ color: 'white' }}>{item.genre}</Typography>
					</ListItemText>
				</ListItem>
			</List>
		));

	render() {
		const { classes } = this.props;

		const { categories } = this.state;
		return (
			<div>
				<Grid container>
					<Grid item xs={12} sm={2}>
						<Title>Categories</Title>
						{this.props.categories.results.length !== 0 ? (
							this.renderListCategories(classes)
						) : (
							<CircularProgress />
						)}
					</Grid>
					<Grid item xs={12} sm={10}>
						<CategoryContent data={this.props.categories.data} categories={categories} />
					</Grid>
				</Grid>
			</div>
		);
	}
}

const mapStateToProps = (state) => ({
	categories: state.categoryReducer
});

const withConnect = withStyles(styles)(CategoryList);

export default connect(mapStateToProps)(withConnect);

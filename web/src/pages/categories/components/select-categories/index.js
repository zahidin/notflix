import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { connect } from 'react-redux';
import { ALL_CATEGORIES, GET_CATEGORY } from '../../../../redux/actions/category';

import { data } from '../../../../dummy-data';
import { styles } from './styles';

class SelectCategories extends React.Component {
	state = {
		category: '',
		open: false
	};

	handleChange = (event) => {
		this.setState({ [event.target.name]: event.target.value });
		this.props.getCategory(event.target.value);
		this.props.dispatch(GET_CATEGORY(event.target.value, 30));
	};
	componentDidMount() {
		this.props.dispatch(ALL_CATEGORIES());
	}

	handleClose = () => {
		this.setState({ open: false });
	};

	handleOpen = () => {
		this.setState({ open: true });
	};

	render() {
		const { classes } = this.props;
		const { results } = this.props.categories;
		const validCat = results.length ? results : [];
		return (
			<form autoComplete='off' className={classes.form}>
				<FormControl className={classes.formControl} color='secondary'>
					<InputLabel htmlFor='demo-controlled-open-select' className={classes.label} focused={false}>
						category
					</InputLabel>
					<Select
						open={this.state.open}
						onClose={this.handleClose}
						onOpen={this.handleOpen}
						placeholder='Action'
						value={this.state.category}
						onChange={this.handleChange}
						inputProps={{
							name: 'category',
							id: 'demo-controlled-open-select'
						}}
						className={classes.selectForm}
						MenuProps={{
							classes: {
								paper: classes.dropdownStyle
							}
						}}
					>
						{validCat.map((item, key) => (
							<MenuItem value={item.genre} key={key}>
								{item.genre}
							</MenuItem>
						))}
					</Select>
				</FormControl>
			</form>
		);
	}
}

SelectCategories.propTypes = {
	classes: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
	categories: state.categoryReducer
});

const withConnectSelectCategories = connect(mapStateToProps)(SelectCategories);

export default withStyles(styles)(withConnectSelectCategories);

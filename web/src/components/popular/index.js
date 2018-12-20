import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Fab from '@material-ui/core/Fab';
import CardHorizontal from '../card-horizontal';
import { connect } from 'react-redux';
import CircularProgress from '@material-ui/core/CircularProgress';

import { ALL_POPULARS } from '../../redux/actions/popular';
import _ from 'lodash';

import Title from '../title';
import Icon from '@material-ui/core/Icon';
import { styles } from './styles';
import Slider from 'react-slick';
import withWidth, { isWidthUp } from '@material-ui/core/withWidth';

class Popular extends React.Component {
	state = {
		middle: null
	};

	renderLoading(classes) {
		if (!this.props.popular.results) return <CircularProgress className={classes.progress} color='secondary' />;

		var settings = {
			dots: true,
			infinite: true,
			speed: 300,
			centerMode: true,
			focusOnSelect: true,
			afterChange: this.getIndexCenter,
			slidesToShow: this.getSideToShow() - 1,
			slidesToScroll: 1
		};

		return (
			<div
				style={{
					display: 'flex',
					position: 'relative',
					alignItems: 'center',
					justifyContent: 'center'
				}}
			>
				<Fab
					size='small'
					variant='extended'
					color='secondary'
					className={classes.arrow}
					onClick={() => this.slide.slickPrev()}
				>
					<Icon style={{ fontSize: 100, color: 'white' }}>arrow_left</Icon>
				</Fab>
				<Slider
					{...settings}
					className={classes.item}
					style={{ gridGap: 5 }}
					arrows={false}
					ref={(ref) => (this.slide = ref)}
					adaptiveHeight={true}
				>
					{_.uniqBy(this.props.popular.results, 'title').map((item, key) => (
						<CardHorizontal item={item} key={key} isMiddle={this.isOddMidle(key)} />
					))}
				</Slider>
				<Fab
					size='small'
					variant='extended'
					className={classes.arrow}
					color='secondary'
					onClick={() => this.slide.slickNext()}
				>
					<Icon style={{ fontSize: 100, color: 'white' }}>arrow_right</Icon>
				</Fab>
			</div>
		);
	}

	componentDidMount() {
		this.props.dispatch(ALL_POPULARS());
	}

	getSideToShow = () => {
		if (isWidthUp('lg', this.props.width)) {
			return 6;
		} else if (isWidthUp('md', this.props.width)) {
			return 4;
		} else if (isWidthUp('sm', this.props.width)) {
			return 3;
		} else {
			return 1;
		}
	};

	renderShowAll = () => {
		return (
			<Fab
				variant='extended'
				size='small'
				color='secondary'
				style={{
					width: '100px',
					alignSelf: 'center',
					margin: 'auto',
					marginTop: 10,
					marginLeft: 20
				}}
			>
				<Typography variant='caption' style={{ color: 'white', fontSize: 10 }}>
					Show All
				</Typography>
			</Fab>
		);
	};

	isOddMidle = (key) => this.state.middle !== key;

	getIndexCenter = (val) =>
		this.setState({
			middle: val
		});

	render() {
		const { classes } = this.props;
		console.log(this.props);
		return (
			<div style={{ display: 'flex', flexDirection: 'column' }}>
				<Title>Popular</Title>
				{this.renderLoading(classes)}
			</div>
		);
	}
}

const withWidthPopular = withWidth()(Popular);
const withStylesPopular = withStyles(styles)(withWidthPopular);

const mapStateToProps = (state) => ({
	popular: state.popularReducer
});

export default connect(mapStateToProps)(withStylesPopular);

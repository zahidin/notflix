import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import _ from 'lodash';
import { Redirect } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import { Typography } from '@material-ui/core';
import { GET_MOVIE } from '../../redux/actions/movie';
import { connect } from 'react-redux';
import Video from './components/video';
import BottomTab from './components/bottom-tab';
import Related from './components/related';
import Series from './components/series';
import Chip from '@material-ui/core/Chip';
import { styles, styled } from './style';
import { data } from '../../dummy-data';

class Detail extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			movie: null,
			renderStatus: 0,
			query: props.location.query || null
		};
	}

	getRenderState = (renderStatus) => {
		this.setState({ renderStatus });
	};

	static getDerivedStateFromProps(nextProps, prevState) {
		if (nextProps.location.query !== prevState.query) {
			if (nextProps.location.query) nextProps.dispatch(GET_MOVIE(nextProps.location.query.id));

			return { query: nextProps.location.query };
		} else return null;
	}

	componentDidUpdate(prevProps, prevState) {
		if (prevState.query !== this.state.query) {
			const results = _.find(data.movies, (e) => e.id === this.state.query.id);
			this.setState({
				movie: results
			});
		}
	}

	componentDidMount() {
		if (!this.state.query) return;
		this.props.dispatch(GET_MOVIE(this.state.query.id));
		const results = _.find(data.movies, (e) => e.id === this.state.query.id);

		this.setState({
			movie: results
		});
	}

	renderCategoryList = () => (
		<Button
			variant='outlined'
			style={{
				marginRight: 20,
				borderRadius: 10,
				border: '2px solid #F44336'
			}}
		>
			<Typography variant='caption' style={{ color: '#F44336' }}>
				{this.props.movie.data[0].genre}
			</Typography>
		</Button>
	);

	renderMovie = () => {
		return (
			<Grid
				container
				style={{
					position: 'relative',
					zIndex: 100,
					minHeight: 'calc(100vh - 50px)',
					padding: '70px 10px 10px 10px',
					width: '100%'
				}}
				spacing={24}
			>
				<Grid item xs={12} sm={4}>
					<Typography gutterBottom variant='h4' style={{ color: '#F44336' }}>
						{this.props.movie.data[0] && this.props.movie.data[0].title}
					</Typography>

					<Chip
						style={{ marginBottom: 10 }}
						label={this.props.movie.data[0] && this.props.movie.data[0].rating}
						color='secondary'
					/>
					<Typography gutterBottom paragraph variant='caption' style={{ color: 'white' }}>
						{this.props.movie.data[0] && this.props.movie.data[0].sinopsis}
					</Typography>
					{this.props.movie.data[0] && this.renderCategoryList()}
				</Grid>
				<Grid
					item
					xs={12}
					sm={8}
					style={{
						borderRadius: 10,
						overflow: 'hidden'
					}}
				>
					<Video video={this.props.movie.data[0] && this.props.movie.data[0].video} />
				</Grid>
			</Grid>
		);
	};

	renderMain = () => {
		if (this.state.renderStatus === 0) {
			return this.renderMovie();
		}
		if (this.state.renderStatus === 1) {
			return <Series />;
		}
		if (this.state.renderStatus === 2) {
			return <Related category={this.props.movie.data[0] && this.props.movie.data[0].genre} />;
		}
	};

	render() {
		console.log(this.props.movie.data[0]);
		const { classes } = this.props;
		if (!this.state.query) return <Redirect to='/' />;
		return (
			<div style={styled.root(this.props.movie.data[0])}>
				<div className={classes.backgroundLinear} />
				<div className={classes.roots}>{this.renderMain()}</div>
				<Grid container style={{ display: 'flex', position: 'relative', zIndex: 200 }}>
					<BottomTab getRenderState={this.getRenderState} />
				</Grid>
			</div>
		);
	}
}

const mapStateToProps = (state) => ({
	movie: state.movieReducer
});

const withConnect = connect(mapStateToProps)(Detail);

export default withStyles(styles)(withConnect);

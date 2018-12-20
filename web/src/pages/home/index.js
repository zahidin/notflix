import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import Jumbotorn from './components/jumbotron';
import CategoryList from './components/category-list/';
import NewReleases from '../../components/horizontal-list';
import Footer from '../../components/footer';
import { styles } from './styles';

class Home extends React.Component {
	state = {
		height: 0,
		imgHeight: 580,
		footerHeight: 0
	};

	componentDidMount() {}

	render() {
		const { classes } = this.props;
		const { height } = this.state;

		return (
			<div>
				<div className={classes.jumbotron}>
					<Jumbotorn />
				</div>
				<div
					className={classes.categories}
					style={{
						top: height
					}}
				>
					<div
						style={{
							display: 'flex',
							padding: '20px',
							justifyContent: 'center',
							alignItems: 'center',
							flexDirection: 'column'
						}}
					>
						<NewReleases title='Popular' data={this.props.popular} type='ALL_POPULARS' />
						<NewReleases title='New Relases' data={this.props.trending} type='ALL_TRENDINGS' />
						<div style={{ width: '100%' }}>
							<CategoryList />
						</div>
					</div>
					<Footer />
				</div>
			</div>
		);
	}
}
const withStylesHome = withStyles(styles)(Home);

const mapStateToProps = (state) => ({
	popular: state.popularReducer,
	trending: state.trendingReducer
});

export default connect(mapStateToProps)(withStylesHome);

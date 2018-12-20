import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Footer from './components/footer';
import Header from './components/header';
import { withRouter } from 'react-router-dom';

import Home from './pages/home/';
import Categories from './pages/categories';
import Detail from './pages/detail';

class App extends React.Component {
	scrollTop = () =>
		window.scrollTo({
			top: 0,
			left: 0,
			behavior: 'smooth'
		});
	render() {
		return (
			<div style={{ width: '100%', overflowX: 'hidden' }}>
				<Header />
				<Switch>
					<Route
						exact
						path='/'
						render={(props) => {
							this.scrollTop();
							return <Home {...props} />;
						}}
					/>
					<Route
						exact
						path='/categories'
						render={(props) => {
							this.scrollTop();
							return <Categories {...props} />;
						}}
					/>
					<Route
						path='/movie/:name'
						render={(props) => {
							this.scrollTop();
							return <Detail {...props} />;
						}}
					/>
				</Switch>
				{this.props.location.pathname === '/' || <Footer />}
			</div>
		);
	}
}

export default withRouter(App);

import React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import InputBase from '@material-ui/core/InputBase';
import Badge from '@material-ui/core/Badge';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import { withStyles } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MailIcon from '@material-ui/icons/Mail';
import NotificationsIcon from '@material-ui/icons/Notifications';
import MoreIcon from '@material-ui/icons/MoreVert';
import Button from '@material-ui/core/Button';
import classNames from 'classnames';
import OnScroll from 'react-on-scroll';
import { Link } from 'react-router-dom';

import { styles } from './styles';

class Header extends React.Component {
	state = {
		anchorEl: null,
		mobileMoreAnchorEl: null,
		position: 'static',
		sticky: false
	};
	setSticky = (sticky) => this.setState({ sticky });

	handleProfileMenuOpen = (event) => {
		this.setState({ anchorEl: event.currentTarget });
	};

	handleMenuClose = () => {
		this.setState({ anchorEl: null });
		this.handleMobileMenuClose();
	};

	handleMobileMenuOpen = (event) => {
		this.setState({ mobileMoreAnchorEl: event.currentTarget });
	};

	handleMobileMenuClose = () => {
		this.setState({ mobileMoreAnchorEl: null });
	};

	renderMenu = (anchorEl, isMenuOpen) => {
		return (
			<Menu
				anchorEl={anchorEl}
				anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
				transformOrigin={{ vertical: 'top', horizontal: 'right' }}
				open={isMenuOpen}
				onClose={this.handleMenuClose}
			>
				<MenuItem onClick={this.handleMenuClose}>Profile</MenuItem>
				<MenuItem onClick={this.handleMenuClose}>My account</MenuItem>
			</Menu>
		);
	};

	renderMobileMenu = (mobileMoreAnchorEl, isMobileMenuOpen) => (
		<Menu
			anchorEl={mobileMoreAnchorEl}
			anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
			transformOrigin={{ vertical: 'top', horizontal: 'right' }}
			open={isMobileMenuOpen}
			onClose={this.handleMobileMenuClose}
		>
			<MenuItem>
				<IconButton color='inherit'>
					<Badge badgeContent={4} color='secondary'>
						<MailIcon />
					</Badge>
				</IconButton>
				<p>Messages</p>
			</MenuItem>
			<MenuItem>
				<IconButton color='inherit'>
					<Badge badgeContent={11} color='secondary'>
						<NotificationsIcon />
					</Badge>
				</IconButton>
				<p>Notifications</p>
			</MenuItem>
			<MenuItem onClick={this.handleProfileMenuOpen}>
				<IconButton color='inherit'>
					<AccountCircle />
				</IconButton>
				<p>Profile</p>
			</MenuItem>
		</Menu>
	);

	render() {
		const { anchorEl, mobileMoreAnchorEl, sticky } = this.state;
		const { classes } = this.props;
		const isMenuOpen = Boolean(anchorEl);
		const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

		return (
			<div className={classes.root}>
				<OnScroll
					className='section'
					triggers={[
						{
							top: 0,
							bottom: -0,
							callback: (visible) => this.setSticky(visible)
						}
					]}
				>
					<AppBar
						position={sticky ? 'static' : 'fixed'}
						style={{ backgroundColor: '#14141488' }}
					>
						<Toolbar>
							<IconButton
								className={classes.menuButton}
								color='inherit'
								aria-label='Open drawer'
							>
								<MenuIcon />
							</IconButton>
							<Link to='/'>
								<Button
									variant='contained'
									color='primary'
									className={classNames(classes.left)}
								>
									NOTFLIX
								</Button>
							</Link>
							<Link to='/categories'>
								<Button
									variant='contained'
									color='primary'
									className={classNames(classes.sectionDesktop)}
								>
									Categories
								</Button>
							</Link>
							<div className={classes.search}>
								<div className={classes.searchIcon}>
									<SearchIcon />
								</div>
								<InputBase
									placeholder='Search…'
									classes={{
										root: classes.inputRoot,
										input: classes.inputInput
									}}
								/>
							</div>
							<div className={classes.grow} />
							<div className={classes.sectionDesktop}>
								<IconButton color='inherit'>
									<Badge badgeContent={4} color='secondary'>
										<MailIcon />
									</Badge>
								</IconButton>
								<IconButton color='inherit'>
									<Badge badgeContent={17} color='secondary'>
										<NotificationsIcon />
									</Badge>
								</IconButton>
								<IconButton
									aria-owns={isMenuOpen ? 'material-appbar' : undefined}
									aria-haspopup='true'
									onClick={this.handleProfileMenuOpen}
									color='inherit'
								>
									<AccountCircle />
								</IconButton>
							</div>
							<div className={classes.sectionMobile}>
								<IconButton
									aria-haspopup='true'
									onClick={this.handleMobileMenuOpen}
									color='inherit'
								>
									<MoreIcon />
								</IconButton>
							</div>
						</Toolbar>
					</AppBar>
					{this.renderMenu(anchorEl, isMenuOpen)}
					{this.renderMobileMenu(mobileMoreAnchorEl, isMobileMenuOpen)}
				</OnScroll>
			</div>
		);
	}
}

Header.propTypes = {
	classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Header);

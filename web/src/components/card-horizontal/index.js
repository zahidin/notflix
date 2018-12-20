import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import classnames from 'classnames';
import CardHeader from '@material-ui/core/CardHeader';
import CardActions from '@material-ui/core/CardActions';
import Grow from '@material-ui/core/Grow';
import Chip from '@material-ui/core/Chip';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { Link } from 'react-router-dom';

import { styles } from './styles';
class CardHorizontal extends React.Component {
	state = { expanded: false };

	handleExpandClick = () => {
		this.setState((state) => ({ expanded: !state.expanded }));
	};

	closeExpand = () =>
		this.setState({
			expanded: false
		});

	openExpand = () =>
		this.setState({
			expanded: true
		});

	renderBackgroundLinear = () => (
		<div
			style={{
				position: 'absolute',
				background: 'linear-gradient(to left, #F4433622, #1E1E1E88)',
				top: 0,
				left: 0,
				bottom: 9,
				right: 0
			}}
		/>
	);

	render() {
		const { classes, item } = this.props;
		const title = item.title.replace(/\s+/g, '').toLowerCase();
		return (
			<div
				className={classes.card}
				style={{
					backgroundImage: `url(${item.image})`,
					backgroundSize: 'cover',
					backgroundPosition: 'center',
					display: 'relative',
					position: 'relative'
				}}
				onMouseEnter={this.openExpand}
				onMouseLeave={this.closeExpand}
				key={item.id}
			>
				<div style={{ position: 'relative' }}>
					<CardHeader
						color='secondary'
						title={
							<Typography variant='subtitle1' style={{ color: 'white' }}>
								{item.title}
							</Typography>
						}
						subheader={<Chip variant='outlined' color='secondary' label={item.rating} />}
						className={classes.header}
					/>

					<CardActions className={classes.actions} disableActionSpacing>
						<Chip label={item.genre} className={classes.avatar} />
						<IconButton
							className={classnames(classes.expand, {
								[classes.expandOpen]: this.state.expanded
							})}
							onClick={this.handleExpandClick}
							aria-expanded={this.state.expanded}
							aria-label='Show more'
							color='secondary'
						>
							<ExpandMoreIcon />
						</IconButton>
					</CardActions>
					<Grow
						in={this.state.expanded}
						timeout='auto'
						unmountOnExit
						style={{
							minWidth: '100%',
							top: 50,
							bottom: 50,
							position: 'absolute'
						}}
					>
						<div
							style={{
								background: '#0A0B0A88',
								width: '100%',
								display: 'flex',
								justifyContent: 'center',
								alignItems: 'center',
								height: '100px'
							}}
						>
							<Link
								to={{
									pathname: `/movie/${title}`,
									query: {
										title: item.title,
										id: item.id
									}
								}}
							>
								<Button color='secondary' variant='contained'>
									<Icon>play_arrow</Icon>
								</Button>
							</Link>
						</div>
					</Grow>
				</div>
			</div>
		);
	}
}

CardHorizontal.propTypes = {
	classes: PropTypes.object.isRequired
};

export default withStyles(styles)(CardHorizontal);

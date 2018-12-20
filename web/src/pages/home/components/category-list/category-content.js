import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import CardContent from '@material-ui/core/CardContent';

import { styles } from './category-content-styles';
import CardList from '../../../../components/cardlist';
import Title from '../../../../components/title/';

class CategoryContent extends React.Component {
	render() {
		const { data, classes, categories } = this.props;
		const valiData = data.length ? data : [];
		return (
			<CardContent>
				<Title variant='subtitle1' noLeft={true}>
					{categories.name}
				</Title>
				<div className={classes.item} style={{ gridGap: 6 }}>
					{valiData.map((item, key) => <CardList item={item} key={key} />)}
				</div>
			</CardContent>
		);
	}
}

export default withStyles(styles)(CategoryContent);

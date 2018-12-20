import React from 'react';

class Video extends React.Component {
	render() {
		return (
			<iframe
				title='video'
				width='100%'
				height='100%'
				src={this.props.video}
				style={{ boxShadow: 'inset 0px 0px 300px 0px rgba(0,0,0,0.75)' }}
				frameBorder='0'
				allow='accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture'
				allowFullScreen={false}
			/>
		);
	}
}

export default Video;

import React, { Component } from 'react'
import { View, Text, Image } from 'react-native'
import { Container, Header, Content, Left, Body, Icon, List, ListItem, Thumbnail, H1, H3, Footer, FooterTab, Button } from 'native-base'

import { connect } from 'react-redux'
import { allMovies } from '../actions'

class CategoriesPage extends Component {
    async componentDidMount() {
        await this.props.dispatch(allMovies())
    }

    render() {
        return(
            <Container>
                <Header noShadow style={{backgroundColor: '#0C0C0C'}}>
                    <Left>
                        <Icon name="menu" style={{color: '#fff'}} />
                    </Left>
                    <Body>
                        <Image source={require('../images/notflixw.png')} style={{width: 150, height: 50}} />
                    </Body>
                </Header>
                <Content style={{backgroundColor: '#0C0C0C'}}>
                    <List style={{marginBottom: 25}}>
                        <ListItem>
                            <Left>
                                <Icon name="arrow-back" style={{color: '#fff'}} />
                            </Left>
                            <Body>
                                <H3 style={{color: '#fff'}}>Action</H3>
                            </Body>
                        </ListItem>
                    </List>
                    <List>
                        {/* <ListItem thumbnail>
                            <Left>
                                <Thumbnail square source={require('../images/aquaman7.jpg')} style={{height: 100, width: 75}} />
                            </Left>
                            <Body>
                                <Text style={{color: '#fff'}}>Aquaman</Text>
                                <Text note style={{color: '#fff'}}>2018 | 120 minute | 13+</Text>
                                <Icon name="star" style={{color: '#fff', fontSize: 16}} />
                            </Body>
                        </ListItem> */}
                        {this.props.movies.results.map((item, index)=>(
                            <ListItem thumbnail key={index}>
                                <Left>
                                    <Image source={{uri: 'https://m.media-amazon.com/images/S/aplus-media/vc/a8cfa74c-c5c5-4eb1-a23b-0a5a786542a4.png'}} style={{width: 100, height: 50}} />
                                </Left>
                                <Body>
                                    <Text style={{color: '#fff'}}>{item.name}</Text>
                                    <Text note style={{color: '#fff'}}>{item.release} | {item.lenght} | {item.age}</Text>
                                    <Icon name="star" style={{color: '#fff'}} />
                                </Body>
                            </ListItem>
                        ))}
                    </List>
                </Content>
                <Footer>
                    <FooterTab style={{backgroundColor: '#0C0C0C'}}>
                        <Button active style={{backgroundColor: '#0C0C0C'}} >
                            <Icon active style={{color: '#d63031'}} name="home" />
                        </Button>
                        <Button>
                            <Icon name="search" />
                        </Button>
                        <Button>
                            <Icon name="heart" />
                        </Button>
                        <Button onPress={()=> this.props.navigation.navigate('UserPage')}>
                            <Icon name="person" />
                        </Button>
                    </FooterTab>
                </Footer>
            </Container>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        movies: state.moviesReducer
    }
}

export default connect(mapStateToProps)(CategoriesPage);
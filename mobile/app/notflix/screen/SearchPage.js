import React, { Component } from 'react';
import { View, Text, FlatList, Image } from 'react-native'
import { Container, Header, Content, Footer, FooterTab, Button, Icon, Item, Input, Right, Left, Body, H1, List, ListItem } from 'native-base';

import { connect } from 'react-redux'
import { allMovies } from '../actions'

class SearchPage extends Component {

  async componentDidMount() {
    await this.props.dispatch(allMovies())
  }

  render() {
    return (
      <Container style={{backgroundColor: '#0c0c0c'}}>
        <H1 style={{color: '#fff', marginLeft: 10, marginBottom: 10}}>Search</H1>
        <Header searchBar rounded style={{backgroundColor: '#0c0c0c'}}>
          <Item style={{borderRadius: 25}}>
            <Icon name="search" />
            <Input placeholder="Search" />
            <Icon name="close-circle" />
          </Item>
          <Button transparent>
            <Text>Search</Text>
          </Button>
        </Header>
        <Content padder style={{backgroundColor: '#0c0c0c'}}>
        <View>
          <Right>
            <Text note style={{color: '#fff'}}>Result (34)</Text>
          </Right>
        </View>

        <Text style={{color: '#fff', fontSize: 21, marginTop: 25}}>Movies</Text>

        <List>
        {this.props.movies.results.map((item, index)=>(
                            <ListItem thumbnail key={index}>
                                <Left>
                                    <Image source={{uri: 'https://m.media-amazon.com/images/S/aplus-media/vc/a8cfa74c-c5c5-4eb1-a23b-0a5a786542a4.png'}} style={{width: 100, height: 50}} />
                                </Left>
                                <Body>
                                    <Text style={{color: '#fff'}}>{item.name}</Text>
                                    <Text note style={{color: '#fff'}}>{item.realese} | {item.lenght} | {item.age}</Text>
                                    <Icon name="star" style={{color: '#fff'}} />
                                </Body>
                            </ListItem>
                        ))}
        </List>


        </Content>
        <Footer style={{backgroundColor: '#0C0C0C'}}>
          <FooterTab style={{backgroundColor: '#0C0C0C'}}>
            <Button>
              <Icon name="home" />
            </Button>
            <Button active style={{backgroundColor: "#0c0c0c"}}>
              <Icon active name="search" style={{color: '#ff3838'}} />
            </Button>
            <Button >
              <Icon name="heart" />
            </Button>
            <Button>
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

export default connect(mapStateToProps)(SearchPage);
import React, {Component} from "react";
import {Animated, Dimensions, Platform, Text, View, ImageBackground} from 'react-native';
import {Body, Header, List, ListItem , ScrollableTab, Tab, Tabs, Title, Icon, Left, Right, Thumbnail, H1, Footer, FooterTab, Button, Container, Content, Switch} from "native-base";

import { connect } from 'react-redux'
import { allMovies,newRelease } from '../actions'

const NAVBAR_HEIGHT = 56;
const {width: SCREEN_WIDTH} = Dimensions.get("window");
const COLOR = "#0C0C0C";
const TAB_PROPS = {
  tabStyle: {width: SCREEN_WIDTH / 2, backgroundColor: COLOR},
  activeTabStyle: {width: SCREEN_WIDTH / 2, backgroundColor: COLOR},
  textStyle: {color: "white"},
  activeTextStyle: {color: "white"}
};

class UserPage extends Component {
   componentDidMount() {
   this.props.dispatch(allMovies());
  }
  
  scroll = new Animated.Value(0);
  headerY;

  constructor(props) {
    super(props);
    this.headerY = Animated.multiply(Animated.diffClamp(this.scroll, 0, NAVBAR_HEIGHT), -1);
  }

  render() {
    const bookmarkTab = (
      <List style={{backgroundColor: '#0C0C0C'}}>
        {this.props.allmovies.results.map((item, index)=>(
            <ListItem thumbnail key={index}>
              <Left>
                <Thumbnail square source={require('../images/aquaman7.png')} style={{width: 50, height: 75}} />
              </Left>
              <Body>
                <Text style={{color: '#fff'}}>{item.title}</Text>
                <Text note style={{color: '#fff'}}>{item.title} | {item.title} | {item.title}</Text>
                <Icon name="star" style={{color: '#fff'}} />
              </Body>
            </ListItem>
          ))}
      </List>);

    const accountTab = (
      <List style={{backgroundColor: '#0C0C0C'}}>
        <ListItem style={{marginBottom: 25}}>
          <Body>
            <H1 style={{color: '#fff'}}>User_Name</H1>
            <Text note style={{color: '#fff'}}>email@user.com</Text>
          </Body>
        </ListItem>
        <ListItem>
          <Left>
            <Icon name="unlock" style={{color: '#fff'}} />
            <Text note style={{color: '#fff'}}>Change Password</Text>
          </Left>
          <Right>
            <Icon name="ios-arrow-forward" style={{color: '#fff'}} />
          </Right>
        </ListItem>
        <ListItem>
          <Left>
            <Icon name="notifications" style={{color: '#fff'}} />
            <Text note style={{color: '#fff'}}>Notifications</Text>
          </Left>
          <Right>
            <Switch value={true} />
          </Right>
        </ListItem>
        <ListItem>
          <Left>
            <Icon name="information-circle" style={{color: '#fff'}} />
            <Text note style={{color: '#fff'}}>About App</Text>
          </Left>
          <Right>
            <Icon name="ios-arrow-forward" style={{color: '#fff'}} />
          </Right>
        </ListItem>
        <ListItem>
          <Left>
            <Icon name="log-out" style={{color: '#fff'}} />
            <Text note style={{color: '#fff'}}>Sign Out</Text>
          </Left>
          <Right>
            <Icon name="ios-arrow-forward" style={{color: '#fff'}} />
          </Right>
        </ListItem>
      </List>
    );

    const tabY = Animated.add(this.scroll, this.headerY);

    return (
      <Container style={{backgroundColor: '#0C0C0C'}}>
      <View>
        {Platform.OS === "ios" &&
        <View style={{backgroundColor: COLOR, height: 20, width: "100%", position: "absolute", zIndex: 2}}/>}
        <Animated.View style={{
          width: "100%",
          position: "absolute",
          transform: [{
            translateY: this.headerY
          }],
          elevation: 0,
          flex: 1,
          zIndex: 1,
          backgroundColor: COLOR
        }}>
          <Header style={{backgroundColor: "#0C0C0C"}} hasTabs>
            <Left><Icon name="menu" style={{color: "#fff"}} /></Left>
            <Body>
                <Title> <Text style={{color: "white"}}>Profile</Text> </Title>
            </Body>
          </Header>
        </Animated.View>
        <Animated.ScrollView
          scrollEventThrottle={1}
          bounces={false}
          showsVerticalScrollIndicator={false}
          style={{zIndex: 0, height: "100%", elevation: -1}}
          contentContainerStyle={{paddingTop: NAVBAR_HEIGHT}}
          onScroll={Animated.event(
            [{nativeEvent: {contentOffset: {y: this.scroll}}}],
            {useNativeDriver: true},
          )}
          overScrollMode="never">
          <Tabs renderTabBar={(props) => <Animated.View
            style={[{
              transform: [{translateY: tabY}],
              zIndex: 1,
              width: "100%",
              backgroundColor: COLOR
            }, Platform.OS === "ios" ? {paddingTop: 20} : null]}>
            <ScrollableTab {...props} underlineStyle={{backgroundColor: "white"}}/>
          </Animated.View>
          }>
            <Tab style={{backgroundColor: '#0c0c0c'}} heading="Subscribe" Icon="bookmark" {...TAB_PROPS}>
              {bookmarkTab}
            </Tab>
            <Tab style={{backgroundColor: '#0c0c0c'}} heading="Account" {...TAB_PROPS}>
              {accountTab}
            </Tab>
          </Tabs>
        </Animated.ScrollView>
      </View>
      </Container>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    allmovies: state.moviesReducer
  }
}

export default connect(mapStateToProps)(UserPage);

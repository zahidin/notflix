import React, { Component } from 'react';
import {
  Animated,
  Platform,
  StatusBar,
  StyleSheet,
  Text,
  View,
  ScrollView,
  RefreshControl,
  Image,
  ImageBackground,
  FlatList
} from 'react-native';
import { Col, Row, Grid } from "react-native-easy-grid";
import { Right,List, ListItem, Thumbnail,  Left, Body, Content, Footer, FooterTab,Icon,Button,StyleProvider, ScrollableTab, Tab, TabHeading, Tabs, Title} from "native-base"
import StarRating from 'react-native-star-rating'
import IconM from 'react-native-vector-icons/MaterialCommunityIcons'
import getTheme from '../../../native-base-theme/components';
import custom from '../../../native-base-theme/variables/platform';
import { connect } from 'react-redux'
import { GET_CATEGORY,GET_MOVIE } from '../actions'
const HEADER_MAX_HEIGHT = 300;
const HEADER_MIN_HEIGHT = Platform.OS === 'ios' ? 60 : 73;
const HEADER_SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT;

 class MoviePage extends Component {
 
  constructor(props) {
    super(props);

    this.state = {
      scrollY: new Animated.Value(
        // iOS has negative initial scroll value because content inset...
        Platform.OS === 'ios' ? -HEADER_MAX_HEIGHT : 0,
      ),
      refreshing: false,
      idmovie : this.props.navigation.getParam('id', 'ID TIDAK ADA'),
      genrename : this.props.navigation.getParam('genre', 'GENRE TIDAK ADA')
    };
  }
  componentDidMount() {
    this.props.dispatch(GET_CATEGORY(this.state.genrename))
    this.props.dispatch(GET_MOVIE(this.state.idmovie))
  }
  _renderScrollViewContent() {
    const data = Array.from({ length: 30 });
    return (
      <View>
        {data.map((_, i) => (
          <View key={i} style={styles.row}>
            <Text>{i}</Text>
          </View>
        ))}
      </View>
    );
  }

  render() {
    
    
    // Because of content inset the scroll value will be negative on iOS so bring
    // it back to 0.
    const scrollY = Animated.add(
      this.state.scrollY,
      Platform.OS === 'ios' ? HEADER_MAX_HEIGHT : 0,
    );
    const headerTranslate = scrollY.interpolate({
      inputRange: [0, HEADER_SCROLL_DISTANCE],
      outputRange: [0, -HEADER_SCROLL_DISTANCE],
      extrapolate: 'clamp',
    });

    const imageOpacity = scrollY.interpolate({
      inputRange: [0, HEADER_SCROLL_DISTANCE / 2, HEADER_SCROLL_DISTANCE],
      outputRange: [1, 1, 0],
      extrapolate: 'clamp',
    });
  
    const imageTranslate = scrollY.interpolate({
      inputRange: [0, HEADER_SCROLL_DISTANCE],
      outputRange: [0, 100],
      extrapolate: 'clamp',
    });
   
    const titleScale = scrollY.interpolate({
      inputRange: [0, HEADER_SCROLL_DISTANCE / 2, HEADER_SCROLL_DISTANCE],
      outputRange: [1, 1, 1],
      extrapolate: 'clamp',
    });
    const tabScale = scrollY.interpolate({
      inputRange: [0, HEADER_SCROLL_DISTANCE / 2, HEADER_SCROLL_DISTANCE],
      outputRange: [1, 1, 1],
      extrapolate: 'clamp',
    });
    const tabTranslate = scrollY.interpolate({
      inputRange: [0, HEADER_SCROLL_DISTANCE / 2, HEADER_SCROLL_DISTANCE],
      outputRange: [0, 0, -8],
      extrapolate: 'clamp',
    });
    const titleTranslate = scrollY.interpolate({
      inputRange: [0, HEADER_SCROLL_DISTANCE / 2, HEADER_SCROLL_DISTANCE],
      outputRange: [0, 0, -8],
      extrapolate: 'clamp',
    });
  //  alert(JSON.stringify(this.props.getmovie.isLoading))
    return (
      <StyleProvider style={getTheme(custom)}>
      <View style={{backgroundColor: '#0C0C0C', flex:1}}>
        <StatusBar
          translucent
          barStyle="light-content"
          backgroundColor="rgba(0, 0, 0, 0.251)"
        />
        
        <Animated.ScrollView
          style={styles.fill}
          
          scrollEventThrottle={1}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { y: this.state.scrollY } } }],
            { useNativeDriver: true },
          )}
          
          refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={() => {
                this.setState({ refreshing: true });
                setTimeout(() => this.setState({ refreshing: false }), 1000);
              }}
              // Android offset for RefreshControl
              progressViewOffset={HEADER_MAX_HEIGHT}
            />
          }
          // iOS offset for RefreshControl
          contentInset={{
            top: HEADER_MAX_HEIGHT,
          }}
          contentOffset={{
            y: -HEADER_MAX_HEIGHT,
          }}
        >
         
         <Animated.View
          style={[
          
            {
              transform: [
                { scale: tabScale },
                { translateY: tabTranslate },
              ],
            },
          ]}
        >
          <View style={styles.scrollViewContent}>     
            <Content padder>
            <Tabs locked = {true} >
          <Tab style={{backgroundColor:'transparent'}} tab heading={ <TabHeading ><Text style={{color:'#F1F1F1'}}>Episodes</Text></TabHeading>}>
         
      
          
          <List>
            <ListItem style={{borderBottomWidth:0, marginLeft:0}}>
            <Left>
               <Image 
               source={require('../images/venomtrailer.jpg')}
               style={{
                 flex:1, width: 80, height: 80, resizeMode: 'cover',borderRadius:10
               }}
               />
            </Left>
              <Body style={{marginLeft:10}}>
                <Text style={{color:'#F1F1F1', fontWeight:'bold'}}>MOVIE</Text>
                <Text style={{color:'#F1F1F1'}}>{this.props.getmovie.isLoading ? 'Loading'  : this.props.getmovie.data[0].title} (2018)</Text>
                <Text style={{color:'#F1F1F1'}}>1h 52min</Text>
              </Body>
              <Right>
                <Button transparent>
                  <IconM name="eye" style={{color:'#F1F1F1'}} size={20} />
                </Button>
              </Right>
            </ListItem>
          </List>
       
          </Tab>
          <Tab style={{backgroundColor:'transparent'}}  heading={ <TabHeading><Text style={{color:'#F1F1F1'}}>Info</Text></TabHeading>}>
          <Content padder>
          <Grid>
            <Row>
               <Text style={{fontFamily:'Roboto', color:'#F1F1F1',fontSize:20 , fontWeight:'bold', marginBottom:5}}>Character</Text>
               </Row>
               <Row>
              <Col style={{flex:1}}>
               <Text style={{fontFamily:'Roboto', color:'#F1F1F1',fontSize:17 , fontWeight:'bold'}}>Creator</Text>
               </Col>
               <Col style={{flex:3}}> 
              <Text style={{textDecorationLine: 'underline',fontWeight: 'normal', marginLeft:0, color:'#F1F1F1',fontSize:15 ,fontFamily:'Roboto',}}>
              {this.props.getmovie.isLoading ? 'Loading'  : this.props.getmovie.data[0].director}
               </Text>
               </Col>
               </Row>
               <Row>
              <Col style={{flex:1}}>
              <Text style={{fontFamily:'Roboto', color:'#F1F1F1',fontSize:17 , fontWeight:'bold'}}>Cast</Text>
               </Col>
               <Col style={{flex:3}}> 
              <Text style={{textDecorationLine: 'underline',fontWeight: 'normal', marginLeft:0, color:'#F1F1F1',fontSize:15 ,fontFamily:'Roboto',}}>
              {this.props.getmovie.isLoading ? 'Loading'  : this.props.getmovie.data[0].stars} 
               </Text>
               </Col>
               </Row>
               <Row>
               <Text style={{fontFamily:'Roboto', color:'#F1F1F1',fontSize:20 , fontWeight:'bold', marginBottom:8, marginTop:8}}>Storyline</Text>
               </Row>
               <Row>
               <Text style={{ marginLeft:0, color:'#F1F1F1',fontSize:15 ,fontFamily:'Roboto',}}>
               {this.props.getmovie.isLoading ? 'Loading'  : this.props.getmovie.data[0].sinopsis} 
               </Text>
               </Row>
               <Row>
               <Text style={{fontFamily:'Roboto', color:'#F1F1F1',fontSize:21 , fontWeight:'bold', marginBottom:8, marginTop:8}}>MORE LIKE THIS</Text>
               </Row>
              <Row>
              <ScrollView scrollEventThrottle = {10}>
              <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>

{this.props.getcate.results.map((item, index) => (


<View key={index} style={{height: 200, width: 130, marginLeft: 20, marginBottom: 15,marginTop: 10, borderWidth: 1, borderColor: '#0C0C0C', shadowColor:'#000', shadowOffset: {width: 1, height: 1}, shadowRadius: 10,shadowOpacity: 1.0 }}>
<View style={{flex: 2, borderRadius:5}} >
<Image 
 source={{uri:item.image}}
style={{
 flex:1, width: null, height: null, resizeMode: 'cover',borderRadius:20
}}
/>
</View>
<View style={{justifyContent:"center",alignItems:"center",paddingTop:0}}>
<Text style={{color:'#F3F3F3',fontFamily:"Avenir"}}>{item.title}</Text>
</View>

</View>
 

))}
</ScrollView>
</ScrollView>
              </Row>
               </Grid>
          </Content>
          </Tab>
        </Tabs>
               
            </Content>
            
      </View>
      </Animated.View>
        </Animated.ScrollView>
        
        <Animated.View
          pointerEvents="none"
          style={[
            styles.header,
            { transform: [{ translateY: headerTranslate }] },
          ]}
        >
          <Animated.Image
            style={[
              styles.backgroundImage,
              {
                opacity: imageOpacity,
                transform: [{ translateY: imageTranslate }],
              },
            ]}
            source={require('../images/venom.jpg')}
          />
          <Animated.View
          style={[
            styles.bartwo,
            {
              opacity: imageOpacity,
                transform: [{ translateY: imageTranslate }
              ],
            },
          ]}
        >
      
        <Grid>
       
          <Col style={{left: 20,flex:1, width:150, height:120}}>
          <Row style={{alignItems:'flex-start'}}>
          <Image style={{width:60 , height: 60}} source={require('../images/notflix.png')} />
          </Row>
          <Row>
          <Text style={{color:'#FDFEFD',fontWeight:"bold", fontFamily:'Avenir', fontSize:27}}>
          {this.props.getmovie.isLoading ? 'Loading'  : this.props.getmovie.data[0].title}
          </Text>
          </Row>
          <Row>
          <Text style={{color:'#BEBEBE', fontFamily:'Avenir', fontSize:15}}>
            2018 | 18+ | 1h51m
          </Text>
          
          </Row>
          <Row>
            <Col style={{flex:1, marginTop:5}}>
          <StarRating 
                      disabled= {true}
                      maxStars= {5}
                      rating= {4.5}
                      starSize= {12}
                      fullStarColor= '#E8E8E7'
                      emptyStarColor='#47464A'
                    />
                    </Col>
                    <Col style={{flex:3, marginLeft:10}}>
          <Text style={{color:'#BEBEBE', fontFamily:'Avenir', fontSize:18}}>
            9.1
          </Text>
          </Col>
          </Row>

          </Col>
         
          </Grid>
         
        </Animated.View>
      
        </Animated.View>
        
        <Animated.View
          style={[
            styles.bar,
            {
              transform: [
                { scale: titleScale },
                { translateY: titleTranslate },
              ],
            },
          ]}
        >
        <Grid>
          <Col style={{left: 2}}>
          <View style={{alignItems:"flex-start",marginLeft: 10}}>
          <Icon onPress={() => this.props.navigation.goBack()} style={{color:'#BEBEBC'}} name="ios-arrow-back" />
          </View>
          </Col>
          <Col />
          <Col style={{right: 2}}>
          <View style={{alignItems:"flex-end",marginRight: 10}}>
          <IconM style={{color:'#F2F3F2'}} size={25} name="heart-outline" />
          </View>
          </Col>
         
        
          </Grid>
        </Animated.View>
        <Footer>
          <FooterTab style={{backgroundColor:'#0C0C0C'}}>
            <Button>
              <Icon style={{color:'#D71A18'}} name="home" />
            </Button>
            <Button>
              <Icon style={{color:'#A5A5A5'}} name="search" />
            </Button>
            <Button>
              <Icon style={{color:'#A5A5A5'}} active name="heart" />
            </Button>
            <Button>
              <Icon style={{color:'#A5A5A5'}} name="person" />
            </Button>
          </FooterTab>
        </Footer>
      </View>
      </StyleProvider>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    getcate: state.getCategoriesreducers,
    getmovie: state.moviesReducer
 
  }
}

export default connect(mapStateToProps)(MoviePage);

const styles = StyleSheet.create({
  fill: {
    flex: 1,
  },
  content: {
    flex: 1,
  },
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: '#000',
    overflow: 'hidden',
    height: HEADER_MAX_HEIGHT,
  },
  backgroundImage: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    width: null,
    height: HEADER_MAX_HEIGHT,
    resizeMode: 'cover',
  },
  bar: {
    backgroundColor: 'transparent',
    marginTop: Platform.OS === 'ios' ? 28 : 38,
    height: 72,
    justifyContent: 'center',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
  },
  bartwo: {
    backgroundColor: 'transparent',
    marginTop: Platform.OS === 'ios' ? 28 : 160,
    height: 150,
    justifyContent: 'center',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
  },
  title: {
    color: 'white',
    fontSize: 18,
  },
  scrollViewContent: {
    // iOS uses content inset, which acts like padding.
    paddingTop: Platform.OS !== 'ios' ? HEADER_MAX_HEIGHT : 0,
  },
  row: {
    height: 140,
    margin: 16,
    backgroundColor: 'transparent'
  },
});
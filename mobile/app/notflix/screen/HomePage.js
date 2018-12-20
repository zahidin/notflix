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
  TouchableHighlight,
  ImageBackground,
} from 'react-native';
import { Col, Row, Grid } from "react-native-easy-grid";
import { Right, Content, Footer, FooterTab,Icon,Button } from 'native-base'
import { connect } from 'react-redux'
import { newRelease, mostRated } from '../actions'
import StarRating from 'react-native-star-rating'

const HEADER_MAX_HEIGHT = 300;
const HEADER_MIN_HEIGHT = Platform.OS === 'ios' ? 60 : 73;
const HEADER_SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT;

 class HomePage extends Component {
  componentDidMount() {
    this.props.dispatch(newRelease())
    this.props.dispatch(mostRated())
  }
  constructor(props) {
    super(props);

    this.state = {
      scrollY: new Animated.Value(
        // iOS has negative initial scroll value because content inset...
        Platform.OS === 'ios' ? -HEADER_MAX_HEIGHT : 0,
      ),
      refreshing: false,
    };
  }

  _renderScrollViewContent() {
    const data = Array.from({ length: 30 });
    return (
      <View style={styles.scrollViewContent}>
        {data.map((_, i) => (
          <View key={i} style={styles.row}>
            <Text>{i}</Text>
          </View>
        ))}
      </View>
    );
  }
  
  gotoMovie(id,genre) {
    this.props.navigation.navigate('MoviePage', {id, genre})
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
    const titleTranslate = scrollY.interpolate({
      inputRange: [0, HEADER_SCROLL_DISTANCE / 2, HEADER_SCROLL_DISTANCE],
      outputRange: [0, 0, -8],
      extrapolate: 'clamp',
    });
   

    return (
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
          {/* {this._renderScrollViewContent()} */}
       
          <View style={styles.scrollViewContent}>     
            <Content padder>
              <ScrollView scrollEventThrottle = {10}>
              <View style={{flex: 1, backgroundColor: 'transparent'}}>
                <Text style={{color:'#F3F3F3', fontFamily: 'Avenir', fontSize:15}}>Trending</Text>
                
              {
                this.props.newrelease.isLoading? (
                  <Text>LOADING</Text>
                ):(
                  <ScrollView   horizontal={true} showsHorizontalScrollIndicator={false}>
                {this.props.newrelease.results.map((item) => (
                  
                  <TouchableHighlight key={item.id} onPress={ () => {this.gotoMovie(item.id, item.genre)}}>
                <View style={{height: 200, width: 130, marginLeft: 20, marginBottom: 15,marginTop: 10, borderWidth: 1, borderColor: '#0C0C0C', shadowColor:'#000', shadowOffset: {width: 1, height: 1}, shadowRadius: 10,shadowOpacity: 1.0 }}>
            
            <View  style={{flex: 2, borderRadius:5}} >
            
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
                 </TouchableHighlight>
       
          ))}
           </ScrollView>
          )
          }
            
             
                </View>
              </ScrollView>

              <ScrollView scrollEventThrottle = {10}>
              <View style={{flex: 1, backgroundColor: 'transparent'}}>
                <Text style={{color:'#F3F3F3', fontFamily: 'Avenir', fontSize:15}}>Most Rating</Text>
                <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>

                {this.props.mostpopular.results.map((item) => (

                <TouchableHighlight key={item.id} onPress={ () => {this.gotoMovie(item.id, item.genre)}}>
                <View  style={{height: 200, width: 130, marginLeft: 20, marginBottom: 15,marginTop: 10, borderWidth: 1, borderColor: '#0C0C0C', shadowColor:'#000', shadowOffset: {width: 1, height: 1}, shadowRadius: 10,shadowOpacity: 1.0 }}>
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
            </TouchableHighlight>
       
          ))}
             </ScrollView>
             
                </View>
              </ScrollView>
               
            </Content>
            
      </View>
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
            source={require('../images/aquaman7.png')}
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
       
          <Col style={{left: 5, width:150}}>
          <Row>
          <Text style={{color:'#FDFEFD',fontWeight:"bold", fontFamily:'Avenir', fontSize:30}}>
            AQUAMAN
          </Text>
          </Row>
          <Row>
          <Text style={{color:'#BEBEBE', fontFamily:'Avenir', fontSize:15}}>
            2018 | 18+ | 1h51m
          </Text>
          
          </Row>

          </Col>
          <Col style={{borderRightWidth:1, borderRightColor:'#BBBBBC'}} />
          <Col style={{alignContent: "center", alignItems:"center",justifyContent:"center"}}>
          <Row >
          <Text style={{color:'#FDFEFD', fontFamily:'Avenir', fontSize:30}}>
            9.5
          </Text>
  
          </Row>
          <Row>
         
          <StarRating 
                      disabled= {true}
                      maxStars= {5}
                      rating= {4.5}
                      starSize= {20}
                      fullStarColor= '#F3F3F3'
                      emptyStarColor='#505050'
                    />
          
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
          <View style={{alignItems:"flex-start"}}>
         
          <Image style={{ marginLeft:0, left:10, marginStart:0,height: 30, width:30}} source={require('../images/Home.png')} />
          </View>
          </Col>
          <Col style={{marginTop:-40}}>
          <View style={{ alignItems:"center"}}>
          <Image style={{width: 120 , height: 120}} source={require('../images/notflix.png')} />
          </View>
          </Col>
          <Col />
        
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
    );
  }
}
const mapStateToProps = (state) => {
  return {
    newrelease: state.categoryReducer,
    mostpopular : state.popularReducers
  }
}

export default connect(mapStateToProps)(HomePage);

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
    marginTop: Platform.OS === 'ios' ? 28 : 225,
    height: 80,
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
    height: 40,
    margin: 16,
  },
});
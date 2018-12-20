import React, { Component } from 'react';
import {
  StatusBar,
  Image,
  Dimensions,
  ScrollView
} from 'react-native';
import IconM from 'react-native-vector-icons/MaterialCommunityIcons'
import { Container, Header,View,Left, Content, Footer,Text, FooterTab, Button, StyleProvider ,Icon } from 'native-base';
import getTheme from '../../../native-base-theme/components';
import custom from '../../../native-base-theme/variables/platform';



export default class CastPage extends Component {
  render() {
    return (
      <StyleProvider style={getTheme(custom)}>
      <Container>
   <StatusBar
     backgroundColor="#000"
     barStyle="light-content"
   />
        <Header style={{backgroundColor:'#000'}}>
        
          <Left style={{flex:1}}>
            <Button transparent>
            <Icon style={{color:'#BEBEBC'}} name="ios-arrow-back" />
            </Button>
          </Left>
        </Header>
        <Content style={{backgroundColor:'#000'}}>
        <View style={{alignItems: 'center', top:0}}>
            <Text style={{fontFamily:'monospace', fontSize:23, color:'#b01d1d'}}>CAST</Text>
        </View>
       
        <ScrollView
          scrollEventThrottle = {10}
        >
         <View style={{flex: 1, backgroundColor: '#000', paddingTop: 5}}>
     
           <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
           <View style={{height: 130, width: 130, marginLeft: 20, marginBottom: 15,marginTop: 0, borderWidth: 0.5, borderColor: '#000', shadowColor:'#000', shadowOffset: {width: 1, height: 1}, shadowRadius: 10,shadowOpacity: 1.0 }}>
            <View style={{flex: 2}} >
               <Image 
               source={require('../images/cast1.jpg')}
               style={{
                 flex:1, width: null, height: null, resizeMode: 'cover',borderRadius:130
               }}
               />
            </View>
           
            </View>
            <View style={{height: 130, width: 130, marginLeft: 20, marginBottom: 15,marginTop: 0, borderWidth: 0.5, borderColor: '#000', shadowColor:'#000', shadowOffset: {width: 1, height: 1}, shadowRadius: 10,shadowOpacity: 1.0 }}>
            <View style={{flex: 2}} >
               <Image 
               source={require('../images/cast2.jpg')}
               style={{
                 flex:1, width: null, height: null, resizeMode: 'cover',borderRadius:130
               }}
               />
            </View>
           
            </View>
            <View style={{height: 130, width: 130, marginLeft: 20, marginBottom: 15,marginTop: 0, borderWidth: 0.5, borderColor: '#000', shadowColor:'#000', shadowOffset: {width: 1, height: 1}, shadowRadius: 10,shadowOpacity: 1.0 }}>
            <View style={{flex: 2}} >
               <Image 
               source={require('../images/cast3.jpg')}
               style={{
                 flex:1, width: null, height: null, resizeMode: 'cover',borderRadius:130
               }}
               />
            </View>
           
            </View>
          </ScrollView>
           </View>
           
          


        </ScrollView>
          
        </Content>
        <Footer>
          <FooterTab style={{backgroundColor:'#000'}}>
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
      </Container>
      </StyleProvider>
    );
  }
}
import React, { Component } from 'react'
import { View, Text, ImageBackground, Image } from 'react-native'
import { Container, Header, Content, Button, H1, H3, Footer } from 'native-base'

export default class Welcome extends Component {
    componentDidMount() {}
    render() {
        return(
            <ImageBackground source={require('../images/welcome_back.jpeg')} style={{width: '100%', height: '100%'}}>
                <View style={{justifyContent: 'center', alignItems: 'center', flex: 1}}>
                    <Image source={require('../images/notflixw.png')} style={{width: 300, height: 150}} />
                    <Text style={{color: '#fff'}}>Lets get Started</Text>
                    <View style={{justifyContent: 'center', alignItems: 'center'}}>
                        <Button full rounded style={{marginTop: 25,backgroundColor: '#ff3838', width: 300}} onPress={()=> this.props.navigation.navigate('LoginPage')}>
                            <H3 style={{color: '#fff'}}>Sign In</H3>
                        </Button>
                        <Button full rounded style={{marginTop: 25,backgroundColor: '#ff3838', width: 300}} onPress={()=> this.props.navigation.navigate('RegisterPage')}>
                            <H3 style={{color: '#fff'}}>Sign Up</H3>
                        </Button>
                    </View>
                </View>
                <Footer transparent style={{backgroundColor: '#000'}}>
                    <Button transparent onPress={()=> this.props.navigation.navigate('HomePage')}>
                        <Text note style={{color: '#FFF'}}>Just Watching Movies</Text>
                    </Button>
                </Footer>
            </ImageBackground>
        );
    }
}
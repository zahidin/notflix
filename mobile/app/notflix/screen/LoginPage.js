import React, { Component } from 'react'
import { View, Text } from 'react-native'
import { Container, Content, Button, Form, Item, Input, Label, Body, Thumbnail, Header, Footer } from 'native-base'

import axios from 'axios';
import connect from 'react-redux'

// import deviceStorage from '../deviceStorage'

export default class LoginPage extends Component {

    constructor(props) {
        super(props)
        this.state = {
            email: '',
            password: '',
        }
    }

    onSubmit = () => {
        axios({
            method: 'post',
            url: 'http://192.168.1.122:3333/api/v1/login',
            data: {
                email: this.state.email,
                password: this.state.password
            }
        }) .then(function(response){
            alert(JSON.stringify(response.data.token))
            // deviceStorage.saveItem('token', response.data.token);
            this.props.navigation.navigate('HomePage')
        }) .catch(function(error) {
            alert(error)
        })
    }

    render() {
        return(
            <Container>
                
                <Content style={{backgroundColor: '#0C0C0C'}} padder>
                    <View style={{justifyContent: 'center', alignItems: 'center', marginTop: 25}}>
                        <Thumbnail source={require('../images/notflixw.png')} style={{width: 300, height: 100}} />
                    </View>
                    <Text style={{color: '#fff'}}>{this.state.email}</Text>
                    <Form>
                        <Item floatingLabel>
                            <Label style={{color: '#fff'}}>Email</Label>
                            <Input style={{color: '#fff'}} onChangeText={(email)=> this.setState({email})} />
                        </Item>
                        <Item floatingLabel>
                            <Label style={{color: '#fff'}}>Password</Label>
                            <Input style={{color: '#fff'}} onChangeText={(password)=> this.setState({password})} />
                        </Item>
                        <View style={{justifyContent: 'center', alignItems: 'center'}}>
                            <Button onPress={this.onSubmit} full rounded style={{marginTop: 50, backgroundColor: '#ff3838'}}>
                                <Text style={{color: '#fff'}}>Sign In</Text>
                            </Button>
                            <Text note style={{color: '#fff', marginTop: 25}}>Forgot Password?</Text>
                        </View>
                    </Form>
                </Content>
                <Footer style={{backgroundColor: '#0C0C0C'}}>
                    <View style={{justifyContent: 'center', alignItems: 'center'}}>
                        <Text note style={{color: '#fff'}}>Didn't have an Account? <Text note onPress={()=> this.props.navigation.push('RegisterPage')} style={{color: '#ff3838'}}> Sign Up Now</Text></Text>
                    </View>
                </Footer>
            </Container>
        );
    }
}

// export default connect()(LoginPage)
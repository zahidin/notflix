import React, { Component } from 'react'
import { View, Text } from 'react-native'
import { Container, Content, Button, Form, Item, Input, Label, Body, Thumbnail, Header, Footer } from 'native-base'

import axios from 'axios'

export default class LoginPage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            name: '',
            username: '',
            email: '',
            password: '',
        }
    }

    onReg = ()=> {
        axios({
            method: 'post',
            url: 'http://192.168.1.122:3333/api/v1/register',
            data: {
              name: this.state.name,
              username: this.state.username,
              email: this.state.email,
              password: this.state.password
            }
          }) .then(function(response) {
              alert(response)
          }) .catch(function(error) {
              alert(error)
          })
    }



    render() {
        return(
            <Container>
                <Content style={{backgroundColor: '#0C0C0C'}} padder>
                    <View style={{justifyContent: 'center', alignItems: 'center'}}>
                        <Thumbnail source={require('../images/notflixw.png')} style={{width: 300, height: 100}} />
                    </View>
                    <Form>
                        <Item floatingLabel>
                            <Label style={{color: '#fff'}}>Name</Label>
                            <Input onChangeText={(name)=> this.setState({name})} style={{color: '#fff'}} />
                        </Item>
                        <Item floatingLabel>
                            <Label style={{color: '#fff'}}>Username</Label>
                            <Input onChangeText={(username)=> this.setState({username})} style={{color: '#fff'}} />
                        </Item>
                        <Item floatingLabel>
                            <Label style={{color: '#fff'}}>Email</Label>
                            <Input onChangeText={(email)=> this.setState({email})} style={{color: '#fff'}} />
                        </Item>
                        <Item floatingLabel>
                            <Label style={{color: '#fff'}}>Password</Label>
                            <Input onChangeText={(password)=> this.setState({password})} style={{color: '#fff'}} />
                        </Item>
                        <View style={{justifyContent: 'center', alignItems: 'center'}}>
                            <Button onPress={this.onReg} full rounded style={{marginTop: 25, backgroundColor: '#ff3838'}}>
                                <Text style={{color: '#fff'}}>Sign Up</Text>
                            </Button>
                        </View>
                    </Form>
                </Content>
                <Footer style={{backgroundColor: '#0C0C0C'}}>
                    <View style={{justifyContent: 'center', alignItems: 'center'}}>
                        <Text note style={{color: '#fff'}}>Already Have an Account? <Text note onPress={()=> this.props.navigation.push('LoginPage')} style={{color: '#ff3838'}}> Sign In Now</Text></Text>
                    </View>
                </Footer>
            </Container>
        );
    }
}
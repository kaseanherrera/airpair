'user strict';
import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    TouchableHighlight
} from 'react-native';

var baseStyles = require('../styles/base');
var userService = require('../services/userService');
var UserService = new userService();

class signUpPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
        }
    }


    render() {
        return (
            <View style={baseStyles.styles.container}>

                {    
                /*
                <TouchableHighlight
                    style={styles.backButton}
                    onPress={this.ClickBackButton.bind(this)}>
                    <Text>
                        back
                    </Text>
                </TouchableHighlight>
                */
                }

                <Text style={styles.title}>
                    Log In
                </Text>

                <Text style={styles.emailText}>
                    username
                </Text>
                <TextInput
                    onChangeText={(text) => this.setState({ username: text })}
                    style={styles.emailInput}
                    keyboardAppearance="dark"
                />

                <Text style={styles.passwordText}>
                    password
                </Text>

                <TextInput
                    onChangeText={(text) => this.setState({ password: text })}
                    style={styles.passwordInput}

                    secureTextEntry={true}
                    keyboardAppearance="dark"
                />


                <TouchableHighlight
                    style={styles.loginButton}
                    onPress={this.ClickLoginButton.bind(this)}>
                    <Text style={styles.LoginText}>
                        LOGIN
                    </Text>
                </TouchableHighlight>
            </View>
        );
    }

    ClickBackButton = () => {
        this.props.onBack();
    }


    ClickLoginButton = () => {
        var username = this.state.username;
        var password = this.state.password;
        console.log("add logic to check if the username and password was inputted");
        UserService.Login(username, password, (err, response) => {
            if (err) {
                console.log("error logging in :", err);
                return;
            } else {
                this.props.onLoginSuccess(response);
            }
        });
    }



}


var styles = StyleSheet.create({

    title: {
        marginTop: 100,
        fontSize: 30,
        color: "#FFFFFF"
    },
    emailText: {
        marginTop: 20,
        fontSize: 20,
        color: '#FFFFFF',
        alignSelf: 'flex-start',
        marginLeft: 40
    },
    emailInput: {
        height: 50,
        marginTop: 5,
        width: 300,
        alignSelf: 'center',
        textAlign: 'center',
        textAlignVertical: 'center',
        backgroundColor: 'white',
        fontSize: 18,
        borderColor: 'white',
        color: 'white',
        color: 'black'

    },
    passwordText: {
        marginTop: 10,
        marginLeft: 40,
        fontSize: 20,
        color: '#FFFFFF',
        alignSelf: 'flex-start'
    },
    passwordInput: {
        height: 50,
        marginTop: 5,
        width: 300,
        alignSelf: 'center',
        textAlign: 'center',
        textAlignVertical: 'center',
        backgroundColor: 'white',
        fontSize: 18,
        borderColor: 'white',
        color: 'white',
        color: 'black'
    },
    backButton: {
        marginTop: 50,
        height: 50,
        alignSelf: 'stretch',
        justifyContent: 'center',
        backgroundColor: '#48bbec'
    },
    loginButton: {
        marginTop: 20,
        height: 50,
        width: 200,
        alignSelf: 'center',
        justifyContent: 'center',
        backgroundColor: '#9B9B9B'
    },

    LoginText: {
        fontSize: 20,
        color: "#FFFFFF",
        alignSelf: 'center',
    },

})
module.exports = signUpPage;
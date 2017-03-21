'user strict';
import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableHighlight
} from 'react-native';

var baseStyles = require('../styles/base');

class WelcomePage extends Component {

    constructor(props) {
        super(props);
        this.state = {
        }
    }


    render() {
        return (
            <View style={baseStyles.styles.container}>
                <Text style = {styles.titleText}>
                    Squad Goals
                </Text>
                <TouchableHighlight
                    style={styles.loginButton}
                    onPress={this.Login.bind(this)}>
                    <Text style={styles.buttonText}>
                        LOG IN
                    </Text>
                </TouchableHighlight>

                <TouchableHighlight
                    style={styles.signUpButton}
                    onPress={this.SignUp.bind(this)}>
                    <Text style={styles.buttonText}>
                        SIGN UP
                    </Text>
                </TouchableHighlight>
            </View>
        );
    } 

    Login() {
        this.props.onLogin();
    }

    SignUp () {
        this.props.onSignUp();
    }
}


var styles = StyleSheet.create({
        titleText : {
            marginTop : 100,
            color : '#FFFFFF',
            fontSize : 30
        },
        loginButton: {
            height: 85,
            marginTop: 361,
            alignSelf: 'stretch',
            justifyContent: 'center',
            backgroundColor: '#9B9B9B'
        },
        signUpButton: {
            height: 85,
            alignSelf: 'stretch',
            justifyContent: 'center',
            backgroundColor: '#4990E2'
        },
  
        buttonText: {
            fontSize: 18,
            color: "#FFFFFF",
            alignSelf: 'center'
        }
    
})
module.exports = WelcomePage;
'user strict';
import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableHighlight
} from 'react-native';

var Welcome = require('./pages/welcome');
var SignUp = require('./pages/signUp');
var Login = require('./pages/login');
var Verification = require('./pages/verification');
var Main = require('./pages/main');

class SquadGoals extends Component {

    constructor() {
        super()
        this.state = {
            isLoggedIn : false,
            page : "Welcome"
        }
    }


    render() {
        
        return(<Main/>) 
    } 


    setPageToWelcome(){
        this.setState({page : "Welcome"});
    }

    onVerifyButtonClicked = () => {
        this.setState({page : "Login"});
    }

    onVerificationBackButtonClicked = () => {
        this.setState({page : "Welcome"})
    }

    SetPageToVerification(){
        this.setState({page : "Verification"})
    }

    onSignUpButtonClicked = (username) => {
        this.setState({"username" : username});
        this.SetPageToVerification();
    }

    onLoginSuccess = () => {
        this.setState({isLoggedIn : true});
        this.setState({page : "Main"});
    }

    onSignUpBackButtonClicked = () => {
         this.setPageToWelcome();
    }

    onLogin = () => {
        this.setState({page : "Login"});
    }

    onSignUp = () => {
        this.setState({page : "SignUp"})
    }
}



module.exports = SquadGoals;
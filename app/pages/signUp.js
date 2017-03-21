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

               {/* <TouchableHighlight
                    style={styles.backButton}
                    onPress={this.ClickBackButton.bind(this)}>
                    <Text>
                        back
                    </Text>
                </TouchableHighlight> */}

                <Text style={styles.usernameText}>
                    username
                </Text>
                <TextInput
                    onChangeText={(text) => this.setState({ username: text })}
                    style={styles.usernameInput}
                    keyboardAppearance="dark"
                />
                <Text style = {styles.emailText}>
                    email
                </Text>

                <TextInput
                    onChangeText={(text) => this.setState({ email: text })}
                    style={styles.emailInput}
                    keyboardAppearance="dark"
                />

                <Text style = {styles.passwordText}>
                    password
                </Text>
                <TextInput
                    onChangeText={(text) => this.setState({ password: text })}
                    style={styles.passwordInput}
                    secureTextEntry={true}
                    keyboardAppearance="dark"
                />

                <TouchableHighlight
                    style={styles.signUpButton}
                    onPress={this.SignUp.bind(this)}>
                    <Text style={styles.signUpText}>
                        Sign up, Accept
                    </Text>
                </TouchableHighlight>
            </View>
        );
    }

    ClickBackButton(){
        this.props.onBack();
    }

    SetErrorMessage = (message) => {
        this.setState({errorMessage : message});
    }
    
    CheckEmail = (emailAddress) => {
        console.log("Still need to implement check email function");
        return true;
    }

    CheckUsername = (userName) => {
        console.log("Still Need to implement check phone number function");
        return true;
    }

    CheckPassword = (password) => {
        console.log("Still need to implement check password function");
        return true;
    }


    SignUp() {
        var email = this.state.email;
        var validEmail = this.CheckEmail(email);
        if(!validEmail){
            this.SetErrorMessage("Invalid Email");
            return;
        }

        var username = this.state.username;
        var validUsername = this.CheckUsername(username);
        if(!validUsername){
            this.SetErrorMessage("Invalid Phone Number");
            return;
        }

       var password = this.state.password;
        var validPassword = this.CheckPassword(password);
        if(!validPassword){
            this.SetErrorMessage("Invalid Password");
            return;
        }
        
        UserService.SignUp(email, username, password, (error, data) => {
            if(error){
                console.log(error, "error from the signup call");
            }
            else{
                this.props.onSignUpButtonClicked(username);
            }
        });
    }

    back(){
        this.props.onBack();
    }

}


var styles = StyleSheet.create({

    backButton: {
        marginTop: 40,
        height: 50,
        alignSelf: 'stretch',
        justifyContent: 'center',
        backgroundColor: '#48bbec'
    },
    usernameText : {
        fontSize : 20,
        color : '#FFFFFF',
        alignSelf : 'flex-start',
        marginTop : 80,
        marginLeft : 40
        
    },
    usernameInput : {
        height: 50,
        marginTop: 2,
        width : 300,
        alignSelf : 'center',
        textAlign: 'center',
        textAlignVertical: 'center',
        backgroundColor: 'white',
        fontSize: 18,
        borderColor: 'white',
        color: 'white',
        color: 'black'
    },
    emailText : {
        fontSize : 20,
        color : '#FFFFFF',
        alignSelf : 'flex-start',
        marginTop : 10,
        marginLeft : 40  
    },
    emailInput : {
        height: 50,
        marginTop: 2,
        width : 300,
        alignSelf : 'center',
        textAlign: 'center',
        textAlignVertical: 'center',
        backgroundColor: 'white',
        fontSize: 18,
        borderColor: 'white',
        color: 'white',
        color: 'black'
    },
    passwordText : {
        fontSize : 20,
        color : '#FFFFFF',
        alignSelf : 'flex-start',
        marginTop : 10,
        marginLeft : 40  
    },
    passwordInput : {
        height: 50,
        marginTop: 2,
        width : 300,
        alignSelf : 'center',
        textAlign: 'center',
        textAlignVertical: 'center',
        backgroundColor: 'white',
        fontSize: 18,
        borderColor: 'white',
        color: 'white',
        color: 'black'
    },
    signUpButton: {
        marginTop: 10,
        height: 50,
        width : 200,
        alignSelf : 'center',
        justifyContent: 'center',
        backgroundColor: '#9B9B9B'
    },
    signUpText: {
         fontSize: 20,
        color: "#FFFFFF",
        alignSelf: 'center',
    },

    
})
module.exports = signUpPage;
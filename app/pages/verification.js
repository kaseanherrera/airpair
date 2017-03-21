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

class Verification extends Component {

    constructor(props) {
        super(props);
        this.state = {
        }
    }


    render() {
        return (
            <View style={baseStyles.styles.container}>

                {/*} <TouchableHighlight
                    style={styles.backButton}
                    onPress={this.ClickBackButton.bind(this)}>
                    <Text>
                        back
                    </Text>
                </TouchableHighlight> */}


                <Text style={styles.text}>
                    Enter Verification Code
                </Text>


                <TextInput
                    onChangeText={(text) => this.setState({ code: text })}
                    style={styles.codeInput}
                    keyboardAppearance="dark"
                />


                <TouchableHighlight
                    style={styles.verifyButton}
                    onPress={this.verify.bind(this)}>
                    <Text style={styles.verifyButtonText}>
                        Verify
                    </Text>
                </TouchableHighlight>
            </View>
        );
    }




    verify() {

        var code = this.state.code;
        var username = this.props.username;

        UserService.VerifyCode(username, code, (error, data) => {
            if (error) {
                console.log(error, "error when trying to verify");
            }
            else {
                this.props.onVerifyButtonClicked();
            }
        });
    }

    ClickBackButton() {
        this.props.ClickBackButton();
    }

}


var styles = StyleSheet.create({

    backButton: {
        marginTop: 50,
        height: 50,
        alignSelf: 'stretch',
        justifyContent: 'center',
        backgroundColor: '#48bbec'
    },
    text: {
        color: '#FFFFFF',
        fontSize: 20,
        marginLeft: 40,
        marginTop: 200,
        alignSelf: 'flex-start'
    },
    codeInput: {
        height: 50,
        marginTop: 2,
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
    verifyButton: {
        marginTop: 40,
        height: 50,
        width: 200,
        alignSelf: 'center',
        justifyContent: 'center',
        backgroundColor: '#9B9B9B'
    },

    verifyButtonText: {
        fontSize: 20,
        color: "#FFFFFF",
        alignSelf: 'center',
    },

    input: {
        height: 40,
        marginTop: 30,
        textAlign: 'center',
        textAlignVertical: 'center',
        backgroundColor: 'white',
        fontSize: 18,
        borderColor: 'white',
        color: 'white',
        color: 'black'

    }

})
module.exports = Verification;
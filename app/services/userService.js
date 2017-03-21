//this service is to make calls to the back end. all user related calls should go here 


class UserService {

    constructor() {
        this.endpoints = {
            signUp: "https://wdhx4neyme.execute-api.us-west-2.amazonaws.com/development/users/signup",
            verify: "https://wdhx4neyme.execute-api.us-west-2.amazonaws.com/development/users/verify",
            login: "https://wdhx4neyme.execute-api.us-west-2.amazonaws.com/development/users/login"
        }
    }

    Login(username, password, callback) {
        var endpoint = this.endpoints.login;

        fetch(endpoint, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: username,
                password: password
            })
        }).then((response) => {
            callback(null, response);
        }).catch((error) => {
            callback(error, null);
        });
    }

    VerifyCode(username, code, callback) {
        var endpoint = this.endpoints.verify;

        fetch(endpoint, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: username,
                code: code
            })
        }).then((response) => {
            callback(null, response);
        }).catch((error) => {
            callback(error, null);
        });
    }

    SignUp(email, username, password, callback) {

        var endpoint = this.endpoints.signUp;
        fetch(endpoint, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "email": email,
                "username": username,
                "password": password
            })
        }).then((response) => {
            callback(null, response);
        }).catch((error) => {
            console.log(error, "error")
            callback(error, null);
        })
    }
}

module.exports = UserService;
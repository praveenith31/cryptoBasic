import React from 'react';
import { GoogleLogin, GoogleLogout } from 'react-google-login';

class Login extends React.Component {

    constructor() {
        super();
        this.state = {
            userData: {}
        };
        this.logout = this.logout.bind(this);
        this.responseGoogle = this.responseGoogle.bind(this);
    }

    responseGoogle(googleUser) {
        console.log('::::: INSIDE onSIgnIN handler', googleUser);
        const profile = googleUser.getBasicProfile();
        console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
        console.log('Name: ' + profile.getName());
        console.log('Image URL: ' + profile.getImageUrl());
        console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.
        const userData = {
            imageURL: profile.getImageUrl(),
            emailID: profile.getEmail(),
            userID: profile.getId(),
            userName: profile.getName()
        };
        this.setState({
            userData: userData
        });
    }

    logout() {
        const auth2 = window.gapi.auth2.getAuthInstance();
        auth2.signOut().then(function() {
            console.log('User signed out.');
        });
    }

    render() {
        return (
			<div>
                <GoogleLogin
                    clientId="1095599963303-i9i9jhmr62bg2c4gk5qo7q3or2dt53gd.apps.googleusercontent.com"
                    buttonText="Login"
                    onSuccess={this.responseGoogle}
                    onFailure={this.responseGoogle} />
                <GoogleLogout
                  buttonText="Logout"
                  onLogoutSuccess={this.logout} />
            </div>
		);
    }
}

export default Login;

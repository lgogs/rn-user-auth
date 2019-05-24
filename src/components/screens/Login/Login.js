import React, { Component } from 'react';
import { View, Button, TextInput, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { userLoggedIn } from '../../store/actions/index';
import BackgroundImage from '../../custom/backgroundImage';
import * as firebase from 'firebase';

class Login extends Component {
  state = {
    email: '',
    password: ''
  };

  emailChangedHandler = email => {
    this.setState({ email });
  };

  passwordChangedHandler = password => {
    this.setState({ password });
  };

  loginBtnHandler = () => {
    const { email, password } = this.state;
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(res => {
        if (res.operationType === 'signIn') {
          firebase
            .database()
            .ref('full_info')
            .child(res.user.uid)
            .once('value', info => {
              this.props.userLoggedIn(info.toJSON(), res.user.uid);
              this.props.navigator.showModal({ screen: 'ProfileViewScreen' });
              this.setState({ email: '', password: '' });
            });
        }
      })
      .catch(err => {
        alert(err.message);
      });
  };

  render () {
    return (
      <BackgroundImage>
        <View style={styles.mainContainer}>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              value={this.state.email}
              onChangeText={this.emailChangedHandler}
              autoCapitalize="none"
              placeholder="Email"
              placeholderTextColor='#eee'
            />
            <TextInput
              style={styles.input}
              value={this.state.password}
              onChangeText={this.passwordChangedHandler}
              autoCapitalize="none"
              secureTextEntry={true}
              placeholder="Password"
              placeholderTextColor='#eee'
            />
          </View>
          <Button
            color="#ffab40"
            title="Log in"
            onPress={this.loginBtnHandler}
          />
        </View>
      </BackgroundImage>
    );
  };
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 5
  },
  inputContainer: {
    width: '80%'
  },
  input: {
    width: '100%',
    borderColor: '#eee',
    borderWidth: 1,
    borderRadius: 20,
    margin: 5,
    padding: 10,
    color: '#eee'
  }
});

export default connect(null, { userLoggedIn })(Login);
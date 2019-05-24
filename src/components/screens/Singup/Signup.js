import React, { Component } from 'react';
import { View, Button, TextInput, StyleSheet } from 'react-native';
import BackgroundImage from '../../custom/backgroundImage';
import * as firebase from 'firebase';

class Signup extends Component {
  state = {
    email: '',
    password: '',
    confirmPassword: ''
  };

  emailChangedHandler = email => {
    this.setState({ email });
  };

  passwordChangedHandler = password => {
    this.setState({ password });
  };

  confirmPasswordChangedHandler = confirmPassword => {
    this.setState({ confirmPassword });
  };

  signUpBtnHandler = () => {
    const { email, password } = this.state;
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(res => {
        if (res.additionalUserInfo.isNewUser) {
          firebase
            .database()
            .ref('full_info')
            .child(res.user.uid)
            .set({ email: this.state.email });
          this.props.navigator.showModal({ screen: 'LoginScreen' });
          this.setState({ email: '', password: '', confirmPassword: '' });
        }
      })
      .catch(err => {
        alert(err.message);
      });
  };

  render () {
    let color = this.state.password !== this.state.confirmPassword ? 'red' : '#eee';

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
            <TextInput
              style={[styles.input, {borderColor: color}]}
              value={this.state.confirmPassword}
              onChangeText={this.confirmPasswordChangedHandler}
              autoCapitalize="none"
              secureTextEntry={true}
              placeholder="Confirm Password"
              placeholderTextColor={color}
            />
          </View>
          <Button
            disabled={
              color === 'red' ||
              !this.state.email ||
              !this.state.password
            }
            color="#ffab40"
            title="Sign up"
            onPress={this.signUpBtnHandler}
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

export default Signup;
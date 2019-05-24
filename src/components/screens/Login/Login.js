import React, { Component } from 'react';
import { View, Button, TextInput, ActivityIndicator, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { userLoggedIn } from '../../store/actions/index';
import BackgroundImage from '../../custom/backgroundImage';
import * as firebase from 'firebase';

class Login extends Component {
  state = {
    email: '',
    password: '',

    showLoginPage: false
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

  componentDidMount() {
    if (this.props.fullInfo.uid) {
      this.props.navigator.showModal({ screen: 'ProfileViewScreen' });
    } else {
      this.setState({ showLoginPage: true });
    }
  };

  componentWillReceiveProps = nextProps => {
    if (!nextProps.fullInfo.uid) {
      this.setState({ showLoginPage: true });
    }
  };

  render () {
    if (!this.state.showLoginPage) {
      return <ActivityIndicator style={styles.mainContainer} />
    }

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

const mapStateToProps = ({ fullInfo }) => {
  return {
    fullInfo
  };
};

export default connect(mapStateToProps, { userLoggedIn })(Login);
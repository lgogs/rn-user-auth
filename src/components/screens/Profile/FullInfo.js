import React, { Component } from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import * as firebase from 'firebase';
import { connect } from 'react-redux';
import { userUpdated } from '../../store/actions/index';
import BackgroundImage from '../../custom/backgroundImage';

class FullInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      displayName: this.props.fullInfo.displayName,
      phone: this.props.fullInfo.phone,
      address: this.props.fullInfo.address
    };
    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent);
  }

  onNavigatorEvent = event => {
    const { displayName, phone, address } = this.state;

    if (event.type === 'NavBarButtonPress' && event.id === 'SAVEPROFILE') {
      firebase
        .database()
        .ref('full_info')
        .child(this.props.fullInfo.uid)
        .update({
          displayName,
          phone,
          address
        })
        .then(() => {
          this.props.userUpdated(this.state);
          this.props.navigator.pop();
        })
        .catch(err => {
          alert(err.message);
        })
    }
  };  

  componentDidMount() {
    this.props.navigator.setButtons({
      rightButtons: [
        {
          title: 'Save',
          id: 'SAVEPROFILE',
          disabled: this.state.disabled
        }
      ]
    })
  }

  onDisplayNameChangedHandler = displayName => {
    this.setState({ displayName });
  };

  onPhoneChangedHandler = phone => {
    this.setState({ phone });
  };

  onAddressChangedHandler = address => {
    this.setState({ address });
  };

  render() {
    const { textStyle } = styles;

    return (
      <BackgroundImage>
        <View style={styles.container}>
          <TextInput
            style={textStyle}
            placeholder="Display Name"
            placeholderTextColor="#eee"
            value={this.state.displayName}
            onChangeText={this.onDisplayNameChangedHandler}
          />
          <TextInput
            style={textStyle}
            placeholder="Phone"
            placeholderTextColor="#eee"
            value={this.state.phone}
            onChangeText={this.onPhoneChangedHandler}
          />
          <TextInput
            style={textStyle}
            placeholder="Address"
            placeholderTextColor="#eee"
            value={this.state.address}
            onChangeText={this.onAddressChangedHandler}
          />
        </View>
      </BackgroundImage>
    );
  };
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  textStyle: {
    borderColor: '#eee',
    color: '#eee',
    borderWidth: 1,
    borderRadius: 20,
    width: '80%',
    margin: 10,
    padding: 10
  }
});

const mapStateToProps = ({ fullInfo }) => {
  return {
    fullInfo
  };
};

export default connect(mapStateToProps, { userUpdated })(FullInfo);
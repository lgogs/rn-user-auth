import React, { Component } from 'react';
import { View, Text, Button,Image, StyleSheet, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import { userLoggedOut } from '../../store/actions/index';
import BackgroundImage from '../../custom/backgroundImage';
import user from '../../../assets/images/user.png';

class ProfileView extends Component {
  constructor(props) {
    super(props);
    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent);
    this.props.navigator.setTitle({title: 'Profile'})
  }

  onNavigatorEvent = event => {
    if (event.type === 'NavBarButtonPress' && event.id === 'LOGOUT') {
      this.props.userLoggedOut();
      this.props.navigator.dismissModal();
    }
  }

  componentDidMount() {
    this.props.navigator.setButtons({
      rightButtons: [
        {
          title: 'Log out',
          id: 'LOGOUT'
        }
      ]
    })
  }

  render() {
    const { fullInfo } = this.props;
    const { textStyle } = styles;

    return (
      <BackgroundImage>
        <View style={styles.container}>
          <Image resizeMode="cover" source={user} style={styles.userImg} />
          <ScrollView>
            <View style={styles.userInfo}>
              <Text style={textStyle}>{fullInfo.email}</Text>
              <Text style={textStyle}>{fullInfo.displayName}</Text>
              <Text style={textStyle}>{fullInfo.phone}</Text>
              <Text style={textStyle}>{fullInfo.address}</Text>
            </View>
            <Button
              title="Edit Profile"
              color="#ffab40"
              onPress={() => this.props.navigator.push({screen: 'FullInfoScreen'})}
            />
          </ScrollView>
        </View>
      </BackgroundImage>
    );
  };
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  userImg: {
    width: 130,
    height: 130,
    marginTop: 20
  },
  userInfo: {
    marginTop: 20,
    alignItems: 'center'
  },
  textStyle: {
    marginBottom: 10,
    fontSize: 22,
    fontWeight: 'bold',
    color: '#eee'
  }
});

const mapStateToProps = ({ fullInfo }) => {
  return {
    fullInfo
  };
};

export default connect(mapStateToProps, { userLoggedOut })(ProfileView);
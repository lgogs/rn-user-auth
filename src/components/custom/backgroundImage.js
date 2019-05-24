import React from 'react';
import { ImageBackground, StyleSheet } from 'react-native';
import source from '../../assets/images/ios.jpg';

const backgroundImage = props => (
  <ImageBackground source={source} style={styles.image}>
    {props.children}
  </ImageBackground>
)

const styles = StyleSheet.create({
  image: {
    flex: 1
  }
});

export default backgroundImage;
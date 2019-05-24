import { Navigation } from 'react-native-navigation';
import Icon from 'react-native-vector-icons/Ionicons';
import { Provider } from 'react-redux';

import store from './src/components/store/index';
import Signup from './src/components/screens/Singup/Signup';
import Login from './src/components/screens/Login/Login';
import ProfileView from './src/components/screens/Profile/ProfileView';
import FullInfo from './src/components/screens/Profile/FullInfo';

Navigation.registerComponent('SignupScreen', () => Signup);
Navigation.registerComponent('LoginScreen', () => Login, store, Provider);
Navigation.registerComponent('ProfileViewScreen', () => ProfileView, store, Provider);
Navigation.registerComponent('FullInfoScreen', () => FullInfo, store, Provider);

Promise.all([
  Icon.getImageSource('ios-contact', 30),
  Icon.getImageSource('ios-log-in', 30)
]).then(sources => {
  Navigation.startTabBasedApp({
    tabs: [
      {
        screen: "SignupScreen",
        label: "Sign up",
        title: "Sign Up",
        icon: sources[0]
      },
      {
        screen: "LoginScreen",
        label: "Log in",
        title: "Log In",
        icon: sources[1]
      }
    ]
  });
})
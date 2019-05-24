import App from './App';
import * as firebase from 'firebase';

var firebaseConfig = {
  apiKey: "AIzaSyCKnbHOlYz6rNmVRKS8DlmFum2fRTZ5pl4",
  authDomain: "rn-user-auth.firebaseapp.com",
  databaseURL: "https://rn-user-auth.firebaseio.com",
  projectId: "rn-user-auth",
  storageBucket: "rn-user-auth.appspot.com",
  messagingSenderId: "311420831583",
  appId: "1:311420831583:web:c34504c8942f8aa1"
};

firebase.initializeApp(firebaseConfig);
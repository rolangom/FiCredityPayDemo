import { QueryClient } from 'react-query';
import firebase from 'firebase';
import 'firebase/analytics';

export const currency = 'USD';
export const queryClient = new QueryClient();

const firebaseConfig = {
  apiKey: "AIzaSyClEp4YpwPlM5Ba1Mni9uUmvWw7V2HLCnY",
  authDomain: "ficreditypaydemo.firebaseapp.com",
  projectId: "ficreditypaydemo",
  storageBucket: "ficreditypaydemo.appspot.com",
  messagingSenderId: "566634557583",
  appId: "1:566634557583:web:b61645af8e12e33b18c0fa"
};

firebase.initializeApp(firebaseConfig);
firebase.analytics();

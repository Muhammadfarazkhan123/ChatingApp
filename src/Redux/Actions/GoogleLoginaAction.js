import {GoogleSignin} from '@react-native-community/google-signin';
import auth from '@react-native-firebase/auth';

const GoogleLogin = () => {
  return async dispatch => {
    const {idToken} = await GoogleSignin.signIn();
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);
    await auth().signInWithCredential(googleCredential);
  };
};

export {GoogleLogin};

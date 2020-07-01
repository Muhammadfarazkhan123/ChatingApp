import React, {useEffect} from 'react';
import {
  View,
  Text,
  Button,
  FlatList,
  Image,
  TouchableOpacity,
} from 'react-native';
import {LoginManager} from 'react-native-fbsdk';
import auth from '@react-native-firebase/auth';
import {GoogleSignin} from '@react-native-community/google-signin';
import Icons from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import store from '../../Redux/store';
import styles from './style';

const Data = [
  {
    UserName: 'Faraz Khan',
    ImgUrl:
      'https://cdn1.iconfinder.com/data/icons/business-users/512/circle-512.png',
  },
];

const Item = ({Item, props, logout}) => {
  return (
    <View style={styles.MainListView}>
      <View style={styles.ListView}>
        <Image source={{uri: Item.ImgUrl}} style={styles.ListImg} />
        <View style={{flex: 3}}>
          <Text style={styles.ListTitle}>{Item.UserName}</Text>
        </View>
      </View>
      <View style={styles.ListView}>
        <Icons
          name="users"
          size={30}
          color="black"
          style={styles.FindFriendIcon}
        />
        <TouchableOpacity
          onPress={() => {
            props.navigation.navigate('Find Friends');
          }}
          style={styles.FindFriendStyle}>
          <Text style={styles.FindFriendText}>Find Friends</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.ListView}>
        <Icons
          name="wrench"
          size={30}
          color="black"
          style={styles.FindFriendIcon}
        />
        <TouchableOpacity
          // onPress={() => {
          //   props.navigation.navigate('Find Friends');
          // }}
          style={styles.FindFriendStyle}>
          <Text style={styles.FindFriendText}>Account Settings</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.ListView}>
        <MaterialIcons
          name="logout"
          size={30}
          color="black"
          style={styles.FindFriendIcon}
        />
        <TouchableOpacity
          onPress={() => {
            logout();
          }}
          style={styles.FindFriendStyle}>
          <Text style={styles.FindFriendText}>Logout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const Settings = props => {
  const logout = async () => {
    LoginManager.logOut();
    auth().signOut();
    await GoogleSignin.signOut();
    props.navigation.navigate('Chat');
  };

  useEffect(() => {});
  return (
    <View>
      <FlatList
        data={Data}
        renderItem={({item}) => (
          <Item Item={item} props={props} logout={logout} />
        )}
      />
    </View>
  );
};
export default Settings;
{
  /* <Button title="logout" onPress={() => logout()} /> */
}

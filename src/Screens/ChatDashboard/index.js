import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Button,
  ScrollView,
  Image,
  FlatList,
  TouchableOpacity,
  Modal,
  TouchableHighlight,
  TextInput,
} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import store from '../../Redux/store';
import MatIcon from 'react-native-vector-icons/MaterialIcons';
import styles from './style';
import {ActiveChat} from '../../Redux/Actions/ActiveChatAction';
import {SET_MSG_ARR} from '../../Redux/Actions/ChatBoxAction';
import {
  ChatDashboard,
  SET_GROUP_NAME,
  SET_GROUP_IMAGE,
  GroupCreate,
  GroupSelection,
  SET_SHOW_MODAL
} from '../../Redux/Actions/ChatDashboardAction';
import {SET_ISGROUP} from '../../Redux/Actions/GroupAction';
import Icon from 'react-native-vector-icons/FontAwesome';
import FeatherIcon from "react-native-vector-icons/Feather";
import ImagePicker from 'react-native-image-picker';
import storage from '@react-native-firebase/storage';

import {
  AllUserAction,
  SET_ALLUSERS_SEARCH,
} from '../../Redux/Actions/AllUserAction';
import style from './style';

const Chat = props => {
  const [DidUpdate, setDidUpdate] = useState(true);
  const [ReducerState, SetReducerState] = useState();
  const [ShowModal, SetShowModal] = useState(false);
  const [Groupstate, setGroupstate] = useState();
  const [Select, SetSelect] = useState(false);
  const [GroupArr, SetGroupArr] = useState([]);
  const [ImageSource, SetImageSource] = useState();
  const [GroupName, SetGroupName] = useState();

  useEffect(() => {
    const UserUid = store?.getState()?.UserReducer?.user?.uid;
    console.log('run');
    store.dispatch(ChatDashboard());
    if (DidUpdate) {
      // const UsersArray = [];
      store.dispatch(AllUserAction());

      store.subscribe(() => {
        SetReducerState(store.getState().ChatDashboardReducer);
        setGroupstate(store.getState().AllUsersReducer);
      });
      
      setDidUpdate(false);
    }
    console.log(store.getState().ChatDashboardReducer, 'reducer');
  }, []);

  const ChatStart = v => {
    store.dispatch(SET_MSG_ARR([]));
    store.dispatch(ActiveChat(v));
    store?.dispatch(SET_ISGROUP(false));

    props.navigation.navigate('ChatBox');
  };

  const GroupChatStart = v => {
    store.dispatch(SET_MSG_ARR([]));
    store.dispatch(ActiveChat(v));
    store?.dispatch(SET_ISGROUP(true));

    props.navigation.navigate('ChatBox');
  };

  const Item = Item => {
    if (Item.hasOwnProperty('MemberUid')) {
      return (
        <TouchableOpacity
          style={styles.MainListView}
          onPress={() => {
            GroupChatStart(Item);
          }}>
       
          <View style={styles.ListView}>
            <Image source={{uri: Item.GroupImage}} style={styles.ListImg} />
          </View>
       
         <View style={styles.MainNameView}>
         <View style={styles.NameTimeStyle}>
            <Text style={styles.ListTitle}>{Item.groupName}</Text>
         <Text style={{color:"grey"}}>5 min</Text>
          </View>
          
          
          <View style={styles.msgNotiView}>
            <Text style={styles.LastMsgStyle}>you:kese ho</Text>
       <View style={styles.msgNoti}>
          <Text style={{color:"white",fontWeight:"bold"}}>1</Text>
        </View>
       </View>
         </View>


        </TouchableOpacity>
      );
    }
   if(!Item.hasOwnProperty('MemberUid')){
    return (
      <TouchableOpacity
        style={styles.MainListView}
        onPress={() => {
          ChatStart(Item);
        }}>
        <View style={styles.ListView}>
          <Image source={{uri: Item?.PhotoUrl}} style={styles.ListImg} />
        </View>

       <View style={styles.MainNameView}>
         <View style={styles.NameTimeStyle}>
            <Text style={styles.ListTitle}>{Item?.displayName}</Text>
         <Text style={{color:"grey"}}>5 min</Text>
          </View>
          
          
          <View style={styles.msgNotiView}>
            <Text style={styles.LastMsgStyle}>you:kese ho</Text>
       <View style={styles.msgNoti}>
          <Text style={{color:"white",fontWeight:"bold"}}>1</Text>
        </View>
       </View>
         </View>

      </TouchableOpacity>
    );
   }
  };
  const gropFunc = (index) => {
    store.dispatch(GroupSelection(index))
  };
  const groupChat = () => {
    store.dispatch(GroupCreate(props));
    
  };
  const GroupItem = (Item, index) => {
    return (
      <TouchableOpacity
        style={styles.MainListView}
        onPress={() => {
          gropFunc(index);
        }}>
        <View style={styles.ListView}>
          <Image source={{uri: Item?.PhotoUrl}} style={styles.ListImg} />
        </View>
        <View style={{flex: 3}}>
          <Text style={styles.ListTitle}>{Item?.displayName}</Text>
        </View>
        {Item.isSelected && (
          <Icon name="check-circle" size={30} color="green" />
        )}
      </TouchableOpacity>
    );
  };

  const Search = Text => {
    const Result = Groupstate?.UsersDetail?.filter(Res =>
      Res.displayName.toLowerCase().startsWith(Text.toLowerCase()),
    );

    store.dispatch(SET_ALLUSERS_SEARCH(Result));
  };
  const AddImage = () => {
    ImagePicker.showImagePicker(response => {
      // console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        const source = {uri: response.uri};

        // You can also display the image using data:
        // const source = { uri: 'data:image/jpeg;base64,' + response.data };

        store.dispatch(SET_GROUP_IMAGE(source));

        if (
          store.getState().ChatDashboardReducer.imageUrl.hasOwnProperty('uri')
        ) {
          alert('Image selected succesfully');
        }
        SetImageSource(source);
      }
    });
  };
  return (
    <View style={{flex: 1}}>
      {/* <View
        style={{
          borderBottomColor: '#cfcfcf',
          borderBottomWidth: 1,
          elevation: 1,
        }}>
        <Text style={styles.UserScrollText}>Friends Active</Text>
        <ScrollView
          horizontal={true}
          scrollEventThrottle={16}
          showsHorizontalScrollIndicator={false}>
          <View style={styles.UsersScroll}>
            {ReducerState?.usersDetail.map((v, i) => {
              return (
                <TouchableOpacity
                  onPress={() => {
                    ChatStart(v);
                  }}
                  key={i}>
                  <View style={styles.UsersMainView}>
                    <Image
                      source={{uri: v?.PhotoUrl}}
                      style={styles.UsersImg}
                    />
                  </View>
                  <View>
                    <Text style={styles.UsersName}>{v?.displayName}</Text>
                  </View>
                </TouchableOpacity>
              );
            })}
          </View>
        </ScrollView>
      </View> */}
      <View>
      <FeatherIcon
                  size={25}
                  name="search"
                  style={styles.DashboardSearch}
                />
        <Text style={styles.HeadStyle}>Messages</Text>
      </View>
      {ReducerState?.chatUser.length == 0 && (
        <Text>You have No conversations</Text>
      )}
      <FlatList
        data={ReducerState?.chatUser}
        renderItem={({item}) => Item(item)}
        keyExtractor={(item, index) => index.toString()}
        style={styles.FlatListStyle}
        showsVerticalScrollIndicator={false}
      />
      <Modal
        animationType="slide"
        transparent={true}
        visible={ReducerState?.showModal}
        onRequestClose={() => {
          alert('Modal has been closed.');
          store.dispatch(SET_SHOW_MODAL(!ReducerState.showModal));

        }}>
        <View
          style={{
            backgroundColor: 'rgba(0,0,0,0.5)',
            height: '100%',
          }}>
          <View
            style={{
              backgroundColor: 'white',
              height: '90%',
              marginTop: '18%',
              width: '100%',
              alignSelf: 'center',
              borderTopLeftRadius: 15,
              borderTopRightRadius: 15,
              padding: 10,
            }}>
            <TouchableHighlight
              style={{
                ...styles.openButton,
                backgroundColor: 'black',
                height: 30,
                width: 30,
                borderRadius: 50,
                borderWidth: 1,
                // position: 'absolute',
                alignSelf: 'flex-end',
                // top: 5,
              }}
              onPress={() => {
                store.dispatch(SET_SHOW_MODAL(!ReducerState.showModal));
              }}>
              <Text style={{textAlign: 'center', color: 'white', fontSize: 20}}>
                X
              </Text>
            </TouchableHighlight>
            <View>
              <View style={styles.SearchView}>
                <MatIcon size={30} name="group-add" style={styles.SearchIcon} />

                <TextInput
                  placeholder="Group Name"
                  style={styles.SearchInput}
                  onChangeText={text => {
                    store.dispatch(SET_GROUP_NAME(text));
                  }}
                />
                <TouchableOpacity
                  onPress={() => {
                    AddImage();
                  }}>
                  <MatIcon size={30} name="add" style={styles.SearchIcon} />
                  <Text>Add Image</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.SearchView}>
                <Icon
                  size={25}
                  color="grey"
                  name="search"
                  style={styles.SearchIcon}
                />

                <TextInput
                  placeholder="Find Friends"
                  style={styles.SearchInput}
                  onChangeText={Text => {
                    Search(Text);
                  }}
                />
                <TouchableOpacity
                  onPress={() => {
                    groupChat();
                  }}>
                  <Text>create group</Text>
                </TouchableOpacity>
              </View>

              <FlatList
                data={Groupstate?.searchArr}
                renderItem={({item, index}) => GroupItem(item, index)}
                keyExtractor={(item, index) => index.toString()}
                style={styles.FlatListStyle,{marginBottom:"27%"}}
                showsVerticalScrollIndicator={false}
              />
            </View>
          </View>
        </View>
      </Modal>

      <TouchableOpacity
        style={styles.GroupBUtton}
        onPress={() => {
          store.dispatch(SET_SHOW_MODAL(true))
        }}>
        <View style={styles.GroupIconView}>
          <MatIcon size={40} name="group-add"color="white" />
        </View>
      </TouchableOpacity>
    </View>
  );
};
export default Chat;

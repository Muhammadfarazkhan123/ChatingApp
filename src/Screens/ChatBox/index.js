import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from 'react-native';

import Ionicons from 'react-native-vector-icons/Ionicons';
import styles from './style';
import firestore from '@react-native-firebase/firestore';
import moment from 'moment';
import store from '../../Redux/store';
import {
  ChatBoxAction,
  SendAction,
  SET_MESSAGE,
  Typing,
  EndTyping,
} from '../../Redux/Actions/ChatBoxAction';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const ChatBox = () => {
  const [isthisUpdate, SetisthisUpdate] = useState(true);
  const [scrollRef, SetScrollRef] = useState();
  const [reducerState, SetReducerState] = useState();
  const [groupReducer, SetgroupReducer] = useState();

  const UserUid = store.getState().UserReducer.user.uid;
  const ActiveUserUid = store.getState()?.ActiveChatReducer?.ChatUser.UserUid;
  useEffect(() => {
    if (isthisUpdate) {
      store.dispatch(ChatBoxAction());
      store.subscribe(() => {
        SetReducerState(store.getState().ChatBoxReducer);
        SetgroupReducer(store.getState()?.GroupReducer);
        // console.log(store.getState().GroupReducer.group, 'groupred');
        SetisthisUpdate(false);
      });
    }
  }, []);
  const send = () => {
    store.dispatch(SendAction());
    scrollRef.scrollToEnd({animated: true});
  };

  const SetTyping = text => {
    // store.dispatch(Typing(text));
    store.dispatch(SET_MESSAGE(text));
  };
  return (
    <View style={{flex: 1}}>
      <KeyboardAwareScrollView>
        <ScrollView
          showsVerticalScrollIndicator={false}
          ref={ref => {
            SetScrollRef(ref);
          }}
          onContentSizeChange={() => scrollRef.scrollToEnd({animated: true})}
          style={{paddingBottom: 40}}>
          {reducerState?.MsgArr.map((v, i) => {
            return (
              <View
                style={{
                  backgroundColor: v.Uid == UserUid ? 'black' : '#cacaca',
                  maxHeight: hp('20%'),
                  minHeight: hp('6%'),
                  marginTop: hp('1.5%'),
                  maxWidth: wp('70%'),
                  minWidth: wp('50%'),
                  alignSelf: v.Uid == UserUid ? 'flex-end' : 'flex-start',
                  padding: wp('2%'),
                  borderColor: v.Uid == UserUid ? 'black' : '#d2d2d2',
                  borderBottomLeftRadius: v.Uid == UserUid ? 15 : 0,
                  borderBottomRightRadius: v.Uid != UserUid ? 15 : 0,
                  paddingRight: 5,
                  paddingLeft: 5,
                }}
                key={i}>
                <Text
                  style={{
                    color: v.Uid == UserUid ? 'white' : 'black',
                    fontWeight: 'bold',
                  }}>
                  {v.Uid == UserUid ? 'You:' : v.name + ':'}
                </Text>
                <Text
                  style={{
                    color: v.Uid == UserUid ? 'white' : 'black',
                    marginBottom: 10,
                  }}>
                  {v.Msg}
                </Text>
                <Text
                  style={{
                    color: v.Uid == UserUid ? 'white' : 'black',
                    textAlign: 'right',
                  }}>
                  {moment(v?.timestamp?.seconds * 1000).fromNow()}
                </Text>
              </View>
            );
          })}
        </ScrollView>
      </KeyboardAwareScrollView>
      <View style={{marginTop: 8}}>
        <View style={styles.MsgBoxView}>
          <TextInput
            placeholder="Type a message"
            style={styles.MsgBoxInput}
            autoCapitalize="sentences"
            onChangeText={text => {
              SetTyping(text);
            }}
            // onEndEditing={store.dispatch(EndTyping())}
            multiline
            value={reducerState?.message}
          />
          <TouchableOpacity
            onPress={() => {
              send();
            }}>
            <Ionicons
              name="md-send"
              size={40}
              color="black"
              style={styles.MsgBoxIcon}
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default ChatBox;

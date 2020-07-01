import firestore from '@react-native-firebase/firestore';
import store from '../store';
import {
  USER_DATA,
  CHAT_USER,
  GROUP_USER,
  GROUP_NAME,
  GROUP_IMG,
  GROUP_ARR,
} from './type';
import storage from '@react-native-firebase/storage';
import {ActiveChat} from './ActiveChatAction';
import {tsPropertySignature} from '@babel/types';

export const ChatDashboard = () => {
  const UserUid = store?.getState()?.UserReducer?.user?.uid;
  return dispatch => {
    let UsersDetail = store?.getState()?.ChatDashboardReducer?.usersDetail;
    let ChatUser = store?.getState()?.ChatDashboardReducer?.chatUser;
    let GroupUser = store?.getState()?.ChatDashboardReducer?.GroupUser;

    // const UsersArray = [];
    firestore()
      .collection('Users')
      .get()
      .then(querySnapshot => {
        UsersDetail = [];
        querySnapshot.forEach(UsersData => {
          if (UsersData.data().UserUid != UserUid) {
            UsersDetail.push(UsersData.data());
            dispatch(USER_DETAIL(UsersDetail));
          }
        });
      });
    firestore()
      .collection('Users')
      .doc(UserUid)
      .onSnapshot(UserData => {
        ChatUser = [];
        GroupUser = [];
        UserData?.data()?.ChatId?.map(value => {
          console.log(value, 'value');
          if (value.hasOwnProperty('MemberUid')) {
            ChatUser.push(value);
            dispatch(SET_CHAT_USER(ChatUser));
          } else if (!value.hasOwnProperty('MemberUid')) {
            firestore()
              .collection('Users')
              .doc(value.Uid)
              .onSnapshot(Detail => {
                ChatUser.push(Detail.data());
                dispatch(SET_CHAT_USER(ChatUser));
              });
          }
        });
      });
  };
};

export const GroupCreate = props => {
  const states = store.getState().ChatDashboardReducer;
  return async dispatch => {
    if (states.groupName != '') {
      const reference = storage().ref('Images/' + new Date().getTime());
      await reference.putFile(states.imageUrl.uri);
      const url = await reference.getDownloadURL();
      console.log(url, 'url');

      const UserUid = store?.getState()?.UserReducer?.user?.uid;
      let UidArr = [UserUid];

      const PushKey = await firestore()
        .collection('chat')
        .doc().id;
      states.groupArr.map(v => {
        UidArr.push(v.UserUid);
      });
      console.log(UidArr, 'uidarr');
      states.groupArr.map(val => {
        firestore()
          .collection('Users')
          .doc(val.UserUid)
          .update({
            ChatId: firestore.FieldValue.arrayUnion({
              groupName: states.groupName,
              GroupImage: url,
              CreatorUid: UserUid,
              MemberUid: UidArr,
              ChatKey: PushKey,
              Istyping: false,
            }),
          });
        firestore()
          .collection('Users')
          .doc(UserUid)
          .update({
            ChatId: firestore.FieldValue.arrayUnion({
              groupName: states.groupName,
              GroupImage: url,
              CreatorUid: UserUid,
              MemberUid: UidArr,
              ChatKey: PushKey,
              Istyping: false,
            }),
          });
      });

      firestore()
        .collection('Users')
        .doc(UserUid)
        .onSnapshot(UserData => {
          const Filter = UserData?.data()?.ChatId?.filter(v => {
            v.ChatKey === PushKey;
          });
          console.log(Filter, 'filter');
          Filter.map(val => {
            store.dispatch(ActiveChat(val));
          });
        });

      props.navigation.navigate('ChatBox');

      store.dispatch(SET_ISGROUP(true));
    } else {
      alert('please enter group name');
    }
  };
};

const USER_DETAIL = usersDetail => {
  return {
    type: USER_DATA,
    usersDetail,
  };
};

const SET_CHAT_USER = chatUser => {
  return {
    type: CHAT_USER,
    chatUser,
  };
};
export const SET_GROUP_NAME = groupName => {
  return {
    type: GROUP_NAME,
    groupName,
  };
};

export const SET_GROUP_IMAGE = imageUrl => {
  return {
    type: GROUP_IMG,
    imageUrl,
  };
};

export const SET_GROUP_ARR = groupArr => {
  return {
    type: GROUP_ARR,
    groupArr,
  };
};
// const SET_GROUP = GroupUser => {
//   return {
//     type: GROUP_USER,
//     GroupUser,
//   };
// };

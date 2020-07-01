import {
  USER_DATA,
  CHAT_USER,
  GROUP_USER,
  GROUP_NAME,
  GROUP_IMG,
  GROUP_ARR,
} from '../Actions/type';
const InitialState = {
  usersDetail: [],
  chatUser: [],
  GroupUser: [],
  groupName: '',
  groupArr: [],
};

const reducer = (state = InitialState, action) => {
  switch (action.type) {
    case USER_DATA: {
      return {...state, usersDetail: action.usersDetail};
    }

    case CHAT_USER: {
      return {...state, chatUser: action.chatUser};
    }
    case GROUP_USER: {
      return {...state, GroupUser: action.GroupUser};
    }
    case GROUP_NAME: {
      return {...state, groupName: action.groupName};
    }
    case GROUP_IMG: {
      return {...state, imageUrl: action.imageUrl};
    }

    case GROUP_ARR: {
      return {...state, groupArr: action.groupArr};
    }
    default: {
      return state;
    }
  }
};

export default reducer;

import {Dimensions, StyleSheet} from 'react-native';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

export default styles = StyleSheet.create({
  // FlatList
  ListImg: {
    width: wp('18%'),
    borderRadius: 50,
    borderColor: 'grey',
    borderWidth: 2,
    marginLeft: wp('3%'),
  },

  ListTitle: {color: 'black', fontWeight: 'bold', fontSize: 16},
  MainListView: {
    flexDirection: 'row',

    height: hp('12%'),
    marginTop: hp('1%'),
    paddingBottom: hp('1%'),
  },
  ListView: {
    flex: 1,
    flexDirection: 'row',
  },

  FlatListStyle: {marginBottom: hp('27%')},
  //   HorizonatlScroll Users
  UsersScroll: {
    flexDirection: 'row',
    flex: 1,

    // elevation: 1,
    height: hp('17%'),
    padding: hp('1%'),
    paddingRight: 0,
  },
  UserScrollText: {
    color: 'grey',
    marginLeft: wp('3%'),
    fontSize: 15,
    fontWeight: 'bold',
  },
  UsersMainView: {
    flexDirection: 'row',
    flex: 1,
    width: wp('20%'),
    marginLeft: wp('2%'),
  },
  UsersImg: {
    width: wp('19%'),
    borderRadius: 50,
    borderColor: 'grey',
    borderWidth: 3,
  },
  UsersName: {textAlign: 'center', fontWeight: 'bold'},
  // search
  SearchInput: {
    flex: 1,
    fontSize: 16,
    marginLeft: 5,
  },
  SearchIcon: {marginTop: 10, marginLeft: 8},

  SearchView: {
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: '#c8c8c8',
    margin: 5,
    borderRadius: 50,
    elevation: 2,
    marginTop: 10,
  },
});

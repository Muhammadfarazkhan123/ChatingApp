import {Dimensions, StyleSheet} from 'react-native';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

export default styles = StyleSheet.create({
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

  // FlatList
  ListImg: {
    width: wp('15%'),
    borderRadius: 50,
    borderColor: 'grey',
    borderWidth: 2,
    marginLeft: wp('3%'),
  },

  ListTitle: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 16,
    marginTop: hp('2.5%'),
  },
  MainListView: {
    flexDirection: 'row',

    height: hp('10%'),
    marginTop: hp('1%'),
    paddingBottom: hp('1%'),
  },
  ListView: {
    flex: 1,
    flexDirection: 'row',
  },

  FlatListStyle: {marginBottom: hp('10.5%')},
});

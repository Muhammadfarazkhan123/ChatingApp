import {Dimensions, StyleSheet} from 'react-native';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

export default styles = StyleSheet.create({
  MsgBoxView: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: 4,
    height: hp('8%'),
    width: wp('100%'),
  },
  MsgBoxInput: {
    flex: 1,
    borderRadius: 50,
    borderWidth: 1,
    elevation: 1,
    borderColor: '#dbdbdb',
    marginLeft: wp('2%'),
    marginRight: wp('2%'),
    fontSize: 16,
    maxHeight: hp('20%'),
  },
  MsgBoxIcon: {marginRight: hp('1%')},
});

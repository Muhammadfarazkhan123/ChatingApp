import { Dimensions, StyleSheet } from 'react-native';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

export default styles = StyleSheet.create({
  // OR LINE
  lineContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    alignSelf: 'stretch',
    marginTop: hp('2%'),
  },
  hairline: {
    backgroundColor: '#e3e6e4',
    height: 1,
    width: wp('40%'),
  },
  // Slider Style
  SliderView: {
    width: wp(100),
    height: hp(70),
    marginTop: hp(3)
  },
  SliderItemView: {
    alignItems: "center",
    flex: 1
    // borderWidth:1
  },
  SliderImage: {
    width: '55%',
    height: "55%",
    marginTop: "10%"

  },
  SliderTitle: {
    fontSize: wp(7)
  },
  SliderText: {
    fontSize: wp(5),
    color: 'grey',
    textAlign: "center",
  },
  // BUTTONS
  ButtonView: {
    marginHorizontal: wp(5),
    marginTop: hp(3)

  },
  ButtonStyleFb: {
    flexDirection:"row",
    alignItems: 'center',
    height: hp(7),
    borderRadius: 5,
    backgroundColor: "rgb(59, 89, 152)",
    justifyContent: "center",
    elevation: 2,
    marginTop: hp(3)
  },
  ButtonStyleGoogle: {
    flexDirection:"row",
    alignItems: 'center',
    height: hp(7),
    borderRadius: 5,
    backgroundColor: "white",
    justifyContent: "center",
    elevation: 2,
  },
  ButtonIcon:{
    height:"70%",
    width:"10%"

  }



});

import {StyleSheet} from 'react-native';

export const common = StyleSheet.create({
  p0: {padding: 0},
  p5: {padding: 5},
  p10: {padding: 10},
  p15: {padding: 15},
  p20: {padding: 20},

  pt0: {paddingTop: 0},
  pt5: {paddingTop: 5},
  pt10: {paddingTop: 10},
  pt15: {paddingTop: 15},
  pt20: {paddingTop: 20},

  pb0: {paddingBottom: 0},
  pb5: {paddingBottom: 5},
  pb10: {paddingBottom: 10},
  pb15: {paddingBottom: 15},
  pb20: {paddingBottom: 20},

  pl0: {paddingLeft: 0},
  pl5: {paddingLeft: 5},
  pl10: {paddingLeft: 10},
  pl15: {paddingLeft: 15},
  pl20: {paddingLeft: 20},

  pr0: {paddingRight: 0},
  pr5: {paddingRight: 5},
  pr10: {paddingRight: 10},
  pr15: {paddingRight: 15},
  pr20: {paddingRight: 20},

  // -----------

  m0: {margin: 0},
  m5: {margin: 5},
  m10: {margin: 10},
  m15: {margin: 15},
  m20: {margin: 20},

  mt0: {marginTop: 0},
  mt5: {marginTop: 5},
  mt8: {marginTop: 8},
  mt10: {marginTop: 10},
  mt15: {marginTop: 15},
  mt20: {marginTop: 20},

  mb0: {marginBottom: 0},
  mb5: {marginBottom: 5},
  mb10: {marginBottom: 10},
  mb15: {marginBottom: 15},
  mb20: {marginBottom: 20},

  ml0: {marginLeft: 0},
  ml5: {marginLeft: 5},
  ml10: {marginLeft: 10},
  ml15: {marginLeft: 15},
  ml20: {marginLeft: 20},

  mr0: {marginRight: 0},
  mr5: {marginRight: 5},
  mr10: {marginRight: 10},
  mr15: {marginRight: 15},
  mr20: {marginRight: 20},

  // --------FONTS------------------
  fontxxs: {fontSize: 10},
  fontxs: {fontSize: 11},
  fontsm: {fontSize: 12},
  fontbody: {fontSize: 14},
  fontmd: {fontSize: 16},
  fontlg: {fontSize: 20},
  fontxl: {fontSize: 26},
  fontxxl: {fontSize: 30},
  fontxxxl: {fontSize: 40},

  fontbold: {fontWeight: 'bold'},

  // --------Radius------------------
  border: {
    borderRadius: 12,
  },
  //----------FLEX------------------------
  flexbox: {
    display: 'flex',
  },
  flexrow: {
    flexDirection: 'row',
  },
  flexcolumn: {
    flexDirection: 'column',
  },
  flexone: {
    flex: 1,
  },
  flexthree:{
    flex: 3
  },
  center: {
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'center',
  },
  justifybetween: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  w100: {
    width: '100%',
  },
  w50: {
    width: '50%',
  },
  textcenter: {
    textAlign: 'center',
  },
  textright: {
    textAlign: 'right',
  },
  white: {
    color: '#fff',
  },
  red: {
    color: '#FF0000',
  },
  whitebg: {
    backgroundColor: '#fff',
  },
  borderbottom: {
    borderBottomColor: '#DCDCDC',
    borderBottomWidth: 1,
  },
  bordernone: {
    borderWidth: 0,
    borderBottomWidth: 0,
  },
  textupercase: {
    textTransform: 'uppercase',
  },
  textright: {
    textAlign: 'right',
  },
  aligncenter: {
    alignItems: 'center',
  },
  bgwhite: {
    backgroundColor: '#fff',
  },
  textgray: {
    color: '#878787',
  },
});

import {StyleSheet} from 'react-native';

export const theme = StyleSheet.create({
  themeheader: {
    backgroundColor: '#fff',
  },
  fontthin: {
    fontFamily: 'Roboto-Thin',
  },
  fontlight: {
    fontFamily: 'Roboto-Light',
  },
  fontregular: {
    fontFamily: 'Roboto-Regular',
  },
  fontmedium: {
    fontFamily: 'Roboto-Medium',
  },
  fontbold: {
    fontFamily: 'Roboto-Bold',
  },
  fontblack: {
    fontFamily: 'Roboto-Black',
  },
  colorblack: {
    color: '#272727',
  },

  section_orange: {
    backgroundColor: '#F16436',
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    padding: 30,
    height: '100%',
  },
  
  button_white: {
    backgroundColor: '#fff',
    borderRadius: 10,
    height: 55,
  },
  button_border: {
    borderColor: '#fff',
    borderRadius: 10,
    height: 55,
  },
  themecolor: {
    color: '#F16436',
  },
  textcapital: {
    textTransform: 'capitalize',
  },
  button_orange: {
    backgroundColor: '#F16436',
    borderRadius: 10,
    height: 55,
  },





// agent style -----------------------
graytext:{
  color:'#A7A7A7',
},
primarybackground:{
  backgroundColor:'#00AFEF',
},
lightblue:{
  backgroundColor:'#F1F7F9',
},
navyblue:{
  color: '#043040'
},
graydark:{
  color: '#8B8B8B'
},
graylight:{
  color: '#C5C5C5'
},
graylightbg:{
  backgroundColor: '#F5F5F5'
},
textred:{
  color: '#FF0000',
},
upload:{
  height:150,
  width:'100%'
},
callbtn:{
  width:50,
  height:50,
  borderRadius: 30,
  backgroundColor:'#00AFEF',
},
thumbnail:{
  width:50,
  height:50,
  borderRadius: 30,
},
thumbnailsm:{
  width:50,
  height:50,
  borderRadius: 10,
},
cancelbtn:{
  height:54,
  backgroundColor:'#FF3E3E',
  textAlign: 'center',
  borderRadius: 0,
  borderBottomLeftRadius:10,
},
primarybtn:{
  height:54,
  backgroundColor:'#043040',
  borderRadius: 0,
  borderBottomRightRadius:10,
},
progresssec:{
  width:38,
  height:38,
  backgroundColor:'#fff',
  borderWidth:1,
  borderColor:'#fff',
  backgroundColor:'#00AFEF',
  borderRadius: 50,
},
bgimage: {
  flex: 1,
  resizeMode: "cover",
  justifyContent: "center"
},
bottomfix:{
  position: 'relative',
  height:'92%',
},
actionsheet:{
  backgroundColor:'#00AFEF',
  position: 'absolute', 
  bottom: 0,
  width:'100%',
  borderTopLeftRadius: 40,
  borderTopRightRadius: 40,
},
whitecricle:{
  borderRadius: 50,
  width:48,
  height:48,
  borderWidth:1,
  borderColor:'#fff',
},
borderlight:{
  borderBottomColor: '#00A1DC',
  borderBottomWidth: 1,
},
bluelight:{
  color:'#8FE1FF',
},
tabs:{
backgroundColor:'#fff',
borderRadius: 20,
padding:3,
width:150
},
tabwidth:{
  width:75,
  backgroundColor:'#00AFEF',
  padding:3,
  borderRadius: 20,
},
image: {
  flex: 1,
  resizeMode: "cover",
  justifyContent: "center"
},
timecircle:{
  width:13,
  height:13,
  borderWidth:1,
  borderRadius:50,
  borderColor:'#8FE1FF',
  borderWidth:1,
},
timecirclesmall:{
  width:12,
  height:12,
  borderWidth:1,
  borderRadius:50,
  borderColor:'#00AFEF',
  borderWidth:2,
  marginRight:10,
},
timeline:{
width:1,
backgroundColor:'#8FE1FF',
flex:1
},
lightblack:{
  backgroundColor:'#272727',
},
button_dotted: {
  backgroundColor: '#fff',
  borderRadius: 10,
  height: 55,
  borderWidth:3,
  borderStyle: 'dashed',
  borderColor:'#DCDCDC',
  shadowOpacity: 0,
},




  section_blue: {
    backgroundColor: '#00AFEF',
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    height: '100%',
    display: 'flex',
    flex: 1,
  },
  select_text: {
    color: '#8FE1FF',
    textTransform: 'uppercase',
  },
  sliderwp: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  borderbottom: {
    borderBottomWidth: 1,
    borderColor: '#00A1DC',
  },
  button_rounded: {
    backgroundColor: '#fff',
    borderRadius: 30,
    height: 60,
    paddingRight: 15,
  },
  icon_btn: {
    backgroundColor: '#00AFEF',
    width: 30,
    height: 30,
    borderRadius: 20,
  },
  bluecolor: {
    color: '#00AFEF',
  },
  bgblue: {
    backgroundColor: '#00AFEF',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 20,
    margin: 15,
  },
  borderbottomgray: {
    borderBottomWidth: 1,
    borderBottomColor: '#DCDCDC',
  },
  btn_small: {
    height: 25,
    backgroundColor: '#F16436',
    marginLeft: 10,
  },
  footercard: {
    backgroundColor: '#F5F7F9',
    borderBottomLeftRadius: 20,
    borderBottomEndRadius: 20,
  },
  colorgray: {
    color: '#767778',
  },
  tabhome: {
    backgroundColor: '#fff',
    padding: 5,
    borderRadius: 20,
  },
  colororange: {
    color: '#F16436',
  },
  bgorange: {
    backgroundColor: '#F16436',
  },
  slider_btm: {
    borderRadius: 20,
    position: 'relative',
    backgroundColor: '#fff',
    width: 200,
    height: 200,
    marginRight: 15,
  },
  sliderimg: {
    overflow: 'hidden',
    borderRadius: 20,
    width: 200,
    height: 200,
  },
  slidertxt: {
    position: 'absolute',
    left: 0,
    bottom: 0,
    padding: 10,
    zIndex: 1004,
  },
  overLay: {
    position: 'absolute',
    top: 0,
    left: 0,
    height: 200,
    width: 200,
    backgroundColor: '#000',
    borderRadius: 20,
    zIndex: 1001,
    opacity: 0.3,
  },
  coloryellow: {
    color: '#F3DB00',
  },
  colorred: {
    color: '#FF0000',
  },
  bggray: {
    backgroundColor: '#F1F7F9',
  },
  btncall: {
    backgroundColor: '#00AFEF',
    width: 55,
    height: 55,
    padding: 0,
  },
  payablebox: {
    padding: 10,
    borderRadius: 10,
    backgroundColor: '#0294C9',
    marginLeft: 20,
    marginRight: 20,
  },
  boxmodel: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 20,
  },
  otpbox: {
    borderColor: '#F16436',
    borderStyle: 'dotted',
    borderWidth: 2,
    borderRadius: 1,
    position: 'relative',
    padding: 10,
    margin: 10,
    backgroundColor: '#fff',
    color: '#F16436',
  },
  stargray: {
    color: '#DCDCDC',
  },
  boxmodelbottom: {
    backgroundColor: '#fff',
    padding: 20,
    margin: 0,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  footermap: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    padding: 15,
    width: '100%',
  },
  cardwp: {
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#F16436',
    margin: 15,
    padding: 15,
  },
  borderred: {
    borderColor: '#F16436',
  },
  borderblue: {
    borderColor: '#00AFEF',
  },
  listCard: {
    backgroundColor: '#fff',
    padding: 10,
    margin: 15,
    marginBottom: 5,
    borderRadius: 10,
    paddingBottom: 15,
    marginTop: 5,
    overflow: 'hidden',

  },
  bggray: {
    backgroundColor: '#ECECEC',
  },
  colorgreen: {
    color: '#00D681',
  },
});







/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useEffect,useState} from 'react';
import {StatusBar, Image, TouchableOpacity, ScrollView,Platform,PermissionsAndroid} from 'react-native';
import ProgressCircle from 'react-native-progress-circle'
import {
  Container,
  View,
  Header,
  Form,
  Item,
  Label,
  Input,
  Button,
  Text,
  Body,
  Title,
  Left,
  Picker,
  Icon,
  ListItem,
  Thumbnail,
  Right,
} from 'native-base';

import {theme} from '../css/theme';
import {common} from '../css/common';
//import firestore from '@react-native-firebase/firestore';
import * as geofirestore from 'geofirestore';
import firebase from '@react-native-firebase/app';
import { lightblue } from 'color-name';
import Geolocation from '@react-native-community/geolocation';
import {CommonActions} from '@react-navigation/native';
import {showLoader, hideLoader} from '../actions/common/commonActions'
import {appConfig} from '../appConfig'
import { getRequestList,acceptMoneyRequest} from '../actions/accept/acceptActions'
import HeaderPage from './shared/header'
import {useSelector, useDispatch} from 'react-redux'

import {RootStackParamList} from '../RouteConfig'
import {StackNavigationProp} from '@react-navigation/stack'
import {RouteProp} from '@react-navigation/native'
import {RootState} from '../appReducers'
import CountryPicker, {DARK_THEME} from 'react-native-country-picker-modal'


import { TextInputMask } from 'react-native-masked-text'
import AsyncStorage from '@react-native-community/async-storage';
import Storage from 'react-native-storage';
import { acc } from 'react-native-reanimated';
var storage = new Storage({size: 1000,storageBackend: AsyncStorage,defaultExpires: 1000 * 3600 * 24,enableCache: false});

type NotificationPageRouteProp = RouteProp<RootStackParamList, 'AgentHome'>

type NotificationPageNavigationProp = StackNavigationProp<
  RootStackParamList,
  'AgentHome'
>

type Props = {
  route: NotificationPageRouteProp
  navigation: NotificationPageNavigationProp
}

// var firebaseConfig = {
//     apiKey: "AIzaSyBBRJJRhgZzjprChQ-5Fo8X-lTiO9uB8gs",
//     authDomain: "whateveruwant-b092b.firebaseapp.com",
//     databaseURL: "https://whateveruwant-b092b.firebaseio.com",
//     projectId: "whateveruwant-b092b",
//     storageBucket: "whateveruwant-b092b.appspot.com",
//     messagingSenderId: "329973517308",
//     appId: "1:329973517308:android:353a07ab9e861a9c08c079",
    
//   };
 // firebase.initializeApp(firebaseConfig)
  

const AgentHome = (props:Props) => {

  const dispatch = useDispatch()

  const [currentLongitude,setCurrentLongitude] = useState(0);
  const [currentLatitude,setCurrentLatitude] = useState(0);
  const [locationStatus,setLocationStatus] = useState('');
  const [list,setList] = useState([])
  const [acceptData,setAcceptData] = useState({})

  const getOneTimeLocation = () => {
    setLocationStatus('Getting Location ...');
    Geolocation.getCurrentPosition(
      //Will give you the current location
      (position) => {
      
        setLocationStatus('You are Here');
         console.log("position",position)
        //getting the Longitude from the location json
        const currentLongitude = position.coords.longitude;

        //getting the Latitude from the location json
        const currentLatitude = position.coords.latitude;

        //Setting Longitude state
        setCurrentLongitude(currentLongitude);
        
        //Setting Longitude state
        setCurrentLatitude(currentLatitude);
        
        storage.load({key:'userData'}).then((ret)=>{

          const firestore = firebase.firestore();


          const GeoFirestore = geofirestore.initializeApp(firestore);


          const geocollection = GeoFirestore.collection('Users');
         
          const documentReference = geocollection.doc(ret.uuid);
          documentReference.set({ geopoint: new firebase.firestore.GeoPoint(currentLatitude, currentLongitude) }, { customKey: 'geopoint' })
            .then((result) => {console.log("result",result)})
            .catch((error)=>{
                console.log("error",error);
              })
            
            
        })
        
        
        dispatch(getRequestList())
       

      },
      (error) => {
        setLocationStatus(error.message);
      },
      {
        enableHighAccuracy: false,
        timeout: 30000,
        maximumAge: 1000
      },
    );
  };

  useEffect(()=>{
    
    const requestLocationPermission = async () => {
      dispatch(showLoader());
      if (Platform.OS === 'ios') {
        getOneTimeLocation();
       
      } else {
        try {
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
            {
              title: 'Location Access Required',
              message: 'WUW App needs to Access your location',
            },
          );
          if (granted === PermissionsAndroid.RESULTS.GRANTED) {

            //To Check, If Permission is granted
            getOneTimeLocation();
          
          } else {
            
            dispatch(getRequestList())
            setLocationStatus('Permission Denied');
            
          }
        } catch (err) {
         
          dispatch(getRequestList())
          console.warn(err);
        }
      }
    };
    requestLocationPermission();
  },[props.navigation])

  const requests = useSelector((state:RootState)=>state.accept_r._requestList)

  useEffect(()=>{
    if(requests != undefined){
      dispatch(hideLoader());
      if(requests.status == true){
        console.log("requests",requests);
        setList(requests?.request_list)
      }else{
        appConfig.functions.showError(requests.message)
      }
    }

  },[requests])

  function getTimeRemaining(starttime,interval){
    var startTime = new Date();
    var endtime = new Date(starttime);
    console.log("startdate",startTime);
    endtime.setHours( endtime.getHours() + parseInt(interval) );
    console.log('endtime',endtime);
    const total = Date.parse(endtime) - Date.parse(startTime);
    console.log('total',total );
    const seconds = Math.floor( (total/1000) % 60 );
    const minutes = Math.floor( (total/1000/60) % 60 );
    const hours = Math.floor( (total/(1000*60*60)) % 24 );
    const days = Math.floor( total/(1000*60*60*24) );
     
    
    return minutes
  }

  const acceptRequest = (data) => {
    dispatch(showLoader());
    dispatch(acceptMoneyRequest({unique_money_request_id:data.unique_money_request_id}))
    setAcceptData(data);
  }

  const accepted = useSelector((state:RootState)=>state.accept_r._acceptRequest)

  useEffect(()=>{
   if(accepted != undefined){
     dispatch(hideLoader());
     if(accepted.status == true){
       props.navigation.navigate('AgentArrived',{data:acceptData,lat:currentLatitude,lng:currentLongitude})
     }else{
       appConfig.functions.showError(accepted.message);
     }
   }
  },[accepted])
 
    return (
      <Container style={[theme.primarybackground]}>
        <HeaderPage back={false} title="" color="blue" right="agent" isAgent={true}/>
        {/* <StatusBar barStyle="dark-content" />
        <Header
          androidStatusBarColor="#00AFEF"
          iosBarStyle="dark-content"
          style={[theme.primarybackground]}>
          <Left>
            <Button transparent>
              <Icon
                name="menu"
                type="Feather"
                style={[theme.colorblack, common.fontxl]}
              />
            </Button>
          </Left>
          <Body />
          <Right>
          <View style={[common.flexbox, common.flexrow,theme.tabs]}>
                <View style={[common.flexone,common.center]}>
                <Text style={[common.fontxs,theme.colorblack,common.fontbold,theme.bluecolor]}>REQUEST</Text>
                </View>
                <View style={[common.flexone,theme.tabwidth,common.center]}>
                  <Text style={[common.fontxs,theme.colorblack,common.white,common.fontbold]}>AGENT</Text>
                </View>
              </View>
          </Right>
        </Header> */}
        <ScrollView >
          
        <View style={[common.pb20]}>
        {/* <View style={[common.pl20, common.pr20,common.pt20,]}>
          <View style={[common.whitebg, common.border]}>
          <ListItem avatar >
            <Left>
              <Thumbnail
                source={require('../assets/images/laundry_icon.png')}
                style={{width: 35, height: 35, borderRadius: 40}}
              />
            </Left>
            <Body style={[common.bordernone]}>
            <Text style={[common.colorblack, common.fontbody, common.fontbold]}>#1236</Text>
            <Text style={[theme.graytext, common.fontsm]}>Laundry Pickup </Text>
            </Body>
            <View style={[common.pl15, common.pr15]}>
            <Text style={[theme.graytext, common.fontsm]}>1m</Text>
            </View>
          </ListItem>

          <View style={[theme.lightblue,common.pb15]}>

          <View style={[common.flexbox,common.flexrow,common.justifybetween,common.pl15,common.pt15,common.pr15]}>
          <Text style={[common.fontxs, theme.fontbold, theme.graytext,]}>PICKUP</Text>
          
          </View>
          <ListItem avatar>
            <Left>
              <Thumbnail
                source={require('../assets/images/thumbuser.png')}
                style={{width: 50, height: 50, borderRadius: 40}}
              />
            </Left>
            <Body style={[common.bordernone]}>
            <Text style={[common.colorblack, common.fontbody, common.fontbold]}>Grame Smith</Text>
            <Text style={[common.colorblack, common.fontsm]}>600 Alexander Rd, NJ 58550</Text>
            <Text style={[theme.fontbold,common.fontxs,theme.themecolor]}>Pickup - Today 10:00 AM</Text>
            </Body>
            <View>
            <Button style={[theme.callbtn,common.mr15]}>
                    <Icon
                      name="call"
                      type="MaterialIcons"
                      style={[theme.white, common.fontlg, common.white]}
                    />
                </Button>
            </View>
          </ListItem>
          <Text style={[common.fontxs, theme.fontbold, theme.graytext,common.pl15,common.pt15,common.pr15]}>DELIVERY</Text>
          <ListItem avatar>
            <Left>
              <Thumbnail
                source={require('../assets/images/thumbslider.png')}
                style={{width: 50, height: 50, borderRadius: 10}}
              />
            </Left>
            <Body style={[common.bordernone]}>
            <Text style={[common.colorblack, common.fontbody, common.fontbold]}>Lavo Laundry & Dry </Text>
            <Text style={[common.colorblack, common.fontsm]}>600 Alexander Rd, NJ 58550</Text>
            </Body>
            <View>
            <Button style={[theme.callbtn,common.mr15]}>
                    <Icon
                      name="call"
                      type="MaterialIcons"
                      style={[theme.white, common.fontlg, common.white]}
                    />
                </Button>
            </View>
          </ListItem>
        </View>
            <View style={[common.flexbox,common.flexrow]}>
              <Button style={[theme.cancelbtn,common.center,common.w50]}>
                <Text style={[common.center,common.fontmd,common.fontbold]}>Cancel</Text>
              </Button>
              <Button style={[theme.primarybtn,common.center,common.w50]}>
                <Text style={[theme.white,common.center,common.fontmd,common.fontbold]}>Accept</Text>
              </Button>
            </View>
          </View>
        </View> */}
        {
          list != undefined && list.length > 0 && list.map((item,index)=>{
            return(
              <View style={[common.pl20, common.pr20,common.pt20,]} key={index}>
              <View style={[common.whitebg, common.border]}>
              <ListItem avatar style={{flexDirection:"row"}}>
                <Left style={{flex:1}}>
                  <Thumbnail
                    source={require('../assets/images/walletblue.png')}
                    style={{width: 35, height: 35, borderRadius: 40}}
                  />
                </Left>
                <Body style={[common.bordernone,{flex:3}]}>
                <Text style={[common.colorblack, common.fontbody, common.fontbold,{alignItems: 'center',paddingTop:10}]}>#{item.unique_money_request_id}</Text>
                <View style={[common.flexbox,common.flexrow,{alignItems: 'center',paddingTop:10}]}>
                  <Text style={[theme.graytext, common.fontsm]}>Money Request </Text>
            <Text style={[theme.colorblack, common.fontmd, common.fontbold]}>${item.original_amount}</Text>
                </View>
                </Body>
                <Right style={{flex:5}}>
                  <View style={[common.ml15, ]}>
                    <Button rounded bordered small danger >
                      <Text style={[theme.textcapital,common.fontsm]}>Expire in {getTimeRemaining(item.created_date,item.time_duration)} min</Text>
                    </Button>
                  </View>
                </Right>
              </ListItem>
    
              <View style={[theme.lightblue,]}>
              <ListItem avatar>
                <Left>
                  <Thumbnail
                    source={{uri:item.requester_profile_image}}
                    style={{width: 50, height: 50, borderRadius: 40}}
                  />
                </Left>
                <Body style={[common.bordernone]}>
            <Text style={[common.colorblack, common.fontbody, common.fontbold]}>{item.requester_first_name} {item.requester_last_name}</Text>
                <Text style={[common.colorblack, common.fontsm]}>600 Alexander Rd, NJ 58550</Text>
                <Text style={[theme.fontbold,common.fontxs,theme.themecolor]}>Pickup - Today 10:00 AM</Text>
                </Body>
                <View>
                <Button style={[theme.callbtn,common.mr15]} onPress={()=>Linking.openURL(`tel:${item?.requester_phone_prefix + item?.requester_phone}`)}>
                        <Icon
                          name="call"
                          type="MaterialIcons"
                          style={[theme.white, common.fontlg, common.white]}
                        />
                    </Button>
                </View>
              </ListItem>
    
            </View>
                <View style={[common.flexbox,common.flexrow]}>
                  <Button style={[theme.cancelbtn,common.center,common.w50]}>
                    <Text style={[common.center,common.fontmd,common.fontbold]}>Cancel</Text>
                  </Button>
                
                  <Button style={[theme.primarybtn,common.center,common.w50]} onPress={()=> acceptRequest(item)}>
                    <Text style={[theme.white,common.center,common.fontmd,common.fontbold]}>Accept</Text>
                  </Button>
                </View>
              </View>
            </View>
            )
          })
        }
      
        {/* <View style={[common.pl20, common.pr20,common.pt20,]}>
          <View style={[common.whitebg, common.border]}>
          <ListItem avatar >
            <Left>
              <Thumbnail
                source={require('../assets/images/laundry_icon.png')}
                style={{width: 35, height: 35, borderRadius: 40}}
              />
            </Left>
            <Body style={[common.bordernone]}>
            <Text style={[common.colorblack, common.fontbody, common.fontbold]}>#1236</Text>
            <View style={[common.flexbox,common.flexrow,{alignItems: 'center',}]}>
              <Text style={[theme.graytext, common.fontsm]}>Laundry Pickup</Text>
              <Text style={[theme.colorblack, common.fontmd, common.fontbold]}> 35 </Text>
              <Text style={[theme.colorblack, common.fontsm]}>Pounds</Text>
            </View>
            </Body>
            <View style={[common.pl15, common.pr15]}>
            <Text style={[theme.graytext, common.fontsm]}>1m</Text>
            </View>
          </ListItem>

          <View style={[theme.lightblue,common.pb15]}>
          <View style={[common.flexbox,common.flexrow,common.justifybetween,common.pl15,common.pt15,common.pr15]}>
          <Text style={[common.fontxs, theme.fontbold, theme.graytext,]}>PICKUP</Text>
          <Text style={[common.fontxs, theme.fontbold, theme.colororange]}>2.2 miles</Text>
          </View>
          

          <ListItem avatar>
            <Left>
              <Thumbnail
                source={require('../assets/images/thumbuser.png')}
                style={{width: 50, height: 50, borderRadius: 40}}
              />
            </Left>
            <Body style={[common.bordernone]}>
            <Text style={[common.colorblack, common.fontbody, common.fontbold]}>Grame Smith</Text>
            <Text style={[common.colorblack, common.fontsm]}>600 Alexander Rd, NJ 58550</Text>
            <Text style={[theme.fontbold,common.fontxs,theme.themecolor]}>Pickup - Today 10:00 AM</Text>
            </Body>
            <View>
            <Button style={[theme.callbtn,common.mr15]}>
                    <Icon
                      name="call"
                      type="MaterialIcons"
                      style={[theme.white, common.fontlg, common.white]}
                    />
                </Button>
            </View>
          </ListItem>
          <Text style={[common.fontxs, theme.fontbold, theme.graytext,common.pl15,common.pt15,common.pr15]}>DELIVERY</Text>
          <ListItem avatar>
            <Left>
              <Thumbnail
                source={require('../assets/images/thumbslider.png')}
                style={{width: 50, height: 50, borderRadius: 10}}
              />
            </Left>
            <Body style={[common.bordernone]}>
            <Text style={[common.colorblack, common.fontbody, common.fontbold]}>Lavo Laundry & Dry </Text>
            <Text style={[common.colorblack, common.fontsm]}>600 Alexander Rd, NJ 58550</Text>
            </Body>
            <View>
            <Button style={[theme.callbtn,common.mr15]}>
                    <Icon
                      name="call"
                      type="MaterialIcons"
                      style={[theme.white, common.fontlg, common.white]}
                    />
                </Button>
            </View>
          </ListItem>
        </View>
            <View style={[common.flexbox,common.flexrow]}>
              <Button style={[theme.cancelbtn,common.center,common.w50]}>
                <Text style={[common.center,common.fontmd,common.fontbold]}>Cancel</Text>
              </Button>
              <Button style={[theme.primarybtn,common.center,common.w50]}>
                <Text style={[theme.white,common.center,common.fontmd,common.fontbold]}>Accept</Text>
              </Button>
            </View>
          </View>
        </View> */}
        </View>
        

        </ScrollView>
      </Container>
    );
  }


  export default AgentHome

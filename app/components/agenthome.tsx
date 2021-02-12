/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useEffect,useState} from 'react';
import {Alert,StatusBar, Image, TouchableOpacity, ScrollView,Platform,PermissionsAndroid,Linking,RefreshControl} from 'react-native';
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
//import Geolocation from '@react-native-community/geolocation';
import GetLocation from 'react-native-get-location'
import {CommonActions} from '@react-navigation/native';
import {showLoader, hideLoader} from '../actions/common/commonActions'
import {appConfig} from '../appConfig'
import { getRequestList,acceptMoneyRequest,cancelRequest,agentAcceptLaundryRequest,cancelLaundryRequest} from '../actions/accept/acceptActions'
import HeaderPage from './shared/header'
import {useSelector, useDispatch} from 'react-redux'
import io, { Socket } from 'socket.io-client'

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

//var watchId:any = null

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
  const [error,setError] = useState('')
  const [refreshing, setRefreshing] = useState(false);

  const [currentLongitude,setCurrentLongitude] = useState(0);
  const [currentLatitude,setCurrentLatitude] = useState(0);
  const [locationStatus,setLocationStatus] = useState('');
  const [list,setList] = useState([])
  const [laundlist,setLaundlist] = useState([])
  const [acceptData,setAcceptData] = useState({})
  
  // const getOneTimeLocation = () => {
    
  //   watchId =  Geolocation.watchPosition(
  //     pos => {
  //       setError("");
  //       console.log("coordinates",pos.coords)
  //       const currentLatitude = pos.coords.latitude;
  //       const currentLongitude = pos.coords.longitude;
  //       setCurrentLatitude(currentLatitude);
  //       setCurrentLongitude(currentLongitude);
  //       storage.load({key:'userData'}).then((ret)=>{

  //         const firestore = firebase.firestore();


  //         const GeoFirestore = geofirestore.initializeApp(firestore);


  //         const geocollection = GeoFirestore.collection('Users');
         
  //         const documentReference = geocollection.doc(ret.uuid);
  //         documentReference.set({ geopoint: new firebase.firestore.GeoPoint(currentLatitude, currentLongitude) }, { customKey: 'geopoint' })
  //           .then((result) => {console.log("result",result)})
  //           .catch((error)=>{
  //               console.log("error",error);
  //             })
            
            
  //       })
        
        
  //       dispatch(getRequestList())
        
  //     },
  //     e => {
  //       setError(e.message)
  //       dispatch(getRequestList())
  //     }
  //   );

  // };
  const refreshToken = useSelector((state:RootState)=>state.token_r._token.refreshtoken);
 const token = useSelector((state:RootState)=>state.token_r._token.token);
 
 

  useEffect(()=>{
    
    const unsubscribe = props.navigation.addListener('focus', () => {

      console.log("token",token);
      console.log("refreshToken",refreshToken);
   
      const  socket = io(appConfig.apiSocketBaseUrl,{query:{token,refreshToken}})
  
      socket.on('connect',function(){
        console.log("connected",socket.connected);
      });
      socket.on('connect_error',function(data){
         console.log('errrrrrrooorrr',data)
      })
      storage.load({key:'userData'}).then((ret)=>{
        console.log('ret.email',ret.email);
        socket.on(ret.email,function(data){
          console.log("data",data);
          if(data?.cmd == 'new_money_request' || data?.cmd ==  "new_pickup_laundry_request" || data?.cmd == "new_delivery_laundry_request" || data?.cmd == "refresh_req_list" || data?.cmd == "remove_money_request" || data?.cmd == "remove_laundry_request" || data?.cmd == "accepted_by_another_agent"){
            dispatch(getRequestList())
          }
        })
      })
      dispatch(showLoader());
        GetLocation.getCurrentPosition({
          enableHighAccuracy: true,
          timeout: 15000,
        })
        .then(location => {
          setCurrentLatitude(location.latitude);
          setCurrentLongitude(location.longitude);
        
        console.log(location);
      
        storage.load({key:'userData'}).then((ret)=>{

                  const firestore = firebase.firestore();
        
        
                  const GeoFirestore = geofirestore.initializeApp(firestore);
        
        
                  const geocollection = GeoFirestore.collection('Users');
                 
                  if(ret.uuid){
                    const documentReference = geocollection.doc(ret.uuid);
                    documentReference.set({ geopoint: new firebase.firestore.GeoPoint(location.latitude, location.longitude) }, { customKey: 'geopoint' })
                      .then((result) => {console.log("result",result)})
                      .catch((error)=>{
                          console.log("error",error);
                        })
                  }
                  
                    
                    
                })
                
                
                dispatch(getRequestList())
      })
      .catch(error => {
          const { code, message } = error;
          console.warn(code, message);
          dispatch(getRequestList())
        
      })
      const unsubscribeblur = props.navigation.addListener('blur', () => {
        console.log('blurrrrr');
        socket.emit('manual_disconnect')
     })
     return unsubscribeblur;
  

    });
    
    return unsubscribe;
   
  
  },[props.navigation])

  const requests = useSelector((state:RootState)=>state.accept_r._requestList)

  useEffect(()=>{
    if(requests != undefined){
      dispatch(hideLoader());
      setRefreshing(false);
     // Geolocation.clearWatch(watchId)
      if(requests.status == true){
        console.log("requests",requests);
        setList(requests?.data?.money_request_list)
        setLaundlist(requests?.data?.laundry_request_list)
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

  function getDeliveryTime(starttime,interval){
   
    var endtime = new Date(starttime);
    
   var splittime = interval.split('.');
  
    endtime.setHours( endtime.getHours() + parseInt(splittime[0]) );
    if(splittime[1] != undefined){
      endtime.setMinutes(endtime.getMinutes() + 30)
    }
    var time = endtime.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
   
      console.log('time',time);
    
     
    
    return time
  }

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    dispatch(getRequestList())
    
  }, []);


  const acceptRequest = (data) => {
    dispatch(showLoader());
    dispatch(acceptMoneyRequest({unique_money_request_id:data.unique_money_request_id}))
    setAcceptData(data);
  }

  const acceptLaundryRequest = (data) => {
    dispatch(showLoader());
    if(data?.agent_request_type == 'pickup'){
      dispatch(agentAcceptLaundryRequest({unique_laundry_request_id:data.unique_laundry_request_id,order_status:'pickup_agent_accept'}))
    }else{
      dispatch(agentAcceptLaundryRequest({unique_laundry_request_id:data.unique_laundry_request_id,order_status:'delivery_agent_accept'}))
    }
    
    setAcceptData(data);
  }


  

  const accepted = useSelector((state:RootState)=>state.accept_r._acceptRequest)

  useEffect(()=>{
   if(accepted != undefined){
     dispatch(hideLoader());
     if(accepted.status == true){
       props.navigation.navigate('AgentArrived',{data:acceptData,lat:currentLatitude,lng:currentLongitude,status:"accepted",service:'money'})
     }else{
       appConfig.functions.showError(accepted.message);
     }
   }
  },[accepted])

  const acceptLaundry = useSelector((state:RootState)=>state.accept_r._acceptLaundry);

  useEffect(()=>{
    if(acceptLaundry != undefined){
      dispatch(hideLoader());
      
      if(acceptLaundry.status == true){
        if(acceptData?.agent_request_type == 'pickup'){
          props.navigation.navigate('AgentArrived',{data:acceptData,lat:currentLatitude,lng:currentLongitude,status:"pickup_agent_accept",service:'laundry'})
        }else{
          props.navigation.navigate('AgentArrived',{data:acceptData,lat:currentLatitude,lng:currentLongitude,status:"delivery_agent_accept",service:'laundry'})
        }
        }else{
        appConfig.functions.showError(acceptLaundry.message)
      }
    }
  })


  const cancelThisRequest = (data,index)=>{
    Alert.alert('Cancel', 'Are you sure you want to cancel this request?',
    [
        { text: 'cancel' },
        { text: 'yes', onPress: () => { 
           dispatch(showLoader())
           
              dispatch(cancelRequest({unique_money_request_id:data.unique_money_request_id}))
        }}])
  }

  const cancelThisLaundryRequest = (data,index)=>{
    Alert.alert('Cancel', 'Are you sure you want to cancel this request?',
    [
        { text: 'cancel' },
        { text: 'yes', onPress: () => { 
            dispatch(showLoader())
            
              dispatch(cancelLaundryRequest({unique_laundry_request_id:data.unique_laundry_request_id,order_status:"pickup_agent_reject"}))
        }}])
  }

  const moneyCancel = useSelector((state:RootState)=>state.accept_r._mrCancel)
  
  useEffect(()=>{
     if(moneyCancel != undefined){
       
       if(moneyCancel.status == true){
             dispatch(getRequestList())
       }else{
         dispatch(hideLoader())
         appConfig.functions.showError(moneyCancel.message)
       }
     }
  },[moneyCancel])

  const laundryCancel = useSelector((state:RootState)=>state.accept_r._lrCancel)
 
  useEffect(()=>{
    if(laundryCancel != undefined){
      
      if(laundryCancel.status == true){
        dispatch(getRequestList())
      }else{
        dispatch(hideLoader())
        appConfig.functions.showError(laundryCancel.message)
      }
    }
  },[laundryCancel])

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
        <ScrollView
         refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        >
          
        <View style={[common.pb20]}>
        
        {
          list != undefined && list?.length > 0 && list.map((item,index)=>{
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
                <Text style={[common.colorblack, common.fontbody, common.fontbold,{alignItems: 'center',paddingTop:10}]}>#{item?.unique_money_request_id}</Text>
                <View style={[common.flexbox,common.flexrow,{alignItems: 'center',paddingTop:10}]}>
                  <Text style={[theme.graytext, common.fontsm]}>Money Request </Text>
            <Text style={[theme.colorblack, common.fontmd, common.fontbold]}>${item?.original_amount}</Text>
                </View>
                </Body>
                <Right style={{flex:5}}>
                  <View style={[common.ml15, ]}>
                    <Button rounded bordered small danger >
                      <Text style={[common.fontsm,{fontSize:10}]}>Delivery by {getDeliveryTime(item?.created_date,item.time_duration)}</Text>
                    </Button>
                  </View>
                </Right>
              </ListItem>
    
              <View style={[theme.lightblue,]}>
              <ListItem avatar>
                <Left>
                 
                  {
                   
                    (item?.requester_profile_image == undefined || item?.requester_profile_image == '')
                    &&
                    <Thumbnail
                      source={require('../assets/images/no-photo.jpg')}
                      style={{width: 50, height: 50, borderRadius: 40}}
                    />
                  }
                  {
                   
                   item?.requester_profile_image != undefined && item?.requester_profile_image != ''
                   &&
                    <Thumbnail
                      source={{uri:item?.requester_profile_image}}
                      style={{width: 50, height: 50, borderRadius: 40}}
                    />
                  }
                </Left>
                <Body style={[common.bordernone]}>
            <Text style={[common.colorblack, common.fontbody, common.fontbold]}>{item?.requester_first_name} {item?.requester_last_name}</Text>
                <Text style={[common.colorblack, common.fontsm]}>{item?.pickup_location}</Text>
                {/* <Text style={[theme.fontbold,common.fontxs,theme.themecolor]}>Pickup - Today 10:00 AM</Text> */}
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
               
                  {
                    item?.status == 'requested'
                    &&
                    <View style={[common.flexbox,common.flexrow]}>
                      <Button style={[theme.cancelbtn,common.center,common.w50]} onPress={()=> cancelThisRequest(item,index)}>
                      <Text style={[common.center,common.fontmd,common.fontbold]}>Cancel</Text>
                    </Button>
                
                    <Button style={[theme.primarybtn,common.center,common.w50]} onPress={()=> acceptRequest(item)}>
                      <Text style={[theme.white,common.center,common.fontmd,common.fontbold]}>Accept</Text>
                    </Button>
                  </View>
                  }
                  {
                    item?.status == 'accepted'
                    &&
                    <View style={[common.flexbox,common.flexrow]}>
                      
                
                    <Button style={[theme.primarybtn,common.center,common.w100]} onPress={()=> props.navigation.navigate('AgentArrived',{data:item,lat:currentLatitude,lng:currentLongitude,status:"accepted",service:'money'})}>
                      <Text style={[theme.white,common.center,common.fontmd,common.fontbold]}>Start</Text>
                    </Button>
                  </View>
                  }
                  {
                    item?.status == 'started'
                    &&
                    <View style={[common.flexbox,common.flexrow]}>
                      
                
                    <Button style={[theme.primarybtn,common.center,common.w100]} onPress={()=> props.navigation.navigate('AgentArrived',{data:item,lat:currentLatitude,lng:currentLongitude,status:"started",service:'money'})}>
                      <Text style={[theme.white,common.center,common.fontmd,common.fontbold]}>Arrived</Text>
                    </Button>
                  </View>
                  }
                  {
                    item?.status == 'arrived'
                    &&
                    <View style={[common.flexbox,common.flexrow]}>
                      
                
                    <Button style={[theme.primarybtn,common.center,common.w100]} onPress={()=> {props.navigation.navigate('AgentService',{data:item})}}>
                      <Text style={[theme.white,common.center,common.fontmd,common.fontbold]}>Collect OTP</Text>
                    </Button>
                  </View>
                  }
              </View>
            </View>
            )
          })
        }
        {
           laundlist != undefined && laundlist.length > 0 && laundlist.map((item,index)=>{
            return(
              <View style={[common.pl20, common.pr20,common.pt20,]} key={index}>
          <View style={[common.whitebg, common.border]}>
          <ListItem avatar >
            <Left>
              <Thumbnail
                source={require('../assets/images/laundry_icon.png')}
                style={{width: 35, height: 35, borderRadius: 40}}
              />
            </Left>
            <Body style={[common.bordernone]}>
            <Text style={[common.colorblack, common.fontbody, common.fontbold]}>#{item.unique_laundry_request_id}</Text>
            <View style={[common.flexbox,common.flexrow,{alignItems: 'center',}]}>
              <Text style={[theme.graytext, common.fontsm]}>Laundry Pickup</Text>
              <Text style={[theme.colorblack, common.fontmd, common.fontbold]}> {item.normal_wash_weight} </Text>
              <Text style={[theme.colorblack, common.fontsm]}>Pounds</Text>
            </View>
            </Body>
            <View style={[common.pl15, common.pr15]}>
            {/* <Text style={[theme.graytext, common.fontsm]}>1m</Text> */}
            </View>
          </ListItem>

          <View style={[theme.lightblue,common.pb15]}>
          <View style={[common.flexbox,common.flexrow,common.justifybetween,common.pl15,common.pt15,common.pr15]}>
          <Text style={[common.fontxs, theme.fontbold, theme.graytext,]}>PICKUP</Text>
          {/* <Text style={[common.fontxs, theme.fontbold, theme.colororange]}>2.2 miles</Text> */}
          </View>
          
          {
            item?.agent_request_type == "pickup"
            &&
            <View>
            <ListItem avatar>
            <Left>
            {
                   
                   (item.requester_profile_image == undefined || item.requester_profile_image == '')
                   &&
                   <Thumbnail
                     source={require('../assets/images/no-photo.jpg')}
                     style={{width: 50, height: 50, borderRadius: 40}}
                   />
                 }
                 {
                  
                  item.requester_profile_image != undefined && item.requester_profile_image != ''
                  &&
                   <Thumbnail
                     source={{uri:item.requester_profile_image}}
                     style={{width: 50, height: 50, borderRadius: 40}}
                   />
                 }
            </Left>
            <Body style={[common.bordernone]}>
            <Text style={[common.colorblack, common.fontbody, common.fontbold]}>{item.requester_first_name} {item.requester_last_name}</Text>
            <Text style={[common.colorblack, common.fontsm]}>{item.pickup_location}</Text>
                <Text style={[theme.fontbold,common.fontxs,theme.themecolor]}>Pickup - Today {item.pickup_time}</Text>
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
           <Text style={[common.fontxs, theme.fontbold, theme.graytext,common.pl15,common.pt15,common.pr15]}>DELIVERY</Text>
           <ListItem avatar>
             <Left>
               <Thumbnail
                 source={{uri:item.laundromat_data?.profile_image}}
                 style={{width: 50, height: 50, borderRadius: 10}}
               />
             </Left>
             <Body style={[common.bordernone]}>
             <Text style={[common.colorblack, common.fontbody, common.fontbold]}>{item?.laundromat_data?.business_name} </Text>
             <Text style={[common.colorblack, common.fontsm]}>{item?.laundromat_data?.location} </Text>
             </Body>
             <View>
             <Button style={[theme.callbtn,common.mr15]} onPress={()=>Linking.openURL(`tel:${item?.laundromat_data?.phone_prefix + item?.laundromat_data?.phone}`)}>
                     <Icon
                       name="call"
                       type="MaterialIcons"
                       style={[theme.white, common.fontlg, common.white]}
                     />
                 </Button>
             </View>
           </ListItem>
           </View>
          }
          {
            item?.agent_request_type == "delivery"
            &&
            <View>
            <ListItem avatar>
             <Left>
               <Thumbnail
                 source={{uri:item.laundromat_data?.profile_image}}
                 style={{width: 50, height: 50, borderRadius: 10}}
               />
             </Left>
             <Body style={[common.bordernone]}>
             <Text style={[common.colorblack, common.fontbody, common.fontbold]}>{item?.laundromat_data?.business_name} </Text>
             <Text style={[common.colorblack, common.fontsm]}>{item?.laundromat_data?.location} </Text>
             </Body>
             <View>
             <Button style={[theme.callbtn,common.mr15]} onPress={()=>Linking.openURL(`tel:${item?.laundromat_data?.phone_prefix + item?.laundromat_data?.phone}`)}>
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
            {
                   
                   (item.requester_profile_image == undefined || item.requester_profile_image == '')
                   &&
                   <Thumbnail
                     source={require('../assets/images/no-photo.jpg')}
                     style={{width: 50, height: 50, borderRadius: 40}}
                   />
                 }
                 {
                  
                  item.requester_profile_image != undefined && item.requester_profile_image != ''
                  &&
                   <Thumbnail
                     source={{uri:item.requester_profile_image}}
                     style={{width: 50, height: 50, borderRadius: 40}}
                   />
                 }
            </Left>
            <Body style={[common.bordernone]}>
            <Text style={[common.colorblack, common.fontbody, common.fontbold]}>{item.requester_first_name} {item.requester_last_name}</Text>
            <Text style={[common.colorblack, common.fontsm]}>{item.pickup_location}</Text>
                <Text style={[theme.fontbold,common.fontxs,theme.themecolor]}>Pickup - Today {item.pickup_time}</Text>
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
          }
         
        </View>
           {
            (item?.status == 'send_pickup' || item?.status == 'send_delivery')
            &&
            <View style={[common.flexbox,common.flexrow]}>
              <Button style={[theme.cancelbtn,common.center,common.w50]} onPress={()=>cancelThisLaundryRequest(item,index)}>
                <Text style={[common.center,common.fontmd,common.fontbold]}>Cancel</Text>
              </Button>
              <Button style={[theme.primarybtn,common.center,common.w50]} onPress={()=> acceptLaundryRequest(item)}>
                <Text style={[theme.white,common.center,common.fontmd,common.fontbold]}>Accept</Text>
              </Button>
            </View>
           }
           {
                    item?.status == 'pickup_agent_accept'
                    &&
                    <View style={[common.flexbox,common.flexrow]}>
                      
                
                    <Button style={[theme.primarybtn,common.center,common.w100]} onPress={()=> props.navigation.navigate('AgentArrived',{data:item,lat:currentLatitude,lng:currentLongitude,status:"pickup_agent_accept",service:'laundry'})}>
                      <Text style={[theme.white,common.center,common.fontmd,common.fontbold]}>Start</Text>
                    </Button>
                  </View>
                  }
                  {
                    item?.status == 'pickup_agent_start'
                    &&
                    <View style={[common.flexbox,common.flexrow]}>
                      
                
                    <Button style={[theme.primarybtn,common.center,common.w100]} onPress={()=> props.navigation.navigate('AgentArrived',{data:item,lat:currentLatitude,lng:currentLongitude,status:"pickup_agent_start",service:'laundry'})}>
                      <Text style={[theme.white,common.center,common.fontmd,common.fontbold]}>Arrived</Text>
                    </Button>
                  </View>
                  }
                  {
                    item?.status == 'pickup_agent_arrived'
                    &&
                    <View style={[common.flexbox,common.flexrow]}>
                      
                
                    <Button style={[theme.primarybtn,common.center,common.w100]} onPress={()=> props.navigation.navigate('AgentArrived',{data:item,lat:currentLatitude,lng:currentLongitude,status:"pickup_agent_arrived",service:'laundry'})}>
                      <Text style={[theme.white,common.center,common.fontmd,common.fontbold]}>Collect</Text>
                    </Button>
                  </View>
                  }
                  {
                    item?.status == 'pickup_agent_collected'
                    &&
                    <View style={[common.flexbox,common.flexrow]}>
                      
                
                    <Button style={[theme.primarybtn,common.center,common.w100]} onPress={()=> props.navigation.navigate('AgentArrived',{data:item,lat:currentLatitude,lng:currentLongitude,status:"pickup_agent_collected",service:'laundry'})}>
                      <Text style={[theme.white,common.center,common.fontmd,common.fontbold]}>Deliver</Text>
                    </Button>
                  </View>
                  }

                  {
                    item?.status == 'delivery_agent_accept'
                    &&
                    <View style={[common.flexbox,common.flexrow]}>
                      
                
                    <Button style={[theme.primarybtn,common.center,common.w100]} onPress={()=> props.navigation.navigate('AgentArrived',{data:item,lat:currentLatitude,lng:currentLongitude,status:"delivery_agent_accept",service:'laundry'})}>
                      <Text style={[theme.white,common.center,common.fontmd,common.fontbold]}>Start</Text>
                    </Button>
                  </View>
                  }
                  {
                    item?.status == 'delivery_agent_start'
                    &&
                    <View style={[common.flexbox,common.flexrow]}>
                      
                
                    <Button style={[theme.primarybtn,common.center,common.w100]} onPress={()=> props.navigation.navigate('AgentArrived',{data:item,lat:currentLatitude,lng:currentLongitude,status:"delivery_agent_start",service:'laundry'})}>
                      <Text style={[theme.white,common.center,common.fontmd,common.fontbold]}>Arrived</Text>
                    </Button>
                  </View>
                  }
                  {
                    item?.status == 'delivery_agent_arrived'
                    &&
                    <View style={[common.flexbox,common.flexrow]}>
                      
                
                    <Button style={[theme.primarybtn,common.center,common.w100]} onPress={()=> props.navigation.navigate('AgentArrived',{data:item,lat:currentLatitude,lng:currentLongitude,status:"delivery_agent_arrived",service:'laundry'})}>
                      <Text style={[theme.white,common.center,common.fontmd,common.fontbold]}>Collect</Text>
                    </Button>
                  </View>
                  }
                  {
                    item?.status == 'delivery_agent_collected'
                    &&
                    <View style={[common.flexbox,common.flexrow]}>
                      
                
                    <Button style={[theme.primarybtn,common.center,common.w100]} onPress={()=> props.navigation.navigate('AgentArrived',{data:item,lat:currentLatitude,lng:currentLongitude,status:"delivery_agent_collected",service:'laundry'})}>
                      <Text style={[theme.white,common.center,common.fontmd,common.fontbold]}>Deliver</Text>
                    </Button>
                  </View>
                  }
                  
                  
          </View>
        </View>
            )
           })
        }

        {
          laundlist != undefined && laundlist.length == 0 && list != undefined && list.length == 0
          &&
          <View>
            <Text style={{textAlign:"center",marginTop:40}}>No Requests to show</Text>
          </View>
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

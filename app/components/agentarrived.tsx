/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {Component, useEffect, useState} from 'react';
import {StatusBar, Image, TouchableOpacity, ScrollView,ImageBackground,Platform,Linking} from 'react-native';
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
import MapView,{ Marker } from 'react-native-maps';
import CheckBox from 'react-native-check-box';
import { lightblue } from 'color-name';
import Geolocation from '@react-native-community/geolocation';
import {CommonActions} from '@react-navigation/native';
import {showLoader, hideLoader} from '../actions/common/commonActions'
import {appConfig} from '../appConfig'
import { startRequest,arrivedRequest} from '../actions/accept/acceptActions'
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
var storage = new Storage({size: 1000,storageBackend: AsyncStorage,defaultExpires: 1000 * 3600 * 24,enableCache: false});

type NotificationPageRouteProp = RouteProp<RootStackParamList, 'AgentArrived'>

type NotificationPageNavigationProp = StackNavigationProp<
  RootStackParamList,
  'AgentArrived'
>

type Props = {
  route: NotificationPageRouteProp
  navigation: NotificationPageNavigationProp
}

const AgentArrived = (props:Props) => {

  const dispatch = useDispatch()
  const [address,setAddress] = useState('')
  const [region,setRegion] = useState({
    latitude: props?.route?.params?.data.pickup_latitude,
    longitude: props?.route?.params?.data.pickup_longitude,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  })

  const [data,setData] = useState(props?.route?.params?.data)
  const [status,setStatus] = useState('accepted')
  

  useEffect(()=>{
    fetch("https://maps.googleapis.com/maps/api/geocode/json?latlng=" + props?.route?.params?.lat + "," + props?.route?.params?.lng + "&key="+ appConfig.GoogleApiKey)
    .then((response)=>response.json())
    .then((response)=>{
      
      console.log('hi',response)
     setAddress(response?.results[0]?.formatted_address)
    })
  },[])


  const getDirection = (lat,lng) => {
    const scheme = Platform.select({ ios: 'maps:0,0?q=', android: 'geo:0,0?q=' });
    const latLng = `${lat},${lng}`;
    const label = 'Custom Label';
    const url = Platform.select({
      ios: `${scheme}${label}@${latLng}`,
      android: `${scheme}${latLng}(${label})`
    });


    Linking.openURL(url);
  }

  function getDeliveryTime(starttime,interval){
   
    var endtime = new Date(starttime);
   
    endtime.setHours( endtime.getHours() + parseInt(interval) );
    var time = endtime.toLocaleTimeString();
    console.log('endtime',endtime);
    
     
    
    return time
  }

  const startTrip = () => {
    dispatch(showLoader());
    dispatch(startRequest({order_status : "start",unique_money_request_id: data.unique_money_request_id}))
    setStatus('started');
  }

  const tripStarted = useSelector((state:RootState)=>state.accept_r._startRequest)

  useEffect(()=>{
     if(tripStarted != undefined){
       dispatch(hideLoader())
       if(tripStarted.status == true){
          
       }else{
         appConfig.functions.showError(tripStarted.message)
       }
     }
  },[tripStarted])

  const reachDestination = () => {
    dispatch(showLoader());
    dispatch(arrivedRequest({order_status : "arrived",unique_money_request_id: data.unique_money_request_id}))
    setStatus('arrived');
  }

  const tripEnded = useSelector((state:RootState)=>state.accept_r._arrivedRequest)

  useEffect(()=>{
     if(tripEnded != undefined){
       dispatch(hideLoader())
       if(tripEnded.status == true){
          props.navigation.navigate('AgentService',{data:props?.route?.params?.data})
       }else{
         appConfig.functions.showError(tripEnded.message)
       }
     }
  },[tripEnded])
  
    return (
      <Container>
        <StatusBar barStyle="dark-content" />
        {/* <ImageBackground source={require("../assets/images/map.png")} style={{ width: '100%', height: '100%' }}> */}

        <Header
          androidStatusBarColor="#fff"
          iosBarStyle="dark-content"
          style={[theme.themeheader]}>

          <Body />
          <Right>
            {/* <Button transparent >
              <Icon
                name="closecircleo"
                type="AntDesign"
                style={[common.red, common.fontxl]}
              /> 
            </Button>*/}
          </Right>
        </Header>
          
        <View style={[common.borderbottom,common.whitebg]}>
        <ListItem avatar style={[common.pt10,common.pb10,]}>
            <Left>
              <Thumbnail
                source={{uri:data.requester_profile_image}}
                style={{width: 50, height: 50, borderRadius: 40}}
              />
            </Left>
            <Body style={[common.bordernone]}>
          <Text style={[common.colorblack, common.fontlg, common.fontbold]}>{data.requester_first_name} {data.requester_last_name}</Text>
            <Text style={[common.colorblack, common.fontsm]}>600 Alexander Rd, NJ 58550</Text>
            </Body>
            <View style={[common.pl15, common.pr15]}>
            <Button style={[theme.callbtn]} onPress={()=>Linking.openURL(`tel:${data?.requester_phone_prefix + data?.requester_phone}`)}>
                    <Icon
                      name="call"
                      type="MaterialIcons"
                      style={[theme.white, common.fontlg, common.white]}
                    />
               </Button>
            </View>
          </ListItem>

          <View style={[common.whitebg,]}>
            <View style={[common.flexbox,common.flexrow,common.p15,theme.lightblue]}>
              <View style={[common.flexone]}>
          <Text style={[common.center,common.fontbold,common.fontxl,common.colorblack]}>${data.original_amount}</Text>
                <Text style={[common.center,common.fontxs,common.colorblack]}>AMOUNT REQUESTED</Text>
              </View>
              <View style={[common.flexone,common.center]}>
              <View style={[common.flexbox,common.flexrow]}>
          <Text style={[common.center,common.fontbold,common.fontlg,common.colorblack, common.mt8]}>{getDeliveryTime(data.created_date,data.time_duration)}</Text>
                {/* <Text style={[common.center,common.fontbold,common.fontbody,common.colorblack,common.pt10]}>PM</Text> */}
              </View>
                <Text style={[common.center,common.fontxs,common.colorblack]}>DELIVER BEFORE</Text>
              </View>
            </View>
          </View>
        </View>
      
      <View style={{flex:1}}>
        <MapView
          style={{height:'100%',width:'100%'}}
          initialRegion={region}
          showsUserLocation={true}
         
         // onRegionChangeComplete={onRegionChange}
          
          >
        <Marker
          coordinate={{ "latitude": region.latitude,   
          "longitude": region.longitude }}
          title={"Your Location"}
          draggable 
          
          />
          </MapView>
          </View>
     
        <View  style={[theme.actionsheet,common.pl10]}>

        <View style={[common.flexbox,common.flexrow]}>
        <View style={[common.flexone, common.w100,]}>
        <TouchableOpacity>
              <ListItem thumbnail >
              <Left style={[common.center,common.flexbox,common.flexcolumn,common.pt20]}>
                <View style={[theme.timecircle]}></View>
                <View style={[theme.timeline]}></View>
              </Left>
                <Body style={[common.bordernone, theme.borderlight]}>
                <Text  style={[common.fontxs, theme.bluelight,common.pb10]}>DELIVER TO</Text>
                  <Text
                    style={[common.fontmd, theme.fontbold, common.white]}>
                    {data.pickup_location}
                  </Text>
                </Body>
                <Right style={[common.bordernone,theme.borderlight]}>
                <TouchableOpacity style={[theme.whitecricle,common.center]} onPress={()=>{getDirection(data.pickup_latitude,data.pickup_longitude)}}>
                  <Icon
                    name="location-arrow"
                    type="FontAwesome"
                    style={[common.fontxxl,common.white]}
                  />
                  </TouchableOpacity>
                </Right>
              </ListItem>
          </TouchableOpacity>

          <TouchableOpacity >
              <ListItem thumbnail>
              <Left style={[common.center,common.flexbox,common.flexcolumn,]}>
                <View style={[theme.timeline]}></View>
                <View style={[theme.timecircle]}></View>
                <View style={[{flex:2}]}></View>
              </Left>
                <Body style={[common.bordernone,]}>
                <Text  style={[common.fontxs, theme.bluelight,common.pb10]}>MY LOCATION</Text>
                  <Text numberOfLines={1}
                    style={[common.fontmd, theme.fontbold, common.white]}>
                   {address}
                  </Text>
                </Body>
                <Right style={[common.bordernone]}>
                  {/* <Icon
                    name="keyboard-arrow-right"
                    type="MaterialIcons"
                    style={[common.fontxxxl,{color:'#008BBE'}]}
                  /> */}
                </Right>
              </ListItem>
          </TouchableOpacity>
        </View>
        </View>

        <View style={[common.p15, common.center]}>
                  {
                    status == 'accepted'
                    &&
                    <Button onPress={()=>startTrip()}
                    style={[theme.button_rounded, common.ml20, common.mr20,{width:270}]}>
                    <Text style={[theme.textcapital, theme.bluecolor, common.fontmd,common.w100, common.textcenter]}>
                    Start
                    </Text>
                  </Button>
                  }
                  {
                    status == 'started'
                    &&
                    <Button onPress={()=>reachDestination()}
                    style={[theme.button_rounded, common.ml20, common.mr20,{width:270}]}>
                    <Text style={[theme.textcapital, theme.bluecolor, common.fontmd,common.w100, common.textcenter]}>
                    Arrived
                    </Text>
                  </Button>
                  }
                  
                </View>
        </View> 
        {/* </ImageBackground> */}
      </Container>
    );
  }


export default AgentArrived
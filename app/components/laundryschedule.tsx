/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {Component, useEffect, useState} from 'react';
import {
  StatusBar,
  Image,
  TouchableOpacity,
  ScrollView,
  StyleSheet,Modal, Dimensions,PermissionsAndroid,
  Platform,
} from 'react-native';
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
  Icon,
  ListItem,
  Right,
  Thumbnail,
} from 'native-base';

import {theme} from '../css/theme';
import {common} from '../css/common';
import Geolocation from '@react-native-community/geolocation';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { useDispatch, useSelector } from 'react-redux';
import HeaderPage from './shared/header';
import { hideLoader, showLoader } from '../actions/common/commonActions';
import { getlaundro,calculatePrice,_calculate,_getLaundro } from '../actions/laundryrequest/requestActions';
import { RootStackParamList } from '../RouteConfig';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import AsyncStorage from '@react-native-community/async-storage';
import MapView,{ Marker } from 'react-native-maps';
import Storage from 'react-native-storage';
import { RootState } from '../appReducers';
import { appConfig } from '../appConfig';
import MapModal from './shared/map/mapModal';

var storage = new Storage({size: 1000,storageBackend: AsyncStorage,defaultExpires: 1000 * 3600 * 24,enableCache: false});

type NotificationPageRouteProp = RouteProp<RootStackParamList, 'LaundrySchedule'>;

type NotificationPageNavigationProp = StackNavigationProp<
    RootStackParamList,
    'LaundrySchedule'
>;

type Props = {
    route: NotificationPageRouteProp;
    navigation: NotificationPageNavigationProp;
};





 



const LaundrySchedule = (props:Props) => {

  

  const dispatch = useDispatch();
  
  const [address,setAddress] =  useState('')
  const [isvisible,setIsvisible] =  useState(false)
  const [visiblePlaces,setVisiblePlaces] =  useState(false)
  const [region,setRegion] = useState({})

    const [detail,setDetail] = useState({});
    const [currentLongitude,setCurrentLongitude] = useState(0);
    const [currentLatitude,setCurrentLatitude] = useState(0);
    const [locationStatus,setLocationStatus] = useState('');

const getOneTimeLocation = () => {
    setLocationStatus('Getting Location ...');
    Geolocation.getCurrentPosition(
      //Will give you the current location
      (position) => {
        dispatch(getlaundro({laundromat_id:props.route.params.id}))
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
      },
      (error) => {
        dispatch(getlaundro({laundromat_id:props.route.params.id}))
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
     
      dispatch(showLoader());
      
      
      const requestLocationPermission = async () => {
        if (Platform.OS === 'ios') {
          getOneTimeLocation();
         
        } else {
          try {
            const granted = await PermissionsAndroid.request(
              PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
              {
                title: 'Location Access Required',
                message: 'This App needs to Access your location',
              },
            );
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
              //To Check, If Permission is granted
              getOneTimeLocation();
            
            } else {
              setLocationStatus('Permission Denied');
              dispatch(getlaundro({laundromat_id:props.route.params.id}))
            }
          } catch (err) {
            dispatch(getlaundro({laundromat_id:props.route.params.id}))
            console.warn(err);
          }
        }
      };
      requestLocationPermission();
      
      

      
    },[])

    const laundro = useSelector((state:RootState)=>state.lrequest_r._laundro)

    useEffect(()=>{
      if(laundro != undefined){
        dispatch(hideLoader());
       
        if(laundro.status == true){
           setDetail(laundro.laundromat_data);
           if(laundro.last_used_address != undefined ){
              setRegion({latitude: laundro.last_used_address?.latitude,
              longitude: laundro.last_used_address?.longitude,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,})
              setAddress(laundro.last_used_address?.delivery_address)
           }else{
             console.log('this is the place');
            setRegion({latitude: currentLatitude,
              longitude: currentLongitude,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,})
              dispatch(showLoader());
            fetch("https://maps.googleapis.com/maps/api/geocode/json?latlng=" + currentLatitude + "," + currentLongitude + "&key="+ appConfig.GoogleApiKey)
            .then((response)=>response.json())
            .then((response)=>{
              dispatch(hideLoader());
              console.log('hi',response)
             setAddress(response?.results[0]?.formatted_address)
            })
            .catch((error)=>{
               dispatch(hideLoader);
               appConfig.functions.showError('Google places error')
            })
           }
           dispatch(_getLaundro(undefined))
        }else{
          appConfig.functions.showError(laundro.message);
          dispatch(_getLaundro(undefined))
        }
      }

      
    },[laundro])

   
    // const onRegionChange = (changedregion) =>{
    //      console.log("region",changedregion);
    //      setCurrentLatitude(changedregion.latitude);
    //      setCurrentLongitude(changedregion.longitude);
    //      setRegion(changedregion)
    //      fetch("https://maps.googleapis.com/maps/api/geocode/json?latlng=" + changedregion.latitude + "," + changedregion.longitude + "&key="+ appConfig.GoogleApiKey)
    //      .then((response)=>response.json())
    //      .then((response)=>{
    //       setAddress(response.results[0].formatted_address)
    //      })
        
    // }

    const validatePage = () =>{
      let newList = props?.route?.params?.list?.filter(o=>o.item_quantity!=0);
      let data = {
        laundromat_id:props.route.params.id,
        pickup_latitude:currentLatitude,
        pickup_longitude:currentLongitude,
        pickup_location:address,
        normal_wash_weight:props?.route?.params?.washQty,
        additional_wash_items:newList
      }
      dispatch(showLoader())
      dispatch(calculatePrice(data))
      
      
    }

    const calculate = useSelector((state:RootState)=>state.lrequest_r._calculate)

    useEffect(()=>{
       if(calculate != undefined){
         dispatch(hideLoader())
         if(calculate.status == true){
           console.log(calculate);
          props.navigation.navigate('LaundryConfirm',{data:calculate.data,extra:props?.route?.params?.extra})
          dispatch(_calculate(undefined))
         }else{
           appConfig.functions.showError(calculate.message);
           dispatch(_calculate(undefined))
         }
       }
    },[calculate])


    const handleMovePin = e => {
      const { coordinate } = e.nativeEvent
      
       coordinate.latitudeDelta = 0.0922;
       coordinate.longitudeDelta = 0.0421;
      setCurrentLatitude(coordinate.latitude);
      setCurrentLongitude(coordinate.longitude);
      setRegion(coordinate)
      fetch("https://maps.googleapis.com/maps/api/geocode/json?latlng=" + coordinate.latitude + "," + coordinate.longitude + "&key="+ appConfig.GoogleApiKey)
      .then((response)=>response.json())
      .then((response)=>{
       setAddress(response.results[0].formatted_address)
      })
      
    }


   const modalProps = {
    address : address,
    setAddress : setAddress,
   isvisible : isvisible,
   setIsvisible : setIsvisible, 
    visiblePlaces :  visiblePlaces,
    setVisiblePlaces : setVisiblePlaces,
    region : region,
    setRegion : setRegion,
    currentLongitude: currentLongitude,
    setCurrentLongitude :setCurrentLongitude,
    currentLatitude :currentLatitude,
    setCurrentLatitude : setCurrentLatitude,
    handleMovePin : handleMovePin
     
   }


  
  
    return (
      <Container style={[theme.lightblue]}>
       <HeaderPage title="" back={true} />
       
        <View style={[common.p10,common.bgwhite,common.pt0]}>
              <Text
                style={[theme.fontregular, common.fontlg, theme.colorblack]}>
                Schedule Your Pickup
              </Text>
              <Text
                style={[theme.fontregular, common.fontsm, theme.colorblack]}>
                Please schedule your laundry pickup details
              </Text>
        </View>
       
        <View style={[common.flexone]}>
        <View style={[theme.listCard,common.p0,common.pb0]}>
        <View style={[common.p20,]}>
        <ListItem avatar style={[common.ml0]}>
            <Left>
              <Thumbnail
                source={{uri:detail?.profile_image}}
                style={{width: 100, height: 100, borderRadius: 10}}
              />
            </Left>
            <Body style={[common.bordernone]}>
              <Text numberOfLines={1} style={[common.fontmd, theme.fontbold]}>{detail?.business_name}</Text>
              <Text numberOfLines={1} note style={[common.fontbody,theme.colorblack]}>{detail?.location}</Text>
              <View style={[common.flexbox, common.flexrow,common.pt10]}>
                      <View>
                        <Button small rounded style={[theme.bgorange,{height:26}]}>
                          <Text style={{fontSize:Platform.OS === 'ios'? 10 : 14}}>${detail?.normal_wash_price}/Pound</Text>
                        </Button>
                      </View>
                      <View style={[common.ml10]}>
                      <Text style={[theme.colorblack]}>
                      <Icon
                        name="star"
                        type="FontAwesome"
                        style={[theme.coloryellow, common.fontxl]}></Icon>{' '}
                      4.8
                    </Text>
                      </View>
                    </View>
                    {
                      detail?.is_active == 'Y'
                      &&
                      <Button
                      bordered
                      rounded
                      style={[theme.borderblue, common.pl5,common.pr5,common.mt10,common.fontxs,{height:30}]}>
                      <Text style={[theme.bluecolor]}>
                      Available
                      </Text>
                    </Button>

                    }
                     {
                      detail?.is_active != 'Y'
                      &&
                      <Button
                      bordered
                      rounded
                      style={[theme.borderblue, common.pl5,common.pr5,common.mt10,common.fontxs,{height:30}]}>
                      <Text style={[theme.bluecolor]}>
                      Not Available
                      </Text>
                    </Button>

                    }
                    
            </Body>
          </ListItem>
        </View>
        </View>
        </View>

        <View style={[theme.section_blue,]}>
          <View style={[common.flexbox, common.flexrow, common.p20,common.borderbottom,,{borderBottomColor: '#00A1DC',}]}>
            <View style={[common.flexone, common.pl10, common.pr10]}>
            <Text
            style={[
              common.white,
              common.textupercase,
              common.fontsm,
              {opacity: 0.7},
            ]}>
            WASH QTY
          </Text>
          <Text style={[common.fontxl, theme.fontbold, common.white,]}>
            {props?.route?.params?.washQty}<Text style={[common.fontmd, common.white,]}> Pounds</Text>
          </Text>
    </View>

            <View style={[common.flexone, common.pl10, common.pr10]}>
            <Text
                  style={[
                    common.white,
                    common.textupercase,
                    common.fontsm,
                    common.textright,
                    {opacity: 0.7},
                  ]}>
                  SEPARATE WASH ITEM
                </Text>
              <Text style={[common.fontxl, theme.fontbold, common.white,common.textright,]}>
              {props?.route?.params?.extra}
              </Text>
            </View>
          </View>

          <View>
          <View style={[common.borderbottom,common.p20,{borderBottomColor: '#00A1DC',}]}>
            <ListItem icon style={[common.pl0,common.ml0]} onPress={()=>{setIsvisible(!isvisible)}} >
              <Left>
                <Button transparent>
                  <Icon
                    style={[common.white, common.fontxxl]}
                    name="location-pin"
                    type="Entypo"
                  />
                </Button>
              </Left>
              <Body style={[common.bordernone]}>
                <Text
                  style={[
                    common.white,
                    common.textupercase,
                    common.fontsm,
                    {opacity: 0.7},
                  ]}>
                  PICKUP LOCATION
                </Text>
                <Text style={[common.white, common.fontbody]}>
               {address}
                </Text>
              </Body>
              <Right style={[common.bordernone,common.pr0,]}>
                <Icon
                  style={[common.fontxxxl,{color:'#008BBE'}]}
                  name="keyboard-arrow-right"
                  type="MaterialIcons"
                />
              </Right>
            </ListItem>
          </View>          
            <View style={[common.p5,common.center]}>
                  <Button
                  onPress={validatePage}
                    style={[theme.button_rounded, common.ml20, common.mr20,]}>
                    <Text style={[theme.textcapital, theme.bluecolor, common.fontmd,common.w100, common.textcenter]}>
                    Done
                    </Text>
                  </Button>
                </View>
          </View>

   
        </View>
        <MapModal {...modalProps}/>
        
        
      </Container>
    );
  }
export default LaundrySchedule

/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {Component, useEffect,useState} from 'react';
import {StatusBar, Image, TouchableOpacity, ScrollView, Dimensions,PermissionsAndroid,
  Platform,} from 'react-native';

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
  List,
} from 'native-base';

import {theme} from '../css/theme';
import {common} from '../css/common';
//import Geolocation from '@react-native-community/geolocation';
import GetLocation from 'react-native-get-location'
import {lightblue} from 'color-name';
import HeaderPage from './shared/header';
import { RootStackParamList } from '../RouteConfig';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import AsyncStorage from '@react-native-community/async-storage';
import Storage from 'react-native-storage';
import { useDispatch, useSelector } from 'react-redux';
import { hideLoader, showLoader } from '../actions/common/commonActions';
import { getLaundryList } from '../actions/laundryrequest/requestActions';
import { RootState } from '../appReducers';
import { appConfig } from '../appConfig';
var storage = new Storage({size: 1000,storageBackend: AsyncStorage,defaultExpires: 1000 * 3600 * 24,enableCache: false});

type NotificationPageRouteProp = RouteProp<RootStackParamList, 'LaundryList'>;

type NotificationPageNavigationProp = StackNavigationProp<
    RootStackParamList,
    'LaundryList'
>;

type Props = {
    route: NotificationPageRouteProp;
    navigation: NotificationPageNavigationProp;
};

//var watchId:any = null

const LaundryList = (props:Props) => {

  const dispatch = useDispatch()
 const [error,setError] = useState('')
  const [list,setList] = useState([])
  const [searchKey,setSearchKey] = useState('')

  const [currentLongitude,setCurrentLongitude] = useState(0);
  const [currentLatitude,setCurrentLatitude] = useState(0);
  const [locationStatus,setLocationStatus] = useState('');

  const getLaundrySearch = (search:String) =>{
    dispatch(showLoader())
    dispatch(getLaundryList({search_key:search}))
  }

  // const getOneTimeLocation = () => {
    
    
  //   watchId =  Geolocation.watchPosition(
  //     pos => {
  //       setError("");
  //       console.log("coordinates",pos.coords)
  //       const currentLatitude = pos.coords.latitude;
  //       const currentLongitude = pos.coords.longitude;
  //       setCurrentLatitude(currentLatitude);
  //       setCurrentLongitude(currentLongitude);
  //       dispatch(getLaundryList({search_key:'',latitude:currentLatitude,longitude:currentLongitude}))
        
  //     },
  //     e => {
  //       setError(e.message)
  //       dispatch(getLaundryList({search_key:''}))
  //     }
  //   );

  // };


  useEffect(()=>{

    dispatch(showLoader())
    GetLocation.getCurrentPosition({
      enableHighAccuracy: true,
      timeout: 15000,
  })
  .then(location => {
    setCurrentLatitude(location.latitude);
    setCurrentLongitude(location.longitude);
    dispatch(getLaundryList({search_key:'',latitude:location.latitude,longitude:location.longitude}))
    console.log(location);
  })
  .catch(error => {
      const { code, message } = error;
      console.warn(code, message);
      dispatch(getLaundryList({search_key:''}))
    
  })
    
    // const requestLocationPermission = async () => {
    //   if (Platform.OS === 'ios') {
    //     dispatch(showLoader())
    //     getOneTimeLocation();
       
    //   } else {
    //     try {
    //       const granted = await PermissionsAndroid.request(
    //         PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    //         {
    //           title: 'Location Access Required',
    //           message: 'This App needs to Access your location',
    //         },
    //       );
    //       if (granted === PermissionsAndroid.RESULTS.GRANTED) {
    //         //To Check, If Permission is granted
    //         dispatch(showLoader())
    //         getOneTimeLocation();
          
    //       } else {
    //         setLocationStatus('Permission Denied');
    //         dispatch(showLoader())
    //         dispatch(getLaundryList({search_key:''}))
    //       }
    //     } catch (err) {
    //       console.warn(err);
    //     }
    //   }
    // };
    // requestLocationPermission();

  
    
  },[])

  const laundryList = useSelector((state:RootState)=>state.lrequest_r._getLaundryList);

  useEffect(()=>{
     if(laundryList != undefined){
       dispatch(hideLoader())
     
       if(laundryList.status == true){
         setList(laundryList.laundromat_list);
       }else{
        appConfig.functions.showError(laundryList.message)
      }
     }
  },[laundryList])
  
    return (
      <Container style={[theme.primarybackground]}>
       <HeaderPage back={true} title="" color="blue"/>
        <View style={[common.m10]}>
          <Item rounded style={[common.bgwhite]}>
            <Icon name="search1" type="AntDesign" />
            <Input placeholder="Find Laundry" value={searchKey} onChangeText={(search_key) => {
                setSearchKey(search_key);
                if (search_key && search_key.length > 3) {
                  getLaundrySearch(search_key);
                }
                

              }}/>
          </Item>
        </View>
        <ScrollView>
          <View style={[common.pb20]}>
            <View>
              {
                list != undefined && list?.length > 0 && list.map((item,index)=>{
                  return(
                    <View style={[theme.card, common.mb5, common.mt5]} key={index}>
                    <ListItem thumbnail onPress={()=>props.navigation.navigate('LaundryDetail',{id:item.laundromat_id})}>
                      <Left>
                        <Thumbnail
                          square
                          source={{uri:item.profile_image}}
                          style={[{width: 100, height: 100}, common.border]}
                        />
                      </Left>
                      <Body>
                        <Text>{item.business_name}</Text>
                        <Text note numberOfLines={1}>
                          {item.location}
                        </Text>
                        <View style={[common.flexbox, common.flexrow, common.mt5]}>
                          <View>
                            <Button small rounded style={[theme.bgorange]}>
                              <Text style={{fontSize:Platform.OS === 'ios'? 10 : 14}}>${item.normal_wash_price}/Pound</Text>
                            </Button>
                          </View>
                          <View>
                            <Text style={[common.ml15]}>
                              <Image
                                source={require('../assets/images/star.png')}
                                style={{width: 20, height: 20}}></Image>{' '}
                              {item.rating}
                            </Text>
                          </View>
                        </View>
                        <View style={[common.mt5]}>
                          <Button bordered rounded small style={[theme.borderblue]}>
                            <Text style={[theme.bluecolor, theme.textcapital]}>
                              Available
                            </Text>
                          </Button>
                        </View>
                      </Body>
                    </ListItem>
                  </View>
                  )
                })
              }
              
             
            </View>
          </View>
        </ScrollView>
      </Container>
    );
  }

  export default LaundryList


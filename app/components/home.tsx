/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useState,useEffect} from 'react';
import {StatusBar,DeviceEventEmitter, Image, TouchableOpacity, ScrollView, Dimensions,PermissionsAndroid,
  Platform} from 'react-native';
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
  ListItem,
  Thumbnail,
  Right,
  Icon,
} from 'native-base';
import GetLocation from 'react-native-get-location'
import LocationServicesDialogBox from "react-native-android-location-services-dialog-box";
import {theme} from '../css/theme';
import {common} from '../css/common';
import io, { Socket } from 'socket.io-client';

//import notifee,{AndroidImportance} from '@notifee/react-native';
import messaging,{firebase} from '@react-native-firebase/messaging';
import { CommonActions, useFocusEffect } from '@react-navigation/native';
//import Geolocation from '@react-native-community/geolocation';

import { useIsFocused } from '@react-navigation/native';
import HeaderPage from './shared/header';
import { RootStackParamList } from '../RouteConfig';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import AsyncStorage from '@react-native-community/async-storage';
import Storage from 'react-native-storage';
import {useDispatch, useSelector } from 'react-redux';
import {checkStatus,checkCardAdded,_checkCardAdded,getLaundryList} from '../actions/home/homeActions';
import { hideLoader, showLoader } from '../actions/common/commonActions';
import {saveToken} from '../actions/token/tokenActions';
import { RootState } from '../appReducers';
import { appConfig } from '../appConfig';
var storage = new Storage({size: 1000,storageBackend: AsyncStorage,defaultExpires: 1000 * 3600 * 24,enableCache: false});

type NotificationPageRouteProp = RouteProp<RootStackParamList, 'CreateAccount'>;

type NotificationPageNavigationProp = StackNavigationProp<
    RootStackParamList,
    'CreateAccount'
>;

type Props = {
    route: NotificationPageRouteProp;
    navigation: NotificationPageNavigationProp;
};

//var watchId:any = null



 const HomePage = (props:Props) => {


  const [token,setToken] = useState('');
  const [refreshToken,setRefreshToken] = useState('');
  const isFocused = useIsFocused();
  const dispatch = useDispatch();
  const [error,setError] = useState('')

  const [name,setName] = useState('')
  const [isagent,setIsagent] = useState(false)
  const [requestLaundry,setRequestLaundry] = useState(true)
  const [requestMoney,setRequestMoney] = useState(true)
  const [page,setPage] = useState('');

  const [list,setList] = useState([])
  const [searchKey,setSearchKey] = useState('')

  const [currentLongitude,setCurrentLongitude] = useState(0);
  const [currentLatitude,setCurrentLatitude] = useState(0);
  const [locationStatus,setLocationStatus] = useState('');
  const [moneyStatus,setMoneyStatus] = useState('')
  const [moneyRequestId,setMoneyRequestId] = useState('')
  const [laundryStatus,setLaundryStatus] = useState('')
  const [laundryRequestId,setLaundryRequestId] = useState('')

  const [laundromatId,setLauromatId] = useState(0)


  


  
  useEffect(()=>{
    
    if(Platform.OS === 'android'){
        LocationServicesDialogBox.checkLocationServicesIsEnabled({
          message: "<h2 style='color: #0af13e'>Use Location ?</h2>WUW wants to change your device settings:<br/><br/>Use GPS for better performance<br/><br/>",
          ok: "YES",
          cancel: "NO",
          enableHighAccuracy: true, // true => GPS AND NETWORK PROVIDER, false => GPS OR NETWORK PROVIDER
          showDialog: true, // false => Opens the Location access page directly
          openLocationServices: true, // false => Directly catch method is called if location services are turned off
          preventOutSideTouch: false, // true => To prevent the location services window from closing when it is clicked outside
          preventBackClick: false, // true => To prevent the location services popup from closing when it is clicked back button
          providerListener: false // true ==> Trigger locationProviderStatusChange listener when the location state changes
      }).then(function(success) {
          console.log(success); // success => {alreadyEnabled: false, enabled: true, status: "enabled"}
      }).catch((error) => {
          console.log(error.message); // error.message => "disabled"
      });
    }
    
       appConfig.functions.isLoggedin()
      .then((token)=>{
             appConfig.functions.getRefresh()
             .then((refreshtoken)=>{
               dispatch(saveToken({token:token,refreshtoken:refreshtoken}))
             })
         })
     
  },[])

  

  
    useEffect(() => {
   
    const unsubscribe = props.navigation.addListener('focus', () => {

     // socketConnection('connect');
     
      storage.load({key:'userData'}).then((ret)=>{
        setName(ret.first_name)
        
        if(ret.is_agent==true)
            setIsagent(true)
       }) 
       appConfig.functions.isLoggedin()
       .then((token)=>{
         appConfig.functions.getRefresh()
         .then((refreshToken)=>{
            setToken(token);
            setRefreshToken(refreshToken)
         })
          
       }) 
       dispatch(showLoader())
       dispatch(checkStatus())

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
  
       
    });
    // const unsubscribeBlur = props.navigation.addListener('blur', () => {
    //   socketConnection('disconnect');
      
    // })
   
    
    return unsubscribe;
   
    
  }, [props.navigation]);

  const checked = useSelector((state:RootState)=>state.home_r._status)

  useEffect(()=>{
    if(checked != undefined){
      
      dispatch(hideLoader());
      if(checked.status == true){
       
        if(checked?.laundry_status_data?.can_apply == true){
             setRequestLaundry(true)
        }else{
          setLaundryStatus(checked?.laundry_status_data?.order_status_label)
          setLaundryRequestId(checked?.laundry_status_data?.request_id)
          setRequestLaundry(false)
        }
        if(checked?.money_status_data?.can_apply == true){
           setRequestMoney(true)
        }else{
          setMoneyStatus(checked?.money_status_data?.status)
          setMoneyRequestId(checked?.money_status_data?.request_id)
          setRequestMoney(false)
        }
          
      }else{
        appConfig.functions.showError(checked.message)
      }
    }

  },[checked])

  const homelist = useSelector((state:RootState)=>state.home_r._homelist);

  useEffect(()=>{
     if(homelist != undefined){
      dispatch(hideLoader());
     
     
       if(homelist.status == true){
         
        setList(homelist.laundromat_list);
       }else{
         appConfig.functions.showError(homelist.message)
       }
     }
  },[homelist])

  const checkedCardAdded = (navi:String,laudromat_id:Number) => {
      setPage(navi);
      if(laudromat_id != 0){
        setLauromatId(laudromat_id)
      }
       dispatch(showLoader());
       dispatch(checkCardAdded())
  }

  const iscardAdded = useSelector((state:RootState)=>state.home_r._card)

  useEffect(()=>{
    if(iscardAdded != undefined){
      dispatch(hideLoader())
      console.log('cardaaa',iscardAdded);
      if(iscardAdded.status == true){
        if(iscardAdded.cardAdded == true){
          if(page == 'LaundryDetail'){
            props.navigation.navigate('LaundryDetail',{id:laundromatId})
          }else{
            props.navigation.navigate(page)
          }
          
        }else{
          props.navigation.navigate('AddCard',{page:page})
        }
        _checkCardAdded(undefined)
      }else{
        appConfig.functions.showError(iscardAdded.message)
        _checkCardAdded(undefined)
      }
    }

  },[iscardAdded])

 
  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
 
    return (
      <Container>
        <HeaderPage back={false} title="" right="user" isAgent={isagent} />
       <ScrollView>
        <View style={[common.pt20, common.mt10]}>
          <Image
            source={require('../assets/images/logo.png')}
            style={[common.mt20, common.center, common.mb20]}
          />
        </View>
        <View style={[common.p15, common.pt0]}>
          <Text
            style={[
              common.textcenter,
              theme.fontblack,
              common.fontxxl,
              common.colorblack,
            ]}>
            Hi {name} !
          </Text>
          {/* <Text style={[common.center, theme.colorblack]}>
            One line description about the WUW
          </Text> */}
        </View>
        <View style={[theme.section_blue, common.p20]}>
          {
            requestMoney == true
            &&
            <TouchableOpacity style={[common.mb10]} >
            <View style={[theme.tabhome]}>
              <ListItem thumbnail onPress={()=>{checkedCardAdded('RequestMoney',0)}}>
                <Left>
                  <Thumbnail
                    square
                    source={require('../assets/images/wallet.png')}
                    style={{width: 80, height: 90}}
                  />
                </Left>
                <Body style={[common.bordernone]}>
                  <Text
                    style={[common.fontlg, theme.fontbold, theme.colororange]}>
                    Request Money
                  </Text>
                  <Text note  style={[theme.colororange]}>
                    No more ATM lines. Get your money anywhere
                  </Text>
                </Body>
                <Right style={[common.bordernone]}>
                  <Icon
                    name="keyboard-arrow-right"
                    type="MaterialIcons"
                    style={[common.fontxxxl]}
                  />
                </Right>
              </ListItem>
            </View>
          </TouchableOpacity>
          }
           {
            requestMoney == false
            &&
            <TouchableOpacity style={[common.mb10]}>
            <View style={[theme.tabhome]}>
              <ListItem thumbnail onPress={()=>props.navigation.navigate('TrackStatus',{unique_request_id:moneyRequestId,token:token,refreshToken:refreshToken})}>
                <Left>
                  <Thumbnail
                    square
                    source={require('../assets/images/walletblue.png')}
                    style={{width: 65, height: 65}}
                  />
                </Left>
                <Body style={[common.bordernone]}>
                  <Text
                    style={[common.fontlg, theme.fontbold, theme.colorblack]}>
                    Order Placed
                  </Text>
                  <Text note numberOfLines={1} style={[theme.colorblack]}>
                  {/* $ 400 -  */}
                  <Text danger style={[theme.colorred, theme.fontmedium]}>{capitalizeFirstLetter(moneyStatus)}</Text>
                  </Text>
                </Body>
                <Right style={[common.bordernone]}>
                  <Icon
                    name="keyboard-arrow-right"
                    type="MaterialIcons"
                    style={[common.fontxxxl]}
                  />
                </Right>
              </ListItem>
            </View>
          </TouchableOpacity>
           }
          
          {
            requestLaundry == true
            &&
            <TouchableOpacity >
            <View style={[theme.tabhome]}>
              <ListItem thumbnail onPress={()=>{checkedCardAdded('LaundryList',0)}}>
                <Left>
                  <Thumbnail
                    square
                    source={require('../assets/images/washing-machine.png')}
                    style={{width: 80, height: 90}}
                  />
                </Left>
                <Body style={[common.bordernone]}>
                  <Text
                    style={[common.fontlg, theme.fontbold, theme.bluecolor]}>
                    Pickup Laundry
                  </Text>
                  <Text note  style={[theme.bluecolor]}>
                    We do it for you
                  </Text>
                </Body>
                <Right style={[common.bordernone]}>
                  <Icon
                    name="keyboard-arrow-right"
                    type="MaterialIcons"
                    style={[common.fontxxxl]}
                  />
                </Right>
              </ListItem>
            </View>
          </TouchableOpacity>

          }
        {
            requestLaundry == false
            &&
            <TouchableOpacity >
            <View style={[theme.tabhome]}>
              <ListItem thumbnail onPress={()=>props.navigation.navigate('LaundryInvoice',{unique_request_id:laundryRequestId,token:token,refreshToken:refreshToken})}>
                <Left>
                  <Thumbnail
                    square
                    source={require('../assets/images/washing-machine.png')}
                    style={{width: 80, height: 90}}
                  />
                </Left>
                <Body style={[common.bordernone]}>
                  <Text
                    style={[common.fontlg, theme.fontbold, theme.colorblack]}>
                    Order Placed
                  </Text>
                  <Text note numberOfLines={1} style={[theme.colorblack]}>
                  Laundry Pickup - 
                  </Text>
                  <Text danger style={[theme.colorred, theme.fontmedium]}>{capitalizeFirstLetter(laundryStatus)}</Text>
                </Body>
                <Right style={[common.bordernone]}>
                  <Icon
                    name="keyboard-arrow-right"
                    type="MaterialIcons"
                    style={[common.fontxxxl]}
                  />
                </Right>
              </ListItem>
            </View>
          </TouchableOpacity>

          }
          
          <ListItem style={[common.ml0, common.bordernone]}>
            <Body style={[common.bordernone]}>
              <Text style={[common.white, common.fontlg, theme.fontbold]}>
                EXPLORE
              </Text>
              <Text note  style={[common.white]}>
                Discover more laundry services near by you
              </Text>
            </Body>
            <Right style={[common.bordernone]}>
              <Button rounded small style={[common.bgwhite]} onPress={()=>checkedCardAdded('LaundryList',0)}>
                <Text style={[theme.textcapital, theme.colorblack]}>more</Text>
              </Button>
            </Right>
          </ListItem>
          <View>
            <ScrollView horizontal>
            <View style={[common.flexbox, common.flexrow]}>
              {
                list != undefined && list.length > 0 && list.map((item,index)=>{
                  return(
                    <TouchableOpacity key={index} onPress={()=>checkedCardAdded('LaundryDetail',item.laundromat_id)}>
                    <View style={[theme.slider_btm]} key={index}>
                      <Image
                        source={{uri:item.profile_image}}
                        style={[theme.sliderimg]}></Image>
                      <View style={[theme.slidertxt]}>
                        <Text style={[common.white, theme.fontbold]}>
                        {item.business_name}
                        </Text>
                        <Text style={[common.white, common.fontsm, common.mb5]}>
                        {item.location}
                        </Text>
                        <View style={[common.flexbox, common.flexrow]}>
                          <View>
                            <Button small rounded style={[theme.bgorange]}>
                              <Text>${item.normal_wash_price}/Pound</Text>
                            </Button>
                          </View>
                          <View>
                            <Text style={[common.white, common.pl10]}>
                              <Icon
                                name="star"
                                type="FontAwesome"
                                style={[
                                  theme.coloryellow,
                                  common.fontxl,
                                ]}></Icon>{' '}
                              {item?.rating}
                            </Text>
                          </View>
                        </View>
                      </View>
                      <View style={[theme.overLay]}></View>
                    </View>
                    </TouchableOpacity>
                  )
                })
              }
              
               
              </View>
            </ScrollView>
          </View>
        </View>
        </ScrollView>
      </Container>
    );
  }

  export default HomePage



  
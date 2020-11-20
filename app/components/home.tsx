/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useState,useEffect} from 'react';
import {StatusBar, Image, TouchableOpacity, ScrollView, Dimensions,PermissionsAndroid,
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

import {theme} from '../css/theme';
import {common} from '../css/common';
import Geolocation from '@react-native-community/geolocation';
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

 const HomePage = (props:Props) => {

  const isFocused = useIsFocused();
  const dispatch = useDispatch();

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

  const [laundromatId,setLauromatId] = useState(0)



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
       
        dispatch(getLaundryList({search_key:'',latitude:currentLatitude,longitude:currentLongitude}))
      },
      (error) => {
        setLocationStatus(error.message);
        
        dispatch(getLaundryList({search_key:''}))
      },
      {
        enableHighAccuracy: false,
        timeout: 30000,
        maximumAge: 1000
      },
    );
  };

  useEffect(()=>{
   
   
    storage.load({key:'userData'}).then((ret)=>{
         setName(ret.first_name)
         if(ret.is_agent==true)
             setIsagent(true)
    })

    


  

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
         
          dispatch(getLaundryList({search_key:''}))
        }
      } catch (err) {
        console.warn(err);
      }
    }
  };
  requestLocationPermission();

},[])
  
  useEffect(() => {
    const unsubscribe = props.navigation.addListener('focus', () => {
      storage.load({key:'userData'}).then((ret)=>{
        setName(ret.first_name)
        
        if(ret.is_agent==true)
            setIsagent(true)
       })  
       dispatch(showLoader());
         dispatch(checkStatus())
        
    });

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
          setRequestLaundry(false)
        }
        if(checked?.money_status_data?.can_apply == true){
          setRequestMoney(true)
        }else{
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
                  <Text note numberOfLines={1} style={[theme.colororange]}>
                    No more ATM lines. Gert your money anywhere
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
              <ListItem thumbnail>
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
                  <Text danger style={[theme.colorred, theme.fontmedium]}>Pending</Text>
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
                  <Text note numberOfLines={1} style={[theme.bluecolor]}>
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
              <ListItem thumbnail>
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
                  Laundry Pickup - <Text danger style={[theme.colorred, theme.fontmedium]}>Pending</Text>
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
          
          <ListItem style={[common.ml0, common.bordernone]}>
            <Body style={[common.bordernone]}>
              <Text style={[common.white, common.fontlg, theme.fontbold]}>
                EXPLORE
              </Text>
              <Text note numberOfLines={1} style={[common.white]}>
                Discover more laundry services near by you
              </Text>
            </Body>
            <Right style={[common.bordernone]}>
              <Button rounded small style={[common.bgwhite]}>
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
                              4.8
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
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useState,useEffect,useRef,useCallback} from 'react';
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
  Icon,
  ListItem,
  Right,
} from 'native-base';

import {theme} from '../css/theme';
import {common} from '../css/common';
import MapModal from './shared/map/mapModal';
import Thumb from '../components/shared/slider/thumb';
import Rail from '../components/shared/slider/rail';
import RailSelected from '../components/shared/slider/railselected';
import Notch from '../components/shared/slider/notch';
import LabelS from '../components/shared/slider/label';
import Carousel from 'react-native-snap-carousel';
import RangeSlider from 'rn-range-slider';
import Geolocation from '@react-native-community/geolocation';
import {lightblue} from 'color-name';
import HeaderPage from './shared/header';
import { RootStackParamList } from '../RouteConfig';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import AsyncStorage from '@react-native-community/async-storage';
import Storage from 'react-native-storage';
import { useDispatch, useSelector } from 'react-redux';
import { hideLoader, showLoader } from '../actions/common/commonActions';
import { calculateCharges, _calculateCharge, getMoneyParams } from '../actions/moneyrequest/moneyrequestActions';
import { RootState } from '../appReducers';
import { appConfig } from '../appConfig';
var storage = new Storage({size: 1000,storageBackend: AsyncStorage,defaultExpires: 1000 * 3600 * 24,enableCache: false});

type NotificationPageRouteProp = RouteProp<RootStackParamList, 'RequestMoney'>;

type NotificationPageNavigationProp = StackNavigationProp<
    RootStackParamList,
    'RequestMoney'
>;

type Props = {
    route: NotificationPageRouteProp;
    navigation: NotificationPageNavigationProp;
};

const RequestMoney = (props:Props) => {
  const dispatch = useDispatch();
  const courosel = useRef(null);
  
  const [courselItems,setCourselItems] = useState([
    {
      title: '100',
    },
    {
      title: '150',
    },
    {
      title: '200',
    },
    {
      title: '250',
    },
    {
      title: '300',
    },])



    const [activeIndex,setActiveIndex] = useState(0);
    const [rangeLow,setRangeLow] = useState(0)
    const [rangeHigh,setRangeHigh] = useState(3)
    const [maxRange,setMaxRange] = useState(3)
  
    const [address,setAddress] =  useState('')
    const [isvisible,setIsvisible] =  useState(false)
    const [visiblePlaces,setVisiblePlaces] =  useState(false)
    const [region,setRegion] = useState({})
  
     
      const [currentLongitude,setCurrentLongitude] = useState(0);
      const [currentLatitude,setCurrentLatitude] = useState(0);
      const [locationStatus,setLocationStatus] = useState('');
  
  

  const renderThumb = useCallback(() => <Thumb/>, []);
  const renderRail = useCallback(() => <Rail/>, []);
  const renderRailSelected = useCallback(() => <RailSelected/>, []);
  const renderLabel = useCallback(value => <LabelS text={value}/>, []);
  const renderNotch = useCallback(() => <Notch/>, []);

 

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

        setRegion({latitude: currentLatitude,
          longitude: currentLongitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,})
          dispatch(showLoader());
        fetch("https://maps.googleapis.com/maps/api/geocode/json?latlng=" + currentLatitude + "," + currentLongitude + "&key="+ appConfig.GoogleApiKey)
        .then((response)=>response.json())
        .then((response)=>{
          
        
         setAddress(response?.results[0]?.formatted_address)
        })
        .catch((error)=>{
          
           appConfig.functions.showError('Google places error')
        })
        dispatch(getMoneyParams())

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
              message: 'WUW App needs to Access your location',
            },
          );
          if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            //To Check, If Permission is granted
            getOneTimeLocation();
          
          } else {
            setLocationStatus('Permission Denied');
            
          }
        } catch (err) {
          
          console.warn(err);
        }
      }
    };
    requestLocationPermission();
  
  },[])

  const range = useSelector((state:RootState)=>state.mrequest_r._moneyRange)
  
  useEffect(()=>{
    if(range != undefined){
      dispatch(hideLoader())
      if(range.status == true){
        var a = [];
        for(let i=0;i<range?.data?.money_rates?.length;i++){
          console.log("insideloop",range?.data?.money_rates[i]);
             a.push({"title": range?.data?.money_rates[i]})
        }
        console.log("array",a);
        setCourselItems([...a])
        setMaxRange(range?.data?.max_time_duration)
      }else{
        appConfig.functions.showError(range.message)
      }
    }
  },[range])

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

 const validate = () =>{
   dispatch(showLoader());
   var data = {
    pickup_latitude:currentLatitude,
    pickup_longitude:currentLongitude,
    pickup_location:address,
    amount:courselItems[activeIndex].title,
    time_duration:rangeLow
   }
   dispatch(calculateCharges(data))
 }

 const charges = useSelector((state:RootState)=>state.mrequest_r._calculateCharge)

 useEffect(()=>{
    if(charges != undefined){
      dispatch(hideLoader());
      console.log("charges",charges);
      if(charges.status == true){
        props.navigation.navigate('ConfirmMoney',{data:charges.data,pricing:charges.pricing})
        dispatch(_calculateCharge(undefined))   
      }else{
          appConfig.functions.showError(charges.message);
          dispatch(_calculateCharge(undefined))
      }
    }
 },[charges])


 const _renderItem = ({item, index}) => {
  return (
    <View
      style={{
        backgroundColor: 'transparent',
        height: 100,
        marginLeft: 15,
        marginRight: 15,
      }}>
      <Text style={[common.fontlg, common.white, common.textcenter]}>$</Text>
      <Text
        style={[
          common.fontxxl,
          common.white,
          common.textcenter,
          {fontWeight: 'bold'},
        ]}>
        {item.title}
      </Text>
    </View>
  );
}
 
  
    return (
      <Container>
        <HeaderPage title='' back={true}/>
        <ScrollView>
          <View style={(common.pt20, common.mt20)}>
            <Image
              source={require('../assets/images/request_banner.png')}
              style={[common.center, {width: 251, height: 194}]}
            />
          </View>
          <View style={[common.p15]}>
            <Text
              style={[
                common.textcenter,
                theme.fontbold,
                common.fontxxl,
                common.colorblack,
              ]}>
              Lets get started
            </Text>
            <Text style={[common.center, theme.colorblack]}>
              One line description about money request
            </Text>
          </View>

          <View style={[theme.section_blue]}>
            <View
              style={[
                common.p15,
                common.pt20,
                theme.borderbottom,
                common.mb0,
                common.pb0,
              ]}>
              <Text
                style={[
                  common.pb10,
                  theme.select_text,
                  common.fontsm,
                  common.textcenter,
                ]}>
                swipe to select
              </Text>

              <View style={[theme.sliderwp]}>
                <Carousel
                  layout={'default'}
                  ref={courosel}
                  data={courselItems}
                  sliderWidth={Dimensions.get('window').width}
                  itemWidth={100}
                  renderItem={_renderItem}                
                  onSnapToItem={(index) => setActiveIndex(index)}
                  activeSlideAlignment={'center'}
                  loop={true}
                  inactiveSlideOpacity={0.3}
                  inactiveSlideScale={0.7}
                />
              </View>
            </View>
            <View
              style={[
                common.p15,
                common.pt20,
                theme.borderbottom,
                common.mb10,
              ]}>
              <Text
                style={[
                  common.pb20,
                  theme.select_text,
                  common.fontsm,
                  common.textcenter,
                ]}>
                TIME DURATION
              </Text>
               <View >
                    <Text style={[common.white,common.textcenter,common.fontbold,common.fontxl]}>
                        {rangeLow} <Text style={[common.white]}>hr</Text>
                    </Text>
                   
               </View>
              <View style={[theme.sliderwp,{marginTop:-30}]}>
                <RangeSlider
                  style={{width: '100%', height: 80}}
                  gravity={'center'}
                  min={0}
                  max={maxRange}
                  step={1}
                  rangeEnabled={false}
                  disableRange={true}
                  renderThumb={renderThumb}
                  renderRailSelected={renderRailSelected}
                  renderRail={renderRail}
                  renderLabel={renderLabel}
                  renderNotch={renderNotch}             
                  onValueChanged={(low, high, fromUser) => {
                    setRangeLow(low)
                    setRangeHigh(high);
                  }}
                />
              </View>
            </View>
            <View style={[common.p15, common.pb10]}>
              <ListItem icon onPress={()=>{setIsvisible(!isvisible)}}>
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
                    Deliver to
                  </Text>
                  <Text style={[common.white, common.fontbody]}>
                    {address}
                  </Text>
                </Body>
                <Right style={[common.bordernone]}>
                  <Icon
                    style={[common.fontxl, common.white, {opacity: 0.3}]}
                    name="keyboard-arrow-right"
                    type="MaterialIcons"
                  />
                </Right>
              </ListItem>
            </View>

            <View style={[common.p15, common.center]}>
              <Button iconLeft light style={[theme.button_rounded]} onPress={validate}>
                <View style={[theme.icon_btn, common.center, common.ml10]}>
                  <Icon
                    name="dollar"
                    type="Foundation"
                    style={[common.white]}
                  />
                </View>
                <Text
                  style={[theme.textcapital, theme.bluecolor, common.fontmd]}>
                  Request Money
                </Text>
              </Button>
            </View>
          </View>
        </ScrollView>
        <MapModal {...modalProps}/>
      </Container>
    );
  }

  export default RequestMoney


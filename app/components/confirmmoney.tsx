/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {Component, useEffect, useState} from 'react';
import {StatusBar, Image, TouchableOpacity, ScrollView} from 'react-native';
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
  List,
  Radio,
} from 'native-base';

import {theme} from '../css/theme';
import {common} from '../css/common';
import * as geofirestore from 'geofirestore';
import firebase from '@react-native-firebase/app';
import Modal from 'react-native-modal';
import RadioGroup from 'react-native-radio-button-group';
import HeaderPage from './shared/header';
import { RootStackParamList } from '../RouteConfig';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import AsyncStorage from '@react-native-community/async-storage';
import Storage from 'react-native-storage';
import { useDispatch, useSelector } from 'react-redux';
import { hideLoader, showLoader } from '../actions/common/commonActions';
import { confirmMoney, _confirmMoney } from '../actions/moneyrequest/moneyrequestActions';
import { RootState } from '../appReducers';
import { appConfig } from '../appConfig';
var storage = new Storage({size: 1000,storageBackend: AsyncStorage,defaultExpires: 1000 * 3600 * 24,enableCache: false});

type NotificationPageRouteProp = RouteProp<RootStackParamList, 'ConfirmMoney'>;

type NotificationPageNavigationProp = StackNavigationProp<
    RootStackParamList,
    'ConfirmMoney'
>;

type Props = {
    route: NotificationPageRouteProp;
    navigation: NotificationPageNavigationProp;
};

// var firebaseConfig = {
  //   apiKey: "AIzaSyBBRJJRhgZzjprChQ-5Fo8X-lTiO9uB8gs",
  //   authDomain: "whateveruwant-b092b.firebaseapp.com",
  //   databaseURL: "https://whateveruwant-b092b.firebaseio.com",
  //   projectId: "whateveruwant-b092b",
  //   storageBucket: "whateveruwant-b092b.appspot.com",
  //   messagingSenderId: "329973517308",
  //   appId: "1:329973517308:android:353a07ab9e861a9c08c079",
    
  // };
  // firebase.initializeApp(firebaseConfig)

const ConfirmMoney = (props:Props) => {
 
  const dispatch = useDispatch()

  const [isModalVisible,setIsModalVisible] = useState(false)
  const [selectedOption,setSelectedOption] = useState({id:0})
  const [labelViewOptions,setLableViewOptions] = useState<Array<any>>([])
  const [cardToken,setCardToken] = useState(props?.route?.params?.data?.cards[0]?.id)
  const [lastFour,setLastFour] = useState(props?.route?.params?.data?.cards[0]?.last4)

  const toggleModal = () =>{
    setIsModalVisible(!isModalVisible);
  }
  

 
  const addZeroes = (num) => {
    const dec = num.split('.')[1]
    const len = dec && dec.length > 2 ? dec.length : 2
    return Number(num).toFixed(len)
  }

  useEffect(()=>{
    var a:Array<any> = [];
     props?.route?.params?.data?.cards?.length>0 && props?.route?.params?.data?.cards.map((item,index)=>{
       return(
           a.push({id:index,labelView:( <View
            style={[
              common.flexbox,
              common.flexrow,
              theme.borderbottomgray,
              common.pb15,
            ]}>
            <View style={[common.flexone]}>
              <Text>Credit Card</Text>
            </View>
            <View style={[common.flexone]}>
              <Text>XXX{item.last4}</Text>
            </View>
          </View>
        ),})
       )
     })
    
     setLableViewOptions(a)
  },[])

  

  


 const setCardValue = (id) =>{
   setCardToken(props?.route?.params?.data?.cards[id]?.id);
   setLastFour(props?.route?.params?.data?.cards[id]?.last4);
 }

 const confirmRequest = () =>{
   let data ={
    service_charge:props?.route?.params?.pricing?.service_charge,
    delivery_charge:props?.route?.params?.pricing?.max_delivery_charge,
    transaction_fee:props?.route?.params?.pricing?.stripe_transaction_fee,
    final_amount:props?.route?.params?.pricing?.final_amount,
    time_duration:props?.route?.params?.data?.time_duration,
    pickup_latitude:props?.route?.params?.data?.pickup_latitude,
    pickup_longitude:props?.route?.params?.data?.pickup_longitude,
    pickup_location:props?.route?.params?.data?.pickup_location,
    stripe_card_id:cardToken,
    original_amount:props?.route?.params?.pricing?.original_amount
   }

 

 

  var agentIdArr:Array<any> = [];
  
  const firestore = firebase.firestore()
  const GeoFirestore = geofirestore.initializeApp(firestore);
  const geocollection = GeoFirestore.collection('Users');
 
  const query = geocollection.near({ center:new firebase.firestore.GeoPoint(data?.pickup_latitude, data?.pickup_longitude), radius: 5 });

  query.get().then((value) => {
    // All GeoDocument returned by GeoQuery, like the GeoDocument added above
    
    if(value?.docs?.length > 0){
      value.docs.map((item,index)=>{
        agentIdArr.push(item.id);
      })
    } 
    console.log("agentIdArr",agentIdArr);
    data.agent_list = agentIdArr

    dispatch(showLoader());
    dispatch(confirmMoney(data))
    
  })
  .catch((error)=>{
    console.log("error",error)
  })
      
 
  
 }
  
 const confirm = useSelector((state:RootState)=>state.mrequest_r._confirmMoney)

 useEffect(()=>{
    if(confirm != undefined){
      dispatch(hideLoader())
      if(confirm.status == true){
        props.navigation.navigate('HomePage')
        dispatch(_confirmMoney(undefined))
      }else{
        appConfig.functions.showError(confirm.message)
        dispatch(_confirmMoney(undefined))
      }
    }
 },[confirm])

    return (
      <Container>
        <HeaderPage title="" back={true} color="blue"/>
        <ScrollView style={[theme.bgblue]}>
          <View style={common.p20}>
            <Text style={[common.white, common.fontlg]}>
              Confirm your request
            </Text>
            <Text style={[common.white]}>
              Please confirm your request details
            </Text>
          </View>

          <View style={[theme.card]}>
            <View style={[theme.borderbottomgray, common.pb15]}>
              <Text
                style={[
                  common.textcenter,
                  theme.fontbold,
                  common.mt20,
                  theme.colorblack,
                ]}>
                AMOUNT YOU REQUESTED
              </Text>
              <Text
                style={[
                  common.fontxxxl,
                  theme.fontbold,
                  common.textcenter,
                  theme.colorblack,
                ]}>
                ${props?.route?.params?.pricing?.original_amount}
              </Text>
              <View
                style={[
                  common.flexbox,
                  common.flexrow,
                  common.pl10,
                  common.pr10,
                ]}>
                <View style={[common.flexone, common.pr10]}>
                  <Text style={[common.textright, common.fontsm]}>
                    Service Charge
                  </Text>
                </View>
                <View style={[common.flexone]}>
              <Text style={[common.fontbody, theme.fontbold]}>${addZeroes(JSON.stringify(props?.route?.params?.pricing?.service_charge))}</Text>
                </View>
              </View>
              <View
                style={[
                  common.flexbox,
                  common.flexrow,
                  common.pl10,
                  common.pr10,
                ]}>
                <View style={[common.flexone, common.pr10]}>
                  <Text style={[common.textright, common.fontsm]}>
                    Delivery Charges
                  </Text>
                </View>
                <View style={[common.flexone]}>
                  <Text style={[common.fontbody, theme.fontbold]}>${addZeroes(JSON.stringify(props?.route?.params?.pricing?.max_delivery_charge))}</Text>
                </View>
              </View>
              <View
                style={[
                  common.flexbox,
                  common.flexrow,
                  common.pl10,
                  common.pr10,
                ]}>
                <View style={[common.flexone, common.pr10]}>
                  <Text style={[common.textright, common.fontsm]}>
                    Transaction Charge
                  </Text>
                </View>
                <View style={[common.flexone]}>
                  <Text style={[common.fontbody, theme.fontbold]}>${addZeroes(JSON.stringify(props?.route?.params?.pricing?.stripe_transaction_fee))}</Text>
                </View>
              </View>
            </View>
            <View
              style={[
                common.flexbox,
                common.flexrow,
                common.pl10,
                common.p10,
                common.pb0,
              ]}>
              <View style={[common.flexone, common.pr10]}>
                <Text
                  style={[common.textright, common.fontbody, theme.fontbold]}>
                  Total Amount Payable
                </Text>
              </View>
              <View style={[common.flexone]}>
            <Text style={[common.fontlg, theme.fontbold]}>${addZeroes(props?.route?.params?.pricing?.final_amount)}</Text>
              </View>
            </View>
            <View
              style={[
                common.flexbox,
                common.flexrow,
                common.pl10,
                common.pr10,
                theme.borderbottomgray,
                common.aligncenter,
                common.pb20,
              ]}>
              <View style={[common.flexone, common.pr10]}>
                <Text style={[common.textright, common.fontsm]}>
                  <Icon
                    name="credit-card"
                    type="Entypo"
                    style={[common.fontmd, common.pr10]}>
                    {'  '}
                  </Icon>
                  Credit Card
                </Text>
              </View>
              <View
                style={[
                  common.flexone,
                  common.flexbox,
                  common.flexrow,
                  common.aligncenter,
                ]}>
                <Text style={[common.fontbody]}>XXXX{lastFour}</Text>
                <Button rounded small style={[theme.btn_small]} onPress={()=>setIsModalVisible(!isModalVisible)}>
                  <Text style={[theme.textcapital]}>change</Text>
                </Button>
              </View>
            </View>
            <View style={[theme.footercard]}>
              <View
                style={[
                  common.flexbox,
                  common.flexrow,
                  common.p20,
                  common.pb5,
                ]}>
                <View style={[common.pr5]}>
                  <Icon
                    name="circle-o"
                    type="FontAwesome"
                    style={[
                      common.fontsm,
                      common.mt5,
                      theme.bluecolor,
                      theme.fontbold,
                    ]}></Icon>
                </View>
                <View>
                  <Text
                    style={[
                      common.textupercase,
                      common.fontbody,
                      theme.fontbold,
                      theme.colorgray,
                    ]}>
                    Time Duration
                  </Text>
                  <Text note>
                    <Text>{props?.route?.params?.data?.time_duration}:00 </Text> Hour
                  </Text>
                </View>
              </View>
              <View
                style={[
                  common.flexbox,
                  common.flexrow,
                  common.p20,
                  common.pt10,
                ]}>
                <View style={[common.pr5]}>
                  <Icon
                    name="circle-o"
                    type="FontAwesome"
                    style={[
                      common.fontsm,
                      common.mt5,
                      theme.bluecolor,
                      theme.fontbold,
                    ]}></Icon>
                </View>
                <View>
                  <Text
                    style={[
                      common.textupercase,
                      common.fontbody,
                      theme.fontbold,
                      theme.colorgray,
                    ]}>
                    Deliver to
                  </Text>
                  <Text>{props?.route?.params?.data?.pickup_location}</Text>
                </View>
              </View>
            </View>
          </View>
          <View style={[common.p15, common.center]}>
            <Button
              iconLeft
              light
              style={[theme.button_rounded, common.pr20, common.pl20]}
              onPress={confirmRequest}>
              <Text style={[theme.textcapital, theme.bluecolor, common.fontmd]}>
                Confirm Request
              </Text>
            </Button>
          </View>

          <Modal
            isVisible={isModalVisible}
            style={{justifyContent: 'flex-end', margin: 0}}>
            <View style={[theme.boxmodelbottom]}>
              <Text
                style={[
                  common.textcenter,
                  common.fontlg,
                  theme.fontbold,
                  common.pb20,
                ]}>
                SELECT PAYMENT
              </Text>
              <View>
                <RadioGroup
                  options={labelViewOptions}
                  onChange={(option) => {setSelectedOption(option);setCardValue(option.id)}}
                  activeButtonId={0}
                  circleStyle={{
                    width: 20,
                    height:20,
                    fillColor: '#00AFEF',
                    borderColor: '#DCDCDC',
                    borderWidth: 1.5,
                    marginBottom: 20,
                  }}
                  //selected={selectedOption}
                />
              </View>
              <View style={[common.flexbox, common.flexrow, common.mt20]}>
                {/* <View style={[common.flexone, common.m5]}>
                  <Button
                    rounded
                    block
                    bordered
                    danger
                    style={{height: 60}}
                    onPress={toggleModal}>
                    <Text>OK</Text>
                  </Button>
                </View> */}
                <View style={[common.flexone, common.m5]}>
                  <Button
                    rounded
                    block
                    danger
                    style={[theme.bgblue, {height: 60}]}
                    onPress={toggleModal}>
                    <Text>OK</Text>
                  </Button>
                </View>
              </View>
            </View>
          </Modal>
        </ScrollView>
      </Container>
    );
    
  }

  

export default ConfirmMoney
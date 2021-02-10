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
  Thumbnail,
} from 'native-base';

import {theme} from '../css/theme';
import {common} from '../css/common';
import Timeline from 'react-native-timeline-flatlist';
import Modal from 'react-native-modal';
import io, { Socket } from 'socket.io-client';

import {CommonActions} from '@react-navigation/native';
import {showLoader, hideLoader} from '../actions/common/commonActions'
import {appConfig} from '../appConfig'
import { getOrderDetails,cancelMyRequest} from '../actions/moneyorder/moneyorderActions'
import HeaderPage from './shared/header'
import {useSelector, useDispatch} from 'react-redux'

import {RootStackParamList} from '../RouteConfig'
import {StackNavigationProp} from '@react-navigation/stack'
import {RouteProp} from '@react-navigation/native'
import {RootState} from '../appReducers'
import CountryPicker, {DARK_THEME} from 'react-native-country-picker-modal'
import moment from 'moment';


import { TextInputMask } from 'react-native-masked-text'
import AsyncStorage from '@react-native-community/async-storage';
import Storage from 'react-native-storage';
import { payMoney } from '../actions/moneyorder/moneyorderActions';
var storage = new Storage({size: 1000,storageBackend: AsyncStorage,defaultExpires: 1000 * 3600 * 24,enableCache: false});

type NotificationPageRouteProp = RouteProp<RootStackParamList, 'OrderPay'>

type NotificationPageNavigationProp = StackNavigationProp<
  RootStackParamList,
  'OrderPay'
>

type Props = {
  route: NotificationPageRouteProp
  navigation: NotificationPageNavigationProp
}

const OrderPay = (props:Props) => {

  const dispatch = useDispatch()

  const [data,setData] = useState(props?.route?.params?.data);
 
  const [status,setStatus] = useState([]);

  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

   useEffect(()=>{
      console.log("data",props?.route?.params?.data);
      var track:any = []
      props?.route?.params?.data?.tracking_information?.length>0 && props?.route?.params?.data?.tracking_information.map((item,index)=>{
        let format_time = moment(item.recorded_datetime).format('lll')
       track.push({title: capitalizeFirstLetter(item.event) + ' - ' + format_time})
      })
      setStatus(track);

   },[])

   const payMyAgent = () =>{
      dispatch(showLoader())
      dispatch(payMoney({unique_money_request_id:data?.unique_id,order_status : "delivered"}))
   }

   const paid = useSelector((state:RootState)=>state.morder_r._payAgent) 

   useEffect(()=>{
     if(paid != undefined){
       dispatch(hideLoader())
       if(paid.status == true){
         props.navigation.navigate('RatingPage',{data:data})
        appConfig.functions.successMsg(paid.message)
       }else{
         appConfig.functions.showError(paid.message)
       }
     }
   })
   
   const addZeroes = (num) => {
    const dec = num?.split('.')[1]
    const len = dec && dec?.length > 2 ? dec?.length : 2
    return Number(num).toFixed(len)
  }
 
    return (
      <Container style={[theme.bgblue]}>
        <View style={{marginTop:20}}>
        <StatusBar barStyle="dark-content" />
        <Header
          androidStatusBarColor="#00AFEF"
          iosBarStyle="dark-content"
          style={[theme.bgblue]}>
          <Left>
            <Button transparent onPress={()=>props.navigation.navigate('HomePage')}>
              <Icon
                name="chevron-small-left"
                type="Entypo"
                style={[theme.colorblack, common.fontxxl]}
              />
            </Button>
          </Left>
          <Body />
          <Right>
            {/* <Button transparent >
              <Icon
                name="closecircleo"
                type="AntDesign"
                style={[theme.colorblack, common.fontlg]}
              />
            </Button> */}
          </Right>
        </Header>
        </View>
        <ScrollView style={[theme.bgblue]}>
          <View style={common.p20}>
            <Text style={[common.white, common.fontlg]}>#{data?.unique_id}</Text>
            <Text style={[common.white]}>Please see the request details</Text>
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
                ${addZeroes(JSON.stringify(data?.original_amount))}
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
                  <Text style={[common.fontbody, theme.fontbold]}>${addZeroes(JSON.stringify(data?.service_charge))}</Text>
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
                  <Text style={[common.fontbody, theme.fontbold]}>${addZeroes(JSON.stringify(data?.delivery_charge))}</Text>
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
                  <Text style={[common.fontbody, theme.fontbold]}>${addZeroes(JSON.stringify(data?.stripe_transaction_charge))}</Text>
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
                <Text style={[common.fontlg, theme.fontbold]}>${addZeroes(JSON.stringify(data?.final_amount))}</Text>
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
                <Text style={[common.fontbody]}>XXXX{data?.payment_data?.card?.last4}</Text>
              </View>
            </View>
            <View style={[theme.footercard]}>
              <View style={[common.flexbox, common.flexrow, common.center]}>
                <Text style={[theme.otpbox, theme.fontbold]}>OTP {data?.delivery_otp}</Text>
                <Text>
                  <Icon
                    style={[theme.colororange]}
                    name="info-with-circle"
                    type="Entypo"></Icon>
                </Text>
              </View>
              <View
                style={[common.flexone, common.m5, common.center, common.mb20]}>
                <Button
                  rounded
                  danger
                  style={[theme.bgblue, {height: 60}, common.pr20, common.pl20]}
                  onPress={()=>{payMyAgent()}}
                 >
                  <Text style={[common.fontlg, theme.textcapital]}>
                    Pay{' '}
                    <Text style={[common.white, theme.fontbold, common.fontlg]}>
                      ${addZeroes(JSON.stringify(data?.final_amount))}
                    </Text>
                  </Text>
                </Button>
              </View>
            </View>
          </View>

          <View style={[theme.card]}>
            <View style={(common.pt20, common.mt20)}>
              <ListItem avatar>
                <Left>
                {
                   
                   (data?.agent_data?.profile_image == undefined || data?.agent_data?.profile_image == '')
                   &&
                   <Thumbnail
                     source={require('../assets/images/no-photo.jpg')}
                     style={{width: 80, height: 80, borderRadius: 40}}
                   />
                 }
                 {
                  
                  data?.agent_data?.profile_image != undefined && data?.agent_data?.profile_image != ''
                  &&
                   <Thumbnail
                     source={{uri:data?.agent_data?.profile_image}}
                     style={{width: 80, height: 80, borderRadius: 40}}
                   />
                 }
                </Left>
                <Body style={[common.bordernone]}>
                  <Text style={[common.fontlg, theme.fontbold]}>
                    {data?.agent_data?.first_name} {data?.agent_data?.last_name}
                  </Text>
                  {/* <Text note>{data?.agent_data?.location}</Text> */}
                  <Text style={[theme.colorblack]}>
                    <Icon
                      name="star"
                      type="FontAwesome"
                      style={[theme.coloryellow, common.fontxl]}></Icon>{' '}
                    {data?.agent_data?.rating}
                  </Text>
                </Body>
              </ListItem>
            </View>

            <View style={[theme.bggray, common.mt15, common.pt10, common.pb10]}>
              <ListItem style={[common.bordernone]}>
                <Body style={[common.bordernone]}>
                  <Text style={[common.fontmd, theme.fontbold]}>
                    {data?.agent_data?.vehicle_model} - {data?.agent_data?.vehicle_color}
                  </Text>
                  <Text note>{data?.agent_data?.vehicle_number}</Text>
                </Body>
                <Right>
                  <Button rounded light style={[theme.btncall]} onPress={()=>Linking.openURL(`tel:${data?.agent_data?.phone_prefix + data?.agent_data?.phone}`)}>
                    <Icon
                      name="call"
                      type="MaterialIcons"
                      style={[common.white]}></Icon>
                  </Button>
                </Right>
              </ListItem>
            </View>

            <View style={[common.mt15, common.pt10, common.pb10]}>
              <View style={[common.pl20]}>
                <Text note style={[common.fontmd, theme.fontbold]}>
                  TRACKING
                </Text>
              </View>
              <View style={[common.p15, ]}>
                <Timeline
                  data={status}
                  showTime={false}
                  circleSize={12}
                  lineWidth={1}
                  circleColor={'#00AFEF'}
                  lineColor={'#00AFEF'}
                  titleStyle={{marginTop: -10, paddingBottom: 10,fontSize:14,fontWeight:'500'}}
                  style={[common.fontbody]}
                />
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
                <View style={[common.flexone]}>
                  <Text
                    style={[
                      common.textupercase,
                      common.fontbody,
                      theme.fontbold,
                      theme.colorgray,
                    ]}>
                    Time Duration
                  </Text>
                  <View style={[common.flexbox, common.flexrow]}>
                    <View style={[common.flexone]}>
                      <Text note>
                        <Text>{data?.time_duration} </Text> Hour
                      </Text>
                    </View>
                    <View>
                      <Text style={[common.fontsm]}>Request posted {data?.created_time}</Text>
                    </View>
                  </View>
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
                  <Text>{data?.delivery_address}</Text>
                </View>
              </View>
            </View>
          </View>
        </ScrollView>
      </Container>
    );
  
}
 export default OrderPay
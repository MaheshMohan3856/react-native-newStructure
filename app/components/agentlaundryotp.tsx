/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useState,useEffect} from 'react';
import {StatusBar, Image, TouchableOpacity, ScrollView,Linking,KeyboardAvoidingView,Platform} from 'react-native';
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
  Right,
  Thumbnail,
  ListItem,
} from 'native-base';

import {theme} from '../css/theme';
import {common} from '../css/common';
import OTPInputView from '@twotalltotems/react-native-otp-input'
import {showLoader, hideLoader} from '../actions/common/commonActions'
import {appConfig} from '../appConfig'
import { sendVerificationOtp,deliverLaundry} from '../actions/accept/acceptActions'
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

type NotificationPageRouteProp = RouteProp<RootStackParamList, 'AgentLaundryOtp'>

type NotificationPageNavigationProp = StackNavigationProp<
  RootStackParamList,
  'AgentLaundryOtp'
>

type Props = {
  route: NotificationPageRouteProp
  navigation: NotificationPageNavigationProp
}

const AgentLaundryOtp = (props:Props) => {

  const dispatch = useDispatch()

  const [otp,setOtp] = useState('');
  const [data,setData] = useState(props?.route?.params?.data)

  

  const sendOtp = (otp) =>{
        dispatch(showLoader())
        dispatch(deliverLaundry({otp:otp,unique_laundry_request_id: data?.unique_laundry_request_id,order_status: "delivery_agent_delivered"}))
  }

  const completed = useSelector((state:RootState)=>state.accept_r._completeLaundry)

  useEffect(()=>{
      if(completed != undefined){
        dispatch(hideLoader())
        if(completed.status == true){
            props.navigation.navigate('AgentHome')
        }else{
          appConfig.functions.showError(completed.message)
        }
      }
  },[completed])

  useEffect(()=>{
       dispatch(showLoader())
       dispatch(sendVerificationOtp({unique_laundry_request_id : props?.route?.params?.data?.unique_laundry_request_id}))
  },[])

  

  const resendOtp = () => {
    dispatch(showLoader())
    dispatch(sendVerificationOtp({"unique_money_request_id" : data?.unique_laundry_request_id }))
  }

  const otpSend = useSelector((state:RootState)=>state.accept_r._otpSend)

  useEffect(()=>{
     if(otpSend != undefined){
       dispatch(hideLoader())
       if(otpSend.status == true){
        appConfig.functions.successMsg(otpSend.message)
       }else{
         appConfig.functions.showError(otpSend.message)
       }
     }
  },[otpSend])

  
  
    return (
      <Container style={[theme.primarybackground]}>
        <StatusBar barStyle="dark-content" />
        <Header
          androidStatusBarColor="#fff"
          iosBarStyle="dark-content"
          style={[theme.themeheader]}>

          <Body />
          <Right>
            {/* <Button transparent onPress={this.toggleModal}>
              <Icon
                name="closecircleo"
                type="AntDesign"
                style={[common.red, common.fontxl]}
              />
            </Button> */}
          </Right>
        </Header>
        <KeyboardAvoidingView behavior={Platform.OS == "ios" ? "padding" : "height"} style={{flex:1}}>
        <ScrollView>
        <View style={[common.borderbottom,]}>
          <View style={[common.whitebg,]}>
          <ListItem avatar style={[common.pt10,common.pb10,]}>
            <Left>
            {
                (data.requester_profile_image == undefined || data.requester_profile_image == '')
                &&
                <Thumbnail
                     source={require('../assets/images/no-photo.jpg')}
                     style={{width: 50, height: 50, borderRadius: 40}}
                   />
              }
              {
                (data.requester_profile_image != undefined && data.requester_profile_image != '')
                &&
              <Thumbnail
                source={{uri:data.requester_profile_image}}
                style={{width: 50, height: 50, borderRadius: 40}}
              />
             }
            </Left>
            <Body style={[common.bordernone]}>
            <Text style={[common.colorblack, common.fontlg, common.fontbold]}>{data.requester_first_name} {data.requester_last_name}</Text>
            <Text style={[common.colorblack, common.fontsm]}>{data.pickup_location}</Text>
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

            {/* <View style={[common.flexbox,common.flexrow,common.p15,theme.lightblue]}>
              <View style={[common.flexone]}>
                <Text style={[common.center,common.fontbold,common.fontxl,common.colorblack]}>${data?.original_amount}</Text>
                <Text style={[common.center,common.fontxs,common.colorblack]}>AMOUNT REQUESTED</Text>
              </View>
              <View style={[common.flexone,common.center]}>
              <View style={[common.flexbox,common.flexrow]}>
              <Text style={[common.center,common.fontbold,common.fontlg,common.colorblack, common.mt8]}>{getDeliveryTime(data?.created_date,data?.time_duration)} </Text>
               <Text style={[common.center,common.fontbold,common.fontbody,common.colorblack,common.pt10]}>PM</Text> 
              </View>
                <Text style={[common.center,common.fontxs,common.colorblack]}>DELIVER BEFORE</Text>
              </View>
            </View> */}
          </View>
        </View>

          <View style={[common.p20]}>
          <View style={(common.pt20, common.mt20)}>
              <Image
                source={require('../assets/images/service.png')}
                style={[common.mt20, common.center, {width: 124, height: 134}]}
              />
            </View>

            <View style={[common.mb20]}>
              <Text
                style={[theme.fontregular, common.fontxl, common.white, common.textcenter,common.fontbold,common.pt10]}>
                Service Completed!
              </Text>
              <Text
                style={[theme.fontregular, common.fontbody, common.white, common.textcenter]}>
               Please enter the verification code from user
              </Text>

            </View>
           
            <View>
              <Form>
                <View
                  style={[
                    common.flexbox,
                    common.flexrow,
                    common.pl20,
                    common.pr20
                  ]}>
                  <View style={{}}>
                
                   
                <OTPInputView 
                 pinCount={4}
                 style={{height:60,}}
                 codeInputFieldStyle={{color:"#F16436",borderWidth: 0,borderBottomWidth: 1,fontSize:24}}
                 codeInputHighlightStyle={{ borderColor: "#F16436"}}
                 code={otp}
                 onCodeChanged={(otp)=>{setOtp(otp)}}
                // onCodeFilled={()=>sendOtp()}
                />
            
            </View>
                </View>
                <View style={[common.mb20,common.pb20,common.pt10]}>
                  <TouchableOpacity onPress={()=>resendOtp()}>
                    <Text
                      style={[
                        common.pt10,
                        common.white,
                        common.textcenter,
                      ]}>
                      Resend Code?
                    </Text>
                  </TouchableOpacity>
                </View>
                  <View style={[common.p15, common.center]}>
                  <Button
                    style={[theme.button_rounded, common.ml20, common.mr20]} onPress={()=>sendOtp(otp)}>
                    <Text style={[theme.textcapital, theme.bluecolor, common.fontmd,common.w100, common.textcenter]}>
                    Done
                    </Text>
                  </Button>
                </View>
              </Form>
            </View>
          </View>
        </ScrollView>
        </KeyboardAvoidingView>
      </Container>
    );
  }

  export default AgentLaundryOtp


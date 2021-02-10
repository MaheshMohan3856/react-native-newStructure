/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useState, useEffect} from 'react';
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
import {showLoader, hideLoader} from '../actions/common/commonActions'
import {appConfig} from '../appConfig'
import { getSummary} from '../actions/accept/acceptActions'
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
var storage = new Storage({size: 1000,storageBackend: AsyncStorage,defaultExpires: 1000 * 3600 * 24,enableCache: false});

type NotificationPageRouteProp = RouteProp<RootStackParamList, 'AgentSummary'>

type NotificationPageNavigationProp = StackNavigationProp<
  RootStackParamList,
  'AgentSummary'
>

type Props = {
  route: NotificationPageRouteProp
  navigation: NotificationPageNavigationProp
}

const AgentSummary = (props:Props) => {

  const dispatch = useDispatch();

  const [summary,setSummary] = useState({})

  useEffect(()=>{
    dispatch(showLoader())
    dispatch(getSummary({unique_money_request_id:props?.route?.params?.request_id}))
  },[])

  const summaryData = useSelector((state:RootState)=>state.accept_r._summary);

  useEffect(()=>{
     if(summaryData != undefined){
       dispatch(hideLoader())
       if(summaryData.status == true){
         setSummary(summaryData?.request_summary)

       }else{
         appConfig.functions.showError(summaryData.message)
       }
     }
  },[summaryData])

  function getDeliveryTime(starttime,interval){
   
    var endtime = new Date(starttime);
   
    var splittime = interval.split('.');
  
    endtime.setHours( endtime.getHours() + parseInt(splittime[0]) );
    if(splittime[1] != undefined){
      endtime.setMinutes(endtime.getMinutes() + 30)
    }
    var time = endtime.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
    console.log('endtime',endtime);
    
     
    
    return time
  }
  
    return (
      <Container style={[theme.bgblue]}>
        <StatusBar barStyle="dark-content" />

        <Header
          androidStatusBarColor="#00AFEF"
          iosBarStyle="dark-content"
          style={[theme.themeheader,theme.bgblue]}>
          <Body />
          <Right>
            {/* <Button transparent onPress={this.toggleModal}>
              <Icon
                name="closecircleo"
                type="AntDesign"
                style={[common.whit, common.fontxl]}
              />
            </Button> */}
          </Right>
        </Header>
       <ScrollView>
        <View style={[theme.bgblue,theme.bottomfix, common.flexbox, common.pt20,common.mt20]}>
        <View style={[common.flexbox,common.flexcolumn,{height:'100%'}]}>
          <View style={[common.flexone]}>
          <View>
            <View style={[common.center,{height:'50%'}]}>
              <Image
                source={require('../assets/images/tick-success.png')}></Image>
            </View>
            <Text style={[common.white, common.fontxxl, common.textcenter]}>
              Thank You
            </Text>
            <Text style={[common.white, common.textcenter,common.pb20, common.mb20]}>
            You successfully completed the payment
            </Text>
          </View>
          </View>
          <View style={[common.flexone]}>
          <View style={[common.bgwhite,{ borderTopLeftRadius: 40,borderTopRightRadius: 40,}]}>
            <View style={[common.center,common.pt20]}>
            <Text class={[common.textcenter,common.fontsm,theme.graytext,theme.fontbold,]}>SUMMARY</Text>
            </View>
            <ListItem avatar style={[common.pb10,common.pt10]}>
            <Left>
            {
                (summary?.requester_details?.profile_image == undefined || summary?.requester_details?.profile_image == '')
                &&
                <Thumbnail
                     source={require('../assets/images/no-photo.jpg')}
                     style={{width: 50, height: 50, borderRadius: 40}}
                   />
              }
              {
                (summary?.requester_details?.profile_image != undefined && summary?.requester_details?.profile_image != '')
                &&
              <Thumbnail
                source={{uri:summary?.requester_details?.profile_image}}
                style={{width: 50, height: 50, borderRadius: 40}}
              />
             }
              
            </Left>
            <Body style={[common.bordernone]}>
            <Text style={[common.colorblack, common.fontlg, common.fontbold]}>{summary?.requester_details?.first_name} {summary?.requester_details?.last_name}</Text>
          <Text style={[common.colorblack, common.fontsm]}>{summary?.delivery_address}</Text>
            </Body>
            <View style={[common.pl15, common.pr15]}>
            {/* <Button rounded bordered small danger >
            <Text style={[theme.textcapital]}>Report</Text>
          </Button> */}
            </View>
          </ListItem>
          <View style={[common.flexbox,common.flexrow,common.p15,theme.lightblue]}>
              <View style={[common.flexone]}>
              <Text style={[common.center,common.fontbold,common.fontlg,common.colorblack,]}>{moment(summary?.created_date).format('LT')}</Text>
                
             {/*  {summary?.created_time} */}
                <Text style={[common.center,common.fontxs,common.colorblack]}>REQUESTED TIME</Text>
              </View>
              <View style={[common.flexone]}>
                <Text style={[common.center,common.fontbold,common.fontlg,common.colorblack]}>${summary?.original_amount}</Text>
                <Text style={[common.center,common.fontxs,common.colorblack]}>AMOUNT</Text>
              </View>
              <View style={[common.flexone,common.center]}>
              <View style={[common.flexbox,common.flexrow]}>
              <Text style={[common.center,common.fontbold,common.fontlg,common.colorblack,]}>{getDeliveryTime(summary?.created_date,summary?.time_duration)}</Text>
                {/* <Text style={[common.center,common.fontbold,common.fontbody,common.colorblack,common.pt5]}></Text> */}
              </View>
                <Text style={[common.center,common.fontxs,common.colorblack]}>DELIVERED TIME</Text>
              </View>
            </View>
        
          <View style={[common.p20,]}>
            <Text style={[common.center,common.fontbold,common.fontxxxl,common.colorblack]}>${summary?.original_amount}</Text>
            <Text style={[common.center,common.fontbody,common.colorblack,common.pb20]}>Transferred to your account </Text>
          </View>
          <View style={[common.p20,]}>
            {/* <Text style={[common.center,common.fontbold,common.fontxxxl,common.colorblack]}>${summary?.delivery_charge}</Text> */}
            <Text style={[common.center,common.fontbody,common.colorblack,common.pb20]}>Delivery charge will be payed out weekly</Text>
          </View>
          <View style={common.mb20}>
              <Button
                    style={[theme.button_rounded, common.ml20, common.mr20,{backgroundColor:"#00AFEF"}]} onPress={()=>props.navigation.navigate('AgentHome')}>
                    <Text style={[theme.textcapital, common.white, common.fontmd,common.w100, common.textcenter]}>
                    Done
                    </Text>
                  </Button>
          </View>
          </View>
          </View>
        </View>
          

       

        </View>
        </ScrollView>
      </Container>
    );
  }

  export default AgentSummary

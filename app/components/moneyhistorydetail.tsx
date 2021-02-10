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
  StyleSheet,
  Alert,
  Linking
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
import Timeline from 'react-native-timeline-flatlist';
import Modal from 'react-native-modal';
import io, { Socket } from 'socket.io-client';

import {CommonActions} from '@react-navigation/native';
import {showLoader, hideLoader} from '../actions/common/commonActions'
import {appConfig} from '../appConfig'
import { getMoneyOrderDetails,_getMoneyOrderDetails} from '../actions/moneyorder/moneyorderActions'
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
import { cancelRequest } from '../actions/accept/acceptActions';
var storage = new Storage({size: 1000,storageBackend: AsyncStorage,defaultExpires: 1000 * 3600 * 24,enableCache: false});

type NotificationPageRouteProp = RouteProp<RootStackParamList, 'MoneyHistoryDetail'>

type NotificationPageNavigationProp = StackNavigationProp<
  RootStackParamList,
  'MoneyHistoryDetail'
>

type Props = {
  route: NotificationPageRouteProp
  navigation: NotificationPageNavigationProp
}





 const  MoneyHistoryDetail = (props:Props) => {
   
   const dispatch = useDispatch()
   const [status,setStatus] = useState([
      {title: 'Requested'},
      
    ])
    const [cancelButton,setCancelButton] = useState(true)
   

   
    

  
   const [data,setData] = useState({})
  
  
   const [isModalVisible,setIsModalVisible] = useState(false)


  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
  };

  
  

  useEffect(()=>{


    dispatch(showLoader())
    dispatch(getMoneyOrderDetails({type : "money",unique_request_id : props?.route?.params?.unique_request_id}))
   return() =>{

    dispatch(_getMoneyOrderDetails(undefined))
   }
  },[])

  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  

  const orderDetail = useSelector((state:RootState)=>state.morder_r._orderDetails)

  useEffect(()=>{
       if(orderDetail != undefined){
         dispatch(hideLoader())
         if(orderDetail.status == true){
          var track:Array<any> = []
            setData(orderDetail?.data?.money_data)
            orderDetail?.data?.money_data?.tracking_information?.length>0 && orderDetail?.data?.money_data?.tracking_information.map((item,index)=>{
                 let format_time = moment(item.recorded_datetime).format('lll')
                track.push({title: capitalizeFirstLetter(item.event) + ' - ' + format_time})
            })
            setStatus(track);
            if(orderDetail?.data?.money_data?.status == 'arrived'){
              props.navigation.navigate('OrderPay',{data:orderDetail?.data?.money_data})
            }
            
           
         }else{
           appConfig.functions.showError(orderDetail.message)
         }
       }
  },[orderDetail])

  

  

  const addZeroes = (num) => {
    const dec = num?.split('.')[1]
    const len = dec && dec?.length > 2 ? dec?.length : 2
    return Number(num).toFixed(len)
  }
 
    return (
      <Container>
       <View style={{marginTop:20}}>
        <StatusBar barStyle="dark-content" />
        <Header
          androidStatusBarColor="#fff"
          transparent
          iosBarStyle="dark-content"
          style={[theme.themeheader]}>
          <Left>
            <Button transparent onPress={()=>props.navigation.goBack()}>
              <Icon
                name="chevron-small-left"
                type="Entypo"
                style={[theme.colorblack, common.fontxxl]}
              />
            </Button>
          </Left>
          <Body />
          <Right>
            
            
          </Right>
        </Header>
        </View>
        <ScrollView>
        <View style={[common.p20,{backgroundColor:"#00AFEF"}]}>
          <Text style={[common.fontlg,common.white]}>Order #{data?.unique_id}</Text>
        </View>
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
                  <Text style={[common.fontlg, theme.fontbold]}>{data?.agent_data?.first_name} {data?.money_data?.agent_data?.last_name}</Text>
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

        <View style={[theme.section_blue]}>
          <View style={[common.flexbox, common.flexrow, common.p20]}>
            <View style={[common.flexone, common.pl10, common.pr10]}>
              {
                data?.original_amount != undefined
                &&
                <Text style={[common.fontxl, theme.fontbold, common.white]}>
                  $ {addZeroes(JSON.stringify(data?.original_amount))}
                </Text>
              }
              
              <Text style={[common.white]}>Amount Requested</Text>
            </View>
            <View style={[common.flexone, common.pl10, common.pr10]}>
            {
                data?.created_date != undefined
                &&
              <Text style={[common.fontxl, theme.fontbold, common.white]}>
              {moment(data?.created_date).format('LT')}
            {/* <Text style={[common.fontmd, common.white]}>AM</Text> */}
              </Text>
            }
              <Text style={[common.white]}>Requested Time</Text>
            </View>
          </View>
          {
            props?.route?.params?.page == "AgentHistory"
            &&
            <View style={[common.flexbox, common.flexrow, common.p20,{justifyContent:"center"}]}>
            <View style={[ common.pl10, common.pr10,]}>
              {
                data?.delivery_charge != undefined
                &&
                <Text style={[common.fontxl, theme.fontbold, common.white]}>
                  $ {addZeroes(JSON.stringify(data?.delivery_charge))}
                </Text>
              }
              
              <Text style={[common.white]}>You Earned</Text>
            </View>
          </View>
          }
         
          <View
            style={[
              common.flexrow,
              common.flexbox,
              theme.payablebox,
              common.aligncenter,
            ]}>
            <View style={[common.flexone, common.pl10]}>
              <Text style={[common.white]}>Total Amount Payable :</Text>
            </View>
            <View style={[common.pr10]}>
              {
                data?.final_amount != undefined
                &&
                <Text style={[common.fontxl, theme.fontbold, common.white]}>
                  ${addZeroes(JSON.stringify(data?.final_amount))}
                </Text>
              }
              
            </View>
          </View>
          <View style={[common.p15, common.pb10]}>
            <ListItem icon>
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
                  {data?.delivery_address}
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

         
        </View>
        </ScrollView>
      </Container>
    );
  }

export default MoneyHistoryDetail
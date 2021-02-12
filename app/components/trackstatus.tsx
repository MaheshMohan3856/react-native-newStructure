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
import { getMoneyOrderDetails,cancelMyRequest,_cancelRequest} from '../actions/moneyorder/moneyorderActions'
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

type NotificationPageRouteProp = RouteProp<RootStackParamList, 'TrackStatus'>

type NotificationPageNavigationProp = StackNavigationProp<
  RootStackParamList,
  'TrackStatus'
>

type Props = {
  route: NotificationPageRouteProp
  navigation: NotificationPageNavigationProp
}





 const  TrackStatus = (props:Props) => {
   
   const dispatch = useDispatch()
   const [status,setStatus] = useState([
      {title: 'Requested'},
      
    ])
    const [cancelButton,setCancelButton] = useState(true)
   
const [token,setToken] = useState(props?.route?.params?.token)
const [refreshToken,setRefreshToken] = useState(props?.route?.params?.refreshToken)
   
    

  
   const [data,setData] = useState({})
  
  
   const [isModalVisible,setIsModalVisible] = useState(false)


  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
  };

  
  

  useEffect(()=>{

      

      const  socket = io(appConfig.apiSocketBaseUrl,{query:{token,refreshToken},transports: ['websocket'], upgrade: false})
  
      socket.on('connect',function(){
        console.log("connected",socket.connected);
      });
      socket.on('connect_error',function(data){
         console.log('errrrrrrooorrr',data)
      })
      storage.load({key:'userData'}).then((ret)=>{
        socket.on(ret.email,function(data){
          console.log("data",data);
          if(data?.cmd == 'money_request_status_change'){
            dispatch(getMoneyOrderDetails({type : "money",unique_request_id : data?.data?.request_id}))
          }
        
        })
      })
      
   

    dispatch(showLoader())
    dispatch(getMoneyOrderDetails({type : "money",unique_request_id : props?.route?.params?.unique_request_id}))
    return () =>{
      console.log("fdfdfdfdfdf");
      socket.emit('manual_disconnect')
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
            if(orderDetail?.data?.money_data?.status != 'requested'){
               setCancelButton(false)
            }
           
         }else{
           appConfig.functions.showError(orderDetail.message)
         }
       }
  },[orderDetail])

  const cancelRequest = () =>{
    toggleModal()
     dispatch(showLoader());
     dispatch(cancelMyRequest({unique_money_request_id:props?.route?.params?.unique_request_id}))
  }

  const cancelMoney = useSelector((state:RootState)=>state.morder_r._cancelMoney)

  useEffect(()=>{
      if(cancelMoney != undefined){
        dispatch(hideLoader())
        if(cancelMoney.status == true){
          props.navigation.navigate('HomePage')
        }else{
          appConfig.functions.showError(cancelMoney.message)
          dispatch(_cancelRequest(undefined))
        }
      }
  },[cancelMoney])

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
            {
              cancelButton == true
              &&
              <Button transparent onPress={toggleModal}>
                <Icon
                  name="closecircleo"
                  type="AntDesign"
                  style={[theme.colorred, common.fontlg]}
                />
              </Button>
            }
            
          </Right>
        </Header>
        </View>
        <ScrollView contentContainerStyle={{flexGrow: 1}}>
        <View  style={{
              display: 'flex',
              flexDirection: 'column',
              flex: 1,
              height: '100%',
            }}>
        <View style={{flex:3}}>
        <View style={[common.p20,{backgroundColor:"#00AFEF"}]}>
          <Text style={[common.fontlg,common.white]}>Order #{data?.unique_id}</Text>
        </View>
          {
            data?.status == 'requested'
            &&
            <View style={(common.pt20, common.mt20,{minHeight:150})}>
              <Text style={{textAlign:"center",paddingTop:30,fontWeight:"bold"}}>Your request is not accepted yet!</Text>
            </View>
          }
          {
            data?.status != 'requested'
            &&
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
          }
        {
            data?.status != 'requested'
            &&
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
        }      
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
        </View>
        <View style={{flex: 1}}>
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
                {/* <Icon
                  style={[common.fontxl, common.white, {opacity: 0.3}]}
                  name="keyboard-arrow-right"
                  type="MaterialIcons"
                /> */}
              </Right>
            </ListItem>
          </View>

         
        </View>
        </View>
        </View>
        </ScrollView>
        <Modal isVisible={isModalVisible}>
            <View style={[common.flexbox]}>
              <View style={[theme.boxmodel]}>
                <Text
                  style={[
                    common.textcenter,
                    common.fontxl,
                    theme.fontbold,
                    common.pb10,
                  ]}>
                  Sure you want to cancel?
                </Text>
                {/* <Text style={[common.textcenter]}>
                  You will be charged an additional{' '}
                  <Text style={[common.fontlg, theme.fontbold]}>$3.5</Text>{' '}
                  cancellation fee
                </Text> */}
                <View style={[common.flexbox, common.flexrow, common.mt20]}>
                  <View style={[common.flexone, common.m5]}>
                    <Button
                      rounded
                      block
                      bordered
                      danger
                      style={{height: 60}}
                      onPress={()=>{cancelRequest()}}>
                      <Text>Cancel</Text>
                    </Button>
                  </View>
                  <View style={[common.flexone, common.m5]}>
                    <Button
                      rounded
                      block
                      danger
                      style={[theme.bgblue, {height: 60}]}
                      onPress={toggleModal}>
                      <Text>Don't Cancel</Text>
                    </Button>
                  </View>
                </View>
              </View>
            </View>
          </Modal>
      </Container>
    );
  }

export default TrackStatus
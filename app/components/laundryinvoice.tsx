/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useEffect, useState} from 'react';
import {
  StatusBar,
  Image,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Platform,PermissionsAndroid,Linking,RefreshControl, Alert
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
  Root,
} from 'native-base';

import {theme} from '../css/theme';
import {common} from '../css/common';
import Timeline from 'react-native-timeline-flatlist';
import Modal from 'react-native-modal';
import RadioGroup from 'react-native-radio-button-group';
import {CommonActions} from '@react-navigation/native';
import {showLoader, hideLoader} from '../actions/common/commonActions'
import {appConfig} from '../appConfig'
import { getOrderDetails,_getOrderDetails,cancelMyRequest,_cancelRequest,makeInvoicePayment,denyInvoicePayment} from '../actions/laundryorder/laundryorderActions'
import HeaderPage from './shared/header'
import {useSelector, useDispatch} from 'react-redux'
import io, { Socket } from 'socket.io-client';
import {RootStackParamList} from '../RouteConfig'
import {StackNavigationProp} from '@react-navigation/stack'
import {RouteProp} from '@react-navigation/native'
import {RootState} from '../appReducers'
import moment from 'moment';

import AsyncStorage from '@react-native-community/async-storage';
import Storage from 'react-native-storage';

var storage = new Storage({size: 1000,storageBackend: AsyncStorage,defaultExpires: 1000 * 3600 * 24,enableCache: false});

type NotificationPageRouteProp = RouteProp<RootStackParamList, 'LaundryInvoice'>

type NotificationPageNavigationProp = StackNavigationProp<
  RootStackParamList,
  'LaundryInvoice'
>

type Props = {
  route: NotificationPageRouteProp
  navigation: NotificationPageNavigationProp
}

const LaundryInvoice = (props:Props) => {
  
  const dispatch = useDispatch() 

  const [token,setToken] = useState(props?.route?.params?.token)
  const [refreshToken,setRefreshToken] = useState(props?.route?.params?.refreshToken)
  const [cancelButton,setCancelButton] = useState(true)

  const [data,setData] = useState({}) 
  const [status,setStatus] = useState([
      {title: 'Requested'}
       ])

  const [refreshing, setRefreshing] = useState(false);
  
  const [isModalVisible,setIsModalVisible] = useState(false) 
  const [isRateModalVisible,setIsRateModalVisible] = useState(false) 
  const [isCardModalVisible,setIsCardModalVisible] = useState(false)
  const [selectedOption,setSelectedOption] = useState({id:0})
  const [labelViewOptions,setLableViewOptions] = useState<Array<any>>([])
  const [cardToken,setCardToken] = useState('')
  const [lastFour,setLastFour] = useState('')
  const [cardIndex,setCardIndex] = useState(0)
  

  const toggleModal = () => {
    setIsModalVisible( !isModalVisible);
  };
  const toggleRateModal = () => {
    setIsRateModalVisible( !isRateModalVisible);
  };
  

  useEffect(()=>{
   
    
  
  
    const  socket = io(appConfig.apiSocketBaseUrl,{query:{token,refreshToken}})
  
    socket.on('connect',function(){
      console.log("connected",socket.connected);
    });
  
    socket.on('connect_error',function(data){
       console.log('errrrrrrooorrr',data)
    })
    storage.load({key:'userData'}).then((ret)=>{
      socket.on(ret.email,function(data){
        console.log("data",data);
        if(data?.cmd == 'laundry_request_status_update'){
          dispatch(getOrderDetails({unique_laundry_request_id : data?.data?.request_id}))
        }
      
      })
    })
     dispatch(showLoader())
     dispatch(getOrderDetails({unique_laundry_request_id:props?.route?.params?.unique_request_id}))

     return () =>{
      console.log('manual_called');
      socket.emit('manual_disconnect')
    }
  },[])



  const ordered = useSelector((state:RootState)=>state.lorder_r._orderDetails)

  useEffect(()=>{
       if(ordered != undefined){
         dispatch(hideLoader())
         setRefreshing(false);
         if(ordered.status == true){
           var track:Array<any> = []
           console.log("ordered?.data?",ordered?.order_data)
            setData(ordered?.order_data)
            setCardToken(ordered?.order_data?.cards[0].id);
            setLastFour(ordered?.order_data?.cards[0].last4)
            var a:Array<any> = [];
            ordered?.order_data?.cards?.length>0 && ordered?.order_data?.cards.map((item,index)=>{

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

        ordered?.order_data?.tracking_information?.length>0 && ordered?.order_data?.tracking_information.map((item,index)=>{
                let format_time = moment(item.recorded_datetime).format('lll')
              track.push({title: item.label + ' - ' + format_time})
        })
        setStatus(track);
        if(ordered?.order_data?.order_status == 'delivery_agent_delivered'){
          toggleRateModal()
        }
        if(ordered?.order_data?.order_status != 'requested' && ordered?.order_data?.order_status != 'accepted' && ordered?.order_data?.order_status != 'laundromat_rejected' && ordered?.order_data?.order_status != 'send_pickup' && ordered?.order_data?.order_status != 'pickup_agent_accept' ){
          setCancelButton(false)
        }
           
         }else{
           appConfig.functions.showError(ordered.message)
         }
       }
  },[ordered])


  const cancelRequest = () =>{
    toggleModal()
    dispatch(showLoader());
    dispatch(cancelMyRequest({unique_laundry_request_id:props?.route?.params?.unique_request_id}))
 }

 const cancelLaundry = useSelector((state:RootState)=>state.lorder_r._cancelLaundry)

 useEffect(()=>{
     if(cancelLaundry != undefined){
       dispatch(hideLoader())
       if(cancelLaundry.status == true){
         props.navigation.navigate('HomePage')
       }else{
         dispatch(_cancelRequest(undefined))
         appConfig.functions.showError(cancelLaundry.message)
       }
     }
 },[cancelLaundry])

 const toggleCardModal = () =>{
     setIsCardModalVisible(!isCardModalVisible)
 }

 const setCardValue = (id) =>{
   setCardIndex(id)
  setCardToken(data?.cards[id]?.id);
  setLastFour(data?.cards[id]?.last4);
}

const makePayment = () =>{
  dispatch(showLoader());
  dispatch(makeInvoicePayment({unique_laundry_request_id:data?.unique_id,stripe_card_id:cardToken}))
}

const denyPayment = () =>{
  dispatch(showLoader());
  dispatch(denyInvoicePayment({unique_laundry_request_id:data?.unique_id,stripe_card_id:cardToken}))
}

const payment = useSelector((state:RootState)=>state.lorder_r._paymentDone)

useEffect(()=>{
   if(payment != undefined){
     if(payment.status == true){
      dispatch(getOrderDetails({unique_laundry_request_id:props?.route?.params?.unique_request_id}))
     }else{
       dispatch(hideLoader())
       appConfig.functions.showError(payment.message)
     }
   }
},[payment])

const denied = useSelector((state:RootState)=>state.lorder_r._paymentRejected)

useEffect(()=>{
  if(denied != undefined){
    if(denied.status == true){
     dispatch(getOrderDetails({unique_laundry_request_id:props?.route?.params?.unique_request_id}))
    }else{
      dispatch(hideLoader())
      appConfig.functions.showError(denied.message)
    }
  }
},[denied])


function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

const onRefresh = React.useCallback(() => {
  setRefreshing(true);
  dispatch(getOrderDetails({unique_laundry_request_id:props?.route?.params?.unique_request_id}))
  
}, []);

const addZeroes = (num) => {

  const dec = num?.split('.')[1]
  const len = dec && dec?.length > 2 ? dec?.length : 2
  return Number(num).toFixed(len)
}
  
    return (
      <Container  style={[theme.bgblue]}>
        <View style={{marginTop:20}}>
        <StatusBar barStyle="dark-content" />
        <Header
          androidStatusBarColor="#00AFEF"
          iosBarStyle="dark-content"
          transparent
          style={[theme.bgblue]}>
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
       <ScrollView refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        <View style={[common.p20]}>
          <Text style={[common.fontlg,common.white]}>Order #{data?.unique_id}</Text>
          <Text style={[common.fontsm,common.white]}>Please see the order details</Text>
        </View>
        
        <View style={[theme.listCard,common.p0,common.pb0]}>
          <View style={[common.p20,common.borderbottom]}>
          <Text style={[common.fontbody,theme.graydark,theme.fontbold,common.pb10]}>PAYMENT DETAILS</Text>
          <View style={[common.flexbox,common.flexrow,]}>
              <View style={[common.flexone]}>
              <Text style={[common.fontxs,theme.graydark,theme.fontbold]}>QTY</Text>
              <View style={[common.flexbox,common.flexrow,{alignItems: 'baseline',}]}>
                
                <Text style={[common.fontlg,theme.colorblack,theme.fontbold]}>{ (data?.final_pricing_data?.actual_normal_wash_weight)?(data?.final_pricing_data?.actual_normal_wash_weight):(data?.normal_wash_weight)} </Text>
                <Text style={[common.fontxs,theme.graydark,common.pb5]}>Pounds</Text>
              </View>
              </View>
              <View style={{alignItems: 'flex-end',}}>
              <Text style={[common.fontxs,theme.graydark,theme.fontbold,common.textright]}>PRICE</Text>
                <View style={[common.flexbox,common.flexrow,{alignItems: 'baseline',}]}>
                <Text style={[common.fontxs,theme.colorblack,common.pb5]}>${addZeroes(JSON.stringify(data?.normal_wash_price_per_pound))} / Pound</Text>
                  <Text style={[common.fontlg,theme.colorblack,theme.fontbold]}> ${(data?.final_pricing_data?.actual_normal_wash_price)?(addZeroes(JSON.stringify(data?.final_pricing_data?.actual_normal_wash_price))):(addZeroes(JSON.stringify(data?.total_normal_wash_price)))}</Text>
                </View>
                <View style={[common.flexbox,common.flexrow,{alignItems: 'center',}]}>
                <Text style={[common.fontxs,theme.colorblack,]}>Additional Item Charge</Text>
                  <Text style={[common.fontmd,theme.colorblack,theme.fontbold]}> ${(data?.final_pricing_data?.total_separate_wash_price)?((data?.final_pricing_data?.total_separate_wash_price)?addZeroes(JSON.stringify(data?.final_pricing_data?.total_separate_wash_price)):0.00):((data?.total_separate_wash_price)?addZeroes(JSON.stringify(data?.total_separate_wash_price)):0.00)}</Text>
                </View>
                <View style={[common.flexbox,common.flexrow,{alignItems: 'center',}]}>
                <Text style={[common.fontxs,theme.colorblack,]}>Service Charge</Text>
                  <Text style={[common.fontmd,theme.colorblack,theme.fontbold]}> ${(data?.final_pricing_data?.service_charge)?(data?.final_pricing_data?.service_charge):(data?.service_charge)}</Text>
                </View>
                <View style={[common.flexbox,common.flexrow,{alignItems: 'center',}]}>
                 <Text style={[common.fontxs,theme.colorblack,]}>Delivery Charges</Text>
                  <Text style={[common.fontmd,theme.colorblack,theme.fontbold]}> ${(data?.final_pricing_data?.delivery_fee)?(data?.final_pricing_data?.delivery_fee):(data?.delivery_fee)}</Text>
                </View>
                <View style={[common.flexbox,common.flexrow,{alignItems: 'center',}]}>
                 <Text style={[common.fontxs,theme.colorblack,]}>Transaction Charges</Text>
                  <Text style={[common.fontmd,theme.colorblack,theme.fontbold]}> ${(data?.final_pricing_data?.stripe_transaction_fee)?(addZeroes(JSON.stringify(data?.final_pricing_data?.stripe_transaction_fee))):(addZeroes(JSON.stringify(data?.stripe_transaction_fee)))}</Text>
                </View>
              </View>

         </View>
          </View>
          {
            (data?.order_status == 'requested' ||  data?.order_status == 'accepted' ||  data?.order_status == 'send_pickup' || data?.order_status == 'pickup_agent_accept' ||  data?.order_status == 'pickup_agent_start' || data?.order_status == 'pickup_agent_arrived' || data?.order_status == 'pickup_agent_collected' ||  data?.order_status == 'pickup_agent_delivered' ||  data?.order_status == 'laundromat_laundry_collected')
             &&
             <View style={[common.p20,common.borderbottom]}>
              <View style={[common.flexbox,common.flexrow,{alignItems: 'center',}]}>
                  <Text style={[common.fontsm,theme.colororange,common.flexone]}>Total price may become</Text>
                  <Text style={[common.fontmd,theme.colororange,theme.fontbold,]}>${data?.total_approximate_amount}</Text>
              </View>
            </View>
         }
          {
            data?.order_status == 'invoice_sent'
             &&
          <View style={[common.p20,common.borderbottom]}>
            <View style={[common.flexbox,common.flexrow,{alignItems: 'center',}]}>
                <Text style={[common.fontsm,theme.colororange,common.flexone,theme.fontbold]}>GRAND TOTAL</Text>
                <Text style={[common.fontxxl,theme.colororange,theme.fontbold,]}>${addZeroes(JSON.stringify(data?.final_pricing_data?.finalised_total_amount))}</Text>
            </View>
            <View style={[common.pb20, {alignItems: 'flex-end',}]}>
                <View style={[common.flexbox,common.flexrow,{alignItems: 'baseline',}]}>
                <Text style={[common.fontsm,theme.colorblack,]}>Credit Card </Text>
                  <Text style={[common.fontsm,theme.colorblack,]}> XXXX{lastFour}</Text>
                </View>
                <View style={[common.flexbox,common.flexrow,{alignItems: 'baseline',}]}>
                    <Button rounded small style={[theme.btn_small,]} onPress={()=>setIsCardModalVisible(!isCardModalVisible)}>
                    
                      <Text style={[theme.textcapital]}>change</Text>
                    </Button>
                </View>
              </View>
              {
              data?.additional_cost_note != ''
              &&
            <ListItem avatar style={[common.ml0]}>
              <Left>
              <Thumbnail
              source={require('../assets/images/info.png')}
              style={{width: 20, height: 20, borderRadius: 40}}
              />
              </Left>
            
              <Body style={[common.bordernone]}>
                <Text style={[theme.navyblue,common.fontbody,theme.fontbold,]}>NOTES ON ADDITIONAL CHARGES</Text>
                <Text style={[theme.navyblue,common.fontbody,]}>{data?.additional_cost_note}</Text>
              </Body>
          
            </ListItem>
           }
              <View style={[common.mt20,common.flexrow]} >
              {/* <Button block light style={[theme.button_orange,common.w50,{borderRadius: 50,}]} onPress={()=>denyPayment()}>
                  <Text
                    style={[theme.textcapital, common.white, common.fontmd]}>
                    DENY PAYMENT
                  </Text>
                </Button> */}
                <Button block light style={[theme.button_orange,common.w100,{borderRadius: 50,}]} onPress={()=>makePayment()}>
                  <Text
                    style={[theme.textcapital, common.white, common.fontmd]}>
                    MAKE PAYMENT
                  </Text>
                </Button>
              </View>
          </View>
          }
          {
            data?.payment_data && Object.keys(data?.payment_data).length != 0
             &&
         <View style={[common.p20,common.borderbottom]}>
            <View style={[common.flexbox,common.flexrow,{alignItems: 'center',}]}>
                <Text style={[common.fontsm,theme.colororange,common.flexone,theme.fontbold]}>GRAND TOTAL</Text>
                <Text style={[common.fontxxl,theme.colororange,theme.fontbold,]}>${addZeroes(JSON.stringify(data?.final_pricing_data?.finalised_total_amount))}</Text>
            </View>
            <View style={[common.pb20, {alignItems: 'flex-end',}]}>
                <View style={[common.flexbox,common.flexrow,{alignItems: 'baseline',}]}>
                <Text style={[common.fontsm,theme.colorblack,]}>Credit Card </Text>
                  <Text style={[common.fontsm,theme.colorblack,]}> XXXX{lastFour}</Text>
                </View>
              </View>
              {
              data?.additional_cost_note != ''
              &&
            <ListItem avatar style={[common.ml0]}>
            <Left>
            <Thumbnail
            source={require('../assets/images/info.png')}
            style={{width: 20, height: 20, borderRadius: 40}}
            />
            </Left>
           
              <Body style={[common.bordernone]}>
                <Text style={[theme.navyblue,common.fontbody,theme.fontbold,]}>NOTES ON ADDITIONAL CHARGES</Text>
                <Text style={[theme.navyblue,common.fontbody,]}>{data?.additional_cost_note}</Text>
              </Body>
           
           
            </ListItem>
             }
            <View style={[common.mt20]}>
                
                  {
                    data?.payment_data?.payment_type == 'invoice_rejected'
                    &&
                    <Button block bordered light  style={[theme.button_dotted,{borderRadius: 50,}]}>
                
                  <Thumbnail
                    source={require('../assets/images/incorrect.jpg')}
                    style={{width: 28, height: 28, borderRadius: 40}}
                    />
                    <Text
                    style={[theme.textcapital, theme.navyblue, common.fontmd]}>
                    Payment  Rejected
                  </Text>
                  </Button>
                  }
                   {
                    data?.payment_data?.payment_type == 'invoice_paid'
                    &&
                    <Button block bordered light  style={[theme.button_dotted,{borderRadius: 50,}]}>
                
                    <Thumbnail
                      source={require('../assets/images/correct.png')}
                      style={{width: 28, height: 28, borderRadius: 40}}
                      />
                  <Text
                    style={[theme.textcapital, theme.navyblue, common.fontmd]}>
                    Payment  Successful
                  </Text>
                  </Button>
                  }
                
              </View>
              <Text style={[theme.navyblue,common.fontbody,common.textcenter,common.pt10]}>Transaction ID #{data?.payment_data?.payment_transaction_id}</Text>

          </View>
          }
          <View style={[common.mt15, common.pt10, common.pb10]}>
          <View style={[common.pl20]}>
            <Text note style={[common.fontmd, theme.fontbold]}>
              TRACKING
            </Text>
          </View>
          <View style={[common.p15, {height: 'auto'}]}>
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
       {
         data?.pickup_agent_data && Object.keys(data?.pickup_agent_data).length != 0
         &&
         <View style={[theme.listCard,common.p0,common.pb0]}>
         <View style={[common.pt20,common.pl20,common.pr20,common.pb10]}>
         <Text style={[common.fontbody,theme.graydark,theme.fontbold]}>PICKUP AGENT</Text>
         <ListItem avatar style={[common.ml0]}>
           <Left>
             {
                 data?.pickup_agent_data?.profile_image != undefined && data?.pickup_agent_data?.profile_image != ''
                 &&
                 <Thumbnail
                    source={{uri:data?.pickup_agent_data?.profile_image}}
                    style={{width: 50, height: 50, borderRadius: 40}}
                  />
             }
             {
                 (data?.pickup_agent_data?.profile_image == undefined || data?.pickup_agent_data?.profile_image == '')
                 &&
                 <Thumbnail
                    source={require('../assets/images/no-photo.jpg')}
                    style={{width: 50, height: 50, borderRadius: 40}}
                  />
             }
             
           </Left>
           <Body style={[common.bordernone]}>
             <Text style={[common.fontmd, theme.fontbold]}>{data?.pickup_agent_data?.first_name} {data?.pickup_agent_data?.last_name}</Text>
             <Text note style={[common.fontbody,theme.colorblack]}>{data?.pickup_agent_data?.location}</Text>
             <Text style={[theme.colorblack]}>
               <Icon
                 name="star"
                 type="FontAwesome"
                 style={[theme.coloryellow, common.fontxl]}></Icon>{' '}
               {data?.pickup_agent_data?.rating}
             </Text>
           </Body>
           <Right style={[common.pr0,common.bordernone]}>
             <Button rounded light style={[theme.btncall]} onPress={()=>Linking.openURL(`tel:${data?.pickup_agent_data?.phone_prefix + data?.pickup_agent_data?.phone}`)}>
               <Icon
                 name="call"
                 type="MaterialIcons"
                 style={[common.white]}></Icon>
             </Button>
           </Right>
         </ListItem>
         </View>
         <View style={[theme.lightblue,]}>
         <ListItem style={[common.bordernone]}>
           <Body style={[common.bordernone]}>
             <Text style={[common.fontmd, theme.fontbold]}>
             {data?.pickup_agent_data?.vehicle_model} - {data?.pickup_agent_data?.vehicle_color}
             </Text>
             <Text note style={[theme.colorblack]}>{data?.pickup_agent_data?.vehicle_number}</Text>
           </Body>
         </ListItem>
       </View>
       </View>

       }
       {
         data?.drop_agent_data && Object.keys(data?.drop_agent_data).length != 0
         &&
         <View style={[theme.listCard,common.p0,common.pb0]}>
         <View style={[common.pt20,common.pl20,common.pr20,common.pb10]}>
         <Text style={[common.fontbody,theme.graydark,theme.fontbold]}>DELIVERY AGENT</Text>
         <ListItem avatar style={[common.ml0]}>
           <Left>
           {
                 data?.drop_agent_data?.profile_image != undefined && data?.drop_agent_data?.profile_image != ''
                 &&
                 <Thumbnail
                    source={{uri:data?.drop_agent_data?.profile_image}}
                    style={{width: 50, height: 50, borderRadius: 40}}
                  />
             }
             {
                 (data?.drop_agent_data?.profile_image == undefined || data?.drop_agent_data?.profile_image == '')
                 &&
                 <Thumbnail
                    source={require('../assets/images/no-photo.jpg')}
                    style={{width: 50, height: 50, borderRadius: 40}}
                  />
             }
           </Left>
           <Body style={[common.bordernone]}>
             <Text style={[common.fontmd, theme.fontbold]}>{data?.drop_agent_data?.first_name} {data?.drop_agent_data?.last_name}</Text>
             <Text note style={[common.fontbody,theme.colorblack]}>{data?.drop_agent_data?.location}</Text>
             <Text style={[theme.colorblack]}>
               <Icon
                 name="star"
                 type="FontAwesome"
                 style={[theme.coloryellow, common.fontxl]}></Icon>{' '}
               {data?.drop_agent_data?.rating}
             </Text>
           </Body>
           <Right style={[common.pr0,common.bordernone]}>
             <Button rounded light style={[theme.btncall]} onPress={()=>Linking.openURL(`tel:${data?.drop_agent_data?.phone_prefix + data?.drop_agent_data?.phone}`)}>
               <Icon
                 name="call"
                 type="MaterialIcons"
                 style={[common.white]}></Icon>
             </Button>
           </Right>
         </ListItem>
         </View>
         <View style={[theme.lightblue,]}>
         <ListItem style={[common.bordernone]}>
           <Body style={[common.bordernone]}>
             <Text style={[common.fontmd, theme.fontbold]}>
             {data?.drop_agent_data?.vehicle_model} - {data?.drop_agent_data?.vehicle_color}
             </Text>
             <Text note style={[theme.colorblack]}>{data?.drop_agent_data?.vehicle_number}</Text>
           </Body>
         </ListItem>
       </View>
       </View>

       }
       
        <View style={[theme.listCard,common.p0,common.pb0]}>
        {
         data?.laundromat_data && Object.keys(data?.laundromat_data).length != 0
         &&
         <View style={[common.p20,common.borderbottom]}>
         <ListItem avatar style={[common.ml0]}>
             <Left>
               <Thumbnail
                 source={{uri:data?.laundromat_data?.profile_image}}
                 style={{width: 110, height: 110, borderRadius: 10}}
               />
             </Left>
             <Body style={[common.bordernone]}>
               <Text numberOfLines={1} style={[common.fontmd, theme.fontbold]}>{data?.laundromat_data?.business_name}</Text>
               <Text numberOfLines={1} note style={[common.fontbody,theme.colorblack]}>{data?.laundromat_data?.location}</Text>
               
 
               <View style={[common.flexbox, common.flexrow,common.pt10]}>
                       <View>
                         <Button small rounded style={[theme.bgorange,{height:26}]}>
                           <Text style={{fontSize:Platform.OS === 'ios'? 10 : 14}}>${data?.laundromat_data?.normal_wash_price}/Pound</Text>
                         </Button>
                       </View>
                       <View style={[common.ml10]}>
                       <Text style={[theme.colorblack]}>
                       <Icon
                         name="star"
                         type="FontAwesome"
                         style={[theme.coloryellow, common.fontxl]}></Icon>{' '}
                       {data?.laundromat_data?.rating}
                     </Text>
                       </View>
                     </View>
                     {
                       data?.laundromat_data?.verification_status == 'Y'
                       &&
                       <Button
                       bordered
                       rounded
                       style={[theme.borderblue, common.pl5,common.pr5,common.mt10,common.fontxs,{height:30}]}>
                       <Text style={[theme.bluecolor]}>
                       Available
                       </Text>
                     </Button>
                     }
                     {
                       data?.laundromat_data?.verification_status == 'N'
                       &&
                       <Button
                       bordered
                       rounded
                       style={[theme.borderblue, common.pl5,common.pr5,common.mt10,common.fontxs,{height:30}]}>
                       <Text style={[theme.bluecolor]}>
                       Not Available
                       </Text>
                     </Button>
                     }
                    
             </Body>
      
           </ListItem>
 
        
 
         </View>
       }
       
        
        <View style={[common.p20,theme.lightblue]}>
        <View style={[common.flexbox,common.flexrow,{alignItems:'center'}]}>
        <View style={[theme.timecirclesmall,]}></View>
          <Text style={[common.fontsm,theme.graydark,theme.fontbold,]}>QTY OF CLOTHS</Text>
        </View>
        <Text style={[common.fontbody,theme.colorblack,theme.fontbold,common.pt5,common.pl20]}>{data?.normal_wash_weight} Pounds   {data?.additional_items?.length} Separate Wash </Text>
        
        <View style={[common.flexbox,common.flexrow,common.pt15,{alignItems:'center'}]}>
        <View style={[theme.timecirclesmall,]}></View>
          <Text style={[common.fontsm,theme.graydark,theme.fontbold,]}>PICK UP LOCATION</Text>
        </View>
        <Text style={[common.fontbody,theme.colorblack,common.pt5,common.pl20]}>{data?.delivery_address}</Text>
        
        </View>
        </View>
        
        <View style={[theme.listCard,common.p20,common.mb20]}>
          <Text style={[common.fontbody,theme.graydark,theme.fontbold]}>COMMENTS</Text>
          {
            data?.user_comment
            &&
            <Text style={[common.fontbody,common.pt10,common.pb10,{color:"#000"}]}>{data?.user_comment}</Text>
          }
          {
            data?.user_comment == undefined
            &&
            <Text style={[common.fontbody,theme.graydark,common.pt10,common.pb10,{color:"#000"}]}>No Comments !</Text>
          }
         
        </View>
       {/* {
         data?.order_status == 'delivery_agent_delivered'
         &&
         <View style={{alignSelf:"center",paddingBottom:20}}>
          <Button small rounded style={[theme.bgorange,{height:40,width:150}]} onPress={()=>props.navigation.navigate('LaundryRating',{data:data})}>
            <Text style={{marginLeft:40}}>Rate</Text>
          </Button>
        </View>
       }  */}
        
              
        </ScrollView>
        <Modal isVisible={isRateModalVisible}>
            <View style={[common.flexbox]}>
              <View style={[theme.boxmodel]}>
                <Text
                  style={[
                    common.textcenter,
                    common.fontxl,
                    theme.fontbold,
                    common.pb10,
                  ]}>
                  Please rate our service
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
                      onPress={()=>{toggleRateModal();props?.navigation?.navigate('HomePage');dispatch(_getOrderDetails(undefined))}}>
                      <Text>Skip</Text>
                    </Button>
                  </View>
                  <View style={[common.flexone, common.m5]}>
                    <Button
                      rounded
                      block
                      danger
                      style={[theme.bgblue, {height: 60}]}
                      onPress={()=>{toggleRateModal();props?.navigation?.navigate('LaundryRating',{data:data});dispatch(_getOrderDetails(undefined))}}>
                      <Text>Rate</Text>
                    </Button>
                  </View>
                </View>
              </View>
            </View>
          </Modal>
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
          <Modal
            isVisible={isCardModalVisible}
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
                  //activeButtonId={0}
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
                    onPress={toggleCardModal}>
                    <Text>OK</Text>
                  </Button>
                </View>
              </View>
            </View>
          </Modal>

      </Container>
    );
  }

  export default LaundryInvoice


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
import { getOrderDetails,_getOrderDetails} from '../actions/laundryorder/laundryorderActions'
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

type NotificationPageRouteProp = RouteProp<RootStackParamList, 'LaundryHistoryDetail'>

type NotificationPageNavigationProp = StackNavigationProp<
  RootStackParamList,
  'LaundryHistoryDetail'
>

type Props = {
  route: NotificationPageRouteProp
  navigation: NotificationPageNavigationProp
}

const LaundryHistoryDetail = (props:Props) => {
  
  const dispatch = useDispatch() 

 
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
  

  const toggleModal = () => {
    setIsModalVisible( !isModalVisible);
  };
  const toggleRateModal = () => {
    setIsRateModalVisible( !isRateModalVisible);
  };
  

  useEffect(()=>{
   
     dispatch(showLoader())
     dispatch(getOrderDetails({unique_laundry_request_id:props?.route?.params?.unique_request_id}))
     return() =>{
        dispatch(_getOrderDetails(undefined))
        
        console.log('unmounted');
       }
     
  },[])



  const ordered = useSelector((state:RootState)=>state.lorder_r._orderDetails)

  useEffect(()=>{
      console.log("ordderedsedede",ordered);
       if(ordered != undefined){
         dispatch(hideLoader())
         setRefreshing(false);
         if(ordered.status == true){
           var track:Array<any> = []
           console.log("ordered?.data?",ordered?.order_data)
            setData(ordered?.order_data)
            setCardToken(ordered?.order_data?.cards[0]?.id);
            setLastFour(ordered?.order_data?.cards[0]?.last4)
           

        ordered?.order_data?.tracking_information?.length>0 && ordered?.order_data?.tracking_information.map((item,index)=>{
                let format_time = moment(item.recorded_datetime).format('lll')
              track.push({title: item.label + ' - ' + format_time})
        })
        setStatus(track);
       
       
           
         }else{
           appConfig.functions.showError(ordered.message)
         }
       }
  },[ordered])


 

 

 const toggleCardModal = () =>{
     setIsCardModalVisible(!isCardModalVisible)
 }

 const setCardValue = (id) =>{
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
            data?.payment_data && Object.keys(data?.payment_data).length != 0
             &&
         <View style={[common.p20,common.borderbottom]}>
            <View style={[common.flexbox,common.flexrow,{alignItems: 'center',}]}>
                <Text style={[common.fontsm,theme.colororange,common.flexone,theme.fontbold]}>GRAND TOTAL</Text>
                <Text style={[common.fontxxl,theme.colororange,theme.fontbold,]}>${addZeroes(JSON.stringify(data?.final_pricing_data?.finalised_total_amount))}</Text>
            </View>
           
            

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
       
          

      </Container>
    );
  }

  export default LaundryHistoryDetail


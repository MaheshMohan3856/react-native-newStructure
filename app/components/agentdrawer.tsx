/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useState,useEffect} from 'react';
import {StatusBar, Image, TouchableOpacity, ScrollView,ImageBackground, Alert} from 'react-native';
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
  ListItem,
  Thumbnail,
  Right,
  List,
  Switch,
  
  
} from 'native-base';
import { getRequestList} from '../actions/accept/acceptActions'
import { getMoneyOrderDetails} from '../actions/moneyorder/moneyorderActions'
import { getOrderDetails} from '../actions/laundryorder/laundryorderActions'
import {theme} from '../css/theme';
import {common} from '../css/common';
import { showMessage, hideMessage } from "react-native-flash-message";
import {getTotalEarnings} from '../actions/earning/earningActions';
import notifee,{AndroidColor} from '@notifee/react-native';
import messaging,{firebase} from '@react-native-firebase/messaging';
import { useIsDrawerOpen } from '@react-navigation/drawer';
import CheckBox from 'react-native-check-box';
import {useSelector,useDispatch} from 'react-redux';
import { RootStackParamList } from '../RouteConfig';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { RootState } from '../appReducers';
import AsyncStorage from '@react-native-community/async-storage';
import Storage from 'react-native-storage';
import { appConfig } from '../appConfig';
var storage = new Storage({size: 1000,storageBackend: AsyncStorage,defaultExpires: 1000 * 3600 * 24,enableCache: false});

type NotificationPageRouteProp = RouteProp<RootStackParamList, 'AgentDrawer'>;

type NotificationPageNavigationProp = StackNavigationProp<
    RootStackParamList,
    'AgentDrawer'
>;

type Props = {
    route: NotificationPageRouteProp;
    navigation: NotificationPageNavigationProp;
};

const AgentDrawer = (props:Props) => {

  const dispatch = useDispatch()

  const [firstName,setFirstname] = useState('')
  const [lastName,setLastname] = useState('')
  const [phone,setPhone] = useState('')
  const [image,setImage] = useState('')
  const [code,setCode] = useState('')
  const [isAgent,setIsAgent] = useState(false)
  const [totalEarned,setTotalEarned] = useState(0)

  const [hometype,setHometype] = useState('user')


  const  displayNotification = async(notification) => { 

    const channelId:any = await notifee.createChannel({
      id: 'channel_id',
      name: 'Default Channel',
    });

    // Display a notification
    //  await notifee.displayNotification({
    //   title: notification.title,
    //   body: notification.body,
    //   android: {
    //     channelId,
       
    //   },
    // });
  }

  

  useEffect(()=>{
    
    
    const message = firebase.messaging()
   const unsubscribe = message.onMessage(remoteMessage=>{
      console.log(
        'Notification caused app to open from foreground state:',
        remoteMessage.notification,
      );
     //appConfig.functions.successMsg(remoteMessage?.notification?.body)
     // displayNotification(remoteMessage.notification)
     showMessage({
      message: remoteMessage?.notification?.title,
      description: remoteMessage?.notification?.body,
      type: "info",
      backgroundColor: "#00AFEF", // background color
      color: "#fff",
      onPress: () => {
        /* THIS FUNC/CB WILL BE CALLED AFTER MESSAGE PRESS */
      },
    });
     
    })
    messaging().onNotificationOpenedApp(remoteMessage => {
      console.log(
        'Notification caused app to open from background state:',
        JSON.parse(remoteMessage?.data?.custom_notification)
      );
       let notificationed = JSON.parse(remoteMessage?.data?.custom_notification);
        if(notificationed.type == "money_request_list"){
          props.navigation.navigate('AgentHome')
          dispatch(getRequestList())
        }else if(notificationed.type == "money_request_detail"){
          props.navigation.navigate('TrackStatus',{unique_request_id:notificationed.push_data.request_id})
          dispatch(getMoneyOrderDetails({type : "money",unique_request_id :notificationed.push_data.request_id}))
        }else if(notificationed.type == "laundry_request_detail"){
          props.navigation.navigate('LaundryInvoice',{unique_request_id:notificationed.push_data.request_id})
          dispatch(getOrderDetails({unique_laundry_request_id : notificationed.push_data.request_id}))
        }else if(notificationed.type == "laundromat_invoice_detail"){
          props.navigation.navigate('LaundryInvoice',{unique_request_id:notificationed.push_data.request_id})
          dispatch(getOrderDetails({unique_laundry_request_id : notificationed.push_data.request_id}))
        } 
     
    });

   // Check whether an initial notification is available
    messaging()
      .getInitialNotification()
      .then(remoteMessage => {
        if (remoteMessage) {
          console.log(
            'Notification caused app to open from quit state:',
            JSON.parse(remoteMessage?.data?.custom_notification)
          );
          let notificationed = JSON.parse(remoteMessage?.data?.custom_notification);
          if(notificationed.type == "money_request_list"){
            props.navigation.navigate('AgentHome')
          }else if(notificationed.type == "money_request_detail"){
            props.navigation.navigate('TrackStatus',{unique_request_id:notificationed.push_data.request_id})
          }else if(notificationed.type == "laundry_request_detail"){
            props.navigation.navigate('LaundryInvoice',{unique_request_id:notificationed.push_data.request_id})
          }else if(notificationed.type == "laundromat_invoice_detail"){
            props.navigation.navigate('LaundryInvoice',{unique_request_id:notificationed.push_data.request_id})
          } 
        }
        
      });
    storage.load({key:'userData'}).then((ret)=>{
      setFirstname(ret.first_name)
      setLastname(ret.last_name)
      setPhone(ret.phone)
      setCode(ret.phone_prefix)
      setImage(ret.profile_image != undefined?ret.profile_image:'')
      if(ret.is_agent){
        setIsAgent(ret.is_agent)
      }
      
    })
    //return unsubscribe
  },[])

  const agentBecame = useSelector((state:RootState)=>state.agentregister_r._agentBecame)



  useEffect(()=>{
     if(agentBecame != undefined){
       console.log('agentBecameCalled',agentBecame.registered)
       if(agentBecame.registered == true){
        storage.load({key:'userData'}).then((ret)=>{
            ret.is_agent = true
            setIsAgent(true);
            storage.save({key:'userData',data:ret,expires:null}) 
        })
       }
     }
  },[agentBecame])

  const profileChange = useSelector((state:RootState)=>state.settings_r._profileEditted)
  
  useEffect(()=>{
    if(profileChange != undefined){
      console.log('checking',profileChange.editted)
      if(profileChange.editted == true){
       storage.load({key:'userData'}).then((ret)=>{
        setFirstname(ret.first_name)
        setLastname(ret.last_name)
        setPhone(ret.phone)
        setCode(ret.phone_prefix)
        setImage(ret.profile_image != undefined?ret.profile_image:'')
        if(ret.is_agent){
          setIsAgent(ret.is_agent)
        }
       })
      }
    }
 },[profileChange])

 const isDrawerOpen = useIsDrawerOpen();

 useEffect(()=>{
      console.log("isDrawerOpen",isDrawerOpen)
      if(isDrawerOpen == true){
        dispatch(getTotalEarnings())
        AsyncStorage.getItem('home').then((home)=>{
          console.log("home",home);
           setHometype(home)
        })
      }
 },[isDrawerOpen])

 const totalEarning = useSelector((state:RootState)=>state.earnings_r._totalEarnings)

 useEffect(()=>{
     if(totalEarning != undefined){
       if(totalEarning.status == true){
        setTotalEarned(totalEarning.total_earnings)
       }
     }
 },[totalEarning])
  

    return (
      <Container>

        <View style={[common.flexbox,common.flexcolumn,]}>
          <View style={[theme.bgorange,common.pt20,]}>
          <ListItem avatar style={[common.pt20,common.pb20,common.mt20,common.mb20]}>
            <Left>
              {
                image == ''
                &&
                <Thumbnail
                source={require('../assets/images/no-photo.jpg')}
                style={{width: 75, height: 75, borderRadius: 40}}
              />
              }
              {
                image != ''
                &&
                <Thumbnail
                source={{uri:image}}
                style={{width: 75, height: 75, borderRadius: 40}}
              />
              }
            </Left>
            <Body style={[common.bordernone]}>
            <Text style={[common.white, common.fontbody]}>{firstName} {lastName}</Text>
            <Text style={[common.white, common.fontsm]}>{code} {phone}</Text>
            </Body>
          </ListItem>
          {
            isAgent == true
            &&
           <View  style={[common.pl20,common.pb20,]}>
            <Text style={[common.white, common.fontlg,theme.fontbold]}>${totalEarned}</Text>
            <Text style={[common.white, common.fontsm]}>Amount Earned</Text>
          </View> 
          }
          {
            isAgent == false
            &&
            <View  style={[common.pl20,common.pb20,]}>
            <Button style={[{backgroundColor:"#fff",borderRadius:30,alignSelf:"center"}]} onPress={()=>props.navigation.navigate('AgentBecome')}><Text style={[theme.textcapital,{color:'#F16436'}]}>Become An Agent</Text></Button>
          </View>
          }
          
          </View>
         
          <View style={[theme.lightblack,common.pt20,{height:'100%'}]}>
            <List>
              {/* <ListItem style={[common.bordernone]}>
                <Text style={[common.fontmd,common.white,common.w100]}>Notifications</Text>
                <Right>
                 <Switch value={true}  trackColor={{true: '#F16436', false: 'grey',}} />
                </Right>
              </ListItem> */}
             {
               hometype != 'agent'
               &&
               <ListItem style={[common.bordernone]} onPress={()=>props.navigation.navigate('HomePage')}>
                <Text style={[common.fontmd,common.white]}>Home</Text>
              </ListItem>
             }
             {
               hometype == 'agent'
               &&
               <ListItem style={[common.bordernone]} onPress={()=>props.navigation.navigate('AgentHome')}>
                <Text style={[common.fontmd,common.white]}>Home</Text>
              </ListItem>
             }
              {
               hometype != 'agent'
               &&
              <ListItem style={[common.bordernone]} onPress={()=>props.navigation.navigate('UserHistory')}>
                <Text style={[common.fontmd,common.white]}>History</Text>
              </ListItem>
              }
              {
               hometype == 'agent'
               &&
              <ListItem style={[common.bordernone]} onPress={()=>props.navigation.navigate('AgentHistory')}>
                <Text style={[common.fontmd,common.white]}>History</Text>
              </ListItem>
              }
              <ListItem style={[common.bordernone]} onPress={()=>props.navigation.navigate('PaymentCards')}>
                <Text style={[common.fontmd,common.white]}>Payments</Text>
              </ListItem>
              <ListItem style={[common.bordernone]} onPress={()=>props.navigation.navigate('Settings')}>
                <Text style={[common.fontmd,common.white]}>Settings</Text>
              </ListItem>
            </List>
          </View>
        </View>
        <View>
       


        </View>


      </Container>
    );

}

export default AgentDrawer
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useEffect,useState,useRef} from 'react';
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
  Thumbnail,
} from 'native-base';

import {theme} from '../css/theme';
import {common} from '../css/common';
import { useDispatch, useSelector } from 'react-redux';
import HeaderPage from './shared/header';
import { hideLoader, showLoader } from '../actions/common/commonActions';
import { getPaymentDetails,deleteCreditCard } from '../actions/payment/paymentActions';
import { RootStackParamList } from '../RouteConfig';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import AsyncStorage from '@react-native-community/async-storage';
import MapView,{ Marker } from 'react-native-maps';
import Storage from 'react-native-storage';
import { RootState } from '../appReducers';
import { appConfig } from '../appConfig';

var storage = new Storage({size: 1000,storageBackend: AsyncStorage,defaultExpires: 1000 * 3600 * 24,enableCache: false});

type NotificationPageRouteProp = RouteProp<RootStackParamList, 'PaymentCards'>;

type NotificationPageNavigationProp = StackNavigationProp<
    RootStackParamList,
    'PaymentCards'
>;

type Props = {
    route: NotificationPageRouteProp;
    navigation: NotificationPageNavigationProp;
};


const PaymentCards = (props:Props) => {

  const dispatch = useDispatch()
  
  const [payDet,setPayDet] = useState({})

  useEffect(() => {
    const unsubscribe = props.navigation.addListener('focus', () => {
      
       dispatch(showLoader());
         dispatch(getPaymentDetails())
        
    });

    return unsubscribe;
  }, [props.navigation])

  const payments = useSelector((state:RootState)=>state.payment_r._paymentDetails)

  useEffect(()=>{
      if(payments != undefined){
        dispatch(hideLoader())
        if(payments.status == true){
          console.log("payments",payments)
          setPayDet(payments.data);
        }else{
          appConfig.functions.showError(payments.message)
        }
      }
  },[payments])

  const deleteCard = (id:string,index:number) =>{
    dispatch(showLoader());
    payDet?.cards?.data.splice(index, 1);
    setPayDet({...payDet})
    dispatch(deleteCreditCard({card_id:id}))
  }

  const deleted = useSelector((state:RootState)=>state.payment_r._deleteCard)

  useEffect(()=>{
       if(deleted != undefined){
         dispatch(hideLoader());
         if(deleted.status == true){
          appConfig.functions.successMsg(deleted.message)
         }else{
           appConfig.functions.showError(deleted.message)
         }
       }
  },[deleted])
  
    return (
      <Container>
        <HeaderPage back={false} title="" />
        <View style={[common.pl20, common.mt15, common.pb10]}>
          <Text style={[common.fontxxl]}>Payment Method</Text>
          <Text>Set your payment method to pay your requests</Text>
        </View>
        {
          payDet?.cards?.data?.length > 0 && payDet?.cards?.data.map((item,index)=>{
            return(
              <View style={[theme.cardwp]} key={index}>
              <ListItem icon>
                <Left>
                  <Button transparent>
                    <Icon
                      active
                      name="credit-card"
                      type="Entypo"
                      style={[theme.colorblack, common.fontxxl]}
                    />
                  </Button>
                </Left>
                <Body style={[common.bordernone]}>
                  <Text>XXXXXXX{item.last4}</Text>
                  <Text note>{item.brand}</Text>
                </Body>
              </ListItem>
              <View style={[common.p10]}>
                <Text style={[common.textright, theme.colorred]} onPress={()=>{deleteCard(item.id,index)}}>REMOVE</Text>
              </View>
            </View>
            )
          })
        }
        
        <View style={[common.center]}>
          <Button
            bordered
            rounded
            style={[theme.borderred, common.pl20, common.pr20]}
            onPress={()=>{props.navigation.navigate('AddCard',{page:'PaymentCards'})}}
            >
            <Text style={[theme.textcapital, theme.colorred]}>
              Add New Payment Method
            </Text>
          </Button>
        </View>
        {
          payDet?.bank_accounts?.data?.length > 0 && payDet?.bank_accounts?.data.map((item,index)=>{
       return(
        <View style={[theme.cardwp]} key={index}>
          <ListItem icon>
            <Left>
              <Button transparent>
                <Icon
                  active
                  name="briefcase"
                  type="Entypo"
                  style={[theme.colorblack, common.fontxxl]}
                />
              </Button>
            </Left>
            <Body style={[common.bordernone]}>
              <Text>XXXXXXX{item.last4}</Text>
              <Text note>{item.bank_name}</Text>
            </Body>
          </ListItem>
          <View style={[common.p10]}>
            <Text style={[common.textright, theme.colorred]} onPress={()=>props.navigation.navigate('AddNewBank',{account_id:item.id})}>REPLACE</Text>
          </View>
        </View>
         )
       })
     }
        {/* <View style={[common.center]}>
          <Button
            bordered
            rounded
            style={[theme.borderred, common.pl20, common.pr20]}
           
            >
            <Text style={[theme.textcapital, theme.colorred]}>
              Add New Bank
            </Text>
          </Button>
        </View> */}
      </Container>
    );
  }


  export default PaymentCards

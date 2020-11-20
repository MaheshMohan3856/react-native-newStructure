/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useState,useEffect} from 'react';
import {
  StatusBar,
  Image,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
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
  Thumbnail,Textarea,
} from 'native-base';

import {theme} from '../css/theme';
import {common} from '../css/common';
import firestore from '@react-native-firebase/firestore';
import { useDispatch, useSelector } from 'react-redux';
import HeaderPage from './shared/header';
import { hideLoader, showLoader } from '../actions/common/commonActions';
import { confirmPick,_confirmPick } from '../actions/laundryrequest/requestActions';
import { RootStackParamList } from '../RouteConfig';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import AsyncStorage from '@react-native-community/async-storage';
import Storage from 'react-native-storage';
import { RootState } from '../appReducers';
import { appConfig } from '../appConfig';
var storage = new Storage({size: 1000,storageBackend: AsyncStorage,defaultExpires: 1000 * 3600 * 24,enableCache: false});

type NotificationPageRouteProp = RouteProp<RootStackParamList, 'LaundryConfirm'>;

type NotificationPageNavigationProp = StackNavigationProp<
    RootStackParamList,
    'LaundryConfirm'
>;

type Props = {
    route: NotificationPageRouteProp;
    navigation: NotificationPageNavigationProp;
};

const LaundryConfirm = (props:Props) =>  {

  const dispatch = useDispatch()

  const [details,setDetails] = useState(props?.route?.params?.data)
  const [comment,setComment] = useState('')
  
  const confirmPickup = () =>{
    let datas = {
      laundromat_id: details?.laundromat_data?.laundromat_id ,
      pickup_latitude: details?.pickup_latitude,
      pickup_longitude: details?.pickup_longitude,
      normal_wash_weight: details?.normal_wash_weight,
      pickup_location: details?.pickup_location,
      additional_wash_items:details?.additional_wash_items,
      total_distance: details?.pricing?.total_distance_in_miles,
      delivery_charge: details?.pricing?.delivery_charge,
      separate_wash_price: details?.pricing?.separate_wash_price,
      service_charge: details?.pricing?.service_charge,
      stripe_transaction_fee: details?.pricing?.stripe_transaction_fee,
      total_normal_wash_price: details?.pricing?.total_normal_wash_price,
      final_price: details?.pricing?.final_price,
      final_apprx_price: details?.pricing?.final_apprx_price,
      comment:comment
    }
    firestore()
    .collection('Users')
    .add({
      
      latitude: details?.pickup_latitude,
      longitude:details?.pickup_longitude
    })
    .then(() => {
      console.log('User added!');
    });
      dispatch(showLoader());
      dispatch(confirmPick(datas))
    }

  const confirm = useSelector((state:RootState)=>state.lrequest_r._confirmPickup)

  useEffect(()=>{
        if(confirm != undefined){
          dispatch(hideLoader());
          if(confirm.status == true){
               props.navigation.navigate('HomePage');
               dispatch(_confirmPick(undefined))
          }else{
            appConfig.functions.showError(confirm.message)
            dispatch(_confirmPick(undefined))
          }
        }
  })

  const addZeroes = (num) => {
    const dec = num.split('.')[1]
    const len = dec && dec.length > 2 ? dec.length : 2
    return Number(num).toFixed(len)
  }
    
  return (
      <Container  style={[theme.bgblue]}>
        <HeaderPage back={true} title="" color="blue"/>
<ScrollView>
        <View style={[common.p20]}>
          <Text style={[common.fontlg,common.white]}>Confirm your request</Text>
          <Text style={[common.fontsm,common.white]}>Please Confirm your pickup</Text>
        </View>
        
  

        <View style={[theme.listCard,common.p0,common.pb0]}>
        <View style={[common.p20,common.borderbottom]}>
        <ListItem avatar style={[common.ml0]}>
            <Left>
              <Thumbnail
                source={{uri:details?.laundromat_data?.profile_image}}
                style={{width: 105, height: 110, borderRadius: 10}}
              />
            </Left>
            <Body style={[common.bordernone]}>
              <Text numberOfLines={1} style={[common.fontmd, theme.fontbold]}>{details?.laundromat_data?.business_name}</Text>
              <Text numberOfLines={1} note style={[common.fontbody,theme.colorblack]}>{details?.laundromat_data?.location}</Text>
              

              <View style={[common.flexbox, common.flexrow,common.pt10]}>
                      <View>
                        <Button small rounded style={[theme.bgorange,{height:26}]}>
                          <Text style={{fontSize:Platform.OS === 'ios'? 10 : 14}}>${details?.laundromat_data?.normal_wash_price}/Pound</Text>
                        </Button>
                      </View>
                      <View style={[common.ml10]}>
                      <Text style={[theme.colorblack]}>
                      <Icon
                        name="star"
                        type="FontAwesome"
                        style={[theme.coloryellow, common.fontxl]}></Icon>{' '}
                      4.8
                    </Text>
                      </View>
                    </View>
                    {
                      details?.laundromat_data?.is_active == 'Y'
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
                      details?.laundromat_data?.is_active != 'Y'
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
        
        <View style={[common.p20,theme.lightblue]}>
        <View style={[common.flexbox,common.flexrow,{alignItems:'center'}]}>
        <View style={[theme.timecirclesmall,]}></View>
          <Text style={[common.fontsm,theme.graydark,theme.fontbold,]}>QTY OF CLOTHS</Text>
        </View>
        <Text style={[common.fontbody,theme.colorblack,theme.fontbold,common.pt5,common.pl20]}>{details?.normal_wash_weight} Pounds   {props?.route?.params?.extra} Separate Wash </Text>
        
        <View style={[common.flexbox,common.flexrow,common.pt15,{alignItems:'center'}]}>
        <View style={[theme.timecirclesmall,]}></View>
          <Text style={[common.fontsm,theme.graydark,theme.fontbold,]}>PICK UP LOCATION</Text>
        </View>
    <Text style={[common.fontbody,theme.colorblack,common.pt5,common.pl20]}>{details?.pickup_location}</Text>
        
        </View>
        <View style={[common.p20]}>

        <ListItem avatar style={[common.ml0,common.pb15]}>
            <Left>
            <Thumbnail
            source={require('../assets/images/info.png')}
            style={{width: 20, height: 20, borderRadius: 40}}
            />
            </Left>
            <Body style={[common.bordernone]}>
            <Text style={[theme.colororange,common.fontsm,]}>Some additional charges may affect in your order</Text>
            </Body>
            </ListItem>

     
              <View style={[common.flexbox, common.flexrow,common.pb5]}>
                <View style={[common.flexone]}>
                <Text style={[common.fontsm,theme.colorblack,]}>Service Charge</Text>
                </View>
                <View>
                  <Text style={[common.fontbody,theme.colorblack,common.textright,common.fontbold]}>${addZeroes(JSON.stringify(details?.pricing?.service_charge))}</Text>
                </View>
              </View>
              <View style={[common.flexbox, common.flexrow,common.pb5]}>
                <View style={[common.flexone]}>
                <Text style={[common.fontsm,theme.colorblack,]}>Delivery Charges</Text>
                </View>
                <View>
                  <Text style={[common.fontbody,theme.colorblack,common.textright,common.fontbold]}>${addZeroes(JSON.stringify(details?.pricing?.delivery_charge))}</Text>
                </View>
              </View>
              <View style={[common.flexbox, common.flexrow,common.pb5]}>
                <View style={[common.flexone]}>
                <Text style={[common.fontsm,theme.colorblack,]}>Normal Wash ({details?.normal_wash_weight} X ${addZeroes(JSON.stringify(details?.laundromat_data?.normal_wash_price))})</Text>
                </View>
                <View>
                  <Text style={[common.fontbody,theme.colorblack,common.textright,common.fontbold]}>${addZeroes(JSON.stringify(details?.pricing?.total_normal_wash_price))}</Text>
                </View>
              </View>
              <View style={[common.flexbox, common.flexrow,common.pb5]}>
                <View style={[common.flexone,]}>
                <Text style={[common.fontsm,theme.colorblack,]}>Separate Wash ({props?.route?.params?.extra} Items)</Text>
                </View>
                <View >
                  <Text style={[common.fontbody,theme.colorblack,common.textright,common.fontbold]}>${addZeroes(JSON.stringify(details?.pricing?.separate_wash_price))}</Text>
                </View>
              </View>
              
              <View style={[common.flexbox, common.flexrow,]}>
                <View style={[common.flexone]}>
                <Text style={[common.fontsm,theme.colororange,]}>Total price may become </Text>
                </View>
                <View>
                  <Text style={[common.fontbody,theme.colororange,common.textright,common.fontbold]}>${details?.pricing?.final_apprx_price}</Text>
                </View>
              </View>
              
        </View>
        </View>
        
        <View style={[theme.listCard,common.p10,]}>
        <Form>
          <Textarea  style={{borderColor: '#fff'}} rowSpan={3} bordered placeholder="Please type your comments" value={comment} onChangeText={(comment)=>setComment(comment)} />
        </Form>
        </View>
        <View style={[common.p15, common.center,common.mb20]}>
                  <Button
                    style={[theme.button_rounded, common.ml20, common.mr20]} onPress={confirmPickup}>
                    <Text style={[theme.textcapital, theme.bluecolor, common.fontmd,common.w100, common.textcenter]}>
                    Confirm Pickup
                    </Text>
                  </Button>
                </View>
        </ScrollView>

      </Container>
    );
  }
export default LaundryConfirm

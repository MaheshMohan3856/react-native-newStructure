/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useEffect, useState} from 'react';
import {StatusBar, Image, Linking, ScrollView} from 'react-native';
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
import { Rating, AirbnbRating } from 'react-native-ratings';

import moment from 'moment';
import {CommonActions} from '@react-navigation/native';
import {showLoader, hideLoader} from '../actions/common/commonActions'
import {appConfig} from '../appConfig'
import {agentRating} from '../actions/moneyorder/moneyorderActions'
import HeaderPage from './shared/header'
import {useSelector, useDispatch} from 'react-redux'
import io, { Socket } from 'socket.io-client'

import {RootStackParamList} from '../RouteConfig'
import {StackNavigationProp} from '@react-navigation/stack'
import {RouteProp} from '@react-navigation/native'
import {RootState} from '../appReducers'
import CountryPicker, {DARK_THEME} from 'react-native-country-picker-modal'


import { TextInputMask } from 'react-native-masked-text'
import AsyncStorage from '@react-native-community/async-storage';
import Storage from 'react-native-storage';
import { acc } from 'react-native-reanimated';
var storage = new Storage({size: 1000,storageBackend: AsyncStorage,defaultExpires: 1000 * 3600 * 24,enableCache: false});

type NotificationPageRouteProp = RouteProp<RootStackParamList, 'RatingPage'>

type NotificationPageNavigationProp = StackNavigationProp<
  RootStackParamList,
  'RatingPage'
>

type Props = {
  route: NotificationPageRouteProp
  navigation: NotificationPageNavigationProp
}


const RatingPage = (props:Props) => {

  const dispatch = useDispatch();
  const [data,setData] = useState(props?.route?.params?.data)
  const [rating,setRating] = useState(0)

  const ratingCompleted = (rating) =>{
         console.log("rating",rating);
         setRating(rating)
  }

  const rateAgent = () =>{
    dispatch(showLoader());
    dispatch(agentRating({rating:rating,request_type : "money",request_id : data?.unique_id}))
  }

  const rated = useSelector((state:RootState)=>state.morder_r._rating)

  useEffect(()=>{
    if(rated != undefined){
      if(rated.status == true){
        props.navigation.navigate('HomePage')
      }else{
        appConfig.functions.showError(rated.message)
      }
    }
  })
 
    return (
      <Container style={[theme.bgblue]}>
       <HeaderPage back="true" title="" color="blue"/>
        <ScrollView style={[theme.bgblue]}>
          <View style={common.p20}>
            <View style={[common.center]}>
              <Image
                source={require('../assets/images/tick-success.png')}></Image>
            </View>
            <Text style={[common.white, common.fontxxl, common.textcenter]}>
              Thank You
            </Text>
            <Text style={[common.white, common.textcenter]}>
              You successfully complete the payment
            </Text>
            {/* <Text style={[common.white, common.textcenter]}>
              Transaction ID 252QWERTY
            </Text> */}
          </View>

          <View style={[theme.card]}>
            <View style={(common.pt20, common.mt20)}>
              <ListItem avatar>
                <Left>
                {
                 data?.agent_data?.profile_image != undefined && data?.agent_data?.profile_image != ''
                 &&
                 <Thumbnail
                    source={{uri:data?.agent_data?.profile_image}}
                    style={{width: 50, height: 50, borderRadius: 40}}
                  />
             }
             {
                 (data?.agent_data?.profile_image == undefined || data?.agent_data?.profile_image == '')
                 &&
                 <Thumbnail
                    source={require('../assets/images/no-photo.jpg')}
                    style={{width: 50, height: 50, borderRadius: 40}}
                  />
             }
             
                </Left>
                <Body style={[common.bordernone]}>
                  <Text style={[common.fontlg, theme.fontbold]}>
                    {data?.agent_data?.first_name}  {data?.agent_data?.last_name}
                  </Text>
                  {/* <Text note>West Windsor</Text> */}
                  <View style={[common.flexbox, common.flexrow]}>
                    <View style={[common.flexone]}>
                      <Text style={[theme.colorblack]}>
                        <Icon
                          name="star"
                          type="FontAwesome"
                          style={[
                            theme.coloryellow,
                            common.fontxl,
                          ]}></Icon>{' '}
                       { data?.agent_data?.rating}
                      </Text>
                    </View>
                    <View style={[common.pl15, common.pr15]}>
                      {/* <Button rounded bordered small danger >
                        <Text style={[theme.textcapital]}>Report</Text>
                      </Button> */}
                    </View>
                  </View>
                </Body>
              </ListItem>
            </View>

            <View style={[theme.bggray, common.mt15, common.pt10, common.pb10]}>
              <ListItem style={[common.bordernone]}>
                <Body style={[common.bordernone]}>
                  <Text style={[common.fontmd, theme.fontbold]}>
                  { data?.agent_data?.vehicle_model} - { data?.agent_data?.vehicle_color}
                  </Text>
                  <Text note>{ data?.agent_data?.vehicle_number}</Text>
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
                <Text
                  note
                  style={[common.fontmd, theme.fontbold, common.textcenter]}>
                  SWIPE TO RATE YOUR AGENT
                </Text>
                <View style={[common.flexbox, common.flexrow, common.center]}>
                <Rating
                    defaultRating = {0}
                    onFinishRating={ratingCompleted}
                    style={{ paddingVertical: 10 }}
                  />
                </View>
              </View>
              <View style={[common.p15, {height: 140}]}>
                <View
                  style={[
                    common.flexone,
                    common.flexrow,
                    common.m5,
                    common.center,
                    common.mb20,
                  ]}>
                  <Button
                    rounded
                    danger
                    style={[
                      theme.bgblue,
                      {height: 60},
                      common.pr20,
                      common.pl20,
                      common.mr10
                    ]}
                    onPress={()=>rateAgent()}
                  >
                    <Text
                      style={[
                        common.fontlg,
                        theme.textcapital,
                        common.pl20,
                        common.pr20,
                      ]}>
                      Submit
                    </Text>
                  </Button>
                  <Button
                    rounded
                    danger
                    style={[
                      theme.bgblue,
                      {height: 60},
                      common.pr20,
                      common.pl20,
                    ]}
                    onPress={()=>props.navigation.navigate('HomePage')}
                  >
                    <Text
                      style={[
                        common.fontlg,
                        theme.textcapital,
                        common.pl20,
                        common.pr20,
                      ]}>
                      Skip
                    </Text>
                  </Button>
                </View>
              </View>
            </View>
          </View>
        </ScrollView>
      </Container>
    );
 
}

export default RatingPage
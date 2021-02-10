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
import {laundroRating} from '../actions/laundryorder/laundryorderActions'
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

type NotificationPageRouteProp = RouteProp<RootStackParamList, 'LaundryRating'>

type NotificationPageNavigationProp = StackNavigationProp<
  RootStackParamList,
  'LaundryRating'
>

type Props = {
  route: NotificationPageRouteProp
  navigation: NotificationPageNavigationProp
}


const LaundryRating = (props:Props) => {

  const dispatch = useDispatch();
  const [data,setData] = useState(props?.route?.params?.data)
  const [pickrating,setPickRating] = useState(0)
  const [droprating,setDropRating] = useState(0)
  const [laundrorating,setLaundroRating] = useState(0)

  const ratingCompletedPickup = (rating) =>{
         console.log("rating",rating);
         setPickRating(rating)
  }
  const ratingCompletedDrop = (rating) =>{
      console.log("rating",rating);
      setDropRating(rating)
  }
  const ratingCompletedLaundro = (rating) =>{
      console.log("rating",rating);
      setLaundroRating(rating)
  }

  const rateAgent = () =>{
    dispatch(showLoader());
    dispatch(laundroRating({pickup_agent_rating:pickrating,drop_agent_rating:droprating,laundromat_rating:laundrorating,request_id : data?.unique_id}))
  }

  const ratedL = useSelector((state:RootState)=>state.lorder_r._laundryRating)

  useEffect(()=>{
    if(ratedL != undefined){
      if(ratedL.status == true){
        props.navigation.navigate('HomePage')
      }else{
        appConfig.functions.showError(ratedL.message)
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
                  <Text style={[common.fontlg, theme.fontbold]}>
                  {data?.pickup_agent_data?.first_name}  {data?.pickup_agent_data?.last_name}
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
                       { data?.pickup_agent_data?.rating}
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
                  { data?.pickup_agent_data?.vehicle_model} - { data?.pickup_agent_data?.vehicle_color}
                  </Text>
                  <Text note>{ data?.pickup_agent_data?.vehicle_number}</Text>
                </Body>
                <Right>
                  <Button rounded light style={[theme.btncall]} onPress={()=>Linking.openURL(`tel:${data?.pickup_agent_data?.phone_prefix + data?.pickup_agent_data?.phone}`)}>
                    <Icon
                      name="call"
                      type="MaterialIcons"
                      style={[common.white]}></Icon>
                  </Button>
                </Right>
              </ListItem>
            </View>
            <View style={[common.pl20,common.pt10]}>
                <Text
                  note
                  style={[common.fontmd, theme.fontbold, common.textcenter]}>
                  SWIPE TO RATE YOUR PICKUP AGENT
                </Text>
                <View style={[common.flexbox, common.flexrow, common.center]}>
                <Rating
                    defaultRating = {0}
                    onFinishRating={ratingCompletedPickup}
                    style={{ paddingVertical: 10 }}
                  />
                </View>
              </View>
              <View style={(common.pt20, common.mt20)}>
              <ListItem avatar>
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
                  <Text style={[common.fontlg, theme.fontbold]}>
                    {data?.drop_agent_data?.first_name}  {data?.drop_agent_data?.last_name}
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
                       { data?.drop_agent_data?.rating}
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
                  { data?.drop_agent_data?.vehicle_model} - { data?.drop_agent_data?.vehicle_color}
                  </Text>
                  <Text note>{ data?.drop_agent_data?.vehicle_number}</Text>
                </Body>
                <Right>
                  <Button rounded light style={[theme.btncall]} onPress={()=>Linking.openURL(`tel:${data?.drop_agent_data?.phone_prefix + data?.drop_agent_data?.phone}`)}>
                    <Icon
                      name="call"
                      type="MaterialIcons"
                      style={[common.white]}></Icon>
                  </Button>
                </Right>
              </ListItem>
            </View>
            <View style={[common.pl20,common.pt10]}>
                <Text
                  note
                  style={[common.fontmd, theme.fontbold, common.textcenter]}>
                  SWIPE TO RATE YOUR DROP AGENT
                </Text>
                <View style={[common.flexbox, common.flexrow, common.center]}>
                <Rating
                    defaultRating = {0}
                    onFinishRating={ratingCompletedDrop}
                    style={{ paddingVertical: 10 }}
                  />
                </View>
              </View>
              <View style={(common.pt20, common.mt20)}>
              <ListItem avatar>
                <Left>
                {
                    data?.laundromat_data?.profile_image != undefined && data?.laundromat_data?.profile_image != ''
                    &&
                    <Thumbnail
                        source={{uri:data?.laundromat_data?.profile_image}}
                        style={{width: 50, height: 50, borderRadius: 40}}
                      />
                }
                {
                    (data?.laundromat_data?.profile_image == undefined || data?.laundromat_data?.profile_image == '')
                    &&
                    <Thumbnail
                        source={require('../assets/images/no-photo.jpg')}
                        style={{width: 50, height: 50, borderRadius: 40}}
                      />
                }
                </Left>
                <Body style={[common.bordernone]}>
                  <Text style={[common.fontlg, theme.fontbold]}>
                    {data?.laundromat_data?.business_name}  
                  </Text>
                  <Text note>{data?.laundromat_data?.location}</Text>
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
                       { data?.laundromat_data?.rating}
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

            {/* <View style={[theme.bggray, common.mt15, common.pt10, common.pb10]}>
              <ListItem style={[common.bordernone]}>
                <Body style={[common.bordernone]}>
                  <Text style={[common.fontmd, theme.fontbold]}>
                  { data?.laundromat_data?.vehicle_model} - { data?.laundromat_data?.vehicle_color}
                  </Text>
                  <Text note>{ data?.laundromat_data?.vehicle_number}</Text>
                </Body>
                <Right>
                  <Button rounded light style={[theme.btncall]} onPress={()=>Linking.openURL(`tel:${data?.laundromat_data?.phone_prefix + data?.laundromat_data?.phone}`)}>
                    <Icon
                      name="call"
                      type="MaterialIcons"
                      style={[common.white]}></Icon>
                  </Button>
                </Right>
              </ListItem>
            </View> */}
            <View style={[common.pl20,common.pt10]}>
                <Text
                  note
                  style={[common.fontmd, theme.fontbold, common.textcenter]}>
                  SWIPE TO RATE YOUR LAUNDROMAT
                </Text>
                <View style={[common.flexbox, common.flexrow, common.center]}>
                <Rating
                    defaultRating = {0}
                    onFinishRating={ratingCompletedLaundro}
                    style={{ paddingVertical: 10 }}
                  />
                </View>
              </View>
            <View style={[common.mt15, common.pt10, common.pb10]}>
              
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

export default LaundryRating
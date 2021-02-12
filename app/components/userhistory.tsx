/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {Component, useDebugValue, useEffect, useState} from 'react';
import {Platform,StatusBar, Image, TouchableOpacity,TouchableHighlight, ScrollView,FlatList} from 'react-native';
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
  Tabs,
  Tab,
  TabHeading,
  CardItem,
} from 'native-base';

import {theme} from '../css/theme';
import {common} from '../css/common';
import DateTimePicker from '@react-native-community/datetimepicker';
import {Picker} from '@react-native-picker/picker';
import moment from 'moment';
import {CommonActions} from '@react-navigation/native';
import {showLoader, hideLoader} from '../actions/common/commonActions'
import {appConfig} from '../appConfig'
import { getUserHistoryMoney,getUserHistoryLaundry} from '../actions/history/historyActions'
import HeaderPage from './shared/header'
import {useSelector, useDispatch} from 'react-redux'
import io, { Socket } from 'socket.io-client'
import Modal from 'react-native-modal'
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

type NotificationPageRouteProp = RouteProp<RootStackParamList, 'UserHistory'>

type NotificationPageNavigationProp = StackNavigationProp<
  RootStackParamList,
  'UserHistory'
>

type Props = {
  route: NotificationPageRouteProp
  navigation: NotificationPageNavigationProp
}

 const UserHistory = (props:Props) => {
   let onScrollBeginDrag = false;
   let onScrollBeginMoney = false;

   const [lOffset,setLOffset] = useState(0)
   const [mOffset,setMOffset] = useState(0)

   const dispatch = useDispatch()

   const [llist,setLlist] = useState([])
   const [mlist,setMlist] = useState([])
   const [dateFrom, setDateFrom] = useState(new Date(1598051730000));
   const [dateTo, setDateTo] = useState(new Date(1598051730000));

   const [minDate, setMinDate] = useState(new Date());

   const [startDate, setStartDate] = useState('');
   const [endDate, setEndDate] = useState('');

  const [showFrom, setShowFrom] = useState(false);
  const [showTo, setShowTo] = useState(false);

   const [isModalVisible,setIsModalVisible] = useState(false) 

   const toggleModal = () => {
    setIsModalVisible( !isModalVisible);
  };

  useEffect(()=>{
    const unsubscribe = props.navigation.addListener('focus', () => {
      setLOffset(0);
      setMOffset(0);
      setLlist([]);
      setMlist([])
      dispatch(showLoader());
      dispatch(getUserHistoryMoney({m_offset : 0,startDate:startDate,endDate:endDate}))
      dispatch(getUserHistoryLaundry({l_offset : 0,startDate:startDate,endDate:endDate}))
    })
    return unsubscribe;
  },[props.navigation])

  const getMoreMoneyData = () =>{
    
    if(onScrollBeginMoney){
      
      dispatch(getUserHistoryMoney({m_offset : mOffset+1,startDate:startDate,endDate:endDate}))
      setMOffset(mOffset+1)
    }
    
  }

  const getMoreLaundryData = () =>{
    
    if(onScrollBeginDrag){
      
      dispatch(getUserHistoryLaundry({l_offset : lOffset+1,startDate:startDate,endDate:endDate}))
      setLOffset(lOffset+1)
    }
    
  }

  const historyLaundry = useSelector((state:RootState)=>state.history_r._historyLaundry)

  const historyMoney = useSelector((state:RootState)=>state.history_r._historyMoney)

  useEffect(()=>{
    if(historyLaundry != undefined){
      dispatch(hideLoader());
      console.log("historyLaundry",historyLaundry);
      if(historyLaundry.status == true){
        
        if(llist?.length == 0){
          setLlist(historyLaundry?.laundry_request_list)
        }else{
          setLlist(llist.concat(historyLaundry?.laundry_request_list))
        }
      }else{
        appConfig.functions.showError(historyLaundry.message);
      }
    }
  },[historyLaundry])

  useEffect(()=>{
    if(historyMoney != undefined){
      dispatch(hideLoader());
     
      if(historyMoney.status == true){
        if(mlist?.length == 0){
          setMlist(historyMoney?.money_request_list)
        }else{
          setMlist(mlist.concat(historyMoney?.money_request_list))
        }
        
      }else{
        appConfig.functions.showError(historyMoney.message);
      }
    }
  },[historyMoney])

  const onChangeFrom = (event, selectedDate) => {
    const currentDate = selectedDate || dateFrom;
    setShowFrom(false);
    setDateFrom(currentDate);
    setMinDate(new Date(selectedDate))
    setStartDate(moment(selectedDate).format('DD-MM-YYYY'))
    if(endDate != ''){
      setLOffset(0);
      setMOffset(0);
      setLlist([]);
      setMlist([])
      dispatch(showLoader());
      dispatch(getUserHistoryMoney({m_offset : 0,startDate:startDate,endDate:endDate}))
      dispatch(getUserHistoryLaundry({l_offset : 0,startDate:startDate,endDate:endDate}))
     
    }
  }

  const onChangeTo = (event, selectedDate) => {
    const currentDate = selectedDate || dateTo;
    setShowTo(false);
    setDateTo(currentDate);
    setEndDate(moment(selectedDate).format('DD-MM-YYYY'))
    if(startDate != ''){
      setLOffset(0);
      setMOffset(0);
      setLlist([]);
      setMlist([])
      dispatch(showLoader());
      dispatch(getUserHistoryMoney({m_offset : 0,startDate:startDate,endDate:endDate}))
      dispatch(getUserHistoryLaundry({l_offset : 0,startDate:startDate,endDate:endDate}))
      
    }
  }
  
    return (
      <Container>
        <HeaderPage back={false} title='' />
        <View style={[common.pl20, common.mt15, common.pb10]}>
          <Text style={[common.fontxxl]}>Your Requests</Text>
        </View>
        <View style={[common.flexrow,common.pl20,{justifyContent:"flex-start",paddingBottom:10}]}>
          <Text style={{fontWeight:"bold"}}>Filter By Date:</Text>
        
         
        </View>
        <View style={[common.flexrow,common.pl20,common.pr20,{justifyContent:"flex-end"}]}>
            <Text style={common.pr10}>From:</Text>
            {
              startDate != ''
              &&
              <Text style={common.pr5} >{moment(startDate).format('DD-MM-YYYY')}</Text>
            }
            
            <Text style={[common.pr5,{marginTop:-5}]} onPress={()=>setShowFrom(true)}><Icon name="calendar" type="Entypo"/></Text>
              {showFrom && (
                <DateTimePicker
                  testID="dateTimePickerFrom"
                  value={dateFrom}
                  mode={"date"}
                  is24Hour={true}
                  display="default"
                  maximumDate={new Date()}
                  onChange={onChangeFrom}
                />
              )}
              <Text style={common.pr10}>To:</Text>
              {
                endDate != ''
                &&
                <Text style={common.pr10} >{moment(endDate).format('DD-MM-YYYY')}</Text>
              }
              
              <Text style={[{marginTop:-5}]} onPress={()=>setShowTo(true)}><Icon name="calendar" type="Entypo"/></Text>
              {showTo && (
                <DateTimePicker
                  testID="dateTimePickerTo"
                  value={dateTo}
                  mode={"date"}
                  is24Hour={true}
                  maximumDate={new Date()}
                  minimumDate={minDate}
                  display="default"
                  onChange={onChangeTo}
                />
              )}
          </View>
        <Tabs tabBarUnderlineStyle={[{ backgroundColor:'#48c6f3',}]}
           tabContainerStyle={{elevation: 0}}
        >
          <Tab
            heading={
              <TabHeading style={[common.bgwhite]}>
                <Text style={[theme.colorblack]}>MONEY</Text>
              </TabHeading>
            }>
              
              {
                mlist?.length>0 &&
                  <FlatList
                  style={[theme.bggray]}
                  data={mlist}
                  onScrollBeginDrag={() => { onScrollBeginMoney = true; }}
                  renderItem={({item, index}) => (
                    <TouchableHighlight activeOpacity={1} onPress={()=>props?.navigation?.navigate('MoneyHistoryDetail',{unique_request_id:item?.unique_money_request_id,page:"UserHistory"})}>
                    <View style={[theme.listCard]}>
                    <View style={[common.flexbox, common.flexrow, common.p10, common.pb0]}>
                      <View style={[common.flexone]}>
                        <Text style={[common.fontxl, theme.fontbold]}>$ {item.original_amount}</Text>
                        <Text note style={[theme.bluecolor]}>Paid ${item.final_amount}</Text>
                      </View>
                      <View>
                        <Text note>{moment(item.created_date).format('lll')}</Text>
                        <Text style={[theme.colorgreen, common.textright]}>Success</Text>
                      </View>
                    </View>
                    <ListItem avatar>
                      <Left>
                        {
                          item.agent_profile_image != undefined
                          &&
                          <Thumbnail
                          source={{uri:item.agent_profile_image}}
                          style={{width: 50, height: 50, borderRadius: 40}}
                          />
                        }
                        {
                          item.agent_profile_image == undefined
                          &&
                          <Thumbnail
                            source={require('../assets/images/no-photo.jpg')}
                            style={{width: 50, height: 50, borderRadius: 40}}
                          />
                        }
                      </Left>
                      <Body style={[common.bordernone]}>
                        <Text style={[common.fontmd, theme.fontbold]}>
                          {item.agent_first_name} {item.agent_last_name}
                        </Text>
                        {/* <Text style={[common.fontbody]}>West Windsor</Text> */}
                      </Body>
                    </ListItem>
                  </View>
                  </TouchableHighlight>
                 )}
                 onEndReachedThreshold = {Platform.OS==='ios'?0:0.8}
                 onEndReached = {()=>{getMoreMoneyData()}}
                  
               />
              }
              {
                mlist?.length == 0
                &&
                <View>
                  <Text style={{textAlign:"center",marginTop:30}}>No Money Requests to show. </Text>
                </View>
              }
             
           
           
          </Tab>
          <Tab
            heading={
              <TabHeading style={[common.bgwhite]}>
                <Text style={[theme.colorblack]}>LAUNDRY</Text>
              </TabHeading>
            }>
           
             
           {
                llist?.length>0 &&
                 
        <FlatList
            style={[theme.bggray]}
              data={llist}
              onScrollBeginDrag={() => { onScrollBeginDrag = true; }}
              renderItem={({item, index}) => (
                <TouchableHighlight activeOpacity={1} onPress={()=>props?.navigation?.navigate('LaundryHistoryDetail',{unique_request_id:item?.unique_laundry_request_id})}>
                <View style={[theme.listCard]}>
                    <View style={[common.flexbox, common.flexrow, common.p10, common.pb0]}>
                      <View style={[common.flexone]}>
                        <Text style={[common.fontlg, ]}>{item?.normal_wash_weight} Pounds</Text>
                        <Text note style={[theme.bluecolor]}>Seperate Item {item?.additional_wash_items_count}</Text>
                      </View>
                      <View>
                        <Text note>{moment(item.created_date).format('lll')}</Text>
                        <Text style={[theme.colorgreen, common.textright]}>Success</Text>
                      </View>
                    </View>
                    <ListItem avatar>
                      <Left>
                        {
                          item?.laundromat_data?.profile_image == undefined
                          &&
                          <Thumbnail
                            source={require('../assets/images/no-photo.jpg')}
                            style={{width: 50, height: 50, borderRadius: 40}}
                          />
                        }
                        {
                          item?.laundromat_data?.profile_image != undefined
                          &&
                        <Thumbnail
                          source={{uri:item?.laundromat_data?.profile_image}}
                          style={{width: 50, height: 50, borderRadius: 40}}
                        />
                      }
                      </Left>
                      <Body style={[common.bordernone]}>
                        <Text style={[common.fontmd, theme.fontbold]}>
                          {item?.laundromat_data?.business_name}
                        </Text>
                        <Text style={[common.fontbody]}>{item?.laundromat_data?.location}</Text>
                      </Body>
                    </ListItem>
                  </View>
            </TouchableHighlight>
                )}
                onEndReachedThreshold = {Platform.OS==='ios'?0:0.8}
                onEndReached = {()=>{getMoreLaundryData()}}
                 
            />
           }
           {
              llist?.length == 0
              &&
              <View>
                <Text style={{textAlign:"center",marginTop:30}}>No Laundry Requests to show. </Text>
              </View>
           }
        
          </Tab>
        </Tabs>
       
      </Container>
    );
  }

  
{
  /* <Tabs tabBarUnderlineStyle={[theme.bgblue]}>
            <Tab
              heading={
                <TabHeading style={[common.bgwhite]}>
                  <Text style={[theme.colorblack]}>MONEY</Text>
                </TabHeading>
              }>
              <ScrollView style={[theme.bggray]}>
                <View style={[theme.listCard]}>
                  <View style={[common.flexbox, common.flexrow]}>
                    <View>
                      <Text>$ 400</Text>
                      <Text>Paid $412.5</Text>
                    </View>
                    <View>
                      <Text>July 22 8:30 AM</Text>
                      <Text>Success</Text>
                    </View>
                  </View>
                  <ListItem avatar>
                    <Left>
                      <Thumbnail
                        source={require('../assets/images/thumbuser.png')}
                        style={{width: 80, height: 80, borderRadius: 40}}
                      />
                    </Left>
                    <Body style={[common.bordernone]}>
                      <Text style={[common.fontlg, theme.fontbold]}>
                        James Johnson
                      </Text>
                      <Text note>West Windsor</Text>
                      <Text style={[theme.colorblack]}>
                        <Icon
                          name="star"
                          type="FontAwesome"
                          style={[
                            theme.coloryellow,
                            common.fontxl,
                          ]}></Icon>{' '}
                        4.8
                      </Text>
                    </Body>
                  </ListItem>
                </View>
              </ScrollView>
            </Tab>
            <Tab
              heading={
                <TabHeading style={[common.bgwhite]}>
                  <Text style={[theme.colorblack]}>LAUNDRY</Text>
                </TabHeading>
              }>
              <Text>hhhh eesdfd</Text>
            </Tab>
          </Tabs> */
}
export default UserHistory
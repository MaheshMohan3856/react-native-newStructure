/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {Component, useDebugValue, useEffect, useState} from 'react';
import {Platform,StatusBar, Image, TouchableOpacity, ScrollView,FlatList} from 'react-native';
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
} from 'native-base';

import {theme} from '../css/theme';
import {common} from '../css/common';
import Modal from 'react-native-modal'
import {Picker} from '@react-native-picker/picker';
import moment from 'moment';
import {CommonActions} from '@react-navigation/native';
import {showLoader, hideLoader} from '../actions/common/commonActions'
import {appConfig} from '../appConfig'
import { getAgentHistoryMoney,getAgentHistoryLaundry,getAgentEarnings} from '../actions/history/historyActions'
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
import { TouchableHighlight } from 'react-native-gesture-handler';
var storage = new Storage({size: 1000,storageBackend: AsyncStorage,defaultExpires: 1000 * 3600 * 24,enableCache: false});

type NotificationPageRouteProp = RouteProp<RootStackParamList, 'AgentHistory'>

type NotificationPageNavigationProp = StackNavigationProp<
  RootStackParamList,
  'AgentHistory'
>

type Props = {
  route: NotificationPageRouteProp
  navigation: NotificationPageNavigationProp
}

 const AgentHistory = (props:Props) => {

   let onScrollBeginDrag = false;
   let onScrollBeginDragLaundry = false;
   let onScrollBeginEarning = false;

   const [lOffset,setLOffset] = useState(0)
   const [mOffset,setMOffset] = useState(0)
   const [eOffset,setEOffset] = useState(0)
   const [filterArray,setFilterArray] = useState(["Asc","Desc"])
   const [filter,setFilter] = useState("Desc")

   const [isModalVisible,setIsModalVisible] = useState(false) 

   const toggleModal = () => {
    setIsModalVisible( !isModalVisible);
  };

   const dispatch = useDispatch()

   const [llist,setLlist] = useState([])
   const [mlist,setMlist] = useState([])
   const [elist,setElist] = useState([])

  useEffect(()=>{
    const unsubscribe = props.navigation.addListener('focus', () => {
      setLOffset(0);
      setMOffset(0);
      setEOffset(0);
      setLlist([]);
      setMlist([]);
      setElist([])
      dispatch(showLoader());
      dispatch(getAgentHistoryMoney({m_offset : 0,filter:filter}))
      dispatch(getAgentHistoryLaundry({l_offset : 0,filter:filter}))
      dispatch(getAgentEarnings({e_offset : 0,filter:filter}))
    })
    return unsubscribe;
  },[props.navigation])

  const getMoreRequestData = () =>{
    
    if(onScrollBeginDrag){
      
      dispatch(getAgentHistoryMoney({m_offset : mOffset+1,filter:filter}))
      setMOffset(mOffset+1)
     
    }
    
  }

  const getMoreLaundryData = () =>{
    
    if(onScrollBeginDragLaundry){
      
      dispatch(getAgentHistoryLaundry({l_offset : lOffset+1,filter:filter}))
      setLOffset(lOffset+1)
    }
    
  }

  const getMoreEarningData = () =>{
    
    if(onScrollBeginEarning){
      
      dispatch(getAgentEarnings({e_offset : eOffset+1,filter:filter}))
      setLOffset(eOffset+1)
    }
    
  }

  const historyRequestMoney = useSelector((state:RootState)=>state.history_r._agentHistoryMoney)

  const historyRequestLaundry = useSelector((state:RootState)=>state.history_r._agentHistoryLaundry)

  const agentEarning = useSelector((state:RootState)=>state.history_r._agentEarning)

 

  useEffect(()=>{
    if(historyRequestMoney != undefined){
      dispatch(hideLoader());
      console.log('historyRequestMoney',historyRequestMoney);
      
    
      if(historyRequestMoney.status == true){
        
        if(mlist?.length == 0){

         setMlist(historyRequestMoney?.money_requests)
        }else{
        
          setMlist(mlist.concat(historyRequestMoney?.money_requests))
        }
      }else{
        appConfig.functions.showError(historyRequestMoney.message);
      }
    }
  },[historyRequestMoney])

  useEffect(()=>{
    if(historyRequestLaundry != undefined){
      dispatch(hideLoader());
      console.log('historyRequestLaundry',historyRequestLaundry);
      if(historyRequestLaundry.status == true){
        if(llist?.length == 0){
        
          setLlist(historyRequestLaundry?.laundry_requests)
        }else{
        
          setLlist(llist.concat(historyRequestLaundry?.laundry_requests))
        }
        
      }else{
        appConfig.functions.showError(historyRequestLaundry.message);
      }
    }
  },[historyRequestLaundry])

  

  useEffect(()=>{
    if(agentEarning != undefined){
      dispatch(hideLoader());
      console.log('agentEarning',agentEarning);
      if(agentEarning.status == true){
        if(elist?.length == 0){
        
          setElist(agentEarning?.earnings)
        }else{
        
         // setElist(elist.concat(agentEarning?.earnings))
        }
        
      }else{
        appConfig.functions.showError(agentEarning.message);
      }
    }
  },[agentEarning])

  const showDetail = (type,unique_id) =>{
    if(type == 'money'){
      props?.navigation?.navigate('MoneyHistoryDetail',{unique_request_id:unique_id,page:"AgentHistory"})
    }else{
      props?.navigation?.navigate('LaundryHistoryDetail',{unique_request_id:unique_id})
    }
  }
     
    return (
      <Container>
        <HeaderPage back={false} title='' />
        <View style={[common.pl20, common.mt15, common.pb10]}>
          <Text style={[common.fontxxl]}>History</Text>
        </View>
        <View style={[common.flexrow,common.pl20,{justifyContent:"flex-end"}]}>
          <Text style={{fontWeight:"bold"}}>Filter By Date:</Text>
          {
            Platform.OS === 'ios'
            &&
            <Text style={common.pr10} onPress={()=>toggleModal()}>{filter}</Text>
          }
          {
            Platform.OS === 'android'
            &&
            <Picker
              selectedValue={filter}
              style={{height: 50, width: 100,marginTop:-14}}
              onValueChange={(itemValue, itemIndex) =>{
                setFilter(itemValue)
                setLOffset(0);
                setMOffset(0);
                setEOffset(0);
                setLlist([]);
                setMlist([]);
                setElist([])
                dispatch(showLoader());
                dispatch(getAgentHistoryMoney({m_offset : 0,filter:itemValue}))
                dispatch(getAgentHistoryLaundry({l_offset : 0,filter:itemValue}))
                dispatch(getAgentEarnings({e_offset : 0,filter:itemValue}))
              }
              }>
              {filterArray?.length > 0 && filterArray?.map((item,index)=>{
                return(
                  <Picker.Item key={index} label={item} value={item} />
                )
              })}
            
            
            </Picker>
          }
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
                mlist?.length > 0
                &&
                  <FlatList
                  style={[theme.bggray]}
                  data={mlist}
                  onScrollBeginDrag={() => { onScrollBeginDrag = true; }}
                  renderItem={({item, index}) => (
                    <TouchableHighlight activeOpacity={1} onPress={()=>props?.navigation?.navigate('MoneyHistoryDetail',{unique_request_id:item?.unique_money_request_id,page:"AgentHistory"})}>
                    <View style={[theme.listCard]}>
                    <View style={[common.flexbox, common.flexrow, common.p10, common.pb0]}>
                      <View style={[common.flexone]}>
                        <Text style={[common.fontxl, theme.fontbold]}>$ {item?.original_amount}</Text>
                        <Text note style={[theme.bluecolor]}>Paid ${item?.final_amount}</Text>
                      </View>
                      <View>
                        <Text note>{moment(item?.created_date).format('lll')}</Text>
                        <Text style={[theme.colorgreen, common.textright]}>Success</Text>
                      </View>
                    </View>
                    <ListItem avatar>
                      <Left>
                        {
                          item?.requester_profile_image != undefined
                          &&
                          <Thumbnail
                          source={{uri:item?.requester_profile_image}}
                          style={{width: 50, height: 50, borderRadius: 40}}
                          />
                        }
                        {
                          item?.requester_profile_image == undefined
                          &&
                          <Thumbnail
                            source={require('../assets/images/no-photo.jpg')}
                            style={{width: 50, height: 50, borderRadius: 40}}
                          />
                        }
                      </Left>
                      <Body style={[common.bordernone]}>
                        <Text style={[common.fontmd, theme.fontbold]}>
                          {item?.requester_first_name} {item?.requester_last_name}
                        </Text>
                        <Text style={[common.fontbody]}>{item?.pickup_location}</Text>
                      </Body>
                    </ListItem>
                  </View>
                  </TouchableHighlight>
                 )}
                 onEndReachedThreshold = {Platform.OS==='ios'?0:0.8}
                 onEndReached = {()=>{getMoreRequestData()}}
                  
               />
              }
              
              {
                mlist?.length == 0
                &&
                <View>
                  <Text style={{textAlign:"center",marginTop:30}}>No Requests to show. </Text>
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
                llist?.length > 0
                &&
                  <FlatList
                  style={[theme.bggray]}
                  data={llist}
                  onScrollBeginDrag={() => { onScrollBeginDragLaundry = true; }}
                  renderItem={({item, index}) => (
                    <TouchableHighlight activeOpacity={1} onPress={()=>props?.navigation?.navigate('LaundryHistoryDetail',{unique_request_id:item?.unique_laundry_request_id})}>
                    <View style={[theme.listCard]}>
                    <View style={[common.flexbox, common.flexrow, common.p10, common.pb0]}>
                      <View style={[common.flexone]}>
                        <Text style={[common.fontxl, theme.fontbold]}>{item?.normal_wash_weight} Pounds</Text>
                        <Text note style={[theme.bluecolor]}>Seperate Item {item?.additional_wash_items_count}</Text>
                      </View>
                      <View>
                        <Text note>{moment(item?.created_date).format('lll')}</Text>
                        <Text style={[theme.colorgreen, common.textright]}>Success</Text>
                      </View>
                    </View>
                    <ListItem avatar>
                      <Left>
                        {
                          item?.requester_profile_image != undefined
                          &&
                          <Thumbnail
                          source={{uri:item?.requester_profile_image}}
                          style={{width: 50, height: 50, borderRadius: 40}}
                          />
                        }
                        {
                          item?.requester_profile_image == undefined
                          &&
                          <Thumbnail
                            source={require('../assets/images/no-photo.jpg')}
                            style={{width: 50, height: 50, borderRadius: 40}}
                          />
                        }
                      </Left>
                      <Body style={[common.bordernone]}>
                        <Text style={[common.fontmd, theme.fontbold]}>
                          {item?.requester_first_name} {item?.requester_last_name}
                        </Text>
                        <Text style={[common.fontbody]}>{item?.pickup_location}</Text>
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
                mlist?.length == 0
                &&
                <View>
                  <Text style={{textAlign:"center",marginTop:30}}>No Requests to show. </Text>
                </View>
              }
             
           
           
          </Tab>
          <Tab
            heading={
              <TabHeading style={[common.bgwhite]}>
                <Text style={[theme.colorblack]}>EARNINGS</Text>
              </TabHeading>
            }>
           
             
           {
                elist?.length>0 &&
                 
        <FlatList
            style={[theme.bggray]}
              data={elist}
              onScrollBeginDrag={() => { onScrollBeginEarning = true; }}
              renderItem={({item, index}) => (
            <TouchableHighlight onPress={()=>showDetail(item.service_type,item.request_detail[0].unique_id)}>
           <View style={[theme.listCard]}>
              <View style={[common.flexbox, common.flexrow, common.p10, common.pb0]}>
                <View style={[common.flexone]}>
                  <Text style={[common.fontlg, ]}>{item.total_amount}</Text>
                  {
                    item.service_type == 'money'
                    &&
                    <Text note style={[theme.bluecolor]}>Money</Text>
                  }
                  {
                    item.service_type == 'laundry'
                    &&
                    <Text note style={[theme.bluecolor]}>Laundry</Text>
                  }
                </View>
                <View>
                  <Text note>{moment(item.created_date).format('lll')}</Text>
                  <Text style={[theme.colorgreen, common.textright]}>Success</Text>
                </View>
              </View>
              <ListItem avatar>
                <Left>
                  {
                    item?.request_detail[0]?.requester_profile_image == undefined
                    &&
                    <Thumbnail
                      source={require('../assets/images/no-photo.jpg')}
                      style={{width: 50, height: 50, borderRadius: 40}}
                    />
                  }
                  {
                    item?.request_detail[0]?.requester_profile_image != undefined
                    &&
                  <Thumbnail
                    source={{uri:item?.request_detail[0]?.requester_profile_image}}
                    style={{width: 50, height: 50, borderRadius: 40}}
                  />
                }
                </Left>
                <Body style={[common.bordernone]}>
                  <Text style={[common.fontmd, theme.fontbold]}>
                    {item?.request_detail[0]?.requester_first_name} {item?.request_detail[0]?.requester_last_name}
                  </Text>
                  <Text style={[common.fontbody]}>{item?.request_detail[0]?.requester_email}</Text>
                </Body>
              </ListItem>
            </View>
            </TouchableHighlight>
                )}
                onEndReachedThreshold = {Platform.OS==='ios'?0:0.8}
                onEndReached = {()=>{getMoreEarningData()}}
                 
            />
           }
           {
              elist?.length == 0
              &&
              <View>
                <Text style={{textAlign:"center",marginTop:30}}>No Earnings to show. </Text>
              </View>
           }
        
          </Tab>
        </Tabs>
        <Modal isVisible={isModalVisible}>
          <View style={[common.flexbox]}>
            <View style={[theme.boxmodel]}>
            <Picker
                  selectedValue={filter}
                  style={{height: 150, width: '100%',marginTop:-30}}
                  onValueChange={(itemValue, itemIndex) =>{
                    toggleModal()
                    setFilter(itemValue)
                    setLOffset(0);
                    setMOffset(0);
                    setEOffset(0);
                    setLlist([]);
                    setMlist([]);
                    setElist([])
                    dispatch(showLoader());
                    dispatch(getAgentHistoryMoney({m_offset : 0,filter:itemValue}))
                    dispatch(getAgentHistoryLaundry({l_offset : 0,filter:itemValue}))
                    dispatch(getAgentEarnings({e_offset : 0,filter:itemValue}))
                  }
                  }>
                  {filterArray?.length > 0 && filterArray?.map((item,index)=>{
                    return(
                      <Picker.Item key={index} label={item} value={item} />
                    )
                  })}
                
                
                </Picker>
            
            </View>
          </View>
        </Modal>
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
export default AgentHistory
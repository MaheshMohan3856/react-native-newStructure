

import React, { useEffect,useState } from 'react';
import {StatusBar,View,Text} from 'react-native';
import {
  Header,
  Body,
  Title,
  Left,
  Icon,
  Right,
  Button
} from 'native-base';

import {theme} from '../../css/theme';
import {common} from '../../css/common';
import firestore from '@react-native-firebase/firestore';
import {withNavigation} from '@react-navigation/compat';
import { TouchableOpacity } from 'react-native-gesture-handler';
import {appConfig} from '../../appConfig';
import {switchover,_switchover} from '../../actions/agentregister/agentregisterActions';
import {useSelector,useDispatch} from 'react-redux';
import {showLoader, hideLoader} from '../../actions/common/commonActions';
import { RootStackParamList } from '../../routeConfig';
import { RootState } from '../../appReducers';

import AsyncStorage from '@react-native-community/async-storage';
import Storage from 'react-native-storage';
var storage = new Storage({size: 1000,storageBackend: AsyncStorage,defaultExpires: 1000 * 3600 * 24,enableCache: false});


type Props = {back:boolean,title:string,navigation:any,right:string,isAgent:Boolean}

 const HeaderPage = (props:Props) => {

   const dispatch = useDispatch()
 

  const userSwitchTo = (to:string) =>{
      
      
        dispatch(showLoader())
        dispatch(switchover({to:to}))
       
  }

  const switched = useSelector((state:RootState)=>state.agentregister_r._switch)

  useEffect(()=>{
        if(switched != undefined){
          dispatch(hideLoader());
          
          if(switched.status == true){
            console.log("switched",switched)
            if(switched.switch_to == 'user'){

              console.log("here")
              props.navigation.navigate('HomePage')
              storage.load({key:"userData"}).then((ret)=>{
                firestore()
                .collection('Users')
                .doc(ret.uuid)
                .delete()
                .then(() => {
                  console.log('User deleted!');
                });
              })
            }else{
              storage.load({key:"userData"}).then((ret)=>{
                ret.uuid = switched?.agent_data?.unique_agent_id
                storage.save({key:"userData",data:ret,expires:null});
              })
              console.log("there")
              props.navigation.navigate('AgentHome')
              
              
            }
            appConfig.functions.successMsg(switched.message);
            
            setTimeout(()=>{
              dispatch(_switchover(undefined));
            },3000)
          }else{
           
            if(switched.agent_data.is_banking_information_complete == 'Y'){
              appConfig.functions.showError(switched.message);
            }else{
              appConfig.functions.showError(switched.message);
              props.navigation.navigate('AddBankACPage')
            }
            
            setTimeout(()=>{
              dispatch(_switchover(undefined));
            },3000)
          }
        }
  },[switched])
  
    return (
        <>
<StatusBar barStyle="dark-content" />
<Header
  androidStatusBarColor="#fff"
  transparent
  iosBarStyle="dark-content"
  style={props.color=='blue'?[theme.primarybackground]:[theme.themeheader]}>
  <Left>
    {
      props.back == true
      && 
     
      <Icon
        name="chevron-small-left"
        type="Entypo"
        style={[theme.colorblack, common.fontxxxl]}
        onPress={()=>props.navigation.goBack()}
      />
    
    }
    {
      props.back == false
      && 
     
      <Icon
        name="menu"
        type="Entypo"
        style={[theme.colorblack, common.fontxxxl]}
        onPress={()=>props.navigation.toggleDrawer()}
      />
    
    }
    
  </Left>
  <Body />
  <Right>
    {
      props.right == "agent" && props.isAgent == true
      &&
      <TouchableOpacity onPress={()=>userSwitchTo('user')}>
      <View style={[common.flexbox, common.flexrow,theme.tabs]}>
                <View style={[common.flexone,common.center]}>
                <Text style={[common.fontxs,theme.colorblack,common.fontbold,theme.bluecolor]}>REQUEST</Text>
                </View>
                <View style={[common.flexone,theme.tabwidth,common.center]}>
                  <Text style={[common.fontxs,theme.colorblack,common.white,common.fontbold]}>AGENT</Text>
                </View>
              </View>
      </TouchableOpacity>
    }
    {
      props.right == "user" && props.isAgent == true
      &&
      <TouchableOpacity onPress={()=>userSwitchTo('agent')}>
      <View style={[common.flexbox, common.flexrow,theme.tabs]}>
                <View style={[common.flexone,theme.tabwidth,common.center]}>
                <Text style={[common.fontxs,theme.colorblack,common.fontbold,common.white]}>REQUEST</Text>
                </View>
                <View style={[common.flexone,common.center]}>
                  <Text style={[common.fontxs,theme.colorblack,common.fontbold,theme.bluecolor]}>AGENT</Text>
                </View>
              </View>
      </TouchableOpacity>
    }
          
          </Right>
</Header>
</>
    )}

    //@ts-ignore
export default withNavigation(HeaderPage)
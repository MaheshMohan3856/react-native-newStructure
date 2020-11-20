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
  Picker,
  Icon,
  ListItem,
} from 'native-base';

import {theme} from '../css/theme';
import {common} from '../css/common';
import HeaderPage from './shared/header';
import { RootStackParamList } from '../RouteConfig';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import AsyncStorage from '@react-native-community/async-storage';
import Storage from 'react-native-storage';
import { validateRSAA } from 'redux-api-middleware';
import { appConfig } from '../appConfig';
var storage = new Storage({size: 1000,storageBackend: AsyncStorage,defaultExpires: 1000 * 3600 * 24,enableCache: false});

type NotificationPageRouteProp = RouteProp<RootStackParamList, 'AgentBecome'>;

type NotificationPageNavigationProp = StackNavigationProp<
    RootStackParamList,
    'AgentBecome'
>;

type Props = {
    route: NotificationPageRouteProp;
    navigation: NotificationPageNavigationProp;
};


const AgentBecome = (props:Props) => {

  const [moneyAgent,setMoneyAgent] = useState(false)
  const [laundryAgent,setLaundryAgent] = useState(false)

  const validate = () =>{
    if(moneyAgent == false && laundryAgent == false){
      appConfig.functions.showError('You have to select atleast one service');
      return
    }else{
      props.navigation.push('AgentRegister',{moneyAgent:moneyAgent,laundryAgent:laundryAgent})
    }
    
  }
 
    return (
      <Container>
        <HeaderPage back={false} title="" right=""/>
        <ScrollView>
          <View style={[common.p20, common.mt20]}>
            <View style={[common.mb20, common.pb10]}>
              <Text
                style={[theme.fontregular, common.fontxxl, theme.colorblack, common.textcenter]}>
                Become an agent
              </Text>
              <Text
                style={[theme.fontregular, common.fontbody, theme.colorblack, common.textcenter]}>
                Select the services & create your agent account
              </Text>
            </View>
            <View>
             {
               moneyAgent == true
               &&
               <TouchableOpacity style={[common.mb15]} onPress={()=>setMoneyAgent(false)}>
            <View
                  style={[
                    common.flexbox,
                    common.flexrow,
                    theme.primarybackground,
                    common.border,
                    common.p5,
                    {alignItems:'center'}
                  ]}>
                 <View style={[{width: 100}]}>
              <Image
                source={require('../assets/images/check_a.png')}
                style={[common.m20, common.center,]}
              />
            </View>
                <View style={[common.pb20]}>
                  <View>
                    <Image
                      source={require('../assets/images/money.png')}
                    />
                  </View>
                 <View>
                 <Text style={[common.white, common.fontlg, common.fontbold, common.pt5]}>Money Services</Text>
                  <Text style={[common.white, common.fontsm, {width: 200}]}>Pickup & Delivery of laundry services from the laundry mart near by you</Text>
                </View>
                </View>
                </View>
              </TouchableOpacity>
             }
              {
               moneyAgent == false
               &&
            <TouchableOpacity style={[common.mb15]} onPress={()=>setMoneyAgent(true)}>
            <View
                  style={[
                    common.flexbox,
                    common.flexrow,
                    theme.primarybackground,
                    common.border,
                    common.p5,
                    {alignItems:'center'}
                  ]}>
                 <View style={[{width: 100}]}>
              <Image
                source={require('../assets/images/check.png')}
                style={[common.m20, common.center,]}
              />
            </View>
                <View style={[common.pb20]}>
                  <View>
                    <Image
                      source={require('../assets/images/money.png')}
                    />
                  </View>
                 <View>
                 <Text style={[common.white, common.fontlg, common.fontbold, common.pt5]}>Money Services</Text>
                  <Text style={[common.white, common.fontsm, {width: 200}]}>Pickup & Delivery of laundry services from the laundry mart near by you</Text>
                </View>
                </View>
                </View>
              </TouchableOpacity>
            }
            {
               laundryAgent == true
               &&
               <TouchableOpacity  style={[common.mb15]} onPress={()=>setLaundryAgent(false)}>
            <View
                  style={[
                    common.flexbox,
                    common.flexrow,
                    theme.primarybackground,
                    common.border,
                    common.p5,
                    {alignItems:'center'}
                  ]}>
                 <View style={[{width: 100}]}>
              <Image
                source={require('../assets/images/check_a.png')}
                style={[common.m20, common.center,]}
              />
            </View>
                <View style={[common.pb20]}>
                  <View>
                    <Image
                      source={require('../assets/images/laundry.png')}
                     
                    />
                  </View>
                 <View>
                 <Text style={[common.white, common.fontlg, common.fontbold,common.pt5]}>Laundry Services</Text>
                  <Text style={[common.white, common.fontsm, {width: 200}]}>Pickup & Delivery of laundry services from the laundry mart near by you</Text>
                </View>
                </View>
                </View>
              </TouchableOpacity>
            }
            {
              laundryAgent == false
              &&
              <TouchableOpacity  style={[common.mb15]} onPress={()=>setLaundryAgent(true)}>
            <View
                  style={[
                    common.flexbox,
                    common.flexrow,
                    theme.primarybackground,
                    common.border,
                    common.p5,

                    {alignItems:'center'}
                  ]}>
                 <View style={[{width: 100}]}>
              <Image
                source={require('../assets/images/check.png')}
                style={[common.m20, common.center,]}
              />
            </View>
                <View style={[common.pb20]}>
                  <View>
                    <Image
                      source={require('../assets/images/laundry.png')}
                     
                    />
                  </View>
                 <View>
                 <Text style={[common.white, common.fontlg, common.fontbold,common.pt5]}>Laundry Services</Text>
                  <Text style={[common.white, common.fontsm, {width: 200}]}>Pickup & Delivery of laundry services from the laundry mart near by you</Text>
                </View>
                </View>
                </View>
              </TouchableOpacity>
            }
              

                <View style={[common.mt20]}>
                <Button block light style={[theme.button_orange]} onPress={validate}>
                  <Text
                    style={[theme.textcapital, common.white, common.fontmd]}>
                    Continue
                  </Text>
                </Button>
              </View>
              
            </View>
          </View>
        </ScrollView>
      </Container>
    );
  }

export default AgentBecome
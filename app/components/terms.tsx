/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useState,useEffect} from 'react';
import {Platform,StatusBar, Image, TouchableOpacity, ScrollView,KeyboardAvoidingView} from 'react-native';
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
} from 'native-base';
import {WebView} from 'react-native-webview'
import {theme} from '../css/theme';
import {common} from '../css/common';
import {showLoader, hideLoader} from '../actions/common/commonActions';
import {appConfig} from '../appConfig';
import {getTerms} from '../actions/login/loginActions';
import HeaderPage from './shared/header';
import {useSelector,useDispatch} from 'react-redux';

import { RootStackParamList } from '../RouteConfig';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp, useLinkProps } from '@react-navigation/native';
import { RootState } from '../appReducers';

type NotificationPageRouteProp = RouteProp<RootStackParamList, 'Terms'>;

type NotificationPageNavigationProp = StackNavigationProp<
    RootStackParamList,
    'Terms'
>;

type Props = {
    route: NotificationPageRouteProp;
    navigation: NotificationPageNavigationProp;
};

const Terms = (props:Props) => {
  const dispatch = useDispatch();

  // useEffect(()=>{
  //    dispatch(showLoader())
  //    dispatch(getTerms())
  // },[])

  // const terms = useSelector((state:RootState)=>state.login_r._terms)

  // useEffect(()=>{
  //    if(terms != undefined){
  //      dispatch(hideLoader())
  //      if(terms.status == true){
  //        console.log(terms)
  //      }else{
  //        appConfig.functions.showError(terms.message)
  //      }
  //    }
  // },[terms])

  
  
    return (
      <Container>
        <HeaderPage title="" back={true} right="" />
        
       
        
          
          <WebView
                 
                 source={{uri:appConfig.apiBaseUrl + "terms_and_conditions" }}
                 style={{
                    display : "flex" ,
                    flex : 1 ,
                    minHeight : 150 
                  }}
               />
           
             
           
         
       
       
        
      </Container>
    );
  }

  export default Terms

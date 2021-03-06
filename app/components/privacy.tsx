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
import {forgotPass,_forgot} from '../actions/login/loginActions';
import HeaderPage from './shared/header';
import {useSelector,useDispatch} from 'react-redux';

import { RootStackParamList } from '../RouteConfig';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp, useLinkProps } from '@react-navigation/native';
import { RootState } from '../appReducers';

type NotificationPageRouteProp = RouteProp<RootStackParamList, 'Policy'>;

type NotificationPageNavigationProp = StackNavigationProp<
    RootStackParamList,
    'Policy'
>;

type Props = {
    route: NotificationPageRouteProp;
    navigation: NotificationPageNavigationProp;
};

const Policy = (props:Props) => {
  const dispatch = useDispatch();

  

  

  
  
    return (
      <Container>
        <HeaderPage title="" back={true} right=""/>
        
       
        
        <WebView
                 
                 source={{uri:appConfig.apiBaseUrl + "privacy" }}
                 style={{
                    display : "flex" ,
                    flex : 1 ,
                    minHeight : 150 
                  }}
               />
           
       
        
      </Container>
    );
  }

  export default Policy

/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {Component} from 'react';
import {StatusBar, Image, TouchableOpacity,Animated} from 'react-native';
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
} from 'native-base';

import {theme} from '../css/theme';
import {common} from '../css/common';
import { ScrollView } from 'react-native-gesture-handler';

import { RootStackParamList } from '../RouteConfig';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';

type NotificationPageRouteProp = RouteProp<RootStackParamList, 'LandingPage'>;

type NotificationPageNavigationProp = StackNavigationProp<
    RootStackParamList,
    'LandingPage'
>;

type Props = {
    route: NotificationPageRouteProp;
    navigation: NotificationPageNavigationProp;
};

const LandingPage = (props:Props) => {
 
    return (
      <Container>
        <StatusBar barStyle="dark-content" />
        <Header
          androidStatusBarColor="#fff"
          iosBarStyle="dark-content"
          style={[theme.themeheader, {height: 0}]}></Header>
        <ScrollView>
        <View style={(common.pt10, common.mt10)}>
          <Image
            source={require('../assets/images/landing.png')}
            style={[
              common.mt10,
              common.center,
              {width: 251, height: 194, marginTop: '5%'},
            ]}
          />
        </View>
        <View style={[common.p15]}>
          <Text
            style={[
              common.textcenter,
              theme.fontregular,
              common.fontxxl,
              
            ]}>
            Let's get started
          </Text>
          <Text style={[common.center, theme.colorblack]}>
            One line description about the WUW
          </Text>
        </View>
        <View style={[common.pt10, common.pb10]}>
          <Image
            source={require('../assets/images/logo.png')}
            style={[common.mt20, common.center, common.mb20]}
          />
        </View>
        <View style={[theme.section_orange]}>
          <Button block light style={[theme.button_white]} onPress={()=>props.navigation.push('CreateAccount')}>
            <Text style={[theme.textcapital, theme.themecolor, common.fontmd]}>
              Create your account
            </Text>
          </Button>
          <Text
            style={[common.textcenter, common.white, common.pt15, common.pb15]}>
            Already have an account?
          </Text>
          <Button block bordered light style={[theme.button_border]} onPress={()=>props.navigation.push('LoginPage')}>
            <Text style={[theme.textcapital, common.white, common.fontmd]}>
              Sign In
            </Text>
          </Button>
          <View style={{height:10}}>

          </View>
        </View>
        </ScrollView>
      </Container>
    );
 
}
export default LandingPage
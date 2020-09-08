/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {Component} from 'react';
import {StatusBar, Image, TouchableOpacity, ScrollView,ImageBackground} from 'react-native';
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
  Thumbnail,
  Right,
  List,
  Switch,
  
  
} from 'native-base';

import {theme} from '../css/theme';
import {common} from '../css/common';
import CheckBox from 'react-native-check-box';
import { RootStackParamList } from '../RouteConfig';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';

type NotificationPageRouteProp = RouteProp<RootStackParamList, 'AgentDrawer'>;

type NotificationPageNavigationProp = StackNavigationProp<
    RootStackParamList,
    'AgentDrawer'
>;

type Props = {
    route: NotificationPageRouteProp;
    navigation: NotificationPageNavigationProp;
};

const AgentDrawer = () => {
 
    return (
      <Container>

        <View style={[common.flexbox,common.flexcolumn,{width:'80%'}]}>
          <View style={[theme.bgorange,common.pt20,]}>
          <ListItem avatar style={[common.pt20,common.pb20,common.mt20,common.mb20]}>
            <Left>
              <Thumbnail
                source={require('../assets/images/thumbuser.png')}
                style={{width: 75, height: 75, borderRadius: 40}}
              />
            </Left>
            <Body style={[common.bordernone]}>
            <Text style={[common.white, common.fontbody]}>Joseph Gonzalez</Text>
            <Text style={[common.white, common.fontsm]}>+1 644-867-6107</Text>
            </Body>
          </ListItem>
          <View  style={[common.pl20,common.pb20,]}>
            <Text style={[common.white, common.fontlg,theme.fontbold]}>$98.00</Text>
            <Text style={[common.white, common.fontsm]}>THIS WEEK</Text>
          </View>
          </View>
         
          <View style={[theme.lightblack,common.pt20,{height:'100%'}]}>
            <List>
              <ListItem style={[common.bordernone]}>
                <Text style={[common.fontmd,common.white,common.w100]}>Notifications</Text>
                <Right>
              <Switch value={true}  trackColor={{true: '#F16436', false: 'grey',}} />
            </Right>
              </ListItem>
              <ListItem style={[common.bordernone]}>
                <Text style={[common.fontmd,common.white]}>Home</Text>
              </ListItem>
              <ListItem style={[common.bordernone]}>
                <Text style={[common.fontmd,common.white]}>History</Text>
              </ListItem>
              <ListItem style={[common.bordernone]}>
                <Text style={[common.fontmd,common.white]}>Payments</Text>
              </ListItem>
              <ListItem style={[common.bordernone]}>
                <Text style={[common.fontmd,common.white]}>Settings</Text>
              </ListItem>
            </List>
          </View>
        </View>
        <View>
       


        </View>


      </Container>
    );

}

export default AgentDrawer
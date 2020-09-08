/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {Component} from 'react';
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
  Icon,
  ListItem,
  Right,
} from 'native-base';

import {theme} from '../css/theme';
import {common} from '../css/common';

export default class Deliverylocation extends Component {
  render() {
    return (
      <Container>
        <StatusBar barStyle="dark-content" />
        <Header
          androidStatusBarColor="#fff"
          iosBarStyle="dark-content"
          style={[theme.themeheader]}>
          <Left>
            <Button transparent>
              <Icon
                name="close"
                type="AntDesign"
                style={[theme.colorblack, common.fontxxl]}
              />
            </Button>
          </Left>
          <Body />
        </Header>
        <ScrollView>
          <View style={[common.p20, common.mt20]}>
            <Text style={[common.textupercase]}>Deliver to</Text>
            <Text style={[common.fontlg]}>600 Alexander Rd, NJ 58550</Text>
          </View>

          <View>
            <Image
              source={require('../assets/images/map.png')}
              style={{width: '100%'}}></Image>
          </View>
          <View style={[theme.footermap]}>
            <Button
              rounded
              danger
              style={[
                theme.bgblue,
                {height: 60},
                common.pr20,
                common.pl20,
                common.center,
                {minWidth: 250},
              ]}>
              <Text
                style={[
                  common.fontlg,
                  theme.textcapital,
                  common.pl20,
                  common.pr20,
                ]}>
                Done
              </Text>
            </Button>
          </View>
        </ScrollView>
      </Container>
    );
  }
}

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
  Thumbnail,
} from 'native-base';

import {theme} from '../css/theme';
import {common} from '../css/common';

export default class PaymentCards extends Component {
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
                name="menu"
                type="MaterialIcons"
                style={[theme.colorblack, common.fontxxl]}
              />
            </Button>
          </Left>
          <Body />
        </Header>
        <View style={[common.pl20, common.mt15, common.pb10]}>
          <Text style={[common.fontxxl]}>Payment Method</Text>
          <Text>Set your payment method to pay your requests</Text>
        </View>
        <View style={[theme.cardwp]}>
          <ListItem icon>
            <Left>
              <Button transparent>
                <Icon
                  active
                  name="credit-card"
                  type="Entypo"
                  style={[theme.colorblack, common.fontxxl]}
                />
              </Button>
            </Left>
            <Body style={[common.bordernone]}>
              <Text>XXXXXXX2354</Text>
              <Text note>Credit Card</Text>
            </Body>
          </ListItem>
          <View style={[common.p10]}>
            <Text style={[common.textright, theme.colorred]}>REMOVE</Text>
          </View>
        </View>
        <View style={[common.center]}>
          <Button
            bordered
            rounded
            style={[theme.borderred, common.pl20, common.pr20]}>
            <Text style={[theme.textcapital, theme.colorred]}>
              Add New Payment Method
            </Text>
          </Button>
        </View>
      </Container>
    );
  }
}

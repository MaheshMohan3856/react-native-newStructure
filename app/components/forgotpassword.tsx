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
  Picker,
  Icon,
} from 'native-base';

import {theme} from '../css/theme';
import {common} from '../css/common';

export default class ForgotPassword extends Component {
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
                name="chevron-small-left"
                type="Entypo"
                style={[theme.colorblack, common.fontxxxl]}
              />
            </Button>
          </Left>
          <Body />
        </Header>
        <ScrollView>
          <View style={[common.p20]}>
            <View style={[common.mb20]}>
              <Text
                style={[theme.fontregular, common.fontxxl, theme.colorblack]}>
                Forgot Password?
              </Text>
              <Text
                style={[theme.fontregular, common.fontbody, theme.colorblack]}>
                Enter the email address associated with this account.
              </Text>
            </View>
            <View>
              <Form>
                <Item
                  floatingLabel
                  style={[common.ml0, common.pt10, common.mb20]}>
                  <Label>Enter your email address</Label>
                  <Input />
                </Item>
                
                <View style={[common.mt20]}>
                  <Button block light style={[theme.button_orange]}>
                    <Text
                      style={[theme.textcapital, common.white, common.fontmd]}>
                      Done
                    </Text>
                  </Button>
                </View>
              </Form>
            </View>
          </View>
        </ScrollView>
      </Container>
    );
  }
}

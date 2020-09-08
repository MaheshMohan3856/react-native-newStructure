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

export default class VerifyPhone extends Component {
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
                Verify Phone Number
              </Text>
              <Text
                style={[theme.fontregular, common.fontbody, theme.colorblack]}>
                Please enter the verification code sent to
              </Text>
              <Text style={[theme.fontbold]}>+1 644-867-6107 </Text>
              <TouchableOpacity>
                <Text style={[common.pt10, theme.themecolor]}>
                  Change Phone Number?
                </Text>
              </TouchableOpacity>
            </View>
            <View style={(common.pt20, common.mt20)}>
              <Image
                source={require('../assets/images/otp.png')}
                style={[common.mt20, common.center, {width: 214, height: 177}]}
              />
            </View>
            <View>
              <Form>
                <View
                  style={[
                    common.flexbox,
                    common.flexrow,
                    common.pt20,
                    common.p15,
                  ]}>
                  <View style={[common.flexone, common.pl5, common.pr5]}>
                    <Item>
                      <Input placeholder="0" style={[common.textcenter]} />
                    </Item>
                  </View>
                  <View style={[common.flexone, common.pl5, common.pr5]}>
                    <Item>
                      <Input placeholder="0" style={[common.textcenter]} />
                    </Item>
                  </View>
                  <View style={[common.flexone, common.pl5, common.pr5]}>
                    <Item>
                      <Input placeholder="0" style={[common.textcenter]} />
                    </Item>
                  </View>
                  <View style={[common.flexone, common.pl5, common.pr5]}>
                    <Item>
                      <Input placeholder="0" style={[common.textcenter]} />
                    </Item>
                  </View>
                </View>

                <View style={[common.mt20]}>
                  <TouchableOpacity>
                    <Text
                      style={[
                        common.pt10,
                        theme.themecolor,
                        common.textcenter,
                      ]}>
                      Resend Code?
                    </Text>
                  </TouchableOpacity>
                </View>
              </Form>
            </View>
          </View>
        </ScrollView>
      </Container>
    );
  }
}

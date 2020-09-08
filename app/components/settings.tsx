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

export default class Settings extends Component {
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
          <Text style={[common.fontxxl]}>Settings</Text>
        </View>
        <View style={[common.flexbox, common.flexcolumn, common.flexone]}>
          <View style={[common.flexone]}>
            <View style={[theme.borderbottomgray, common.mb15]}>
              <ListItem avatar style={[common.pb15]}>
                <Left>
                  <Thumbnail
                    source={require('../assets/images/thumbuser.png')}
                  />
                </Left>
                <Body style={[common.bordernone]}>
                  <Text>Joseph Gonzalez</Text>
                  <Text note>+1 644-867-6107</Text>
                </Body>
              </ListItem>
            </View>

            <View>
              <TouchableOpacity style={[common.p20]}>
                <Text>Change Password</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[common.p20]}>
                <Text>Privacy</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[common.p20]}>
                <Text>Sign Out</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[common.p20]}>
                <Text>Sign Out</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View>
            <TouchableOpacity style={[common.p20, common.mb20]}>
              <Text style={[theme.colorred]}>Delete your account</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Container>
    );
  }
}

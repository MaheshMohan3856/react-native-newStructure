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
  List,
  Thumbnail,
} from 'native-base';

import {theme} from '../css/theme';
import {common} from '../css/common';
import Timeline from 'react-native-timeline-flatlist';

export default class RatingPage extends Component {
  constructor() {
    super();
    this.data = [
      {title: 'Request Accepted  8:30 am'},
      {title: 'Started 8:31 am'},
      {title: 'Reached on your location'},
    ];
  }
  render() {
    return (
      <Container style={[theme.bgblue]}>
        <StatusBar barStyle="dark-content" />
        <Header
          androidStatusBarColor="#00AFEF"
          iosBarStyle="dark-content"
          style={[theme.bgblue]}>
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
          <Right>
            <Button transparent onPress={this.toggleModal}>
              <Icon
                name="closecircleo"
                type="AntDesign"
                style={[theme.colorblack, common.fontlg]}
              />
            </Button>
          </Right>
        </Header>
        <ScrollView style={[theme.bgblue]}>
          <View style={common.p20}>
            <View style={[common.center]}>
              <Image
                source={require('../assets/images/tick-success.png')}></Image>
            </View>
            <Text style={[common.white, common.fontxxl, common.textcenter]}>
              Thank You
            </Text>
            <Text style={[common.white, common.textcenter]}>
              You successfully complete the payment
            </Text>
            <Text style={[common.white, common.textcenter]}>
              Transaction ID 252QWERTY
            </Text>
          </View>

          <View style={[theme.card]}>
            <View style={(common.pt20, common.mt20)}>
              <ListItem avatar>
                <Left>
                  <Thumbnail
                    source={require('../assets/images/thumbuser.png')}
                    style={{width: 80, height: 80, borderRadius: 40}}
                  />
                </Left>
                <Body style={[common.bordernone]}>
                  <Text style={[common.fontlg, theme.fontbold]}>
                    James Johnson
                  </Text>
                  <Text note>West Windsor</Text>
                  <View style={[common.flexbox, common.flexrow]}>
                    <View style={[common.flexone]}>
                      <Text style={[theme.colorblack]}>
                        <Icon
                          name="star"
                          type="FontAwesome"
                          style={[
                            theme.coloryellow,
                            common.fontxl,
                          ]}></Icon>{' '}
                        4.8
                      </Text>
                    </View>
                    <View style={[common.pl15, common.pr15]}>
                      <Button rounded bordered small danger >
                        <Text style={[theme.textcapital]}>Report</Text>
                      </Button>
                    </View>
                  </View>
                </Body>
              </ListItem>
            </View>

            <View style={[theme.bggray, common.mt15, common.pt10, common.pb10]}>
              <ListItem style={[common.bordernone]}>
                <Body style={[common.bordernone]}>
                  <Text style={[common.fontmd, theme.fontbold]}>
                    Ford Fusion - Blue
                  </Text>
                  <Text note>EBF9211 -</Text>
                </Body>
                <Right>
                  <Button rounded light style={[theme.btncall]}>
                    <Icon
                      name="call"
                      type="MaterialIcons"
                      style={[common.white]}></Icon>
                  </Button>
                </Right>
              </ListItem>
            </View>

            <View style={[common.mt15, common.pt10, common.pb10]}>
              <View style={[common.pl20]}>
                <Text
                  note
                  style={[common.fontmd, theme.fontbold, common.textcenter]}>
                  RATE YOUR AGENT
                </Text>
                <View style={[common.flexbox, common.flexrow, common.center]}>
                  <TouchableOpacity style={[common.pt10, common.m5]}>
                    <Icon
                      name="star"
                      type="FontAwesome"
                      style={[theme.stargray, common.fontxxxl]}></Icon>
                  </TouchableOpacity>
                  <TouchableOpacity style={[common.pt10, common.m5]}>
                    <Icon
                      name="star"
                      type="FontAwesome"
                      style={[theme.stargray, common.fontxxxl]}></Icon>
                  </TouchableOpacity>
                  <TouchableOpacity style={[common.pt10, common.m5]}>
                    <Icon
                      name="star"
                      type="FontAwesome"
                      style={[theme.stargray, common.fontxxxl]}></Icon>
                  </TouchableOpacity>
                  <TouchableOpacity style={[common.pt10, common.m5]}>
                    <Icon
                      name="star"
                      type="FontAwesome"
                      style={[theme.stargray, common.fontxxxl]}></Icon>
                  </TouchableOpacity>
                  <TouchableOpacity style={[common.pt10, common.m5]}>
                    <Icon
                      name="star"
                      type="FontAwesome"
                      style={[theme.stargray, common.fontxxxl]}></Icon>
                  </TouchableOpacity>
                </View>
              </View>
              <View style={[common.p15, {height: 140}]}>
                <View
                  style={[
                    common.flexone,
                    common.m5,
                    common.center,
                    common.mb20,
                  ]}>
                  <Button
                    rounded
                    danger
                    style={[
                      theme.bgblue,
                      {height: 60},
                      common.pr20,
                      common.pl20,
                    ]}
                    onPress={this.toggleModal}>
                    <Text
                      style={[
                        common.fontlg,
                        theme.textcapital,
                        common.pl20,
                        common.pr20,
                      ]}>
                      Submit
                    </Text>
                  </Button>
                </View>
              </View>
            </View>
          </View>
        </ScrollView>
      </Container>
    );
  }
}

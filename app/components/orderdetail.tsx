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

export default class OtderDetail extends Component {
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
            <Text style={[common.white, common.fontlg]}>#12356</Text>
            <Text style={[common.white]}>Please see the request details</Text>
          </View>

          <View style={[theme.card]}>
            <View style={[theme.borderbottomgray, common.pb15]}>
              <Text
                style={[
                  common.textcenter,
                  theme.fontbold,
                  common.mt20,
                  theme.colorblack,
                ]}>
                AMOUNT YOU REQUESTED
              </Text>
              <Text
                style={[
                  common.fontxxxl,
                  theme.fontbold,
                  common.textcenter,
                  theme.colorblack,
                ]}>
                $400
              </Text>
              <View
                style={[
                  common.flexbox,
                  common.flexrow,
                  common.pl10,
                  common.pr10,
                ]}>
                <View style={[common.flexone, common.pr10]}>
                  <Text style={[common.textright, common.fontsm]}>
                    Service Charge
                  </Text>
                </View>
                <View style={[common.flexone]}>
                  <Text style={[common.fontbody, theme.fontbold]}>$2.50</Text>
                </View>
              </View>
              <View
                style={[
                  common.flexbox,
                  common.flexrow,
                  common.pl10,
                  common.pr10,
                ]}>
                <View style={[common.flexone, common.pr10]}>
                  <Text style={[common.textright, common.fontsm]}>
                    Delivery Charges
                  </Text>
                </View>
                <View style={[common.flexone]}>
                  <Text style={[common.fontbody, theme.fontbold]}>$5.50</Text>
                </View>
              </View>
              <View
                style={[
                  common.flexbox,
                  common.flexrow,
                  common.pl10,
                  common.pr10,
                ]}>
                <View style={[common.flexone, common.pr10]}>
                  <Text style={[common.textright, common.fontsm]}>
                    Transaction Charge
                  </Text>
                </View>
                <View style={[common.flexone]}>
                  <Text style={[common.fontbody, theme.fontbold]}>$4.50</Text>
                </View>
              </View>
            </View>
            <View
              style={[
                common.flexbox,
                common.flexrow,
                common.pl10,
                common.p10,
                common.pb0,
              ]}>
              <View style={[common.flexone, common.pr10]}>
                <Text
                  style={[common.textright, common.fontbody, theme.fontbold]}>
                  Total Amount Payable
                </Text>
              </View>
              <View style={[common.flexone]}>
                <Text style={[common.fontlg, theme.fontbold]}>$4.50</Text>
              </View>
            </View>
            <View
              style={[
                common.flexbox,
                common.flexrow,
                common.pl10,
                common.pr10,
                theme.borderbottomgray,
                common.aligncenter,
                common.pb20,
              ]}>
              <View style={[common.flexone, common.pr10]}>
                <Text style={[common.textright, common.fontsm]}>
                  <Icon
                    name="credit-card"
                    type="Entypo"
                    style={[common.fontmd, common.pr10]}>
                    {'  '}
                  </Icon>
                  Credit Card
                </Text>
              </View>
              <View
                style={[
                  common.flexone,
                  common.flexbox,
                  common.flexrow,
                  common.aligncenter,
                ]}>
                <Text style={[common.fontbody]}>XXXX2354</Text>
              </View>
            </View>
            <View style={[theme.footercard]}>
              <View style={[common.flexbox, common.flexrow, common.center]}>
                <Text style={[theme.otpbox, theme.fontbold]}>OTP 145</Text>
                <Text>
                  <Icon
                    style={[theme.colororange]}
                    name="info-with-circle"
                    type="Entypo"></Icon>
                </Text>
              </View>
              <View
                style={[common.flexone, common.m5, common.center, common.mb20]}>
                <Button
                  rounded
                  danger
                  style={[theme.bgblue, {height: 60}, common.pr20, common.pl20]}
                  onPress={this.toggleModal}>
                  <Text style={[common.fontlg, theme.textcapital]}>
                    Pay{' '}
                    <Text style={[common.white, theme.fontbold, common.fontlg]}>
                      $412.00
                    </Text>
                  </Text>
                </Button>
              </View>
            </View>
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
                  <Text style={[theme.colorblack]}>
                    <Icon
                      name="star"
                      type="FontAwesome"
                      style={[theme.coloryellow, common.fontxl]}></Icon>{' '}
                    4.8
                  </Text>
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
                <Text note style={[common.fontmd, theme.fontbold]}>
                  TRACKING
                </Text>
              </View>
              <View style={[common.p15, {height: 140}]}>
                <Timeline
                  data={this.data}
                  showTime={false}
                  circleColor={'#00AFEF'}
                  lineColor={'#00AFEF'}
                  titleStyle={{marginTop: -10, paddingBottom: 10}}
                />
              </View>
            </View>

            <View style={[theme.footercard]}>
              <View
                style={[
                  common.flexbox,
                  common.flexrow,
                  common.p20,
                  common.pb5,
                ]}>
                <View style={[common.pr5]}>
                  <Icon
                    name="circle-o"
                    type="FontAwesome"
                    style={[
                      common.fontsm,
                      common.mt5,
                      theme.bluecolor,
                      theme.fontbold,
                    ]}></Icon>
                </View>
                <View style={[common.flexone]}>
                  <Text
                    style={[
                      common.textupercase,
                      common.fontbody,
                      theme.fontbold,
                      theme.colorgray,
                    ]}>
                    Time Duration
                  </Text>
                  <View style={[common.flexbox, common.flexrow]}>
                    <View style={[common.flexone]}>
                      <Text note>
                        <Text>1:00 </Text> Hour
                      </Text>
                    </View>
                    <View>
                      <Text style={[common.fontsm]}>Request posted 8:29</Text>
                    </View>
                  </View>
                </View>
              </View>
              <View
                style={[
                  common.flexbox,
                  common.flexrow,
                  common.p20,
                  common.pt10,
                ]}>
                <View style={[common.pr5]}>
                  <Icon
                    name="circle-o"
                    type="FontAwesome"
                    style={[
                      common.fontsm,
                      common.mt5,
                      theme.bluecolor,
                      theme.fontbold,
                    ]}></Icon>
                </View>
                <View>
                  <Text
                    style={[
                      common.textupercase,
                      common.fontbody,
                      theme.fontbold,
                      theme.colorgray,
                    ]}>
                    Deliver to
                  </Text>
                  <Text>600 Alexander Rd, NJ 58550</Text>
                </View>
              </View>
            </View>
          </View>
        </ScrollView>
      </Container>
    );
  }
}

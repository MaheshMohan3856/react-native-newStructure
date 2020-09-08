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
  Radio,
} from 'native-base';

import {theme} from '../css/theme';
import {common} from '../css/common';
import Modal from 'react-native-modal';
import RadioGroup from 'react-native-radio-button-group';

export default class ConfirmMoney extends Component {
  state = {
    isModalVisible: false,
  };

  toggleModal = () => {
    this.setState({isModalVisible: !this.state.isModalVisible});
  };

  constructor(props) {
    super(props);
    this.state = {
      selectedOption: null,
    };
  }

  render() {
    return (
      <Container>
        <StatusBar barStyle="dark-content" />
        <Header
          androidStatusBarColor="#00AFEF"
          iosBarStyle="dark-content"
          style={[theme.bgblue]}>
          <Left>
            <Button transparent>
              <Icon
                name="close"
                type="AntDesign"
                style={[theme.colorblack, common.fontxl]}
              />
            </Button>
          </Left>
          <Body />
        </Header>
        <ScrollView style={[theme.bgblue]}>
          <View style={common.p20}>
            <Text style={[common.white, common.fontlg]}>
              Confirm your request
            </Text>
            <Text style={[common.white]}>
              Please confirm your request details
            </Text>
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
                <Button rounded small style={[theme.btn_small]}>
                  <Text style={[theme.textcapital]}>change</Text>
                </Button>
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
                <View>
                  <Text
                    style={[
                      common.textupercase,
                      common.fontbody,
                      theme.fontbold,
                      theme.colorgray,
                    ]}>
                    Time Duration
                  </Text>
                  <Text note>
                    <Text>1:00 </Text> Hour
                  </Text>
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
          <View style={[common.p15, common.center]}>
            <Button
              iconLeft
              light
              style={[theme.button_rounded, common.pr20, common.pl20]}
              onPress={this.toggleModal}>
              <Text style={[theme.textcapital, theme.bluecolor, common.fontmd]}>
                Confirm Request
              </Text>
            </Button>
          </View>

          <Modal
            isVisible={this.state.isModalVisible}
            style={{justifyContent: 'flex-end', margin: 0}}>
            <View style={[theme.boxmodelbottom]}>
              <Text
                style={[
                  common.textcenter,
                  common.fontlg,
                  theme.fontbold,
                  common.pb20,
                ]}>
                SELECT PAYMENT
              </Text>
              <View>
                <RadioGroup
                  options={labelViewOptions}
                  onChange={(option) => this.setState({selectedOption: option})}
                  activeButtonId={0}
                  circleStyle={{
                    width: 20,
                    height: 20,
                    fillColor: '#00AFEF',
                    borderColor: '#DCDCDC',
                    borderWidth: 1.5,
                    marginBottom: 20,
                  }}
                />
              </View>
              <View style={[common.flexbox, common.flexrow, common.mt20]}>
                <View style={[common.flexone, common.m5]}>
                  <Button
                    rounded
                    block
                    bordered
                    danger
                    style={{height: 60}}
                    onPress={this.toggleModal}>
                    <Text>Cancel</Text>
                  </Button>
                </View>
                <View style={[common.flexone, common.m5]}>
                  <Button
                    rounded
                    block
                    danger
                    style={[theme.bgblue, {height: 60}]}
                    onPress={this.toggleModal}>
                    <Text>Don't Cancel</Text>
                  </Button>
                </View>
              </View>
            </View>
          </Modal>
        </ScrollView>
      </Container>
    );
  }
}

const labelViewOptions = [
  {
    id: 1,
    labelView: (
      <View
        style={[
          common.flexbox,
          common.flexrow,
          theme.borderbottomgray,
          common.pb15,
        ]}>
        <View style={[common.flexone]}>
          <Text>Credit Card</Text>
        </View>
        <View style={[common.flexone]}>
          <Text>XXX2345</Text>
        </View>
      </View>
    ),
  },
  {
    id: 2,
    labelView: (
      <View
        style={[
          common.flexbox,
          common.flexrow,
          common.pb15,
        ]}>
        <View style={[common.flexone]}>
          <Text>Credit Card</Text>
        </View>
        <View style={[common.flexone]}>
          <Text>XXX2356</Text>
        </View>
      </View>
    ),
  },
];

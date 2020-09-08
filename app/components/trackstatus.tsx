/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {Component} from 'react';
import {
  StatusBar,
  Image,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from 'react-native';
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
import Timeline from 'react-native-timeline-flatlist';
import Modal from 'react-native-modal';

export default class TrackStatus extends Component {
  constructor() {
    super();
    this.data = [
      {title: 'Request Accepted  8:30 am'},
      {title: 'Started 8:31 am'},
      {title: 'Reached on your location'},
    ];
  }
  state = {
    isModalVisible: false,
  };

  toggleModal = () => {
    this.setState({isModalVisible: !this.state.isModalVisible});
  };
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
          <Right>
            <Button transparent onPress={this.toggleModal}>
              <Icon
                name="closecircleo"
                type="AntDesign"
                style={[theme.colorred, common.fontlg]}
              />
            </Button>
          </Right>
        </Header>

        <View style={(common.pt20, common.mt20)}>
          <ListItem avatar>
            <Left>
              <Thumbnail
                source={require('../assets/images/thumbuser.png')}
                style={{width: 80, height: 80, borderRadius: 40}}
              />
            </Left>
            <Body style={[common.bordernone]}>
              <Text style={[common.fontlg, theme.fontbold]}>James Johnson</Text>
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

        <View style={[theme.section_blue]}>
          <View style={[common.flexbox, common.flexrow, common.p20]}>
            <View style={[common.flexone, common.pl10, common.pr10]}>
              <Text style={[common.fontxl, theme.fontbold, common.white]}>
                $ 400
              </Text>
              <Text style={[common.white]}>AMOUNT REQUESTED</Text>
            </View>
            <View style={[common.flexone, common.pl10, common.pr10]}>
              <Text style={[common.fontxl, theme.fontbold, common.white]}>
                11:30 <Text style={[common.fontmd, common.white]}>AM</Text>
              </Text>
              <Text style={[common.white]}>REQUESTED Time</Text>
            </View>
          </View>
          <View
            style={[
              common.flexrow,
              common.flexbox,
              theme.payablebox,
              common.aligncenter,
            ]}>
            <View style={[common.flexone, common.pl10]}>
              <Text style={[common.white]}>Total Amount Payable :</Text>
            </View>
            <View style={[common.pr10]}>
              <Text style={[common.fontxl, theme.fontbold, common.white]}>
                $412.5
              </Text>
            </View>
          </View>
          <View style={[common.p15, common.pb10]}>
            <ListItem icon>
              <Left>
                <Button transparent>
                  <Icon
                    style={[common.white, common.fontxxl]}
                    name="location-pin"
                    type="Entypo"
                  />
                </Button>
              </Left>
              <Body style={[common.bordernone]}>
                <Text
                  style={[
                    common.white,
                    common.textupercase,
                    common.fontsm,
                    {opacity: 0.7},
                  ]}>
                  Deliver to
                </Text>
                <Text style={[common.white, common.fontbody]}>
                  600 Alexander Rd, NJ 58550
                </Text>
              </Body>
              <Right style={[common.bordernone]}>
                <Icon
                  style={[common.fontxl, common.white, {opacity: 0.3}]}
                  name="keyboard-arrow-right"
                  type="MaterialIcons"
                />
              </Right>
            </ListItem>
          </View>

          <Modal isVisible={this.state.isModalVisible}>
            <View style={[common.flexbox]}>
              <View style={[theme.boxmodel]}>
                <Text
                  style={[
                    common.textcenter,
                    common.fontxl,
                    theme.fontbold,
                    common.pb10,
                  ]}>
                  Sure you want to cancel?
                </Text>
                <Text style={[common.textcenter]}>
                  You will be charged an additional{' '}
                  <Text style={[common.fontlg, theme.fontbold]}>$3.5</Text>{' '}
                  cancellation fee
                </Text>
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
            </View>
          </Modal>
        </View>
      </Container>
    );
  }
}

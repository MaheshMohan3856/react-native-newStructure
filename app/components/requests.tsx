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
  Tabs,
  Tab,
  TabHeading,
} from 'native-base';

import {theme} from '../css/theme';
import {common} from '../css/common';

export default class Requests extends Component {
  render() {
    return (
      <Container>
        <StatusBar barStyle="dark-content" />
        <Header
          androidStatusBarColor="#fff"
          iosBarStyle="dark-content"
          style={[theme.themeheader]}
          hasTabs>
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
          <Text style={[common.fontxxl]}>Your Requests</Text>
        </View>
        <Tabs tabBarUnderlineStyle={[theme.bgblue]}>
          <Tab
            heading={
              <TabHeading style={[common.bgwhite]}>
                <Text style={[theme.colorblack]}>MONEY</Text>
              </TabHeading>
            }>
            <ScrollView style={[theme.bggray]}>
              <View style={[theme.listCard]}>
                <View style={[common.flexbox, common.flexrow, common.p10, common.pb0]}>
                  <View style={[common.flexone]}>
                    <Text style={[common.fontxl, theme.fontbold]}>$ 400</Text>
                    <Text note style={[theme.bluecolor]}>Paid $412.5</Text>
                  </View>
                  <View>
                    <Text note>July 22 8:30 AM</Text>
                    <Text style={[theme.colorgreen]}>Success</Text>
                  </View>
                </View>
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
                  </Body>
                </ListItem>
              </View>
              <View style={[theme.listCard]}>
                <View style={[common.flexbox, common.flexrow, common.p10, common.pb0]}>
                  <View style={[common.flexone]}>
                    <Text style={[common.fontxl, theme.fontbold]}>$ 400</Text>
                    <Text note style={[theme.bluecolor]}>Paid $412.5</Text>
                  </View>
                  <View>
                    <Text note>July 22 8:30 AM</Text>
                    <Text style={[theme.colorgreen]}>Success</Text>
                  </View>
                </View>
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
                  </Body>
                </ListItem>
              </View>
              <View style={[theme.listCard]}>
                <View style={[common.flexbox, common.flexrow, common.p10, common.pb0]}>
                  <View style={[common.flexone]}>
                    <Text style={[common.fontxl, theme.fontbold]}>$ 400</Text>
                    <Text note style={[theme.bluecolor]}>Paid $412.5</Text>
                  </View>
                  <View>
                    <Text note>July 22 8:30 AM</Text>
                    <Text style={[theme.colorgreen]}>Success</Text>
                  </View>
                </View>
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
                  </Body>
                </ListItem>
              </View>
              <View style={[theme.listCard]}>
                <View style={[common.flexbox, common.flexrow, common.p10, common.pb0]}>
                  <View style={[common.flexone]}>
                    <Text style={[common.fontxl, theme.fontbold]}>$ 400</Text>
                    <Text note style={[theme.bluecolor]}>Paid $412.5</Text>
                  </View>
                  <View>
                    <Text note>July 22 8:30 AM</Text>
                    <Text style={[theme.colorgreen]}>Success</Text>
                  </View>
                </View>
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
                  </Body>
                </ListItem>
              </View>
            </ScrollView>
          </Tab>
          <Tab
            heading={
              <TabHeading style={[common.bgwhite]}>
                <Text style={[theme.colorblack]}>LAUNDRY</Text>
              </TabHeading>
            }>
            <Text>hhshui</Text>
          </Tab>
        </Tabs>
      </Container>
    );
  }
}

{
  /* <Tabs tabBarUnderlineStyle={[theme.bgblue]}>
            <Tab
              heading={
                <TabHeading style={[common.bgwhite]}>
                  <Text style={[theme.colorblack]}>MONEY</Text>
                </TabHeading>
              }>
              <ScrollView style={[theme.bggray]}>
                <View style={[theme.listCard]}>
                  <View style={[common.flexbox, common.flexrow]}>
                    <View>
                      <Text>$ 400</Text>
                      <Text>Paid $412.5</Text>
                    </View>
                    <View>
                      <Text>July 22 8:30 AM</Text>
                      <Text>Success</Text>
                    </View>
                  </View>
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
                          style={[
                            theme.coloryellow,
                            common.fontxl,
                          ]}></Icon>{' '}
                        4.8
                      </Text>
                    </Body>
                  </ListItem>
                </View>
              </ScrollView>
            </Tab>
            <Tab
              heading={
                <TabHeading style={[common.bgwhite]}>
                  <Text style={[theme.colorblack]}>LAUNDRY</Text>
                </TabHeading>
              }>
              <Text>hhhh eesdfd</Text>
            </Tab>
          </Tabs> */
}

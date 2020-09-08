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
  ListItem,
  Thumbnail,
  Right,
  Icon,
} from 'native-base';

import {theme} from '../css/theme';
import {common} from '../css/common';
import { RootStackParamList } from '../RouteConfig';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';

type NotificationPageRouteProp = RouteProp<RootStackParamList, 'CreateAccount'>;

type NotificationPageNavigationProp = StackNavigationProp<
    RootStackParamList,
    'CreateAccount'
>;

type Props = {
    route: NotificationPageRouteProp;
    navigation: NotificationPageNavigationProp;
};

 const HomePage = (props:Props) => {
 
    return (
      <Container>
        <StatusBar barStyle="dark-content" />
        <Header
          androidStatusBarColor="#fff"
          iosBarStyle="dark-content"
          style={[theme.themeheader]}>

            <Left >
            <Button transparent onPress={()=>props.navigation.toggleDrawer()}>
              <Icon
                name="menu"
                type="Entypo"
                style={[theme.colorblack, common.fontxxxl]}
              />
          </Button>
          </Left>

          <Body />
          <Right />
          </Header>
       <ScrollView>
        <View style={[common.pt20, common.mt10]}>
          <Image
            source={require('../assets/images/logo.png')}
            style={[common.mt20, common.center, common.mb20]}
          />
        </View>
        <View style={[common.p15, common.pt0]}>
          <Text
            style={[
              common.textcenter,
              theme.fontblack,
              common.fontxxl,
              common.colorblack,
            ]}>
            Hi Gonzalez !
          </Text>
          <Text style={[common.center, theme.colorblack]}>
            One line description about the WUW
          </Text>
        </View>
        <View style={[theme.section_blue, common.p20]}>
          <TouchableOpacity style={[common.mb10]}>
            <View style={[theme.tabhome]}>
              <ListItem thumbnail>
                <Left>
                  <Thumbnail
                    square
                    source={require('../assets/images/wallet.png')}
                    style={{width: 80, height: 90}}
                  />
                </Left>
                <Body style={[common.bordernone]}>
                  <Text
                    style={[common.fontlg, theme.fontbold, theme.colororange]}>
                    Request Money
                  </Text>
                  <Text note numberOfLines={1} style={[theme.colororange]}>
                    one line description about money request
                  </Text>
                </Body>
                <Right style={[common.bordernone]}>
                  <Icon
                    name="keyboard-arrow-right"
                    type="MaterialIcons"
                    style={[common.fontxxxl]}
                  />
                </Right>
              </ListItem>
            </View>
          </TouchableOpacity>
          <TouchableOpacity>
            <View style={[theme.tabhome]}>
              <ListItem thumbnail>
                <Left>
                  <Thumbnail
                    square
                    source={require('../assets/images/washing-machine.png')}
                    style={{width: 80, height: 90}}
                  />
                </Left>
                <Body style={[common.bordernone]}>
                  <Text
                    style={[common.fontlg, theme.fontbold, theme.bluecolor]}>
                    Pickup Laundry
                  </Text>
                  <Text note numberOfLines={1} style={[theme.bluecolor]}>
                    one line description about laundry pickup
                  </Text>
                </Body>
                <Right style={[common.bordernone]}>
                  <Icon
                    name="keyboard-arrow-right"
                    type="MaterialIcons"
                    style={[common.fontxxxl]}
                  />
                </Right>
              </ListItem>
            </View>
          </TouchableOpacity>

          <ListItem style={[common.ml0, common.bordernone]}>
            <Body style={[common.bordernone]}>
              <Text style={[common.white, common.fontlg, theme.fontbold]}>
                EXPLORE
              </Text>
              <Text note numberOfLines={1} style={[common.white]}>
                Discover more laundry services near by you
              </Text>
            </Body>
            <Right style={[common.bordernone]}>
              <Button rounded small style={[common.bgwhite]}>
                <Text style={[theme.textcapital, theme.colorblack]}>more</Text>
              </Button>
            </Right>
          </ListItem>
          <View>
            <ScrollView horizontal>
              <View style={[common.flexbox, common.flexrow]}>
                <View style={[theme.slider_btm]}>
                  <Image
                    source={require('../assets/images/thumbslider.png')}
                    style={[theme.sliderimg]}></Image>
                  <View style={[theme.slidertxt]}>
                    <Text style={[common.white, theme.fontbold]}>
                      Lavo Laundry & Dry...
                    </Text>
                    <Text style={[common.white, common.fontsm, common.mb5]}>
                      Lodi, NJ 07644
                    </Text>
                    <View style={[common.flexbox, common.flexrow]}>
                      <View>
                        <Button small rounded style={[theme.bgorange]}>
                          <Text>$1.25/Pound</Text>
                        </Button>
                      </View>
                      <View>
                        <Text style={[common.white, common.pl10]}>
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
                    </View>
                  </View>
                  <View style={[theme.overLay]}></View>
                </View>
                <View style={[theme.slider_btm]}>
                  <Image
                    source={require('../assets/images/thumbslider.png')}
                    style={[theme.sliderimg]}></Image>
                  <View style={[theme.slidertxt]}>
                    <Text style={[common.white, theme.fontbold]}>
                      Lavo Laundry & Dry...
                    </Text>
                    <Text style={[common.white, common.fontsm, common.mb5]}>
                      Lodi, NJ 07644
                    </Text>
                    <View style={[common.flexbox, common.flexrow]}>
                      <View>
                        <Button small rounded style={[theme.bgorange]}>
                          <Text>$1.25/Pound</Text>
                        </Button>
                      </View>
                      <View>
                        <Text style={[common.white, common.pl10]}>
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
                    </View>
                  </View>
                  <View style={[theme.overLay]}></View>
                </View>
              </View>
            </ScrollView>
          </View>
        </View>
        </ScrollView>
      </Container>
    );
  }

  export default HomePage
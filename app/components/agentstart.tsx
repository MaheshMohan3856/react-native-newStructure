/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {Component} from 'react';
import {StatusBar, Image, TouchableOpacity, ScrollView,ImageBackground} from 'react-native';
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
  ListItem,
  Thumbnail,
  Right,
  
} from 'native-base';

import {theme} from '../css/theme';
import {common} from '../css/common';
import CheckBox from 'react-native-check-box';

export default class Agentstart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isChecked: true,
    };
  }
  render() {
    return (
      <Container>
        <StatusBar barStyle="dark-content" />
        <ImageBackground source={require("../assets/images/map.png")} style={{ width: '100%', height: '100%' }}>

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
          
        <View style={[common.borderbottom,common.whitebg]}>
        <ListItem avatar style={[common.pt10,common.pb10,]}>
            <Left>
              <Thumbnail
                source={require('../assets/images/thumbuser.png')}
                style={{width: 50, height: 50, borderRadius: 40}}
              />
            </Left>
            <Body style={[common.bordernone]}>
            <Text style={[common.colorblack, common.fontlg, common.fontbold]}>Grame Smith</Text>
            <Text style={[common.colorblack, common.fontsm]}>600 Alexander Rd, NJ 58550</Text>
            </Body>
            <View style={[common.pl15, common.pr15]}>
            <Button style={[theme.callbtn]}>
                    <Icon
                      name="call"
                      type="MaterialIcons"
                      style={[theme.white, common.fontlg, common.white]}
                    />
               </Button>
            </View>
          </ListItem>

          <View style={[common.whitebg,]}>
            <View style={[common.flexbox,common.flexrow,common.p15,theme.lightblue]}>
              <View style={[common.flexone]}>
                <Text style={[common.center,common.fontbold,common.fontxl,common.colorblack]}>$400</Text>
                <Text style={[common.center,common.fontxs,common.colorblack]}>AMOUNT REQUESTED</Text>
              </View>
              <View style={[common.flexone,common.center]}>
              <View style={[common.flexbox,common.flexrow]}>
              <Text style={[common.center,common.fontbold,common.fontlg,common.colorblack, common.mt8]}>12:00 </Text>
                <Text style={[common.center,common.fontbold,common.fontbody,common.colorblack,common.pt10]}>PM</Text>
              </View>
                <Text style={[common.center,common.fontxs,common.colorblack]}>AMOUNT REQUESTED</Text>
              </View>
            </View>
          </View>
        </View>

        <View  style={[theme.actionsheet,common.pl10]}>

        <View style={[common.flexbox,common.flexrow]}>
        <View style={[common.flexone, common.w100,]}>
        <TouchableOpacity>
              <ListItem thumbnail >
              <Left style={[common.center,common.flexbox,common.flexcolumn,common.pt20]}>
                <View style={[theme.timecircle]}></View>
                <View style={[theme.timeline]}></View>
              </Left>
                <Body style={[common.bordernone, theme.borderlight]}>
                <Text  style={[common.fontxs, theme.bluelight,common.pb10]}>DELIVER TO</Text>
                  <Text
                    style={[common.fontmd, theme.fontbold, common.white]}>
                    600 Alexander Rd, Suite 3-3
                  </Text>
                </Body>
                <Right style={[common.bordernone,theme.borderlight]}>
                <TouchableOpacity style={[theme.whitecricle,common.center]}>
                  <Icon
                    name="location-arrow"
                    type="FontAwesome"
                    style={[common.fontxxl,common.white]}
                  />
                  </TouchableOpacity>
                </Right>
              </ListItem>
          </TouchableOpacity>

          <TouchableOpacity >
              <ListItem thumbnail>
              <Left style={[common.center,common.flexbox,common.flexcolumn,]}>
                <View style={[theme.timeline]}></View>
                <View style={[theme.timecircle]}></View>
                <View style={[{flex:2}]}></View>
              </Left>
                <Body style={[common.bordernone,]}>
                <Text  style={[common.fontxs, theme.bluelight,common.pb10]}>MY LOCATION</Text>
                  <Text numberOfLines={1}
                    style={[common.fontmd, theme.fontbold, common.white]}>
                   85 Archertown Rd, New Egypt, NJ 08 85 Archertown Rd, New Egypt, NJ 08
                  </Text>
                </Body>
                <Right style={[common.bordernone]}>
                  <Icon
                    name="keyboard-arrow-right"
                    type="MaterialIcons"
                    style={[common.fontxxxl,{color:'#008BBE'}]}
                  />
                </Right>
              </ListItem>
          </TouchableOpacity>
        </View>
        </View>

        <View style={[common.p15, common.center]}>
                  <Button
                    style={[theme.button_rounded, common.ml20, common.mr20,{width:270}]}>
                    <Text style={[theme.textcapital, theme.bluecolor, common.fontmd,common.w100, common.textcenter]}>
                    Start
                    </Text>
                  </Button>
                </View>
        </View> 
        </ImageBackground>
      </Container>
    );
  }
}

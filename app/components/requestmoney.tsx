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
} from 'native-base';

import {theme} from '../css/theme';
import {common} from '../css/common';
import Carousel from 'react-native-snap-carousel';
import RangeSlider from 'rn-range-slider';

export default class RequestMoney extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeIndex: 0,
      carouselItems: [
        {
          title: '100',
        },
        {
          title: '150',
        },
        {
          title: '200',
        },
        {
          title: '250',
        },
        {
          title: '300',
        },
      ],
    };
  }
  _renderItem({item, index}) {
    return (
      <View
        style={{
          backgroundColor: 'transparent',
          height: 100,
          marginLeft: 15,
          marginRight: 15,
        }}>
        <Text style={[common.fontlg, common.white, common.textcenter]}>$</Text>
        <Text
          style={[
            common.fontxxl,
            common.white,
            common.textcenter,
            {fontWeight: 'bold'},
          ]}>
          {item.title}
        </Text>
      </View>
    );
  }
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
          <View style={(common.pt20, common.mt20)}>
            <Image
              source={require('../assets/images/request_banner.png')}
              style={[common.center, {width: 251, height: 194}]}
            />
          </View>
          <View style={[common.p15]}>
            <Text
              style={[
                common.textcenter,
                theme.fontbold,
                common.fontxxl,
                common.colorblack,
              ]}>
              Lets get started
            </Text>
            <Text style={[common.center, theme.colorblack]}>
              One line description about money request
            </Text>
          </View>

          <View style={[theme.section_blue]}>
            <View
              style={[
                common.p15,
                common.pt20,
                theme.borderbottom,
                common.mb0,
                common.pb0,
              ]}>
              <Text
                style={[
                  common.pb10,
                  theme.select_text,
                  common.fontsm,
                  common.textcenter,
                ]}>
                swipe to select
              </Text>

              <View style={[theme.sliderwp]}>
                <Carousel
                  layout={'default'}
                  ref={(ref) => (this.carousel = ref)}
                  data={this.state.carouselItems}
                  sliderWidth={320}
                  itemWidth={80}
                  renderItem={this._renderItem}
                  onSnapToItem={(index) => this.setState({activeIndex: index})}
                  activeSlideAlignment={'center'}
                  loop={true}
                  inactiveSlideOpacity={0.3}
                  inactiveSlideScale={0.7}
                />
              </View>
            </View>
            <View
              style={[
                common.p15,
                common.pt20,
                theme.borderbottom,
                common.mb10,
              ]}>
              <Text
                style={[
                  common.pb10,
                  theme.select_text,
                  common.fontsm,
                  common.textcenter,
                ]}>
                TIME DURATION
              </Text>

              <View style={[theme.sliderwp]}>
                <RangeSlider
                  style={{width: '100%', height: 80}}
                  gravity={'center'}
                  min={0}
                  max={1000}
                  step={20}
                  rangeEnabled={false}
                  selectionColor="#fff"
                  blankColor="#0294C9"
                  thumbBorderColor="#00AFEF"
                  lineWidth={6}
                  thumbBorderWidth={2}
                  labelBackgroundColor="#fff"
                  labelBorderColor="#fff"
                  labelTextColor="#272727"
                  onValueChanged={(low, high, fromUser) => {
                    this.setState({rangeLow: low, rangeHigh: high});
                  }}
                />
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

            <View style={[common.p15, common.center]}>
              <Button iconLeft light style={[theme.button_rounded]}>
                <View style={[theme.icon_btn, common.center, common.ml10]}>
                  <Icon
                    name="dollar"
                    type="Foundation"
                    style={[common.white]}
                  />
                </View>
                <Text
                  style={[theme.textcapital, theme.bluecolor, common.fontmd]}>
                  Request Money
                </Text>
              </Button>
            </View>
          </View>
        </ScrollView>
      </Container>
    );
  }
}



import React, {} from 'react';
import {StatusBar,} from 'react-native';
import {
  Header,
  Body,
  Title,
  Left,
  Icon,
  Right,
  Button
} from 'native-base';

import {theme} from '../../css/theme';
import {common} from '../../css/common';
import {withNavigation} from '@react-navigation/compat';



type Props = {back:boolean,title:string,navigation:any}

 const HeaderPage = (props:Props) => {
  
    return (
        <>
<StatusBar barStyle="dark-content" />
<Header
  androidStatusBarColor="#fff"
  transparent
  iosBarStyle="dark-content"
  style={[theme.themeheader]}>
  <Left>
    {
      props.back == true
      && 
      <Button transparent onPress={()=>props.navigation.goBack()}>
      <Icon
        name="chevron-small-left"
        type="Entypo"
        style={[theme.colorblack, common.fontxxxl]}
      />
    </Button>
    }
    {
      props.back == false
      && 
      <Button transparent onPress={()=>props.navigation.toggleDrawer()}>
      <Icon
        name="menu"
        type="Entypo"
        style={[theme.colorblack, common.fontxxxl]}
      />
    </Button>
    }
    
  </Left>
  <Body />
</Header>
</>
    )}

    //@ts-ignore
export default withNavigation(HeaderPage)
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {Component, useEffect, useState} from 'react';
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
  Thumbnail,Textarea, Card,
} from 'native-base';

import {theme} from '../css/theme';
import {common} from '../css/common';
import Slider from 'react-native-slider';
import { useDispatch, useSelector } from 'react-redux';
import HeaderPage from './shared/header';
import { hideLoader, showLoader } from '../actions/common/commonActions';
import { getLaundryDetail } from '../actions/laundryrequest/requestActions';
import { RootStackParamList } from '../RouteConfig';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import AsyncStorage from '@react-native-community/async-storage';
import Storage from 'react-native-storage';
import { RootState } from '../appReducers';
import { appConfig } from '../appConfig';
var storage = new Storage({size: 1000,storageBackend: AsyncStorage,defaultExpires: 1000 * 3600 * 24,enableCache: false});

type NotificationPageRouteProp = RouteProp<RootStackParamList, 'SelectItem'>;

type NotificationPageNavigationProp = StackNavigationProp<
    RootStackParamList,
    'SelectItem'
>;

type Props = {
    route: NotificationPageRouteProp;
    navigation: NotificationPageNavigationProp;
};


const SelectItem = (props:Props) => {

  

  const [list,setList] = useState(props.route.params.additional)
  const [sliderValue, setSliderValue] = useState(props?.route?.params?.quantity?.minimum);
  const [extraItem,setExtraItem] = useState(0)

  const decrementQty = (ind) =>{
      if(list[ind].item_quantity > 0){
          let arr = list;
          arr[ind].item_quantity--;
          let newArr = [...arr];
          setList(newArr);
          let item = extraItem
          item--;
          setExtraItem(item)
      }
     
  }
  const incrementQty = (ind) =>{
   
        let arr = list;
        arr[ind].item_quantity++;
        let newArr = [...arr];
        setList(newArr)
        let item = extraItem;
        item++
        setExtraItem(item)
   
}
  
  
    return (
      <Container  style={[theme.bgblue]}>
        <HeaderPage title="" back={true} />

        <View style={[common.p20,common.bgwhite]}>
          <Text style={[common.fontlg,common.colorblack]}>Select Items</Text>
          <Text style={[common.fontsm,common.colorblack]}>Please select the quantity &  add items to separate wash</Text>
        </View>

<ScrollView>
  <View style={[common.pt20]}>
  <View style={[theme.listCard,common.p0,common.pb0,]}>
        <View style={[common.p20,common.borderbottom]}>
          <View style={[common.flexbox, common.flexrow,common.pb5]}>
            <View style={[common.flexone]}>
            <Text style={[common.fontbody,theme.graydark,theme.fontbold,]}>SELECT THE WEIGHT</Text>
            <Text style={[common.fontxs,theme.colorred,]}>Min-{props?.route?.params?.quantity?.minimum} & Max-{props?.route?.params?.quantity?.maximum} Pounds</Text>
            </View>
            <View>
              <Text style={[common.fontxxl,theme.colorblack,common.textright,common.fontbold]}>{sliderValue}
                <Text style={[common.fontsm,theme.colorblack,theme.fontregular]}> Pounds</Text>
              </Text>
            </View>
           
          </View>  
          <Slider
          style={{}}
          thumbTintColor="#00AFEF"
          trackStyle={{height:8,borderRadius:4}}
          thumbStyle={{width: 30,
            height: 30,
            borderRadius: 30 / 2,
            backgroundColor: 'white',
            borderColor: '#00AFEF',
            borderWidth: 8,}}
          maximumValue={props?.route?.params?.quantity?.maximum}
          minimumValue={props?.route?.params?.quantity?.minimum}
          minimumTrackTintColor="#00AFEF"
          maximumTrackTintColor="#CBE1E9"
          
          step={1}
          value={sliderValue}
          onValueChange={
            (sliderValue) => setSliderValue(sliderValue)
          }
        />          
        </View>
        <View style={[common.p20,theme.lightblue,]}>
   
        <Text style={[common.fontbody,theme.graydark,theme.fontbold,common.pb10]}>ADDITIONAL WASH ITEMS</Text>
        <View>
       
          {
            list != undefined && list.length>0 && list.map((item,index)=>{
              return(
                <View key={index} style={[common.flexbox, common.flexrow,common.aligncenter,common.mb15,]}>
                <View style={[common.flexone]}>
                  <Text style={[common.fontbody,theme.colorblack,]}>{item.item_name} 
                    <Text style={[common.fontbody,theme.colororange,common.textright,]}> $ {item.item_price}</Text>
                  </Text>
                </View>
                <View>
                <View style={[common.flexbox,common.flexrow,common.center,theme.cardbox]}>
                <TouchableOpacity onPress={()=>{decrementQty(index)}}>
                  <Image source={require('../assets/images/minus.png')}/>
                </TouchableOpacity>
                <Form>
                <Item style={[common.bordernone]}>
                  <Label>{item.item_quantity}</Label>
                  <Input />
                </Item>
                </Form>
                <TouchableOpacity onPress={()=>incrementQty(index)}>
                  <Image source={require('../assets/images/pluse.png')}/>
                </TouchableOpacity>
              </View>
                </View>
              </View>
              )
            })
          }
          
         
          
        </View>
        </View>
        <View style={[common.p20]}>
         
          <View>
            <Text style={[common.fontbody,theme.colororange,common.textright,]}>{extraItem} Items Added</Text>
          </View>              
        </View>
        </View>
        <View style={[common.p15, common.center,common.mb20]}>
          <Button
           onPress={()=>props.navigation.navigate('LaundrySchedule',{washQty:sliderValue,list:list,extra:extraItem,id:props.route.params.id})}
            style={[theme.button_rounded, common.ml20, common.mr20]}>
            <Text style={[theme.textcapital, theme.bluecolor, common.fontmd,common.w100, common.textcenter]}>
            Done
            </Text>
          </Button>
        </View>
  </View>
  </ScrollView>
      </Container>
    );
  }



  export default SelectItem
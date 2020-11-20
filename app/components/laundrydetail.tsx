/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useRef,useState,useEffect} from 'react';
import {
  Linking,
  StyleSheet,
  View,
  Image,
  Dimensions,
  StatusBar,
  TouchableOpacity,
} from 'react-native';

import {
  Container,
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
  List,
} from 'native-base';

import {theme} from '../css/theme';
import {common} from '../css/common';
import {lightblue} from 'color-name';
import * as Animatable from 'react-native-animatable';
import HeaderImageScrollView, {
  TriggeringView,
} from 'react-native-image-header-scroll-view';
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

type NotificationPageRouteProp = RouteProp<RootStackParamList, 'LaundryDetail'>;

type NotificationPageNavigationProp = StackNavigationProp<
    RootStackParamList,
    'LaundryDetail'
>;

type Props = {
    route: NotificationPageRouteProp;
    navigation: NotificationPageNavigationProp;
};

const MIN_HEIGHT = Header.HEIGHT;
const MAX_HEIGHT = 250;

const styles = StyleSheet.create({
  image: {
    height: MAX_HEIGHT,
    width: Dimensions.get('window').width,
    alignSelf: 'stretch',
    resizeMode: 'cover',
  },
  title: {
    fontSize: 20,
  },
  name: {
    fontWeight: 'bold',
  },
  section: {
    borderBottomColor: '#cccccc',
    backgroundColor: 'white',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  sectionContent: {
    fontSize: 16,
    textAlign: 'justify',
  },
  keywords: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    flexWrap: 'wrap',
  },
  keywordContainer: {
    backgroundColor: '#999999',
    borderRadius: 10,
    margin: 10,
    padding: 10,
  },
  keyword: {
    fontSize: 16,
    color: 'white',
  },
  titleContainer: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  imageTitle: {
    color: 'white',
    backgroundColor: 'transparent',
    fontSize: 24,
  },
  navTitleView: {
    height: MIN_HEIGHT,
    paddingTop: 16,
    opacity: 0,
    display: 'flex',
    flexDirection: 'row',
  },
});

const LaundryDetail = (props:Props) => {

  const navTitleView: any = useRef(null);
  const dispatch = useDispatch()

  const [detail,setDetail] = useState({})

  useEffect(()=>{
    dispatch(showLoader())
    dispatch(getLaundryDetail({laundromat_id:props.route.params.id}))
  },[])

  const laundryDetail = useSelector((state:RootState)=>state.lrequest_r._laundryDetail);

  useEffect(()=>{
     if(laundryDetail != undefined){
       dispatch(hideLoader())
       if(laundryDetail.status == true){
         console.log(laundryDetail);
         setDetail(laundryDetail.laundromat_data)
       }else{
     
        appConfig.functions.showError(laundryDetail.message)
      }
     }
  },[laundryDetail])

  const validate = () =>{
    const arr = detail?.additional_settings.map(v => ({...v, item_quantity: 0}))
    let newArr = arr.map((o)=>{
        return {
          item_id:o.item_id,
          item_price:o.price,
          item_name:o.item_name,
          item_quantity:o.item_quantity
        }
      })
      let quantity = {
        maximum:detail?.maximum_order_quantity,
        minimum:detail?.minimum_order_quantity
      }
    props.navigation.navigate('SelectItem',{id:detail?.laundromat_id,additional:newArr,quantity:quantity})
  }
  
    return (
      <View style={{flex: 1}}>
        <StatusBar barStyle="dark-content" />
        <HeaderImageScrollView
          maxHeight={MAX_HEIGHT}
          minHeight={MIN_HEIGHT}
          maxOverlayOpacity={0.6}
          minOverlayOpacity={0.3}
          fadeOutForeground
          renderHeader={() => (
            <Image
              source={{uri:detail?.profile_image}}
              style={styles.image}
            />
          )}
          renderFixedForeground={() => (
            <Animatable.View
              style={styles.navTitleView}
              ref={navTitleView}>
              <TouchableOpacity style={[common.p10]} onPress={()=>{props.navigation.goBack()}}>
                <Icon
                  name="chevron-thin-left"
                  type="Entypo"
                  style={[common.white, common.fontxl]}
                />
              </TouchableOpacity>
              <Text style={[styles.navTitle, common.p10, common.white]}>
                {detail?.business_name}
              </Text>
            </Animatable.View>
          )}
          renderForeground={() => (
            <View style={styles.titleContainer}>
              <TouchableOpacity onPress={()=>{props.navigation.goBack()}}
                style={[common.p10, {position: 'absolute', top: 30, left: 0}]}>
                <Icon
                  name="chevron-thin-left"
                  type="Entypo"
                  style={[theme.colorblack, common.fontxl]}
                />
              </TouchableOpacity>
              <View>
                <ListItem style={[common.bordernone]}>
                  <Body style={[common.bordernone]}>
                    <Text style={[common.white]}>{detail?.business_name}</Text>
                    <Text style={[common.white]} note numberOfLines={1}>
                      {detail?.location}
                    </Text>
                    <View style={[common.flexbox, common.flexrow, common.mt5]}>
                      <View>
                        <Button small rounded style={[theme.bgorange]}>
                          <Text>${detail?.normal_wash_price}/Pound</Text>
                        </Button>
                      </View>
                      <View>
                        <Text style={[common.ml15, common.white]}>
                          <Image
                            source={require('../assets/images/star.png')}
                            style={{width: 20, height: 20}}></Image>{' '}
                          4.8
                        </Text>
                      </View>
                      <View>
                        {
                          detail?.is_active == 'Y'
                          &&
                          <Button
                          bordered
                          rounded
                          small
                          style={[theme.borderblue]}>
                          <Text style={[theme.bluecolor, theme.textcapital]}>
                            Available
                          </Text>
                        </Button>
                        }
                        {
                          detail?.is_active != 'Y'
                          &&
                          <Button
                          bordered
                          rounded
                          small
                          style={[theme.borderblue]}>
                          <Text style={[theme.bluecolor, theme.textcapital]}>
                            Unavailable
                          </Text>
                        </Button>
                        }
                      </View>
                    </View>
                  </Body>
                </ListItem>
              </View>
            </View>
          )}>
          <TriggeringView
            style={styles.section}
            onHide={() => navTitleView.fadeInUp(200)}
            onDisplay={() => navTitleView.fadeOut(100)}>
            <View style={[common.p10, theme.bgblue, common.pt15, common.pb15]}>
              <Button rounded block style={[common.bgwhite]} onPress={validate}>
                <Text style={[theme.bluecolor]}>Schedule Pickup</Text>
              </Button>
            </View>
            <View style={[common.bgwhite, common.pt10, common.pb10]}>
              <ListItem style={[common.bordernone]}>
                <Body style={[common.bordernone]}>
                  <Text
                    style={[theme.colorgray, common.fontsm, theme.fontbold]}>
                    ADDRESS
                  </Text>
                  <Text note>1235 Camino Complex</Text>
                  <Text note>{detail?.location}</Text>
                </Body>
                <Right>
                  <Button rounded light style={[theme.btncall]} onPress={()=>Linking.openURL(`tel:${detail?.phone_prefix + detail?.phone}`)}>
                    <Icon
                      name="call"
                      type="MaterialIcons"
                      style={[common.white]}></Icon>
                  </Button>
                </Right>
              </ListItem>
            </View>
            <View style={[common.m10, theme.lightblue]}>
              <View style={[theme.card]}>
                <View style={[common.p15]}>
                  <Text style={[theme.fontbold, common.mb20, theme.colorgray]}>
                  ADDITIONAL WASH ITEMS
                  </Text>
                  {
                    detail?.additional_settings?.length > 0 && detail?.additional_settings.map((item,index)=>{
                      return(
                        <View
                        key={index}
                        style={[
                          common.flexbox,
                          common.flexrow,
                          common.pl10,
                          common.pr10,
                          common.mb5,
                        ]}>
                        <View style={[common.flexthree, common.pr10]}>
                          <Text style={[common.fontsm]}>{item.item_name}</Text>
                        </View>
                        <View style={[common.flexone]}>
                          <Text
                            style={[
                              common.fontbody,
                              theme.fontbold,
                             
                            ]}>
                            $ {item.price}
                          </Text>
                        </View>
                      </View>
                      )
                    })
                  }
                  {
                    detail?.additional_settings?.length == 0
                    &&
                    <Text style={[theme.fontmedium, common.mb20, theme.colorgray]}>
                       No Additional Wash Item
                    </Text>
                  }
                  
                 
                </View>
              </View>
            </View>
          </TriggeringView>
        </HeaderImageScrollView>
      </View>
    );
  }

  export default LaundryDetail

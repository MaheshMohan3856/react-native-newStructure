/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useEffect,useState} from 'react';
import {StatusBar, Image, TouchableOpacity, ScrollView,Alert} from 'react-native';
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
import firestore from '@react-native-firebase/firestore';
import {CommonActions} from '@react-navigation/native';
import {_login,_deleteAccount,logoutUser} from '../actions/login/loginActions';
import {useDispatch,useSelector} from 'react-redux';
import HeaderPage from './shared/header';

import { RootStackParamList } from '../RouteConfig';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { RootState } from '../appReducers';
import AsyncStorage from '@react-native-community/async-storage';
import Storage from 'react-native-storage';
import { hideLoader, showLoader } from '../actions/common/commonActions';
import { appConfig } from '../appConfig';
var storage = new Storage({size: 1000,storageBackend: AsyncStorage,defaultExpires: 1000 * 3600 * 24,enableCache: false});

type NotificationPageRouteProp = RouteProp<RootStackParamList, 'Settings'>;

type NotificationPageNavigationProp = StackNavigationProp<
    RootStackParamList,
    'Settings'
>;

type Props = {
    route: NotificationPageRouteProp;
    navigation: NotificationPageNavigationProp;
};

const Settings = (props:Props) => {

  const dispatch = useDispatch();
  const [firstName,setFirstname] = useState('')
  const [lastName,setLastname] = useState('')
  const [image,setImage] = useState('')
  const [phone,setPhone] = useState('')
  const [code,setCode] = useState('')
  const [isAgent,setIsAgent] = useState(false)

  useEffect(()=>{
    const unsubscribe = props.navigation.addListener('focus', () => {
      storage.load({key:'userData'}).then((ret)=>{
        setFirstname(ret.first_name)
        setLastname(ret.last_name)
        setImage(ret.profile_image != undefined?ret.profile_image:'')
        setPhone(ret.phone)
        setCode(ret.phone_prefix)
        if(ret.is_agent){
          setIsAgent(ret.is_agent)
        }

      })
    });
     
  },[props.navigation])

  const deleteAccount = () => {
    Alert.alert('Delete', 'Are you sure you want to delete account?',
    [
        { text: 'cancel' },
        { text: 'yes', onPress: () => { 
          dispatch(showLoader())
          dispatch(_login(undefined));
          dispatch(_deleteAccount())
           
             
          } 
        }
      ]
  )
  }
  

  const logout = () =>{
    Alert.alert('Logout', 'Are you sure you want to Signout?',
    [
        { text: 'cancel' },
        { text: 'yes', onPress: () => { 

          dispatch(_login(undefined));
          dispatch(logoutUser())
          AsyncStorage.getItem('home').then((reshome)=>{
            if(reshome == 'AgentHome'){
              storage.load({key:"userData"}).then((ret)=>{
                firestore()
                .collection('Users')
                .doc(ret.uuid)
                .delete()
                .then(() => {
                  console.log('User deleted!');
                });
              })
            }
          })
            setTimeout(()=>{
              storage.remove({key:'userData'});
              AsyncStorage.removeItem('@access_token');
               AsyncStorage.removeItem('@refresh_token');
               AsyncStorage.removeItem('home');
               props.navigation.dispatch(
                CommonActions.reset({
                  index: 1,
                  routes: [
                    { name: 'LandingPage' },
                    
                  ],
                })
              );
            },500)
             
          } 
        }
      ]
  )
  }

  const deletedAcc = useSelector((state:RootState)=>state.login_r._delete)

  useEffect(()=>{
      if(deletedAcc != undefined){
        dispatch(hideLoader())
        if(deletedAcc.status == true){
          dispatch(logoutUser())
          AsyncStorage.getItem('home').then((reshome)=>{
            if(reshome == 'AgentHome'){
              storage.load({key:"userData"}).then((ret)=>{
                firestore()
                .collection('Users')
                .doc(ret.uuid)
                .delete()
                .then(() => {
                  console.log('User deleted!');
                });
              })
            }
          })
          setTimeout(()=>{
              storage.remove({key:'userData'});
              AsyncStorage.removeItem('@access_token');
              AsyncStorage.removeItem('@refresh_token');
              AsyncStorage.removeItem('home');
              props.navigation.dispatch(
                CommonActions.reset({
                  index: 1,
                  routes: [
                    { name: 'LandingPage' },
                    
                  ],
                })
              );
          },500)
        }else{
          appConfig.functions.showError(deletedAcc.message)
        }
      }
  },[deletedAcc])
 
    return (
      <Container>
        <HeaderPage title='' back={false} right=""/>
        <View style={[common.pl20, common.mt15, common.pb10]}>
          <Text style={[common.fontxxl]}>Settings</Text>
        </View>
        <View style={[common.flexbox, common.flexcolumn, common.flexone]}>
          <View style={[common.flexone]}>
            <View style={[theme.borderbottomgray, common.mb15]}>
              <ListItem avatar style={[common.pb15]}>
                <Left>
                  {
                    image == ''
                    &&
                    <Thumbnail
                      source={require('../assets/images/no-photo.jpg')}
                   />
                  }
                  {
                    image != ''
                    &&
                    <Thumbnail
                      source={{uri:image}}
                   />
                  }
                  
                </Left>
                <Body style={[common.bordernone]}>
                  <Text>{firstName} {lastName}</Text>
                  <Text note>{code} {phone}</Text>
                </Body>
              </ListItem>
            </View>
           <ScrollView>
            <View>
             
              <TouchableOpacity style={[common.p20]} onPress={()=>props.navigation.navigate('EditProfile')}>
                <Text>Edit Profile</Text>
              </TouchableOpacity>
              {
                isAgent == true
                &&
                <TouchableOpacity style={[common.p20]} onPress={()=>props.navigation.navigate('EditAgent')}>
                <Text>Edit Agent Profile</Text>
              </TouchableOpacity>
              }
               <TouchableOpacity style={[common.p20]} onPress={()=>props.navigation.navigate('ChangePassword')}>
                <Text>Change Password</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[common.p20]} onPress={()=>props.navigation.navigate('Privacy')}>
                <Text>Privacy Policy</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[common.p20]} onPress={()=>props.navigation.navigate('Terms')}>
                <Text>Terms Of Use</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[common.p20]} onPress={logout}>
                <Text>Sign Out</Text>
              </TouchableOpacity>
              <TouchableOpacity activeOpacity={0.8}  style={[common.p20]}>
                <Text style={{color:"#696969"}}>Version : 0.0.6</Text>
              </TouchableOpacity>
             
            </View>
            </ScrollView>
          </View>
         
          <View>
            <TouchableOpacity style={[common.p20, common.mb20]} onPress={deleteAccount}>
              <Text style={[theme.colorred]}>Delete your account</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Container>
    );
  }

export default Settings
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useState,useEffect,useRef} from 'react';
import {Platform,StatusBar, Image, TouchableOpacity, ScrollView,KeyboardAvoidingView,TouchableWithoutFeedback,Keyboard} from 'react-native';
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
} from 'native-base';

import {theme} from '../css/theme';
import {common} from '../css/common';
import {showLoader, hideLoader} from '../actions/common/commonActions';
import {appConfig} from '../appConfig';
import {changePassword,_changePassword} from '../actions/settings/settingsActions';
import HeaderPage from './shared/header';
import {useSelector,useDispatch} from 'react-redux';

import { RootStackParamList } from '../RouteConfig';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { RootState } from '../appReducers';

type NotificationPageRouteProp = RouteProp<RootStackParamList, 'ChangePassword'>;

type NotificationPageNavigationProp = StackNavigationProp<
    RootStackParamList,
    'ChangePassword'
>;

type Props = {
    route: NotificationPageRouteProp;
    navigation: NotificationPageNavigationProp;
};


const ChangePassword = (props:Props) => {

  const dispatch = useDispatch();
  const [oldPassword, setOldPassword] = useState('');
  const [password, setPassword] = useState('');
  const [conpassword, setConpassword] = useState('');

  const oldpasswordInputRef: any = useRef(null);
  const [passwordInputRef, setPasswordInputRef] = useState<any>(null)
  const [conpasswordInputRef, setConpasswordInputRef] = useState<any>(null)


  const validateForm = () =>{
    if(oldPassword==''){
        appConfig.functions.showError('Enter current password')
        return
      }else if(password==''){
      appConfig.functions.showError('Set a password')
      return
    }else if(conpassword==''){
      appConfig.functions.showError('Confirm your password')
      return
    }else if(conpassword!=password){
      appConfig.functions.showError('Password and Confirm password does not match')
      return
    }else{
       dispatch(showLoader());
       dispatch(changePassword({new_password:password,old_password:oldPassword}))
    }
  }

  useEffect(()=>{
    return () => {
      dispatch(_changePassword(undefined))
    }
  },[])

  const changePass = useSelector((state:RootState)=>state.settings_r._changePassword);

  useEffect(()=>{
       if(changePass != undefined){
         dispatch(hideLoader());
         if(changePass.status == true){
           appConfig.functions.successMsg(changePass.message)
            props.navigation.goBack();
            
         }else{
           appConfig.functions.showError(changePass.message);
        }
       }
  },[changePass])

    return (
      <Container>
        <HeaderPage title="" back={true} right=""/>
        
        <KeyboardAvoidingView behavior={Platform.OS == "ios" ? "padding" : "height"} style={{flex:1}}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView>
        
          <View style={[common.p20]}>
            <View style={[common.mb20]}>
              <Text
                style={[theme.fontregular, common.fontxxl, theme.colorblack]}>
                 Change Password
              </Text>
              {/* <Text
                style={[theme.fontregular, common.fontbody, theme.colorblack]}>
               Enter your new password.
              </Text> */}
            </View>
            <View>
              <Form>
              <Item
                  floatingLabel
                   
                  style={[common.ml0, common.pt10, common.mb20]}>
                  <Label>Current Password</Label>
                  <Input 
                  value={oldPassword}
                  onChangeText={(oldPassword)=>{setOldPassword(oldPassword)}}
                  ref={oldpasswordInputRef}
                  returnKeyType="next"
                  onSubmitEditing={()=>{passwordInputRef._root.focus()}}
                  secureTextEntry={true}
                  
                  />
                
              
               
                              
    
                </Item>
                <Item
                  floatingLabel
                   
                  style={[common.ml0, common.pt10, common.mb20]}>
                  <Label>New Password</Label>
                  <Input 
                  value={password}
                  onChangeText={(password)=>{setPassword(password)}}
                  getRef={(c) => setPasswordInputRef(c)}
                  returnKeyType="next"
                  onSubmitEditing={()=>{conpasswordInputRef._root.focus()}}
                  secureTextEntry={true}
                  
                  />
                
              
               
                              
    
                </Item>
               
                 <Item floatingLabel  style={[common.ml0, common.pt10]}>
                  <Label>Confirm Password</Label>
                  <Input 
                    value={conpassword}
                    onChangeText={(conpassword)=>{setConpassword(conpassword)}}
                    getRef={(c) => setConpasswordInputRef(c)}
                   onSubmitEditing={validateForm}
                   returnKeyType="done"
                   secureTextEntry={true}
                    
                  />
                   
                </Item>
               
                <View style={[common.mt20]}>
                  <Button block bordered light style={[theme.button_orange]} onPress={validateForm}>
                    <Text
                      style={[theme.textcapital, common.white, common.fontmd]}>
                      Submit
                    </Text>
                  </Button>
                </View>
                
              </Form>
            </View>
          </View>
          
        </ScrollView>
        </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
      </Container>
    );
  
}
export default ChangePassword
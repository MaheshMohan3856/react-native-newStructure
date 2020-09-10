/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useState,useEffect,useRef} from 'react';
import {StatusBar, Image, TouchableOpacity, ScrollView,KeyboardAvoidingView} from 'react-native';
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
import {resetPassword} from '../actions/login/loginActions';
import HeaderPage from './shared/header';
import {useSelector,useDispatch} from 'react-redux';

import { RootStackParamList } from '../RouteConfig';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { RootState } from '../appReducers';

type NotificationPageRouteProp = RouteProp<RootStackParamList, 'ResetPassword'>;

type NotificationPageNavigationProp = StackNavigationProp<
    RootStackParamList,
    'ResetPassword'
>;

type Props = {
    route: NotificationPageRouteProp;
    navigation: NotificationPageNavigationProp;
};


const ResetPassword = (props:Props) => {

  const dispatch = useDispatch();

  const [password, setPassword] = useState('');
  const [conpassword, setConpassword] = useState('');

  const passwordInputRef: any = useRef(null);
  const [conpasswordInputRef, setConpasswordInputRef] = useState<any>(null)


  const validateForm = () =>{
    if(password==''){
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
       dispatch(resetPassword({email:props.route.params.email,password:password}))
    }
  }

  const resetPass = useSelector((state:RootState)=>state.login_r._resetPass);

  useEffect(()=>{
       if(resetPass != undefined){
         dispatch(hideLoader());
         if(resetPass.status == true){
            props.navigation.navigate('LoginPage');
         }else{
           appConfig.functions.showError(resetPass.message);
        }
       }
  },[resetPass])

    return (
      <Container>
        <HeaderPage title="" back={true} />
        <KeyboardAvoidingView behavior="padding">
        <ScrollView>
        
          <View style={[common.p20]}>
            <View style={[common.mb20]}>
              <Text
                style={[theme.fontregular, common.fontxxl, theme.colorblack]}>
                Reset Password?
              </Text>
              <Text
                style={[theme.fontregular, common.fontbody, theme.colorblack]}>
                Enter your new password.
              </Text>
            </View>
            <View>
              <Form>
                <Item
                  floatingLabel
                  style={[common.ml0, common.pt10, common.mb20]}>
                  <Label>New Password</Label>
                  <Input 
                    value={password}
                    onChangeText={(password)=>{setPassword(password)}}
                    ref={passwordInputRef}
                    returnKeyType="next"
                    onSubmitEditing={()=>{conpasswordInputRef._root.focus()}}
                    secureTextEntry={true}
                  />
                </Item>
                <Item
                  floatingLabel
                  style={[common.ml0, common.pt10, common.mb20]}>
                  <Label>Confirm Password</Label>
                  <Input 
                    value={conpassword}
                    onChangeText={(conpassword)=>{setConpassword(conpassword)}}
                    getRef={(c) => setConpasswordInputRef(c)}
                   onSubmitEditing={()=>{}}
                   returnKeyType="done"
                   secureTextEntry={true}
                  />
                </Item>
                
                <View style={[common.mt20]}>
                  <Button block light style={[theme.button_orange]} onPress={validateForm}>
                    <Text
                      style={[theme.textcapital, common.white, common.fontmd]}>
                      Done
                    </Text>
                  </Button>
                </View>
              </Form>
            </View>
          </View>
         
        </ScrollView>
        </KeyboardAvoidingView>
      </Container>
    );
  
}
export default ResetPassword
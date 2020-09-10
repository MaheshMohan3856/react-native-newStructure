/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useState,useEffect} from 'react';
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
  Picker,
  Icon,
} from 'native-base';

import {theme} from '../css/theme';
import {common} from '../css/common';
import {showLoader, hideLoader} from '../actions/common/commonActions';
import {appConfig} from '../appConfig';
import {forgotPass} from '../actions/login/loginActions';
import HeaderPage from './shared/header';
import {useSelector,useDispatch} from 'react-redux';

import { RootStackParamList } from '../RouteConfig';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp, useLinkProps } from '@react-navigation/native';
import { RootState } from '../appReducers';

type NotificationPageRouteProp = RouteProp<RootStackParamList, 'ForgotPassword'>;

type NotificationPageNavigationProp = StackNavigationProp<
    RootStackParamList,
    'ForgotPassword'
>;

type Props = {
    route: NotificationPageRouteProp;
    navigation: NotificationPageNavigationProp;
};

const ForgotPassword = (props:Props) => {
  const dispatch = useDispatch();

  const [email, setEmail] = useState('');

  function ValidateEmail(mail:string) {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail)) {
        return (true)
      }
       return (false)
    }

  const validate = () =>{
    let emailCheck = ValidateEmail(email)
    if(emailCheck == false){
       appConfig.functions.showError('Enter registered email')
        return
     }else{
        dispatch(showLoader())
       dispatch(forgotPass({email:email}))
     }
  }

  const forgot = useSelector((state:RootState)=>state.login_r._forgot)

  useEffect(()=>{
      if(forgot != undefined){
        dispatch(hideLoader())
        if(forgot.status == true){
            appConfig.functions.successMsg(forgot.message);
            props.navigation.push('VerifyPhone',{page:'ForgotPassword',email:email,phone:''})
        }else{
         
          appConfig.functions.showError(forgot.message);
        }
      }
  },[forgot])
  
    return (
      <Container>
        <HeaderPage title="" back={true} />
        <ScrollView>
          <View style={[common.p20]}>
            <View style={[common.mb20]}>
              <Text
                style={[theme.fontregular, common.fontxxl, theme.colorblack]}>
                Forgot Password?
              </Text>
              <Text
                style={[theme.fontregular, common.fontbody, theme.colorblack]}>
                Enter the email address associated with this account.
              </Text>
            </View>
            <View>
              <Form>
                <Item
                  floatingLabel
                  style={[common.ml0, common.pt10, common.mb20]}>
                  <Label>Enter your email address</Label>
                  <Input value={email} onChangeText={(text)=>setEmail(text)}
                   onSubmitEditing={validate}
                   returnKeyType="done"
                   keyboardType="email-address"
                   autoCapitalize="none"
                  />
                </Item>
                
                <View style={[common.mt20]}>
                  <Button block light style={[theme.button_orange]} onPress={validate}>
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
      </Container>
    );
  }

  export default ForgotPassword

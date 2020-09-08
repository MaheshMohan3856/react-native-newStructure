/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useState,useEffect,useRef} from 'react';
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
import {login} from '../actions/login/loginActions';
import HeaderPage from './shared/header';
import {useSelector,useDispatch} from 'react-redux';

import { RootStackParamList } from '../RouteConfig';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { RootState } from '../appReducers';

type NotificationPageRouteProp = RouteProp<RootStackParamList, 'LoginPage'>;

type NotificationPageNavigationProp = StackNavigationProp<
    RootStackParamList,
    'LoginPage'
>;

type Props = {
    route: NotificationPageRouteProp;
    navigation: NotificationPageNavigationProp;
};

const LoginPage = (props:Props) => {
  const dispatch = useDispatch();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const inputEmail: any = useRef(null);
  const [passwordInputRef, setPasswordInputRef] = useState<any>(null)

  function ValidateEmail(mail:string) {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail)) {
        return (true)
      }
       return (false)
    }

  const validateForm = () => {
    let emailCheck = ValidateEmail(email)
    if(emailCheck == false){
       appConfig.functions.showError('Enter registered email')
        return
     }else if(password==''){
       appConfig.functions.showError('Enter account password')
       return
     }else{
       props.navigation.navigate('HomePage')
       // dispatch(showLoader())
       // dispatch(login({email:email,password:password}))
     }
 }

 const loggedIn = useSelector((state:RootState)=>state.login_r._login);

 useEffect(()=>{
     console.log("loggedIn",loggedIn);
     if(loggedIn != undefined){
      dispatch(hideLoader());
      if(loggedIn.status == true){

      }else{
        appConfig.functions.showError(loggedIn?.message);
      }
     }
     
 },[loggedIn])
 
    return (
      <Container>
       <HeaderPage title="" back={true}/>
        <ScrollView>
          <View style={[common.p20]}>
            <View style={[common.mb20]}>
              <Text
                style={[theme.fontregular, common.fontxxl, theme.colorblack]}>
                Sign in
              </Text>
              <Text
                style={[theme.fontregular, common.fontbody, theme.colorblack]}>
                Sign in to Continue
              </Text>
            </View>
            <View>
              <Form>
                <Item
                  floatingLabel
                  success
                  style={[common.ml0, common.pt10, common.mb20]}>
                  <Label>Username</Label>
                  <Input 
                   value={email}
                   onChangeText={(email)=>{setEmail(email)}}
                  ref={inputEmail}
                  onSubmitEditing={()=>{passwordInputRef._root.focus()}}
                  returnKeyType="next"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  />
                  <Icon
                    name="checkcircle"
                    type="AntDesign"
                    style={[common.fontmd]}
                  />
                </Item>
                <Item floatingLabel error style={[common.ml0, common.pt10]}>
                  <Label>Password</Label>
                  <Input 
                     value={password}
                     onChangeText={(password)=>{setPassword(password)}}
                     getRef={(c) => setPasswordInputRef(c)}
                     returnKeyType="done"
                    onSubmitEditing={validateForm}
                     secureTextEntry={true}
                  />
                  <Icon
                    name="exclamationcircleo"
                    type="AntDesign"
                    style={[common.fontmd]}
                  />
                </Item>
                <View style={[common.mt20]}>
                  <Button block bordered light style={[theme.button_orange]} onPress={validateForm}>
                    <Text
                      style={[theme.textcapital, common.white, common.fontmd]}>
                      Sign In
                    </Text>
                  </Button>
                </View>
                <View style={[common.mt20]}>
                  <TouchableOpacity>
                    <Text style={[common.textcenter, theme.themecolor]}>
                      Forgot Password ?
                    </Text>
                  </TouchableOpacity>
                </View>
              </Form>
            </View>
          </View>
        </ScrollView>
      </Container>
    );

}
 export default LoginPage;
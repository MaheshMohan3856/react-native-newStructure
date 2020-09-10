/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useState,useEffect} from 'react';
import {StatusBar, Image, TouchableOpacity, ScrollView, KeyboardAvoidingView} from 'react-native';
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
import {CommonActions} from '@react-navigation/native';
import OTPInputView from '@twotalltotems/react-native-otp-input'
import {showLoader, hideLoader} from '../actions/common/commonActions';
import {appConfig} from '../appConfig';
import {checkPhoneVerification,checkEmailVerification,resendOtp} from '../actions/login/loginActions';
import HeaderPage from './shared/header';
import {useSelector,useDispatch} from 'react-redux';




import { RootStackParamList } from '../RouteConfig';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { RootState } from '../appReducers';

type NotificationPageRouteProp = RouteProp<RootStackParamList, 'CreateAccount'>;

type NotificationPageNavigationProp = StackNavigationProp<
    RootStackParamList,
    'CreateAccount'
>;

type Props = {
    route: NotificationPageRouteProp;
    navigation: NotificationPageNavigationProp;
};

const VerifyPhone = (props:Props) => {
  const dispatch =  useDispatch();

  const [otp,setOtp] = useState('');

  const sendOtp = (otpp:String) => {
    
    if(props?.route?.params?.page == 'SignUp'){
    
    dispatch(showLoader());
    dispatch(checkPhoneVerification({otp:otpp}))
    }else{
       dispatch(showLoader());
      dispatch(checkEmailVerification({email:props?.route?.params?.email,otp:otpp}))
    }
  }

  const phoneVerified = useSelector((state:RootState)=>state.login_r._verifyPhone)
   useEffect(()=>{
       if(phoneVerified != undefined){
         dispatch(hideLoader());
         if(phoneVerified.status == true){
          props.navigation.dispatch(
            CommonActions.reset({
              index: 1,
              routes: [
                { name: 'HomePage' },
                
              ],
            })
          );
         }else{
           appConfig.functions.showError(phoneVerified.message);
         }
       }
   },[phoneVerified])

   const emailVerified = useSelector((state:RootState)=>state.login_r._verifyEmail)
   useEffect(()=>{
    if(emailVerified != undefined){
      dispatch(hideLoader());
      if(emailVerified.status == true){
         props.navigation.push('ResetPassword',{email:props?.route?.params?.email})
      }else{
        appConfig.functions.showError(emailVerified.message);
      }
    }
},[emailVerified])

const resentOtp = () =>{
  if(props?.route?.params?.page == 'SignUp'){
      let phn = props.route?.params?.phone
      dispatch(showLoader())
      dispatch(resendOtp({otp_type:'phone',data:phn}))
  }else{
    dispatch(showLoader())
      dispatch(resendOtp({otp_type:'email',data:props.route?.params?.email}))
  }
}

const resended = useSelector((state:RootState)=>state.login_r._resend);
useEffect(()=>{
  if(resended != undefined){
    dispatch(hideLoader());
    if(resended.status == true){
      appConfig.functions.successMsg(resended.message);
    }else{
      appConfig.functions.showError(resended.message);
    }
  }
},[resended])


    return (
      <Container>
        <HeaderPage title="" back={true} />
        <KeyboardAvoidingView behavior="padding">
        <ScrollView>
          <View style={[common.p20]}>
            <View style={[common.mb20]}>
              {
                props?.route?.params?.page == 'SignUp'
                &&
                <Text
                style={[theme.fontregular, common.fontxxl, theme.colorblack]}>
                Verify Phone Number
              </Text>
              }
              {
                props?.route?.params?.page == 'ForgotPassword'
                &&
                <Text
                style={[theme.fontregular, common.fontxxl, theme.colorblack]}>
                Verify Email Address
              </Text>
              }
              
              <Text
                style={[theme.fontregular, common.fontbody, theme.colorblack]}>
                Please enter the verification code sent to
              </Text>
              {
                props?.route?.params?.page == 'SignUp'
                &&
              <Text style={[theme.fontbold]}>{ props?.route?.params?.phone} </Text>
              }
              {
                props?.route?.params?.page == 'ForgotPassword'
                &&
              <Text style={[theme.fontbold]}>{ props?.route?.params?.email} </Text>
              }
              {/* <TouchableOpacity>
                <Text style={[common.pt10, theme.themecolor]}>
                  Change Phone Number?
                </Text>
              </TouchableOpacity> */}
            </View>
            <View style={(common.pt20, common.mt20)}>
              <Image
                source={require('../assets/images/otp.png')}
                style={[common.mt20, common.center, {width: 214, height: 177}]}
              />
            </View>
            <View>
              <Form>
                <View
                  style={[
                  
                    {paddingTop:30},
                    common.p15,
                  ]}>
                <View style={{}}>
                
                   
                <OTPInputView 
                 pinCount={4}
                 style={{height:60,}}
                 codeInputFieldStyle={{color:"#F16436",borderWidth: 0,borderBottomWidth: 1,fontSize:24}}
                 codeInputHighlightStyle={{ borderColor: "#F16436"}}
                 code={otp}
                 onCodeChanged={(otp)=>{setOtp(otp)}}
                 onCodeFilled={(otp)=>sendOtp(otp)}
                />
            
            </View>
                </View>

                <View style={[common.mt20]}>
                  <TouchableOpacity onPress={resentOtp}>
                    <Text
                      style={[
                        common.pt10,
                        theme.themecolor,
                        common.textcenter,
                      ]}>
                      Resend Code?
                    </Text>
                  </TouchableOpacity>
                </View>
              </Form>
            </View>
          </View>
        </ScrollView>
        </KeyboardAvoidingView>
      </Container>
    );
  }
export default VerifyPhone

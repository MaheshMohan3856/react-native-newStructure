/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useState,useRef, useEffect} from 'react';
import {Platform,StatusBar, Image, TouchableOpacity,KeyboardAvoidingView,TouchableWithoutFeedback,Keyboard} from 'react-native';
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
  ListItem,
} from 'native-base';

import {theme} from '../css/theme';
import {common} from '../css/common';
import CountryPicker from 'react-native-country-picker-modal';
import {showLoader, hideLoader} from '../actions/common/commonActions';
import {appConfig} from '../appConfig';
import {login,signup,_signup} from '../actions/login/loginActions';
import HeaderPage from './shared/header';
import {useSelector,useDispatch} from 'react-redux';


import CheckBox from 'react-native-check-box';
import { ScrollView } from 'react-native-gesture-handler';

import { RootStackParamList } from '../RouteConfig';
import messaging from '@react-native-firebase/messaging';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { RootState } from '../appReducers';
import AsyncStorage from '@react-native-community/async-storage';
import Storage from 'react-native-storage';
var storage = new Storage({size: 1000,storageBackend: AsyncStorage,defaultExpires: 1000 * 3600 * 24,enableCache: false});

type NotificationPageRouteProp = RouteProp<RootStackParamList, 'CreateAccount'>;

type NotificationPageNavigationProp = StackNavigationProp<
    RootStackParamList,
    'CreateAccount'
>;

type Props = {
    route: NotificationPageRouteProp;
    navigation: NotificationPageNavigationProp;
};


const CreateAccount = (props:Props) => {

  const dispatch = useDispatch();

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone,setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [conpassword, setConpassword] = useState('');
 

  const inputFirstName: any = useRef(null);
  const [inputLastName, setInputLastName] = useState<any>(null)
  const [passwordInputRef, setPasswordInputRef] = useState<any>(null)
  const [emailInputRef, setEmailInputRef] = useState<any>(null);
  const [phoneInputRef, setPhoneInputRef] = useState<any>(null);
  const [conpasswordInputRef, setConpasswordInputRef] = useState<any>(null);

  const [code,setCode] = useState('+1')
  const [withCallingCode, setWithCallingCode] = useState<boolean>(true)
  const [withAlphaFilter, setWithAlphaFilter] = useState<boolean>(true)
  const [countryCode, setCountryCode] = useState('US')
  const [visible,setVisible] = useState(false)
  const [deviceToken,setDeviceToken] = useState('')

  const onSelect = (country: any) => {
    setCountryCode(country.cca2);
    setCode("+" + country.callingCode[0]); 
  }


  function ValidateEmail(mail:string) {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail)){
        return (true)
      }
     return (false)
}

const validateForm = () => {
  let emailCheck = ValidateEmail(email)
  if(firstName==''){
    appConfig.functions.showError('Enter first name')
    return
  }if(lastName==''){
    appConfig.functions.showError('Enter last name')
    return
  }else if(email==''){
    appConfig.functions.showError('Enter your email')
    return
  }else if(emailCheck == false){
     appConfig.functions.showError('Invalid email format')
      return
   }else if(phone==''){
     appConfig.functions.showError('Enter a valid phone number')
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
      let phn=code.concat(phone)
      dispatch(showLoader())
      dispatch(signup({first_name:firstName,last_name:lastName,email:email,phone:phone,phone_prefix:code,password:password,device_token:deviceToken}))
   }
}


useEffect(()=>{
  messaging()
    .getToken()
    .then(token => {
      setDeviceToken(token)
    });
  return () => {
    dispatch(_signup(undefined))
  }
},[])


const signUpped = useSelector((state:RootState)=>state.login_r._signup)

useEffect(()=>{
  console.log('signUpped',signUpped);
  if(signUpped != undefined){
    dispatch(hideLoader())
    if(signUpped.status == true){
      storage.save({
        key:"userData",
        data:signUpped.user_details,
        expires: null
      });
        props.navigation.push('VerifyPhone',{page:'SignUp',phone:phone,code:code,email:''})
        
    }else{
      appConfig.functions.showError(signUpped.message);
    }
  }
},[signUpped])
 
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
                Create your account
              </Text>
              <Text
                style={[theme.fontregular, common.fontbody, theme.colorblack]}>
                Fill the details & create your wuw account
              </Text>
            </View>
            <View>
              <Form>
                <Item floatingLabel style={[common.ml0, common.pt10]}>
                  <Label>First Name</Label>
                  <Input 
                     value={firstName}
                     onChangeText={(name)=>{setFirstName(name)}}
                    ref={inputFirstName}
                    onSubmitEditing={()=>{inputLastName._root.focus()}}
                    returnKeyType="next"
                  />
                </Item>
                <Item floatingLabel style={[common.ml0, common.pt10]}>
                  <Label>Last Name</Label>
                  <Input 
                    value={lastName}
                    onChangeText={(name)=>{setLastName(name)}}
                    getRef={(c) => setInputLastName(c)}
                   onSubmitEditing={()=>{emailInputRef._root.focus()}}
                   returnKeyType="next"
                  />
                </Item>
                <Item floatingLabel style={[common.ml0, common.pt10]}>
                  <Label>Email</Label>
                  <Input 
                   value={email}
                   onChangeText={(email)=>{setEmail(email)}}
                   getRef={(c) => setEmailInputRef(c)}
                   onSubmitEditing={()=>{passwordInputRef._root.focus()}}
                   returnKeyType="next"
                   keyboardType="email-address"
                   autoCapitalize="none"
                  />
                </Item>
                <View>
                <Label style={[ common.textgray, common.mt10,{fontSize:15}]}>
                  Phone Number
                </Label>
                <View style={[common.flexrow]}>
                  <Item style={[common.ml0, common.pt10, {flex: 1}]}>
                  
                  
                     <CountryPicker
                        {...{
                          countryCode,
                          withCallingCode,
                          withAlphaFilter,
                          onSelect,
                        }}
                        visible={visible}
                        onOpen={()=>setVisible(true)}
                      />
              
        
                  
                    
                  </Item>
                  <Item style={[common.ml10, common.pt10, {flex: 3,paddingLeft:10}]}>
                    <Input  
                      value={phone}
                      onChangeText={(phone)=>{setPhone(phone)}}
                      getRef={(c) => setPhoneInputRef(c)}
                      
                      returnKeyType="next"
                      keyboardType="number-pad"
                    />
                  </Item>
                </View>
              </View>
                <Item floatingLabel style={[common.ml0, common.pt10]}>
                  <Label>Password</Label>
                  <Input 
                    value={password}
                    onChangeText={(password)=>{setPassword(password)}}
                    getRef={(c) => setPasswordInputRef(c)}
                   onSubmitEditing={()=>{conpasswordInputRef._root.focus()}}
                   returnKeyType="next"
                   secureTextEntry={true}
                  />
                </Item>
                <Item floatingLabel style={[common.ml0, common.pt10]}>
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
                <View>
                <Text style={[common.pt10,{color:"#F16436"}]}>By Signing Up, you are agreeing to the <Text style={{color:"#F16436",textDecorationLine:"underline",textDecorationColor:"black"}} onPress={()=>props.navigation.push('Terms')}>Terms</Text> and <Text style={{color:"#F16436",textDecorationLine:"underline",textDecorationColor:"black"}} onPress={()=>props.navigation.push('Privacy')}>Privacy</Text></Text>
                </View>
                  {/* <CheckBox
                    style={[common.pt10]}
                    checkedCheckBoxColor="#F16436"
                    uncheckedCheckBoxColor="#DCDCDC"
                    rightTextStyle={{color:"#F16436"}}
                    onClick={() => {
                     setChecked(!checked);
                    }}
                    isChecked={checked}
                    rightText={'Terms & Conditions'}
                  /> */}
                  

                <View style={[common.mt20]}>
                  <Button block light style={[theme.button_orange]} onPress={validateForm}>
                    <Text
                      style={[theme.textcapital, common.white, common.fontmd]}>
                      Create
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
export default CreateAccount;

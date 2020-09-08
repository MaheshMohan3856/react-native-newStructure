/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useState,useRef} from 'react';
import {StatusBar, Image, TouchableOpacity} from 'react-native';
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
import {login} from '../actions/login/loginActions';
import HeaderPage from './shared/header';
import {useSelector,useDispatch} from 'react-redux';

import CheckBox from 'react-native-check-box';
import { ScrollView } from 'react-native-gesture-handler';

import { RootStackParamList } from '../RouteConfig';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';

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

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone,setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [conpassword, setConpassword] = useState('');
  
  const [checked,setChecked] = useState(true)

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

  const onSelect = (country: any) => {
    
    setCountryCode(country.cca2);
    setCode("+" + country.callingCode[0]);

   
  }
 
    return (
      <Container>
        <HeaderPage title="" back={true}/>
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
                <Label style={[theme.inputlabel, common.textgray, common.mt10]}>
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
                  <Item style={[common.ml0, common.pt10, {flex: 3,paddingLeft:10}]}>
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
                    onSubmitEditing={()=>{}}
                    returnKeyType="done"
                    secureTextEntry={true}
                  />
                </Item>
                <View>
                  <CheckBox
                    style={[common.pt10]}
                    checkedCheckBoxColor="#F16436"
                    uncheckedCheckBoxColor="#DCDCDC"
                    rightTextStyle={{color:"#F16436"}}
                    onClick={() => {
                     setChecked(!checked);
                    }}
                    isChecked={checked}
                    rightText={'Terms & Conditions'}
                  />
                </View>

                <View style={[common.mt20]}>
                  <Button block light style={[theme.button_orange]}>
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
export default CreateAccount;

import React, {useState, useEffect, useRef} from 'react'
import {StatusBar, Image, TouchableOpacity, ScrollView ,KeyboardAvoidingView,Platform} from 'react-native'
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
  Right,
  Picker,
  Icon,
  ListItem,
} from 'native-base'

import {theme} from '../css/theme'
import {common} from '../css/common'
import {CommonActions} from '@react-navigation/native';
import {showLoader, hideLoader} from '../actions/common/commonActions'
import {appConfig} from '../appConfig'
import { addNewBank,_addNewBank} from '../actions/payment/paymentActions'
import HeaderPage from './shared/header'
import {useSelector, useDispatch} from 'react-redux'

import {RootStackParamList} from '../RouteConfig'
import {StackNavigationProp} from '@react-navigation/stack'
import {RouteProp} from '@react-navigation/native'
import {RootState} from '../appReducers'
import CountryPicker, {DARK_THEME} from 'react-native-country-picker-modal'
import stripe from 'tipsi-stripe'

import { TextInputMask } from 'react-native-masked-text'

type NotificationPageRouteProp = RouteProp<RootStackParamList, 'AddNewBank'>

type NotificationPageNavigationProp = StackNavigationProp<
  RootStackParamList,
  'AddNewBank'
>

type Props = {
  route: NotificationPageRouteProp
  navigation: NotificationPageNavigationProp
}

const AddNewBank = (props: Props) => {

  const dispatch = useDispatch()

  const [accountFirstName, setAccountFirstName] = useState('')
  const [accountLastName, setAccountLastName] = useState('')
  const [routingNumber, setroutingNumber] = useState('')
  const [accountNumber, setaccountNumber] = useState('')
  

  const [accountFirstNameRef, setaccountFirstNameRef] = useState<any>(null)
  const [accountLastameRef, setaccountLastNameRef] = useState<any>(null)
  const [routingNumberRef, setroutingNumberRef] = useState<any>(null)
  const [accountInputRef, setaccountInputRef] = useState<any>(null)
 



  
  
  const addNewBankData = useSelector(
    (state: RootState) => state.payment_r._addNewBank,
  )

  useEffect(() => {
    dispatch(hideLoader())
    console.log('addbankData', addNewBankData)
    if (addNewBankData && addNewBankData.status == true) {
      if (addNewBankData && addNewBankData.message) {
        appConfig.functions.successMsg(addNewBankData.message);
       }
       props.navigation.navigate('PaymentCards');
      dispatch(_addBankAccount(undefined))
    } else {
      if (addNewBankData && addNewBankData.message) {
        appConfig.functions.showError(addNewBankData.message);
        dispatch(_addBankAccount(undefined))
        return
      }
    }
  }, [addNewBankData])

  function validateBankAccount () {
   
    if (accountFirstName == '') {
      appConfig.functions.showError('Please enter account holder first name')
      return
    } else if (accountLastName == '') {
      appConfig.functions.showError('Please enter account holder last name')
      return
    } else if (routingNumber == '' || routingNumber.length < 9) {
      appConfig.functions.showError('Please enter valid routing number')
      return
    } else if (accountNumber == '' || accountNumber.length < 12) {
      appConfig.functions.showError('Please enter valid account number')
      return
    }else {
      dispatch(showLoader())
     
      dispatch(addNewBank({
        first_name:accountFirstName,
        last_name:accountLastName,
        account_number: accountNumber,
        routing_number: routingNumber,
        bank_account_id:props?.route?.params?.account_id
        
      }))
    }
  }
  return (
    <Container>
      <>
<StatusBar barStyle="dark-content" />
<Header
  androidStatusBarColor="#fff"
  transparent
  iosBarStyle="dark-content"
  style={[theme.themeheader]}>
  <Left>
  
      <Icon
        name="chevron-small-left"
        type="Entypo"
        style={[theme.colorblack, common.fontxxxl]}
        onPress={()=>props.navigation.navigate('HomePage')}
      />    
  </Left>
  <Body />
  <Right />
    
</Header>
</>
      <KeyboardAvoidingView style={{ flex: 1, flexDirection: 'column',justifyContent: 'center',}}  behavior={Platform.OS == "ios" ? "padding" : "height"}  enabled   keyboardVerticalOffset={2}>
      <ScrollView>
        <View style={[common.p20]}>
          <View style={[]}>
            <Text style={[theme.fontregular, common.fontxxl, theme.colorblack]}>
              Add Bank Account
            </Text>
          </View>
          <View>
            <Form>
            <Item regular style={[common.bordergray, common.pl15, common.mt15, common.ml0]}>
              <Input placeholder='Account holders first name' placeholderTextColor="#373737" style={[common.textsmall]} 
                value={accountFirstName}
                onChangeText={(accountFirstName)=>{setAccountFirstName(accountFirstName)}}
                returnKeyType="next"
                onSubmitEditing={()=>{accountLastameRef._root.focus()}}
                getRef={accountFirstNameRef}
              />
            </Item>
            <Item regular style={[ common.pl15, common.mt15, common.ml0]}>
              <Input placeholder='Account holders last name' placeholderTextColor="#373737" style={[common.textsmall]} 
                value={accountLastName}
                onChangeText={(accountLastName)=>{setAccountLastName(accountLastName)}}
                returnKeyType="next"
                onSubmitEditing={()=>{routingNumberRef.focus()}}
                ref={ref => { setaccountLastNameRef(ref) }}
              />
            </Item>
            <View regular style={[  common.mt15, common.ml0]}>
             
              <TextInputMask
                    placeholder='Routing Number' placeholderTextColor="#373737" 
                     keyboardType={"numeric"} 
                    style={{height:50,borderColor:"#E0DFEC",borderWidth:1,paddingLeft:25}}
                    refInput={ref => { setroutingNumberRef(ref) }}
                    includeRawValueInChangeText={true}
                    onChangeText={(maskedText, rawText) => {
                      setroutingNumber(maskedText)
                    }}
                    value={routingNumber}
                    type={'custom'}
                    options={{
                   
                      mask: '999999999'
                    }}   
                    onSubmitEditing={()=>{accountInputRef.focus()}}
                    returnKeyType="next"
                    
             />
            </View>
            <View regular style={[  common.mt15, common.ml0]}>
             
              <TextInputMask
                    placeholder='Account Number' placeholderTextColor="#373737" 
                    keyboardType={"numeric"} 
                    style={{height:50,borderColor:"#E0DFEC",borderWidth:1,paddingLeft:25}}
                    refInput={ref => { setaccountInputRef(ref) }}
                    includeRawValueInChangeText={true}
                    onChangeText={(maskedText, rawText) => {
                      setaccountNumber(maskedText)
                    }}
                    value={accountNumber}
                    type={'custom'}
                    options={{
                   
                      mask: '999999999999999999'
                    }}   
                    onSubmitEditing={()=>{validateBankAccount()}}
                    returnKeyType="done"
                    

             />
            </View>
            

              <View style={[common.mt20]}>
                <Button
                  block
                  light
                  style={[theme.button_orange, {marginTop: 40}]}
                  onPress={() => {
                    validateBankAccount()
                  }}>
                  <Text
                    style={[theme.textcapital, common.white, common.fontmd]}>
                    Save
                  </Text>
                </Button>
              </View>
            </Form>
          </View>
        </View>
      </ScrollView>
      </KeyboardAvoidingView>
    </Container>
  )
}
export default AddNewBank
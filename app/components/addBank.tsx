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
  
  Icon,
  ListItem,
} from 'native-base'

import {theme} from '../css/theme'
import {common} from '../css/common'
import {CommonActions} from '@react-navigation/native';
import {showLoader, hideLoader} from '../actions/common/commonActions'
import {Picker} from '@react-native-picker/picker';
import Modal from 'react-native-modal'
import {appConfig} from '../appConfig'
import { addBankAccount,_addBankAccount} from '../actions/payment/paymentActions'
import HeaderPage from './shared/header'
import {useSelector, useDispatch} from 'react-redux'

import {RootStackParamList} from '../RouteConfig'
import {StackNavigationProp} from '@react-navigation/stack'
import {RouteProp} from '@react-navigation/native'
import {RootState} from '../appReducers'
import CountryPicker, {DARK_THEME} from 'react-native-country-picker-modal'
import stripe from 'tipsi-stripe'

import { TextInputMask } from 'react-native-masked-text'

type NotificationPageRouteProp = RouteProp<RootStackParamList, 'AddBankACPage'>

type NotificationPageNavigationProp = StackNavigationProp<
  RootStackParamList,
  'AddBankACPage'
>

type Props = {
  route: NotificationPageRouteProp
  navigation: NotificationPageNavigationProp
}

const AddBankACPage = (props: Props) => {
  const dispatch = useDispatch()

  const [accountFirstName, setAccountFirstName] = useState('')
  const [accountLastName, setAccountLastName] = useState('')
  const [routingNumber, setroutingNumber] = useState('')
  const [accountNumber, setaccountNumber] = useState('')
  const [ssn,setSsn] = useState('')
  const [address,setAddress] = useState('')
  const [city,setCity] = useState('')
  const [state,setState] = useState('')
  const [zip,setZip] = useState('')
  const [phone,setPhone] = useState('')
  const [dob,setDob] = useState('')
  const [gender,setGender] = useState('male')

  const [accountFirstNameRef, setaccountFirstNameRef] = useState<any>(null)
  const [accountLastameRef, setaccountLastNameRef] = useState<any>(null)
  const [routingNumberRef, setroutingNumberRef] = useState<any>(null)
  const [accountInputRef, setaccountInputRef] = useState<any>(null)
  const [ssnRef,setssnRef] = useState<any>(null)
  const [addressRef,setaddressRef] = useState<any>(null)
  const [cityRef,setcityRef] = useState<any>(null)
  const [stateRef,setstateRef] = useState<any>(null)
  const [zipRef,setzipRef] = useState<any>(null)
  const [phoneRef,setphoneRef] = useState<any>(null)
  const [dobRef,setdobRef] = useState<any>(null)


  const [isModalVisible,setIsModalVisible] = useState(false) 

  const toggleModal = () => {
   setIsModalVisible( !isModalVisible);
 };
  
  
  const addbankData = useSelector(
    (state: RootState) => state.payment_r._addBankAccount,
  )

  useEffect(() => {
    dispatch(hideLoader())
    console.log('addbankData', addbankData)
    if (addbankData && addbankData.status == true) {
      if (addbankData && addbankData.message) {
        appConfig.functions.successMsg(addbankData.message);
       }
       setTimeout(()=>{
        props.navigation.dispatch(
          CommonActions.reset({
            index: 1,
            routes: [
              { name: 'HomePage' },
              
            ],
          })
        );
      },500)
      dispatch(_addBankAccount(undefined))
    } else {
      if (addbankData && addbankData.message) {
        appConfig.functions.showError(addbankData.message);
        dispatch(_addBankAccount(undefined))
        return
      }
    }
  }, [addbankData])

  function validateBankAccount () {
    let splitstring = dob.split('/');

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
    }else if (ssn == '' || ssn.length < 4) {
      appConfig.functions.showError('Please enter valid last 4 digit of ssn')
      return
    }else if (address == '') {
      appConfig.functions.showError('Please enter address')
      return
    }else if (city == '') {
      appConfig.functions.showError('Please enter city')
      return
    }else if (state == '') {
      appConfig.functions.showError('Please enter state')
      return
    } else if (zip == '' || zip.length < 5) {
      appConfig.functions.showError('Please enter valid zip code')
      return
    }else if (dob == '') {
      appConfig.functions.showError('Please enter date of birth')
      return
    }else if (gender == '') {
      appConfig.functions.showError('Please select gender')
      return
    }else if(splitstring[0] == undefined){
      appConfig.functions.showError('Please enter birth day,  please enter correctly');
      return;

    }else if(splitstring[0].length != 2){
                appConfig.functions.showError('Birth Day should contain 2 digit, please enter correctly');
                return;
          
    }else if(parseInt(splitstring[0]) > 31){
      appConfig.functions.showError('Birth Day should not be greater than 31, please enter correctly');
      return;

    } else if(splitstring[1] == undefined){
      appConfig.functions.showError('Please enter birth month, please enter correctly');
      return;

    }else if(splitstring[1].length != 2){
                appConfig.functions.showError('Birth Month should contain 2 digit, please enter correctly');
                return;
          
    }else if(parseInt(splitstring[1]) > 12){
      appConfig.functions.showError('Birth Month should not be greater than 12, please enter correctly');
      return;

    }else if(splitstring[2] == undefined){
      appConfig.functions.showError('Please enter birth year, please enter correctly');
      return;

    }else if(splitstring[2].length != 4){
                appConfig.functions.showError('Birth year should contain 4 digit, please enter correctly');
                return;
         
    }  else {
      dispatch(showLoader())
      let dateSplit = splitstring[2] + '-' +splitstring[1] + '-' + splitstring[0]
      dispatch(addBankAccount({
        first_name:accountFirstName,
        last_name:accountLastName,
        account_number: accountNumber,
        routing_number: routingNumber,
        ssn_last_4:ssn,
        address:address,
        city:city,
        state:state,
        zip_code:zip,
        phone:phone,
        dob:dateSplit,
        gender:gender
        
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
                    onSubmitEditing={()=>{ssnRef.focus()}}
                    returnKeyType="next"
                    

             />
            </View>
            <View regular style={[  common.mt15, common.ml0]}>
             
                <TextInputMask
                    placeholder='SSN Last 4 Digits' placeholderTextColor="#373737"  keyboardType={"numeric"} 
                    style={{height:50,borderColor:"#E0DFEC",borderWidth:1,paddingLeft:25}}
                    refInput={ref => { setssnRef(ref) }}
                    includeRawValueInChangeText={true}
                    onChangeText={(maskedText, rawText) => {
                      setSsn(maskedText)
                    }}
                    value={ssn}
                    type={'custom'}
                    options={{
                   
                      mask: '9999'
                    }}   
                    onSubmitEditing={()=>{addressRef._root.focus()}}
                    returnKeyType="next"
                    
             />
            </View>

            <Item regular style={[ common.pl15, common.mt15, common.ml0]}>
              <Input placeholder='Address' placeholderTextColor="#373737"  
                 value={address}
                 onChangeText={(address)=>{setAddress(address)}}
                 returnKeyType="next"
                 onSubmitEditing={()=>{cityRef._root.focus()}}
                 ref={o=> {setaddressRef(o)}}
              />
            </Item>
            <Item regular style={[ common.pl15, common.mt15, common.ml0]}>
              <Input placeholder='City' placeholderTextColor="#373737" 
                 value={city}
                 onChangeText={(city)=>{setCity(city)}}
                 returnKeyType="next"
                 onSubmitEditing={()=>{stateRef._root.focus()}}
                 ref={ref => { setcityRef(ref) }}
              />
            </Item>
            <Item regular style={[ common.pl15, common.mt15, common.ml0]}>
              <Input placeholder='State' placeholderTextColor="#373737"  
                 value={state}
                 onChangeText={(state)=>{setState(state)}}
                 returnKeyType="next"
                 onSubmitEditing={()=>{zipRef.focus()}}
                 ref={ref => { setstateRef(ref) }}
              />
            </Item>
            <View regular style={[  common.mt15, common.ml0]}>
              
               <TextInputMask
                    placeholder='Zipcode' placeholderTextColor="#373737"  keyboardType={"numeric"} 
                    style={{height:50,borderColor:"#E0DFEC",borderWidth:1,paddingLeft:25}}
                    refInput={ref => { setzipRef(ref) }}
                    includeRawValueInChangeText={true}
                    onChangeText={(maskedText, rawText) => {
                      setZip(maskedText)
                    }}
                    value={zip}
                    type={'custom'}
                    options={{
                   
                      mask: '999999'
                    }}   
                    onSubmitEditing={()=>{phoneRef.focus()}}
                    returnKeyType="next"

             />
            </View>
            <View regular style={[  common.mt15, common.ml0]}>
            
               <TextInputMask
                    placeholder='Phone' placeholderTextColor="#373737"  keyboardType={"numeric"} 
                    style={{height:50,borderColor:"#E0DFEC",borderWidth:1,paddingLeft:25}}
                    refInput={ref => { setphoneRef(ref) }}
                    includeRawValueInChangeText={true}
                    onChangeText={(maskedText, rawText) => {
                      setPhone(maskedText)
                    }}
                    value={phone}
                    type={'custom'}
                    options={{
                   
                      mask: '9999999999'
                    }}   
                    onSubmitEditing={()=>{dobRef.focus()}}
                    returnKeyType="next"

             />
            </View>
           
            <View regular style={[  common.mt15, common.ml0]}>
              
               <TextInputMask
                    placeholder='DOB: Day/Month/Year' placeholderTextColor="#373737"  keyboardType={"numeric"} 
                    style={{height:50,borderColor:"#E0DFEC",borderWidth:1,paddingLeft:25}}
                    refInput={ref => { setdobRef(ref) }}
                    includeRawValueInChangeText={true}
                    onChangeText={(maskedText, rawText) => {
                      setDob(maskedText)
                    }}
                    value={dob}
                    type={'custom'}
                    options={{
                   
                      mask: '99/99/9999'
                    }}   
                    
                    returnKeyType="done"

             />
            </View>
            <View regular style={[  common.mt15, common.ml0,{borderColor:"#E0DFEC",borderWidth:1,height:50}]}>
            {
            Platform.OS === 'ios'
            &&
            <Text style={[common.pr10,{paddingLeft:25,lineHeight:45}]} onPress={()=>toggleModal()}>{gender}</Text>
          }
          {
            Platform.OS === 'android'
            &&
            <Picker
              selectedValue={gender}
              
              //style={{height: 50, width: 100,marginTop:-14}}
              style={{height:50,marginLeft:25}}
              onValueChange={(itemValue, itemIndex) =>{
                setGender(itemValue)
                
              }
              }>
                  
                  <Picker.Item  label="male" value="male" />
                  <Picker.Item  label="female" value="female" />
            
            
            </Picker>
          }
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
      <Modal isVisible={isModalVisible}>
          <View style={[common.flexbox]}>
            <View style={[theme.boxmodel]}>
            <Picker
                  selectedValue={gender}
                  style={{height: 150, width: '100%',marginTop:-30}}
                  onValueChange={(itemValue, itemIndex) =>{
                    toggleModal()
                    setGender(itemValue)
                    
                  }
                  }>
                   
                   <Picker.Item  label="male" value="male" />
                   <Picker.Item  label="female" value="female" />
                </Picker>
            
            </View>
          </View>
        </Modal>
    </Container>
  )
}
export default AddBankACPage
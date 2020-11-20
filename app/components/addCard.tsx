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
  Picker,
  Icon,
  ListItem,
} from 'native-base'

import {theme} from '../css/theme'
import {common} from '../css/common'
import {showLoader, hideLoader} from '../actions/common/commonActions'
import {appConfig} from '../appConfig'
import { createCardToken,_createCardToken } from '../actions/payment/paymentActions'
import HeaderPage from './shared/header'
import {useSelector, useDispatch} from 'react-redux'

import {RootStackParamList} from '../RouteConfig'
import {StackNavigationProp} from '@react-navigation/stack'
import {RouteProp} from '@react-navigation/native'
import {RootState} from '../appReducers'
import stripe from 'tipsi-stripe';

import { TextInputMask } from 'react-native-masked-text'
import { StackActions } from '@react-navigation/native';

stripe.setOptions({
  publishableKey:
    'pk_test_51HKBT4JJrX5vf6qopBbeitv6x7wrP8v4EA5S2zpe2ipQ0ZPXYOkJIiLEqtP3QTufxPRhSM8jjWArcl6T0WW1zs3l00lLqziyHY',
  merchantId: 'MERCHANT_ID', // Optional
  androidPayMode: 'test', // Android only
})
type NotificationPageRouteProp = RouteProp<RootStackParamList, 'AddCard'>

type NotificationPageNavigationProp = StackNavigationProp<
  RootStackParamList,
  'AddCard'
>

type Props = {
  route: NotificationPageRouteProp
  navigation: NotificationPageNavigationProp
}

const AddCard = (props: Props) => {

  const dispatch = useDispatch()

  const [name, setName] = useState('')
  const [cardNumber, setCardNumber] = useState('')
 
  const [expiry, setExpiry] = useState('')

  const [cvv, setCvv] = useState('')
 

  const [cardNumberRef, setCardNumberRef] = useState<any>(null)
  const [expiryRef, setExpiryRef] = useState<any>(null)
  const [cvvRef, setCvvRef] = useState<any>(null)




  const addCardData = useSelector((state: RootState) => state.payment_r._addCard)

  useEffect(() => {
    if(addCardData != undefined){
      dispatch(hideLoader())
      if(addCardData.status == true){
        if(props?.route?.params?.page == 'LaundryList' || props?.route?.params?.page == 'RequestMoney'){
          props.navigation.dispatch(
            StackActions.replace(props?.route?.params?.page, {})
            
          );
        }else{
           props.navigation.navigate('PaymentCards');
        }
        
        dispatch(_createCardToken(undefined))
        
      }else{
           appConfig.functions.showError(addCardData.message);
           dispatch(_createCardToken(undefined))
      }
    }
   
    
  }, [addCardData])

  const  validateCard = async () => {
    if (name == '') {
      appConfig.functions.showError('Please enter card holder name')
      return
    } else if (cardNumber == '' || cardNumber.length < 12) {
      appConfig.functions.showError('Please enter valid card number')
      return
    } else if (expiry == '') {
      appConfig.functions.showError('Please enter expiry')
      return
    }else if (cvv == '') {
      appConfig.functions.showError('Please enter cvv')
      return
    } else {
      let splitstring = expiry.split('/')
      let cardDet = {
        number:cardNumber,
        name:name,
        cvv:cvv,
        expMonth :parseInt(splitstring[0]),
        expYear :parseInt(splitstring[1]),
      }

      
      dispatch(showLoader())
      try{
       

        const token = await stripe.createTokenWithCard(cardDet);

        
       
        dispatch(createCardToken({token:token.tokenId}));
      }
      catch(err){
        dispatch(hideLoader)
        appConfig.functions.showError("Incorrect Card Details");
      }

    }
  }
  
  return (
    <Container>
      <StatusBar barStyle='dark-content' />
      <HeaderPage title='' back={true} />
      <KeyboardAvoidingView style={{ flex: 1, flexDirection: 'column',justifyContent: 'center',}}  behavior={Platform.OS == "ios" ? "padding" : "height"}  enabled   keyboardVerticalOffset={2}>
      <ScrollView>
        <View style={[common.p20]}>
          <View style={[]}>
            <Text style={[theme.fontregular, common.fontxxl, theme.colorblack]}>
              Add Card
            </Text>
          </View>
          <View style={common.mt10}>
            <Form>
              <Item regular style={[common.ml0,common.pl15 ]}>
              
                <Input
                  placeholder='Name On Card' 
                  placeholderTextColor="#A9A9A9"
                  style={{fontSize:14}}
                  value={name}
                  onChangeText={name => {
                    setName(name)
                  }}
                  keyboardType='default'
                  returnKeyType='next'
                  autoCapitalize='none'
                 onSubmitEditing={()=>{cardNumberRef.focus()}}
                  
                />
              </Item>
           <View regular style={[ common.mt15, common.ml0]}>
            <TextInputMask
                   
                    placeholder='Card Number'
                    keyboardType={'numeric'}
                    style={{height:50,borderColor:"#E0DFEC",borderWidth:1,paddingLeft:25}}
                    refInput={ref => { setCardNumberRef(ref) }}
                    includeRawValueInChangeText={true}
                      onChangeText={(maskedText, rawText) => {
                        // maskedText: 123.456.789-01
                        // rawText: 12345678901
                        setCardNumber(maskedText);
                        
                      }}
                      value={cardNumber}
                    type={'custom'}
                    options={{
                     
                      mask: '9999999999999999999'
                    }}
                    onSubmitEditing={()=>{expiryRef.focus()}}
                    returnKeyType="next"
             />
            </View>
            <View regular style={[  common.mt15, common.ml0]}>
             
              <TextInputMask
                    placeholder='Expiry Month & Year'
                    style={{height:50,borderColor:"#E0DFEC",borderWidth:1,paddingLeft:25}}
                    refInput={ref => { setExpiryRef(ref) }}
                   includeRawValueInChangeText={true}
                      onChangeText={(maskedText, rawText) => {
                        // maskedText: 123.456.789-01
                        // rawText: 12345678901
                        setExpiry(maskedText);
                        
                      }}
                      value={expiry}
                    type={'custom'}
                    options={{
                     
                      mask: '99/99'
                    }}
                    keyboardType={'numeric'}
                    onSubmitEditing={()=>{cvvRef.focus()}}
                    returnKeyType="next"
             />
            </View>
           <View regular style={[  common.mt15, common.ml0]}>
            <TextInputMask
                    placeholder='CVV'
                    style={{height:50,borderColor:"#E0DFEC",borderWidth:1,paddingLeft:25}}
                    refInput={ref => { setCvvRef(ref) }}
                    onChangeText={(maskedText, rawText) => {
                      // maskedText: 123.456.789-01
                      // rawText: 12345678901
                      setCvv(maskedText);
                      
                    }}
                    value={cvv}
                    type={'custom'}
                      options={{
                      
                        mask: '9999'
                      }}
                      keyboardType={'numeric'}
                      onSubmitEditing={()=>{validateCard()}}
                    returnKeyType="done"
             />
            </View>

              <View style={[common.mt20]}>
                <Button
                  block
                  light
                  style={[theme.button_orange, {marginTop: 40}]}
                  onPress={() => {
                    validateCard()
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
export default AddCard
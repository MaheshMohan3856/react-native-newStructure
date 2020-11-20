/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useState,useRef, useEffect} from 'react';
import {StatusBar, Image, TouchableOpacity, ScrollView,KeyboardAvoidingView,Platform,Keyboard,TouchableWithoutFeedback} from 'react-native';
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
  Right,
  ListItem,
  Thumbnail
} from 'native-base';

import {theme} from '../css/theme';
import {common} from '../css/common';


import CountryPicker from 'react-native-country-picker-modal';
import {showLoader, hideLoader} from '../actions/common/commonActions';
import {appConfig} from '../appConfig';
import {getUserProfile,editProfile,_editProfile,_profileEditted} from '../actions/settings/settingsActions';
import HeaderPage from './shared/header';
import {useSelector,useDispatch} from 'react-redux';


import CheckBox from 'react-native-check-box';
import {country} from '../countryList';
import ActionSheet from 'react-native-actionsheet';
import ImagePicker from 'react-native-image-crop-picker';

import { RootStackParamList } from '../RouteConfig';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { RootState } from '../appReducers';
import AsyncStorage from '@react-native-community/async-storage';
import Storage from 'react-native-storage';
var storage = new Storage({size: 1000,storageBackend: AsyncStorage,defaultExpires: 1000 * 3600 * 24,enableCache: false});

type NotificationPageRouteProp = RouteProp<RootStackParamList, 'EditProfile'>;

type NotificationPageNavigationProp = StackNavigationProp<
    RootStackParamList,
    'EditProfile'
>;

type Props = {
    route: NotificationPageRouteProp;
    navigation: NotificationPageNavigationProp;
};


const EditProfile = (props:Props) => {

  const dispatch = useDispatch()
  
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone,setPhone] = useState('');
  const [image,setImage] = useState('');
  const [source,setSource]=useState('');

  const inputFirstName: any = useRef(null);
  const [inputLastName, setInputLastName] = useState<any>(null)

  const [phoneInputRef, setPhoneInputRef] = useState<any>(null);


  const [code,setCode] = useState('+1')
  const [withCallingCode, setWithCallingCode] = useState<boolean>(true)
  const [withAlphaFilter, setWithAlphaFilter] = useState<boolean>(true)
  const [countryCode, setCountryCode] = useState('US')
  const [visible,setVisible] = useState(false)

  const actionsheet: any = useRef(null);

  const onSelect = (country: any) => {
    setCountryCode(country.cca2);
    setCode("+" + country.callingCode[0]); 
  }

  useEffect(()=>{
      dispatch(showLoader());
      dispatch(getUserProfile())
     
  },[])

  const profile = useSelector((state:RootState)=>state.settings_r._userProfile)

  useEffect(()=>{
         if(profile != undefined){
           dispatch(hideLoader())
           if(profile.status == true){
            setFirstName(profile.user_details.first_name);
            setLastName(profile.user_details.last_name);
            setPhone(profile.user_details.phone);
            setImage(profile.user_details.profile_image != undefined?profile.user_details.profile_image:'');
            setCode(profile.user_details.phone_prefix);
            country.map((item,index)=>{
              if(item.dial_code == profile.user_details.phone_prefix){
                setCountryCode(item.code);
              }
              
            })
           }else{
             appConfig.functions.showError(profile.message)
           }
         }
  },[profile])

  const pickImage = (index)=>{
   
    if(index == 0){
       
      ImagePicker.openCamera({
        width: 400,
        height: 400,
        cropping: true,
        includeBase64:true,
        mediaType:'photo'
      }).then(response => {
        console.log(response);
       
          setImage(response.path);
          setSource('data:image/jpeg;base64,' + response.data);
         
       

      });
      
    }else if(index == 1){
     
      ImagePicker.openPicker({
        width: 400,
        height: 400,
        cropping: true,
        includeBase64:true,
        mediaType:'photo'
      }).then(response => {
        
          setImage(response.path);
          setSource('data:image/jpeg;base64,'+ response.data);
         
      });
    }
  }



  const showActionSheet = () =>{
   
    actionsheet.current.show()
  }

  const validateForm = () => {
    
    if(firstName==''){
      appConfig.functions.showError('Enter your first name')
      return
    }else if(lastName == ''){
       appConfig.functions.showError('Enter your first name')
        return
     }else if(phone==''){
       appConfig.functions.showError('Enter phone number')
       return
    
    }else{
       
        dispatch(showLoader())
        if(source == ''){
          dispatch(editProfile({first_name:firstName,last_name:lastName,phone:phone,phone_prefix:code}))
        }else{
          dispatch(editProfile({first_name:firstName,last_name:lastName,phone:phone,phone_prefix:code,profile_image:source}))
        }
        
     }
  }

  const profileUpdated = useSelector((state:RootState)=>state.settings_r._updateProfile)

  useEffect(()=>{
       if(profileUpdated != undefined){
         dispatch(hideLoader())
         if(profileUpdated.status == true){
           storage.load({key:"userData"}).then((ret)=>{
             ret.profile_image = profileUpdated.user_details.profile_image;
             ret.first_name = profileUpdated.user_details.first_name;
             ret.last_name = profileUpdated.user_details.last_name;
             ret.phone = profileUpdated.user_details.phone;
             ret.phone_prefix = profileUpdated.user_details.phone_prefix;

             storage.save({key:"userData",data:ret,expires:null})
           })
           if(profileUpdated.phone_change_request == true){
             props.navigation.push('VerifyPhone',{page:'EditProfile',phone:phone,code:code,email:''})
             dispatch(_editProfile(undefined))
           }else{
              appConfig.functions.successMsg(profileUpdated.message)
               dispatch(_editProfile(undefined))
                setTimeout(()=>{
                  props.navigation.goBack()
                  dispatch(_profileEditted({editted:true}))
              },1000)
           }
           
            
          
         }else{
           appConfig.functions.showError(profileUpdated.message)
           dispatch(_editProfile(undefined))
         }
       }
  },[profileUpdated])
 
    return (
      <Container>
         <HeaderPage title="" back={true} right=""/>
         <KeyboardAvoidingView behavior={Platform.OS == "ios" ? "padding" : "height"} style={{flex:1}}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView>
          
        <View style={[common.p20,common.pl0,common.pb0]}>
        <View style={[common.ml20,common.mb20]}>
              <Text
                style={[theme.fontregular, common.fontxxl, theme.colorblack]}>
                Edit Profile
              </Text>
              
            </View>
          <ListItem avatar style={[common.center,common.mt15]} onPress={showActionSheet}>
            {
              (image == '' )
              &&
              <Thumbnail
                source={require('../assets/images/no-photo.jpg')}
                style={{width: 120, height: 120, borderRadius: 100}}
              />
            }
            {
              image != ''
              &&
              <Thumbnail
                source={{uri:image}}
                style={{width: 120, height: 120, borderRadius: 100}}
              />
            }
              
              <TouchableOpacity style={[theme.editsec]} onPress={showActionSheet}>
              <Icon
                name="edit"
                type="Entypo"
                style={[common.white, common.fontlg]}
              />
            </TouchableOpacity>
          </ListItem>
        </View>

          <View style={[common.p20]}>
            
            <View>
              <Form>
                 <View style={[{borderBottomWidth:.5,borderBottomColor:"lightgrey"}]}>
                  <Label style={[common.textgray,common.mt10,common.fontmd]}>First Name</Label>
                  <Input 
                     value={firstName}
                     onChangeText={(name)=>{setFirstName(name)}}
                    ref={inputFirstName}
                    onSubmitEditing={()=>{inputLastName._root.focus()}}
                    returnKeyType="next"
                  />
                </View>
                <View style={[{borderBottomWidth:.5,borderBottomColor:"lightgrey"}]}>
                  <Label style={[common.textgray,common.mt10,common.fontmd]}>Last Name</Label>
                  <Input 
                   value={lastName}
                   onChangeText={(name)=>{setLastName(name)}}
                   getRef={(c) => setInputLastName(c)}
                
                  returnKeyType="next"
                  />
            </View>
                
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
              
                <View style={[common.mt20]}>
                  <Button block light style={[theme.button_orange]} onPress={validateForm}>
                    <Text
                      style={[theme.textcapital, common.white, common.fontmd]}>
                      SAVE
                    </Text>
                  </Button>
                </View>
              </Form>
            </View>
          </View>
        </ScrollView>
        </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
        <ActionSheet
          ref={ actionsheet}
          title="Which one do you like?"
          options={["Camera","Gallery","Cancel"]}
          cancelButtonIndex={2}
          
          onPress={(index) => { pickImage(index) }}
        />
      </Container>
    );
  }

export default EditProfile
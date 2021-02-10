/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useEffect,useState,useRef} from 'react';
import {StatusBar, Image, TouchableOpacity,KeyboardAvoidingView,Platform,Keyboard,TouchableWithoutFeedback} from 'react-native';
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
import {showLoader, hideLoader} from '../actions/common/commonActions';
import {appConfig} from '../appConfig';
import {agentRegister,agentReg,_agentRegister} from '../actions/agentregister/agentregisterActions';
import HeaderPage from './shared/header';
import {useSelector,useDispatch} from 'react-redux';
import {CommonActions} from '@react-navigation/native';


import { ScrollView } from 'react-native-gesture-handler';

import { RootStackParamList } from '../RouteConfig';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { RootState } from '../appReducers';
import AsyncStorage from '@react-native-community/async-storage';
import Storage from 'react-native-storage';
import ActionSheet from 'react-native-actionsheet';
import ImagePicker from 'react-native-image-crop-picker';


var storage = new Storage({size: 1000,storageBackend: AsyncStorage,defaultExpires: 1000 * 3600 * 24,enableCache: false});

type NotificationPageRouteProp = RouteProp<RootStackParamList, 'AgentRegister'>;

type NotificationPageNavigationProp = StackNavigationProp<
    RootStackParamList,
    'AgentRegister'
>;

type Props = {
    route: NotificationPageRouteProp;
    navigation: NotificationPageNavigationProp;
};


const AgentRegister = (props:Props) => {
  const dispatch = useDispatch();

  const [money, setMoney] = useState('');
  const [license, setLicense] = useState('');
  const [ssn, setSsn] = useState('');
  const [vehicle,setVehicle] = useState('');
  const [mandm, setMandm] = useState('');
  const [color, setColor] = useState('');
  
  const [checked,setChecked] = useState(true)

  const moneyRef: any = useRef(null);
  const [licenceRef, setLicenceRef] = useState<any>(null)
  const [ssnRef, setSsnRef] = useState<any>(null)
  const [vehicleRef, setVehicleRef] = useState<any>(null);
  const [mandmRef, setMandmRef] = useState<any>(null);
  const [colorRef, setColorRef] = useState<any>(null);

  const [licenseimage,setLicenseimage] = useState('')
  const [licensesource, setLicensesource] = useState('')
  const [vehiclesource, setVehiclesource] = useState('')
  const [vehicleimage, setVehicleimage] = useState('')

  const actionsheetone: any = useRef(null);
  const actionsheettwo: any = useRef(null);

  const pickImage = (index:number,field:String)=>{
   
    if(index == 0){
       
      ImagePicker.openCamera({
        width: 400,
        height: 400,
        cropping: true,
        includeBase64:true,
        mediaType:'photo'
      }).then(response => {
       
          if(field == 'license'){
            console.log(response.path)
            setLicenseimage(response.path);
            setLicensesource('data:image/jpeg;base64,' + response.data);
          }else{
            setVehicleimage(response.path)

            setVehiclesource('data:image/jpeg;base64,' + response.data)
          }
         
         
       

      });
      
    }else if(index == 1){
     
      ImagePicker.openPicker({
        width: 400,
        height: 400,
        cropping: true,
        includeBase64:true,
        mediaType:'photo'
      }).then(response => {
        
        if(field == 'license'){
          setLicenseimage(response.path);
          setLicensesource('data:image/jpeg;base64,' + response.data);
        }else{
          setVehicleimage(response.path)

          setVehiclesource('data:image/jpeg;base64,' + response.data)
        }
         
      });
    }
  }

  const showActionSheet = (field:String) =>{
    if(field == 'one')
         actionsheetone.current.show()
    else
          actionsheettwo.current.show()
  }

  const validate = () => {
   
      if(money == '' && props?.route?.params?.moneyAgent == true){
        appConfig.functions.showError('Enter minimum money in hand')
        return
      
    }else if(parseInt(money) < 100 && props?.route?.params?.moneyAgent == true){
      appConfig.functions.showError('Minimum money in hand needs to be $100')
      return
    
  }else if(licenseimage == ''){
      appConfig.functions.showError('Upload license image')
      return
    }else if(vehicleimage == ''){
      appConfig.functions.showError('Upload vehicle image')
      return
    }else if(license == ''){
       appConfig.functions.showError('Enter license number')
        return
     }else if(ssn == ''){
       appConfig.functions.showError('Enter SSN / ITIN number')
       return
     }else if(vehicle == ''){
      appConfig.functions.showError('Enter vehicle number')
      return
    }else if(mandm == ''){
      appConfig.functions.showError('Enter make and model')
      return
    } else if(color == ''){
      appConfig.functions.showError('Enter color')
      return
    }else{
        let agent_type = ''
        if(props?.route?.params?.moneyAgent == true && props?.route?.params?.laundryAgent == true){
           agent_type = 'both'
        }else if(props?.route?.params?.moneyAgent == true){
          agent_type = 'money'
        }else if(props?.route?.params?.laundryAgent == true){
          agent_type = 'laundry'
        }
        
        dispatch(showLoader())
        dispatch(agentRegister({agent_type:agent_type,in_hand_money:money,license:license,ssn:ssn,vehicle_number:vehicle,make_and_model:mandm,vehicle_color:color,vehicle_image:vehiclesource,license_image:licensesource}))
     }
  }
 

  const register = useSelector((state:RootState)=>state.agentregister_r._agentRegister)

  useEffect(()=>{
     if(register != undefined){
       dispatch(hideLoader());
       if(register.status == true){
        appConfig.functions.successMsg(register.message)
        dispatch(agentReg({registered:true}))
        dispatch(_agentRegister(undefined))
   // props.navigation.navigate('AddBankACPage');
      props.navigation.dispatch(
        CommonActions.reset({
          index: 1,
          routes: [
            {name:'HomePage'},
            { name: 'AddBankACPage' },
            
          ],
        })
      );
        // props.navigation.dispatch(
        //   StackActions.replace('AddBankACPage', {})
          
        // );
       
        
       }else{
        dispatch(_agentRegister(undefined))
         appConfig.functions.showError(register.message)
       }
     }
  },[register])

 
    return (
      <Container>
        <StatusBar barStyle="dark-content" />
        <HeaderPage back={true} title="" right=""/>
        <KeyboardAvoidingView behavior={Platform.OS == "ios" ? "padding" : "height"} style={{flex:1}}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView>
          <View style={[common.p20]}>
            <View style={[common.mb20]}>
              <Text
                style={[theme.fontregular, common.fontxxl, theme.colorblack]}>
                Become an agent
              </Text>
              <Text
                style={[theme.fontregular, common.fontbody, theme.colorblack]}>
                Fill the details & create your agent account
              </Text>
            </View>
            <View>
              <Form>
                {
                  props?.route?.params?.moneyAgent == true
                  &&
                  <Item floatingLabel style={[common.ml0, common.pt10]}>
                  <Label>Money in hand</Label>
                  <Input 
                     value={money}
                     onChangeText={(money)=>{setMoney(money)}}
                    ref={moneyRef}
                    onSubmitEditing={()=>{licenceRef._root.focus()}}
                    returnKeyType="next"
                    keyboardType={"numeric"}
                  />
                  
                </Item>
                }
               {
                  props?.route?.params?.moneyAgent == true
                  &&
                <TouchableOpacity>
                    <Text style={[common.textright, common.pt10, theme.themecolor]}>
                    min $100
                    </Text>
                  </TouchableOpacity>
                }
                  <View style={[common.mt10]}>
                  <View style={[common.mt10]}><Text style={[theme.graylight, common.fontbody, common.pt20, common.pb10]}>UPLOAD DOCUMENTS</Text></View>
                  <View
                  style={[
                    common.flexbox,
                    common.flexrow,

                  ]}>
                  <View style={[common.flexone, common.mr5]}>
                 {
                   licenseimage == ''
                   &&
                   <TouchableOpacity onPress={()=>{showActionSheet('one')}}>
                    <View style={[theme.upload, theme.graylightbg, common.center,]}>
                    <Icon
                    name="upload-cloud"
                    type="Feather"
                    style={[theme.graylight, common.fontxxxl]}
                  />
                    <Text style={[theme.graylight, common.fontxs]}>TAP TO UPLOAD</Text>
                    </View>
                  </TouchableOpacity>
                 }
                 {
                   licenseimage != ''
                   &&
                  <TouchableOpacity onPress={()=>{showActionSheet('one')}}>
                    <View style={[theme.upload, theme.graylightbg, common.center,]}>
                    {/* <Icon
                    name="upload-cloud"
                    type="Feather"
                    style={[theme.graylight, common.fontxxxl]}
                  /> */}
                  <Image
                          source={{uri:licenseimage}}
                          resizeMode={'stretch'}
                          style={{width: '100%',height:150}}
                        />
                    
                    </View>
                  </TouchableOpacity>
                 }
                  <Text style={[common.fontbody, common.textcenter,common.pt10, theme.graydark]}>Driving License</Text>
                  </View>
                  <View style={[common.flexone,common.ml5]}>
                  {
                   vehicleimage == ''
                   &&
                  <TouchableOpacity onPress={()=>{showActionSheet('two')}}>
                    <View style={[theme.upload, theme.graylightbg, common.center,]}>
                    <Icon
                    name="upload-cloud"
                    type="Feather"
                    style={[theme.graylight, common.fontxxxl]}
                  />
                    <Text style={[theme.graylight, common.fontxs]}>TAP TO UPLOAD</Text>
                    <Text style={[theme.graylight, common.fontxxs,common.textcenter]}>Visibility of number plate is mandatory</Text>
                    </View>
                  </TouchableOpacity>
                }
                 {
                   vehicleimage != ''
                   &&
                  <TouchableOpacity onPress={()=>{showActionSheet('two')}}>
                    <View style={[theme.upload, theme.graylightbg, common.center,]}>
                    <Image
                          source={{uri:vehicleimage}}
                          resizeMode={'stretch'}
                          style={{width: '100%',height:150}}
                    />
                  
                    </View>
                  </TouchableOpacity>
                }
                  <Text style={[common.fontbody, common.textcenter,common.pt10, theme.graydark]}>Vehicle</Text>

                  </View>
                  
                </View>
                  
                  </View>

                <Item floatingLabel style={[common.ml0, common.pt10]}>
                  <Label>License #</Label>
                  <Input 
                     value={license}
                     onChangeText={(license)=>{setLicense(license)}}
                     getRef={(c) => setLicenceRef(c)}
                    onSubmitEditing={()=>{ssnRef._root.focus()}}
                    returnKeyType="next"
                  />
                </Item>
                <Item floatingLabel style={[common.ml0, common.pt10]}>
                  <Label>SSN/ITIN #</Label>
                  <Input 
                    value={ssn}
                    onChangeText={(ssn)=>{setSsn(ssn)}}
                    getRef={(c) => setSsnRef(c)}
                   onSubmitEditing={()=>{vehicleRef._root.focus()}}
                   returnKeyType="next"
                  />
                </Item>
                <View style={[common.mt10]}><Text style={[theme.graylight, common.fontbody, common.pt20]}>VEHICLE INFORMATION</Text></View>
                <Item floatingLabel style={[common.ml0, common.pt10]}>
                  <Label>Vehicle #</Label>
                  <Input 
                    value={vehicle}
                    onChangeText={(vehicle)=>{setVehicle(vehicle)}}
                    getRef={(c) => setVehicleRef(c)}
                   onSubmitEditing={()=>{mandmRef._root.focus()}}
                   returnKeyType="next"
                  />
                </Item>
                <Item floatingLabel style={[common.ml0, common.pt10]}>
                  <Label>Make and Model</Label>
                  <Input 
                   value={mandm}
                   onChangeText={(mandm)=>{setMandm(mandm)}}
                   getRef={(c) => setMandmRef(c)}
                  onSubmitEditing={()=>{colorRef._root.focus()}}
                  returnKeyType="next"
                  />
                </Item>
                <Item floatingLabel style={[common.ml0, common.pt10]}>
                  <Label>Color</Label>
                  <Input 
                    value={color}
                    onChangeText={(color)=>{setColor(color)}}
                    getRef={(c) => setColorRef(c)}
                   onSubmitEditing={validate}
                   returnKeyType="next"
                  />
                </Item>
                {/* <View>
                  <CheckBox
                    style={[common.pt10]}
                    checkedCheckBoxColor="#F16436"
                    uncheckedCheckBoxColor="#DCDCDC"
                    rightTextStyle={{color:"#F16436"}}
                    onClick={() => {
                      this.setState({
                        isChecked: !this.state.isChecked,
                      });
                    }}
                    isChecked={this.state.isChecked}
                    rightText={'Terms & Conditions'}
                  />
                </View> */}

                <View style={[common.mt20]}>
                  <Button block light style={[theme.button_orange]} onPress={validate}>
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
        <ActionSheet
          ref={ actionsheetone}
          title="Which one do you like?"
          options={["Camera","Gallery","Cancel"]}
          cancelButtonIndex={2}
          
          onPress={(index) => { pickImage(index,'license') }}
        />
         <ActionSheet
          ref={ actionsheettwo}
          title="Which one do you like?"
          options={["Camera","Gallery","Cancel"]}
          cancelButtonIndex={2}
          
          onPress={(index) => { pickImage(index,'vehicle') }}
        />
      </Container>
    );
  }

  export default AgentRegister

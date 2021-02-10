/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useState,useEffect,useRef} from 'react';
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
import {country} from '../countryList';
import ActionSheet from 'react-native-actionsheet';
import ImagePicker from 'react-native-image-crop-picker';

import CheckBox from 'react-native-check-box';
import {showLoader, hideLoader} from '../actions/common/commonActions';
import {appConfig} from '../appConfig';
import {getAgentProfile,editAgent,_editAgent} from '../actions/settings/settingsActions';
import HeaderPage from './shared/header';
import {useSelector,useDispatch} from 'react-redux';





import { RootStackParamList } from '../RouteConfig';
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

const EditAgent = (props:Props) => {
  const dispatch = useDispatch();

  const [moneyInHand,setMoneyInHand] = useState('')
  const [license, setLicense] = useState('');
  const [ssn, setSsn] = useState('');
  const [vehicle,setVehicle] = useState('');
  const [mandm, setMandm] = useState('');
  const [color, setColor] = useState('');
  
  const [checkedMoney,setCheckedMoney] = useState(true)
  const [checkedLaundry,setCheckedLaundry] = useState(true)



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

useEffect(()=>{
   dispatch(showLoader())
   dispatch(getAgentProfile())
   return () => {
     console.log("called")
    dispatch(_editAgent(undefined))
   }
},[])



const agentProfile = useSelector((state:RootState)=>state.settings_r._agentProfile);

useEffect(()=>{
    if(agentProfile != undefined){
       dispatch(hideLoader())
       if(agentProfile.status == true){
           setMoneyInHand((agentProfile?.user_details?.moneyInHand).toString())
            setLicense(agentProfile?.user_details?.license_number)
            setSsn(agentProfile?.user_details?.ssn)
            setVehicle(agentProfile?.user_details?.vehicle_number)
            setMandm(agentProfile?.user_details?.vehicle_model)
            setColor(agentProfile?.user_details?.vehicle_color)
            setLicenseimage(agentProfile?.user_details?.license_image)
            setVehicleimage(agentProfile?.user_details?.vehicle_image)
            if(agentProfile?.user_details?.agent_type=="both"){
              setCheckedMoney(true)
              setCheckedLaundry(true)
            }else if(agentProfile?.user_details?.agent_type=="money"){
              setCheckedMoney(true)
              setCheckedLaundry(false)
            }else if(agentProfile?.user_details?.agent_type=="laundry"){
              setCheckedMoney(false)
              setCheckedLaundry(true)
            }
       }else{
         appConfig.functions.showError(agentProfile.message)
       }
    }
},[agentProfile])

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
    if(licenseimage == ''){
      appConfig.functions.showError('Upload license image')
      return
    }else if(vehicleimage == ''){
      appConfig.functions.showError('Upload vehicle image')
      return
    }else if(license == ''){
       appConfig.functions.showError('Enter license number')
        return
     }else if(ssn == ''){
       appConfig.functions.showError('Enter ssn number')
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
    }else if(checkedMoney == false && checkedLaundry == false){
      appConfig.functions.showError('Atleast one of the service should be checked')
      return
    }else if(checkedMoney == true && (moneyInHand == "" || moneyInHand == undefined )){
      appConfig.functions.showError('Please add money in your hand')
      return
    }
    else{
        console.log("checkedMoney",checkedMoney,"moneyInHand",moneyInHand)
        let agent_type = ''
        var data = {}
        if(checkedMoney == true && checkedLaundry == true){
           agent_type = 'both'
        }else if(checkedMoney == true && checkedLaundry == false){
          agent_type = 'money'
        }else if(checkedMoney == false && checkedLaundry == true){
          agent_type = 'laundry'
        }
        
        dispatch(showLoader())
         data = {
          moneyInHand:moneyInHand,
          agent_type:agent_type,
          license:license,
          ssn:ssn,
          vehicle_number:vehicle,
          make_and_model:mandm,
          vehicle_color:color,
         
        }
        if(vehiclesource != ''){
          data.vehicle_image = vehiclesource
        }
        if(licensesource != ''){
          data.license_image = licensesource
        }
        dispatch(editAgent(data))
     }
  }

  const updatedAgent = useSelector((state:RootState)=>state.settings_r._editAgent)

  useEffect(()=>{
      if(updatedAgent != undefined){
        dispatch(hideLoader())
        if(updatedAgent.status == true){
          appConfig.functions.successMsg(updatedAgent.message)
          props.navigation.goBack();
          
        }else{
          appConfig.functions.showError(updatedAgent.message)
        }
      }
  },[updatedAgent])

    return (
      <Container>
         <HeaderPage title="" back={true} right=""/>
         <KeyboardAvoidingView behavior={Platform.OS == "ios" ? "padding" : "height"} style={{flex:1}}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView>
          <View style={[common.p20]}>
            <View>
            <View style={[common.mb20]}>
              <Text
                style={[theme.fontregular, common.fontxxl, theme.colorblack]}>
                Edit Agent Profile
              </Text>
              
            </View>
              <Form>
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
                    <Text style={[theme.graylight, common.fontxs]}>EDIT DOCUMENT</Text>
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
                    <Text style={[theme.graylight, common.fontxs]}>EDIT DOCUMENT</Text>
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
                {
                  checkedMoney == true
                  &&
                  <View style={[{borderBottomWidth:.5,borderBottomColor:"lightgrey"}]}>
                  <Label style={[common.textgray,common.mt10,common.fontmd]}>Money In Hand #</Label>
                  <Input 
                  value={moneyInHand}
                   onChangeText={(mih)=>{setMoneyInHand(mih)}}
                 // onSubmitEditing={()=>{licenceRef._root.focus()}}
                  returnKeyType="next"
                  />
                </View>
                }
                
                <View style={[{borderBottomWidth:.5,borderBottomColor:"lightgrey"}]}>
                  <Label style={[common.textgray,common.mt10,common.fontmd]}>License #</Label>
                  <Input 
                   value={license}
                   onChangeText={(license)=>{setLicense(license)}}
                   getRef={(c) => setLicenceRef(c)}
                //  onSubmitEditing={()=>{ssnRef._root.focus()}}
                  returnKeyType="next"
                  />
                </View>
                <View style={[{borderBottomWidth:.5,borderBottomColor:"lightgrey"}]}>
                  <Label style={[common.textgray,common.mt10,common.fontmd]}>SSN/ITIN #</Label>
                  <Input 
                   value={ssn}
                   onChangeText={(ssn)=>{setSsn(ssn)}}
                   getRef={(c) => setSsnRef(c)}
                  //onSubmitEditing={()=>{vehicleRef._root.focus()}}
                  returnKeyType="next"
                  />
               </View>
                <View style={[common.mt10]}><Text style={[theme.graylight, common.fontbody, common.pt20]}>VEHICLE INFORMATION</Text></View>

                <View style={[{borderBottomWidth:.5,borderBottomColor:"lightgrey"}]}>
                  <Label style={[common.textgray,common.mt10,common.fontmd]}>Vehicle #</Label>
                  <Input
                    value={vehicle}
                    onChangeText={(vehicle)=>{setVehicle(vehicle)}}
                    getRef={(c) => setVehicleRef(c)}
                   //onSubmitEditing={()=>{mandmRef._root.focus()}}
                   returnKeyType="next"
                  />
                </View>
                <View style={[{borderBottomWidth:.5,borderBottomColor:"lightgrey"}]}>
                  <Label style={[common.textgray,common.mt10,common.fontmd]}>Make and Model</Label>
                  <Input 
                    value={mandm}
                    onChangeText={(mandm)=>{setMandm(mandm)}}
                    getRef={(c) => setMandmRef(c)}
                  // onSubmitEditing={()=>{colorRef._root.focus()}}
                   returnKeyType="next"
                  />
                </View>
                <View style={[{borderBottomWidth:.5,borderBottomColor:"lightgrey"}]}>
                  <Label style={[common.textgray,common.mt10,common.fontmd]}>Color</Label>
                  <Input 
                    value={color}
                    onChangeText={(color)=>{setColor(color)}}
                    getRef={(c) => setColorRef(c)}
                   
                   returnKeyType="next"
                  />
               </View>
                <View style={[common.flexbox, common.flexrow,common.pt10]}>
                  <View style={[common.flexone]}>
                  <CheckBox
                    style={[common.pt10]}
                    checkedCheckBoxColor="#F16436"
                    uncheckedCheckBoxColor="#DCDCDC"
                    rightTextStyle={{color:"#F16436"}}
                    onClick={() => {
                         setCheckedMoney(!checkedMoney)
                    }}
                    isChecked={checkedMoney}
                    rightText={'Money Services'}
                  />
                  </View>
                  <View style={[common.flexone]}>
                  <CheckBox
                    style={[common.pt10]}
                    checkedCheckBoxColor="#F16436"
                    uncheckedCheckBoxColor="#DCDCDC"
                    rightTextStyle={{color:"#F16436"}}
                    onClick={() => {
                      setCheckedLaundry(!checkedLaundry)
                 }}
                 isChecked={checkedLaundry}
                    rightText={'Laundry Services'}
                  />
                  </View>
                </View>

                <View style={[common.mt20]}>
                  <Button block light style={[theme.button_orange]} onPress={validate}>
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

  export default EditAgent


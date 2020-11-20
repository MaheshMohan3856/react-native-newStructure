import React, {Component, useEffect, useState} from 'react';
import {
 
  StyleSheet,Modal, Dimensions,PermissionsAndroid,

} from 'react-native';
import {
 
  View,
  
  Button,
  Text,
 
  Icon,

} from 'native-base';

import {theme} from '../../../css/theme';
import {common} from '../../../css/common';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import MapView,{ Marker } from 'react-native-maps';
import { appConfig } from '../../../appConfig';
import { ScrollView } from 'react-native-gesture-handler';


const GooglePlaces = (props) =>{
    return(
    <Modal visible={props.visiblePlaces} >
       
    <View style={{backgroundColor:"#ccc",flex:1}}>
   
     
      <Button style={{marginTop:10}} transparent onPress={()=>props.setVisiblePlaces(false)} >
        <Icon
          name="close"
          type="AntDesign"
          style={[theme.colorblack, common.fontxxl]}
        />
      </Button>
    
      
     
    <GooglePlacesAutocomplete
      fetchDetails={true}
      
       styles={{
        // textInputContainer: {
        //   backgroundColor: 'grey',
        // },
        textInput: {
          height: 38,
          color: '#5d5d5d',
          fontSize: 16,
          marginLeft:10,
          marginTop:10,
          marginRight:10
        },
        predefinedPlacesDescription: {
          color: '#1faadb',
        },
      }}
        placeholder='Search'
        
        onPress={(data, details=null) => {
          // 'details' is provided when fetchDetails = true
          console.log("data", data);
          console.log("details", details);
          props.setCurrentLatitude(details?.geometry?.location?.lat);
         props.setCurrentLongitude(details?.geometry?.location?.lng);
          props.setAddress(data?.description);
          props.setRegion({latitude: details?.geometry?.location?.lat,
            longitude: details?.geometry?.location?.lng,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          })
          props.setVisiblePlaces(false);
        }}
        query={{
          key: appConfig.GoogleApiKey,
          language: 'en',
        }}
       
      />
  
      </View>
      
      
     
    </Modal>
    )
  }

const MapModal = (props) =>{
    return(
    <Modal visible={props.isvisible} >
        <View style={{marginTop:10}}>
        <Button transparent onPress={()=>{props.setIsvisible(!props.isvisible)}} >
            <Icon
              name="close"
              type="AntDesign"
              style={[theme.colorblack, common.fontxxl]}
            />
          </Button>
        </View>
        <View style={common.p20}>
            
          <GooglePlaces {...props}/>
         
  
      
          <Text style={{fontSize:12,color:"grey",paddingBottom:5}}>TYPE OR PIN ON MAP TO SEARCH PICKUP LOCATION</Text>
          <Text onPress={()=>props.setVisiblePlaces(true)}>{props.address}</Text>
         
        </View>
        <View style={{flex:1}}>
        <MapView
          style={{height:'100%',width:'100%'}}
          initialRegion={props.region}
          showsUserLocation={true}
          onPress={props.handleMovePin}
         // onRegionChangeComplete={onRegionChange}
          
          >
        <Marker
          coordinate={{ "latitude": props.region.latitude,   
          "longitude": props.region.longitude }}
          title={"Your Location"}
          draggable 
          
          />
      </MapView>
      <Button
      onPress={()=>{props.setIsvisible(!props.isvisible)}} 
      style={{borderRadius:30,height:60,marginTop:Dimensions.get('window').height-290,justifyContent:"center",alignSelf:"center",width:180,position:"absolute",backgroundColor:'#00afef'}}>
        <Text >Done</Text>
      </Button>
      </View>
      
      </Modal>
   
        
    )
  }

export default MapModal
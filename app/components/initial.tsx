import React, { useEffect } from 'react';
import {StatusBar, Image, TouchableOpacity} from 'react-native';
import {
  Container,
  View,
  Header,

  
} from 'native-base';

import {theme} from '../css/theme';
import {common} from '../css/common';

import { appConfig } from '../appConfig';
import {CommonActions} from '@react-navigation/native';
  
import AsyncStorage from '@react-native-community/async-storage';
import Storage from 'react-native-storage';

var storage = new Storage({size: 1000,storageBackend: AsyncStorage,defaultExpires: 1000 * 3600 * 24,enableCache: false});

 const InitialPage = ({navigation}:any) =>{
  
    useEffect(()=>{
        appConfig.functions.isLoggedin()

        .then((access_token) => {

            if(access_token){
              storage.load({key:"userData"}).then((ret)=>{
                console.log("user",ret);
                 if(ret.verification_status == 'Y'){
                    navigation.dispatch(
                      CommonActions.reset({
                        index: 1,
                        routes: [
                          { name: 'HomePage' },
                          
                        ],
                      })
                    );
                 }
                 else{
                      navigation.dispatch(
                        CommonActions.reset({
                          index: 1,
                          routes: [
                            { name: 'LandingPage' },
                            
                          ],
                        })
                      );
                 }
              })
                
                }else{
                    navigation.dispatch(
                        CommonActions.reset({
                          index: 1,
                          routes: [
                            { name: 'LandingPage' },
                            
                          ],
                        })
                      );
                }
             
              }).catch((err)=>{
                navigation.dispatch(
                    CommonActions.reset({
                      index: 1,
                      routes: [
                        { name: 'LandingPage' },
                        
                      ],
                    })
                  );
            })

    },[])
   
   
        return (
           <Container>
             <StatusBar barStyle="dark-content" />
                <Header
                androidStatusBarColor="#fff"
                transparent
                iosBarStyle="dark-content"
                style={[theme.themeheader]} />
       
               <View></View>
            </Container>
        );
  
}


export default InitialPage
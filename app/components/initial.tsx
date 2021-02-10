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
import { saveToken } from '../actions/token/tokenActions';
import { useDispatch } from 'react-redux';

var storage = new Storage({size: 1000,storageBackend: AsyncStorage,defaultExpires: 1000 * 3600 * 24,enableCache: false});

 const InitialPage = ({navigation}:any) =>{

  const dispatch = useDispatch()
  
    useEffect(()=>{
        appConfig.functions.isLoggedin()

        .then((access_token) => {

            if(access_token){
              appConfig.functions.getRefresh()
              .then((refresh_token)=>{
                 dispatch(saveToken({token:access_token,refreshtoken:refresh_token}))
              })
              storage.load({key:"userData"}).then((ret)=>{
                console.log("user",ret);
                 if(ret.verification_status == 'Y'){
                  AsyncStorage.getItem('home').then((home)=>{
                    console.log("home",home);
                    if(home == 'agent'){
                      navigation.dispatch(
                        CommonActions.reset({
                          index: 1,
                          routes: [
                            { name: 'AgentHome' },
                            
                          ],
                        })
                      );
                    }else{
                      navigation.dispatch(
                        CommonActions.reset({
                          index: 1,
                          routes: [
                            { name: 'HomePage' },
                            
                          ],
                        })
                      );
                    }
                  })
                  .catch((err)=>{
                    navigation.dispatch(
                      CommonActions.reset({
                        index: 1,
                        routes: [
                          { name: 'HomePage' },
                          
                        ],
                      })
                    );
                  })
                    
                      
                   
                  
                    
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
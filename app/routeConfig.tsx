import React from 'react'
import { StyleSheet } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import {createDrawerNavigator} from '@react-navigation/drawer';
import LandingPage from './components/landing';
import CreateAccount from './components/createaccount';
import LoginPage from './components/login';
import HomePage from './components/home';
import AgentDrawer from './components/agentdrawer';
import VerifyPhone from './components/verifyphone';
import ForgotPassword from './components/forgotpassword';
import ResetPassword from './components/resetpassword';
import InitialPage from './components/initial';
import Settings from './components/settings';

export type RootStackParamList = {

  LandingPage:undefined,
  LoginPage: undefined,
  CreateAccount: undefined,
  HomePage: undefined,
  AgentDrawer:undefined,
  VerifyPhone:{page:String,phone:String,email:String},
  ForgotPassword:undefined,
  ResetPassword:{email:String},
  InitialPage:undefined,
  Settings:undefined
};



const Drawer = createDrawerNavigator<RootStackParamList>();
const MyDrawer = () => {
   return(
    <Drawer.Navigator initialRouteName="HomePage" 
  
    drawerContentOptions={{activeBackgroundColor:"#f00"}}
     
     drawerContent={(props)=><AgentDrawer {...props}/>}>
       <Drawer.Screen name="HomePage" component={HomePage} />
       <Drawer.Screen name="Settings" component={Settings} />
    </Drawer.Navigator>
   )
}


const Stack = createStackNavigator<RootStackParamList>();

const AppNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="InitialPage" screenOptions={{headerShown:false}}>
      <Stack.Screen name="InitialPage" component={InitialPage} />
      <Stack.Screen name="LandingPage" component={LandingPage} />
      <Stack.Screen name="CreateAccount" component={CreateAccount} />
      <Stack.Screen name="LoginPage" component={LoginPage} />
      <Stack.Screen name="VerifyPhone" component={VerifyPhone} />
      <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
      <Stack.Screen name="ResetPassword" component={ResetPassword} />
      <Stack.Screen name="HomePage" component={MyDrawer} />
    </Stack.Navigator>
  )
}

export default AppNavigator
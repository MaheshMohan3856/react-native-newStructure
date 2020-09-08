import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import {createDrawerNavigator} from '@react-navigation/drawer';
import LandingPage from './components/landing';
import CreateAccount from './components/createaccount';
import LoginPage from './components/login';
import HomePage from './components/home';
import AgentDrawer from './components/agentdrawer';

export type RootStackParamList = {

  LandingPage:undefined,
  LoginPage: undefined,
  CreateAccount: undefined,
  HomePage: undefined,
  AgentDrawer:undefined
  
};


const Drawer = createDrawerNavigator<RootStackParamList>();
const MyDrawer = () => {
   return(
    <Drawer.Navigator initialRouteName="HomePage" 
     
     drawerContent={(props)=><AgentDrawer {...props}/>}>
       <Drawer.Screen name="HomePage" component={HomePage} />
    </Drawer.Navigator>
   )
}


const Stack = createStackNavigator<RootStackParamList>();

const AppNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="LandingPage" screenOptions={{headerShown:false}}>
      <Stack.Screen name="LandingPage" component={LandingPage} />
      <Stack.Screen name="CreateAccount" component={CreateAccount} />
      <Stack.Screen name="LoginPage" component={LoginPage} />
      <Stack.Screen name="HomePage" component={MyDrawer} />
    </Stack.Navigator>
  )
}

export default AppNavigator
import React from 'react'
import { StyleSheet,Easing } from 'react-native';
import { createStackNavigator,CardStyleInterpolators } from '@react-navigation/stack';
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
import Terms from './components/terms';
import Privacy from './components/privacy';
import AgentBecome from './components/agentbecome';
import AgentRegister from './components/agentregister';
import ChangePassword from './components/changepassword';
import EditProfile from './components/editprofile';
import EditAgent from './components/editagent';
import AddBankACPage from './components/addBank';
import LaundryList from './components/laundrylist';
import LaundryDetail from './components/laundrydetail';
import SelectItem from './components/laundryselectitem';
import LaundrySchedule from './components/laundryschedule';
import LaundryConfirm from './components/laundryconfirm';
import AddCard from './components/addCard';
import PaymentCards from './components/paymentcards';
import RequestMoney from './components/requestmoney';
import ConfirmMoney from './components/confirmmoney';
import AddNewBank from './components/addNewBank';
import AgentHome from './components/agenthome';
import AgentArrived from './components/agentarrived';
import AgentService from './components/agentservice';
import AgentSummary from './components/agentsummary';

export type RootStackParamList = {

  LandingPage:undefined,
  LoginPage: undefined,
  CreateAccount: undefined,
  HomePage: undefined,
  AgentDrawer:undefined,
  VerifyPhone:{page:String,phone:String,code:String,email:String},
  ForgotPassword:undefined,
  ResetPassword:{email:String},
  InitialPage:undefined,
  Settings:undefined,
  Terms:undefined,
  Privacy:undefined,
  AgentBecome:undefined,
  AgentRegister:{moneyAgent:Boolean,laundryAgent:Boolean},
  ChangePassword:undefined,
  EditProfile:undefined,
  EditAgent:undefined,
  AddBankACPage:undefined,
  LaundryList:undefined,
  LaundryDetail:{id:Number},
  SelectItem:{id:Number,additional:Object,quantity:Object},
  LaundrySchedule:{washQty:Number,list:Object,extra:Number,id:Number},
  LaundryConfirm:{data:Object,extra:Number},
  AddCard:{page:String},
  PaymentCards:undefined,
  RequestMoney:undefined,
  ConfirmMoney:{data:object,pricing:object},
  AddNewBank:{account_id:String},
  AgentHome:undefined,
  AgentArrived:{data:Object,lat:Number,lng:Number},
  AgentService:{data:Object},
  AgentSummary:undefined
  
};



const Drawer = createDrawerNavigator<RootStackParamList>();
const MyDrawer = () => {
   return(
    <Drawer.Navigator initialRouteName="HomePage" 
  
    drawerContentOptions={{activeBackgroundColor:"#f00"}}
     
     drawerContent={(props)=><AgentDrawer {...props}/>}>
       <Drawer.Screen name="HomePage" component={HomePage} />
       <Drawer.Screen name="Settings" component={Settings} />
       <Drawer.Screen name="AgentBecome" component={AgentBecome} />
       <Drawer.Screen name="PaymentCards" component={PaymentCards} />
       <Drawer.Screen name="AgentHome" component={AgentHome} />
    </Drawer.Navigator>
   )
}

const config:any = {
  animation: 'timing',
  
  config: {
    stiffness: 1000,
    damping: 500,
    mass: 3,
    overshootClamping: false,
    restDisplacementThreshold: 0.01,
    restSpeedThreshold: 0.01,
    
  },
};

const closeConfig:any = {
  animation: 'timing',
  config: {
    duration:500,
    easing:Easing.linear
  },
};

const Stack = createStackNavigator<RootStackParamList>();

const AppNavigator = () => {
  return (
    <Stack.Navigator 
       initialRouteName="InitialPage" 
       screenOptions={{headerShown:false,
        gestureEnabled:true,
        gestureDirection:"horizontal",
        cardStyleInterpolator:CardStyleInterpolators.forHorizontalIOS,
        transitionSpec:{
          open: config,
          close: closeConfig
          
        }
      }}  
    >
      <Stack.Screen name="InitialPage" component={InitialPage} />
      <Stack.Screen name="LandingPage" component={LandingPage} />
      <Stack.Screen name="CreateAccount" component={CreateAccount} />
      <Stack.Screen name="LoginPage" component={LoginPage} />
      <Stack.Screen name="VerifyPhone" component={VerifyPhone} />
      <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
      <Stack.Screen name="ResetPassword" component={ResetPassword} />
      <Stack.Screen name="HomePage" component={MyDrawer} />
      <Stack.Screen name="Terms" component={Terms} />
      <Stack.Screen name="Privacy" component={Privacy} />
      <Stack.Screen name="AgentRegister" component={AgentRegister} />
      <Stack.Screen name="ChangePassword" component={ChangePassword} />
      <Stack.Screen name="EditProfile" component={EditProfile} />
      <Stack.Screen name="EditAgent" component={EditAgent} />
      <Stack.Screen name="AddBankACPage" component={AddBankACPage} />
      <Stack.Screen name="LaundryList" component={LaundryList} />
      <Stack.Screen name="LaundryDetail" component={LaundryDetail} />
      <Stack.Screen name="SelectItem" component={SelectItem} />
      <Stack.Screen name="LaundrySchedule" component={LaundrySchedule} />
      <Stack.Screen name="LaundryConfirm" component={LaundryConfirm} />
      <Stack.Screen name="AddCard" component={AddCard} />
      <Stack.Screen name="RequestMoney" component={RequestMoney} />
      <Stack.Screen name="ConfirmMoney" component={ConfirmMoney} />
      <Stack.Screen name="AddNewBank" component={AddNewBank} />
      <Stack.Screen name="AgentArrived" component={AgentArrived} />
      <Stack.Screen name="AgentService" component={AgentService} />
      <Stack.Screen name="AgentSummary" component={AgentSummary} />
    </Stack.Navigator>
  )
}

export default AppNavigator
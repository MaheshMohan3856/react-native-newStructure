/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React,{useRef,useState,useEffect} from 'react';

import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  AppState
} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import FlashMessage from "react-native-flash-message";
import {Root} from 'native-base'
import 'react-native-gesture-handler';
import {NavigationContainer,useNavigation} from '@react-navigation/native';
import AppNavigator from './app/routeConfig';
import { Provider as StoreProvider } from 'react-redux';

import Loading from './app/components/shared/loader';
import { compose,createStore,applyMiddleware } from 'redux';

import { apiMiddleware } from 'redux-api-middleware';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import AppReducer from './app/appReducers'


let _navigator:any

const setTopLevelNavigator = (ref) =>{
  _navigator = ref
}



 
const customMiddleWare = store => next => action => {
   
  //console.log("Middleware triggered: store: ",store.getState(), "action: ", action);
   if(action.result != undefined && action.result.user_active_status == false){
     _navigator.navigate('LandingPage')
   }
   
   next(action);
 }

const configureStore = (initialState:object) =>{

   const enhance = compose(applyMiddleware(thunk,logger,apiMiddleware,customMiddleWare))   
   return createStore( AppReducer,initialState, enhance);
}

const store = configureStore({});

const App = () => {



  const appState = useRef(AppState.currentState);
  const [appStateVisible, setAppStateVisible] = useState(appState.current);

  useEffect(() => {
    AppState.addEventListener("change", _handleAppStateChange);

    return () => {
      AppState.removeEventListener("change", _handleAppStateChange);
    };
  }, []);

  const _handleAppStateChange = (nextAppState) => {
    
    
    appState.current = nextAppState;
    setAppStateVisible(appState.current);
    if(appState.current == "active"){
      console.log("App has come to the foreground!");
      
    }else{
      console.log("App has come to the background!");
    }
    
  };

  return (
    <StoreProvider store={store}>
    <Root>
      <Loading />
      
     <NavigationContainer ref={navigatorRef => {
          setTopLevelNavigator(navigatorRef);
        }}>
       <AppNavigator />
     </NavigationContainer>
     <FlashMessage style={{marginTop:20}} position="top" duration={3000} />
     </Root>
    </StoreProvider>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    backgroundColor: Colors.white,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
  },
  highlight: {
    fontWeight: '700',
  },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
});

export default App;

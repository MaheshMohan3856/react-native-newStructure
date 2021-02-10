import { Toast } from 'native-base';

import AsyncStorage from '@react-native-community/async-storage';

const toastPosition = "bottom"

export const appConfig = {

    appName: "WUW",

 

 apiBaseUrl:'http://18.221.171.132:3011/',
 
 apiSocketBaseUrl:'http://18.221.171.132:3011',

   
   
   
    

    toastLong: 5000,

    toastMedium: 3000,

    toastShort: 1000,

    GoogleApiKey: 'AIzaSyDJNc5uhHaahvRT2jdrN7QNsyW8DNh0Wc8',

    functions: {
        showError(error:string) {
            error = error.replace('Error: ', '');
            Toast.show({
                text: error,
                position: toastPosition,
                duration: appConfig.toastMedium,
                type: 'danger',
                
            })
        },
        successMsg(msg:string) {
            Toast.show({
                text: msg,
                position: toastPosition,
                duration: appConfig.toastMedium,
                type: 'success'
            })
        },
        isLoggedin: async () => {
            try {
                const access_token = await AsyncStorage.getItem('@access_token');
                return access_token;
            } catch (err) {
                console.log("Error", err);
            }
        },
       
        getRefresh: async () => {
            try {
                const refresh_token = await AsyncStorage.getItem('@refresh_token');
                return refresh_token;
            } catch (err) {
                console.log("Error", err);
            }
        },
        
       
    }
}

  import {appConfig} from '../appConfig';
  import AsyncStorage from '@react-native-community/async-storage';

  const API_BASE = appConfig.apiBaseUrl;

  const objToQueryString = obj => {
    const keyValuePairs = [];
    for (const key in obj) {
      keyValuePairs.push(
        encodeURIComponent(key) + "=" + encodeURIComponent(obj[key])
      );
    }
    if (keyValuePairs.length > 0) return keyValuePairs.join("&");
    else return;
  };
  
  
  
  export const apiCall = async(
    route,
    tokenNeeded,
    method,
    params,
     
  ) => {
   
    try{
     
      let header = new Headers();
      let AuthToken = '';
      let Refresh_token = ''; 

    
  
      header.append("Content-Type", "application/json");
  
     
     if(tokenNeeded == true){
          

        AuthToken = await appConfig.functions.isLoggedin()
             
        Refresh_token = await appConfig.functions.getRefresh()

        console.log("AuthToken",AuthToken);

        console.log("Refresh_token",Refresh_token);
        
        if (AuthToken) header.set("x-access-token", AuthToken);

        if(Refresh_token) header.set('refresh-token',Refresh_token);
     }
      
        
      let url = "";

       if(method == "GET"){

          let queryString = objToQueryString(params);

         
          
          if (queryString) url = `${API_BASE}${route}?${queryString}`;
           else url = `${API_BASE}${route}`;

       }else{
         
          url = `${API_BASE}${route}`;

       }
        
       console.log("url",url);
       console.log("params",params);

        const response = await fetch(url, {
            method: method,
            headers: header,
            body: (method=='POST')? (params ? JSON.stringify(params) : null) : null
        })      
            
        let token = response.headers.get("x-access-token");

        let refreshToken = response.headers.get("refresh-token");

        
         // console.log("response",response.json());

          if (token) {

            AsyncStorage.setItem("@access_token", token);

          }
          if(refreshToken){

            AsyncStorage.setItem("@refresh_token", refreshToken);

          }

         
          return await response.json();
    }
    catch(err){
        console.log(err);
    }
   
  };
  
  
  
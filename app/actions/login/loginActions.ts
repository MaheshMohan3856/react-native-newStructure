import {LOGIN} from './loginActionTypes';

import { apiCall } from '../../lib/Api';



export const login = (data:object) => {
    return (dispatch, getState) => {       
  
        return apiCall('login', true, 'POST', data)
        .then((result) => {           
            dispatch(_login(result));            
        })

    };
}

export const _login = (result:object) => {
    return{
        type:LOGIN,
        result
    }
}


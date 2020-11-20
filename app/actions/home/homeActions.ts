import {CHECKSTATUS,CHECKCARD,HOMELIST} from './homeActionTypes';

import { apiCall } from '../../lib/Api';



export const checkStatus = () => {
    return (dispatch, getState) => {       
  
        return apiCall('users/application_status', true, 'POST', {})
        .then((result) => {           
            dispatch(_checkStatus(result));            
        })

    };
}

export const _checkStatus = (result:object) => {
    return{
        type:CHECKSTATUS,
        result
    }
}

export const checkCardAdded = () =>{
    return (dispatch, getState) => {       
  
        return apiCall('users/get_payment_card_status', true, 'POST', {})
        .then((result) => {           
            dispatch(_checkCardAdded(result));            
        })

    };
}

export const _checkCardAdded = (result:object) => {
    return{
        type:CHECKCARD,
        result
    }
}

export const getLaundryList = (data:Object) => {
    return (dispatch, getState) => {       
  
        return apiCall('users/get_laundromat_list', true, 'POST', data)
        .then((result) => {           
            dispatch(_getLaundryList(result));            
        })

    };
}

export const _getLaundryList = (result:object) => {
    return{
        type:HOMELIST,
        result
    }
}
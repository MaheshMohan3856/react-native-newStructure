import {CALCULATEAMOUNT,MONEYRANGE,CONFIRMMONEY} from './moneyrequestActionTypes';

import { apiCall } from '../../lib/Api';

export const calculateCharges = (data:Object) => {
    return (dispatch, getState) => {       
  
        return apiCall('users/money_request_calculations', true, 'POST', data)
        .then((result) => {           
            dispatch(_calculateCharge(result));            
        })

    };
}

export const _calculateCharge  = (result:object) => {
    return{
        type: CALCULATEAMOUNT,
        result
    }
}

export const getMoneyParams = () =>{
    return (dispatch, getState) => {       
  
        return apiCall('users/get_money_request_home_data', true, 'POST', {})
        .then((result) => {           
            dispatch(_getParams(result));            
        })

    };
}

export const _getParams  = (result:object) => {
    return{
        type: MONEYRANGE,
        result
    }
}

export const confirmMoney = (data:Object) =>{
    return (dispatch, getState) => {       
  
        return apiCall('users/money_request_submission', true, 'POST', data)
        .then((result) => {           
            dispatch(_confirmMoney(result));            
        })

    };
}

export const _confirmMoney = (result:Object) => {
    return{
        type: CONFIRMMONEY,
        result
    }
}
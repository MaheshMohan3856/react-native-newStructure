import {MONEY_ORDER,CANCEL_MONEY_ORDER,PAY_MONEY,RATING} from './moneyorderActionTypes';

import { apiCall } from '../../lib/Api';

export const getMoneyOrderDetails = (data:Object) => {
    return (dispatch, getState) => {       
  
        return apiCall('users/get_order_detail', true, 'POST', data)
        .then((result) => {           
            dispatch(_getMoneyOrderDetails(result));            
        })

    };
}

export const _getMoneyOrderDetails  = (result:object) => {
    return{
        type: MONEY_ORDER,
        result
    }
}

export const cancelMyRequest = (data:object) =>{
    return (dispatch, getState) => {       
  
        return apiCall('users/cancel_money_request', true, 'POST', data)
        .then((result) => {           
            dispatch(_cancelRequest(result));            
        })

    };
}

export const _cancelRequest  = (result:object) => {
    return{
        type: CANCEL_MONEY_ORDER,
        result
    }
}

export const payMoney = (data:object) =>{
    return (dispatch, getState) => {       
  
        return apiCall('users/pay_agent', true, 'POST', data)
        .then((result) => {           
            dispatch(_payMoney(result));            
        })

    };
}

export const _payMoney  = (result:object) => {
    return{
        type: PAY_MONEY,
        result
    }
}

export const agentRating = (data:object) =>{
    return (dispatch, getState) => {       
  
        return apiCall('users/rate_agent', true, 'POST', data)
        .then((result) => {           
            dispatch(_rating(result));            
        })

    };
}

export const _rating  = (result:object) => {
    return{
        type: RATING,
        result
    }
}
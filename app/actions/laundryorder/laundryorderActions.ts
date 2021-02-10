import {LAUNDRY_ORDER,CANCEL_LAUNDRY_ORDER,LAUNDRY_PAYMENT,LAUNDRY_PAYMENT_REJECT,LAUNDRY_RATING} from './laundryorderActionTypes';

import { apiCall } from '../../lib/Api';

export const getOrderDetails = (data:Object) => {
    return (dispatch, getState) => {       
  
        return apiCall('users/get_laundry_request_detail', true, 'POST', data)
        .then((result) => {           
            dispatch(_getOrderDetails(result));            
        })

    };
}

export const _getOrderDetails  = (result:object) => {
    return{
        type: LAUNDRY_ORDER,
        result
    }
}

export const cancelMyRequest = (data:object) =>{
    return (dispatch, getState) => {       
  
        return apiCall('users/cancel_laundry_request', true, 'POST', data)
        .then((result) => {           
            dispatch(_cancelRequest(result));            
        })

    };
}

export const _cancelRequest  = (result:object) => {
    return{
        type: CANCEL_LAUNDRY_ORDER,
        result
    }
}

export const makeInvoicePayment = (data:object) =>{
    return (dispatch, getState) => {       
  
        return apiCall('users/laundry_invoice_payment', true, 'POST', data)
        .then((result) => {           
            dispatch(_makePayment(result));            
        })

    };
}

export const _makePayment  = (result:object) => {
    return{
        type: LAUNDRY_PAYMENT,
        result
    }
}

export const denyInvoicePayment = (data:Object) =>{
    return (dispatch, getState) => {       
  
        return apiCall('users/reject_laundry_invoice_payment', true, 'POST', data)
        .then((result) => {           
            dispatch(_denyPayment(result));            
        })

    };
}

export const _denyPayment  = (result:object) => {
    return{
        type: LAUNDRY_PAYMENT_REJECT,
        result
    }
}

export const laundroRating = (data:Object) =>{
    return (dispatch, getState) => {       
  
        return apiCall('users/rate_laundry_request', true, 'POST', data)
        .then((result) => {           
            dispatch(_laundroRating(result));            
        })

    };
}

export const _laundroRating  = (result:object) => {
    return{
        type: LAUNDRY_RATING,
        result
    }
}
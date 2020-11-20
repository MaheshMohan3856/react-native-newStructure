import {ADDBANK,ADDCARD,PAYMENTDETAILS,ADDNEWBANK,DELETECARD} from './paymentActionTypes';

import { apiCall } from '../../lib/Api';



export const addBankAccount = (data:object) => {
    return (dispatch, getState) => {       
  
        return apiCall('agent/save_bank_account', true, 'POST', data)
        .then((result) => {           
            dispatch(_addBankAccount(result));            
        })

    };
}

export const _addBankAccount = (result:object) => {
    return{
        type:ADDBANK,
        result
    }
}

export const createCardToken = (data:Object) => {
    return (dispatch, getState) => {       
  
        return apiCall('users/save_payment_card', true, 'POST', data)
        .then((result) => {           
            dispatch(_createCardToken(result));            
        })

    };
}

export const _createCardToken = (result:object) => {
    return{
        type:ADDCARD,
        result
    }
}

export const getPaymentDetails = () =>{
    return (dispatch, getState) => {       
  
        return apiCall('users/get_payment_methods', true, 'POST', {})
        .then((result) => {           
            dispatch(_getPaymentDetails(result));            
        })

    };
}

export const _getPaymentDetails = (result:object) => {
    return{
        type:PAYMENTDETAILS,
        result
    }
}

export const addNewBank = (data:Object) =>{
    return (dispatch, getState) => {       
  
        return apiCall('agent/replace_bank_account', true, 'POST', data)
        .then((result) => {           
            dispatch(_addNewBank(result));            
        })

    };
}

export const _addNewBank = (result:object) => {
    return{
        type:ADDNEWBANK,
        result
    }
}

export const deleteCreditCard = (data:object) =>{
    return (dispatch, getState) => {       
  
        return apiCall('users/delete_stripe_card', true, 'POST', data)
        .then((result) => {           
            dispatch(_deleteCard(result));            
        })

    };
}

export const _deleteCard = (result:object) => {
    return{
        type:DELETECARD,
        result
    }
}

import {LOGIN,SIGNUP,VERIFY_PHONE,VERIFY_EMAIL,RESEND,FORGOT,RESET,DELETE,VERIFY_NEW_PHONE} from './loginActionTypes';

import { apiCall } from '../../lib/Api';



export const login = (data:object) => {
    return (dispatch, getState) => {       
  
        return apiCall('users/login', false, 'POST', data)
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

export const signup = (data:object) => {
    return (dispatch, getState) => {       
  
        return apiCall('users/register', false, 'POST', data)
        .then((result) => {           
            dispatch(_signup(result));            
        })

    };
}


export const _signup = (result:object) => {
    return{
        type:SIGNUP,
        result
    }
}

export const checkPhoneVerification = (data:object) =>{
    return (dispatch, getState) => {       
  
        return apiCall('users/verify_otp', true, 'POST', data)
        .then((result) => {           
            dispatch(_verifyphone(result));            
        })

    };
}

export const _verifyphone = (result:object) => {
    return{
        type:VERIFY_PHONE,
        result
    }
}

export const checkEmailVerification = (data:object) =>{
    return (dispatch, getState) => {       
  
        return apiCall('users/verify_forgot_otp', false, 'POST', data)
        .then((result) => {           
            dispatch(_verifyemail(result));            
        })

    };
}

export const _verifyemail = (result:object) => {
    return{
        type:VERIFY_EMAIL,
        result
    }
}

export const resendOtp = (data:object) => {
    return (dispatch, getState) => {       
  
        return apiCall('users/resend_otp', false, 'POST', data)
        .then((result) => {           
            dispatch(_resend(result));            
        })

    };
}

export const _resend = (result:object) => {
    return{
        type:RESEND,
        result
    }
}

export const forgotPass = (data:object) => {
    return (dispatch, getState) => {       
  
        return apiCall('users/forgot_password', false, 'POST', data)
        .then((result) => {           
            dispatch(_forgot(result));            
        })

    };
}

export const _forgot = (result:object) => {
    return{
        type:FORGOT,
        result
    }
}

export const resetPassword = (data:object) => {
    return (dispatch, getState) => {       
  
        return apiCall('users/reset_password', false, 'POST', data)
        .then((result) => {           
            dispatch(_reset(result));            
        })

    };
}

export const _reset = (result:object) => {
    return{
        type:RESET,
        result
    }
}

export const _deleteAccount = () =>{
    return (dispatch, getState) => {       
  
        return apiCall('users/deactivate_account', true, 'POST', {})
        .then((result) => {           
            dispatch(_delete(result));            
        })

    };
}

export const _delete = (result:object) => {
    return{
        type:DELETE,
        result
    }
}

export const checkNewPhone = (data:object) =>{
    return (dispatch, getState) => {       
  
        return apiCall('users/verify_new_phone', true, 'POST', data)
        .then((result) => {           
            dispatch(_verifynewphone(result));            
        })

    };
}

export const _verifynewphone = (result:object) => {
    return{
        type:VERIFY_NEW_PHONE,
        result
    }
}
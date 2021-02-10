import {REQUESTLIST,ACCEPTMONEY,STARTREQUEST,ARRIVEDREQUEST,COMPLETEREQUEST,SUMMARY,MONEYOTP,CANCELREQUEST,ACCEPTLAUNDRY,LAUNDRYSTATUS,CANCELLAUNDRYREQUEST,LAUNDRY_OTP,LAUNDRY_COMPLETE} from './acceptActionTypes';

import { apiCall } from '../../lib/Api';

export const getRequestList = () => {
    return (dispatch, getState) => {       
  
        return apiCall('agent/get_agent_request_list', true, 'POST', {})
        .then((result) => {           
            dispatch(_getRequestList(result));            
        })

    };
}

export const _getRequestList = (result:object) => {
    return{
        type:REQUESTLIST,
        result
    }
}

export const acceptMoneyRequest = (data:Object) =>{
    return (dispatch, getState) => {       
  
        return apiCall('agent/accept_money_request', true, 'POST', data)
        .then((result) => {           
            dispatch(_acceptMoneyRequest(result));            
        })

    };
}

export const _acceptMoneyRequest = (result:object) => {
    return{
        type:ACCEPTMONEY,
        result
    }
}

export const startRequest = (data:Object) => {
    return (dispatch, getState) => {       
  
        return apiCall('agent/order_status_update', true, 'POST', data)
        .then((result) => {           
            dispatch(_startRequest(result));            
        })

    };
}

export const _startRequest = (result:object) => {
    return{
        type:STARTREQUEST,
        result
    }
}

export const arrivedRequest = (data:Object) => {
    return (dispatch, getState) => {       
  
        return apiCall('agent/order_status_update', true, 'POST', data)
        .then((result) => {           
            dispatch(_arrivedRequest(result));            
        })

    };
}

export const _arrivedRequest = (result:object) => {
    return{
        type:ARRIVEDREQUEST,
        result
    }
}

export const sendCompletionOtp = (data:Object) => {
    return (dispatch, getState) => {       
  
        return apiCall('agent/money_request_otp_conf_delivery', true, 'POST', data)
        .then((result) => {           
            dispatch(_sendCompletionOtp(result));            
        })

    };
}

export const _sendCompletionOtp = (result:object) => {
    return{
        type:COMPLETEREQUEST,
        result
    }
}

export const resendMoneyOtp = (data:Object) => {
    return (dispatch, getState) => {       
  
        return apiCall('agent/resend_money_conf_otp', true, 'POST', data)
        .then((result) => {           
            dispatch(_resendMoneyOtp(result));            
        })

    };
}

export const _resendMoneyOtp = (result:object) => {
    return{
        type:MONEYOTP,
        result
    }
}

export const getSummary = (data:Object) => {
   
    return (dispatch, getState) => {       
  
        return apiCall('agent/money_request_summary', true, 'POST', data)
        .then((result) => {           
            dispatch(_getSummary(result));            
        })

    };
}


export const _getSummary = (result:object) => {
    return{
        type:SUMMARY,
        result
    }
}

export const cancelRequest = (data:Object) => {
   
    return (dispatch, getState) => {       
  
        return apiCall('agent/cancel_request', true, 'POST', data)
        .then((result) => {           
            dispatch(_cancelRequest(result));            
        })

    };
}


export const _cancelRequest = (result:object) => {
    return{
        type:CANCELREQUEST,
        result
    }
}

export const cancelLaundryRequest = (data:Object) => {
   
    return (dispatch, getState) => {       
  
        return apiCall('agent/laundry_request_status_change', true, 'POST', data)
        .then((result) => {           
            dispatch(_cancelLaundryRequest(result));            
        })

    };
}


export const _cancelLaundryRequest = (result:object) => {
    return{
        type:CANCELLAUNDRYREQUEST,
        result
    }
}

export const agentAcceptLaundryRequest = (data:Object) =>{
    return (dispatch, getState) => {       
  
        return apiCall('agent/laundry_request_status_change', true, 'POST', data)
        .then((result) => {           
            dispatch(_agentAcceptLaundryRequest(result));            
        })

    };
}

export const _agentAcceptLaundryRequest = (result:object) => {
    return{
        type:ACCEPTLAUNDRY,
        result
    }
}

export const laundryStatus = (data:Object) => {
    return (dispatch, getState) => {       
  
        return apiCall('agent/laundry_request_status_change', true, 'POST', data)
        .then((result) => {           
            dispatch(_laundryStatus(result));            
        })

    };
}

export const _laundryStatus = (result:object) => {
    return{
        type:LAUNDRYSTATUS,
        result
    }
}

export const sendVerificationOtp = (data:Object) => {
    return (dispatch, getState) => {       
  
        return apiCall('agent/send_verification_otp', true, 'POST', data)
        .then((result) => {           
            dispatch(_sendVerificationOtp(result));            
        })

    };
}

export const _sendVerificationOtp = (result:object) => {
    return{
        type:LAUNDRY_OTP,
        result
    }
}

export const deliverLaundry = (data:Object) => {
    return (dispatch, getState) => {       
  
        return apiCall('agent/confirm_final_delivery', true, 'POST', data)
        .then((result) => {           
            dispatch(_deliverLaundry(result));            
        })

    };
}

export const _deliverLaundry = (result:object) => {
    return{
        type:LAUNDRY_COMPLETE,
        result
    }
}
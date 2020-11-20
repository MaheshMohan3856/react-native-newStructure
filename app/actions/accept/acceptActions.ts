import {REQUESTLIST,ACCEPTMONEY,STARTREQUEST,ARRIVEDREQUEST,COMPLETEREQUEST} from './acceptActionTypes';

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
  
        return apiCall('agent/', true, 'POST', data)
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

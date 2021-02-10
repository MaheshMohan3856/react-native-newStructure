import {GET_USER_HISTORY_MONEY,GET_USER_HISTORY_LAUNDRY,GET_AGENT_HISTORY_LAUNDRY,GET_AGENT_HISTORY_MONEY,GET_AGENT_EARNING} from './historyActionTypes';

import { apiCall } from '../../lib/Api';



export const getUserHistoryMoney = (data:Object) => {
    return (dispatch, getState) => {       
  
        return apiCall('users/get_money_requests', true, 'POST', data)
        .then((result) => {           
            dispatch(_getUserHistoryMoney(result));            
        })

    };
}

export const _getUserHistoryMoney = (result:object) => {
    return{
        type:GET_USER_HISTORY_MONEY,
        result
    }
}

export const getUserHistoryLaundry = (data:Object) => {
    return (dispatch, getState) => {       
  
        return apiCall('users/get_laundry_requests', true, 'POST', data)
        .then((result) => {           
            dispatch(_getUserHistoryLaundry(result));            
        })

    };
}

export const _getUserHistoryLaundry = (result:object) => {
    return{
        type:GET_USER_HISTORY_LAUNDRY,
        result
    }
}

export const getAgentHistoryMoney = (data:Object) => {
    return (dispatch, getState) => {       
  
        return apiCall('agent/money_request_history', true, 'POST', data)
        .then((result) => {           
            dispatch(_getAgentHistoryMoney(result));            
        })

    };
}

export const _getAgentHistoryMoney = (result:object) => {
    return{
        type:GET_AGENT_HISTORY_MONEY,
        result
    }
}

export const getAgentHistoryLaundry = (data:Object) => {
    return (dispatch, getState) => {       
  
        return apiCall('agent/laundry_request_history', true, 'POST', data)
        .then((result) => {           
            dispatch(_getAgentHistoryLaundry(result));            
        })

    };
}

export const _getAgentHistoryLaundry = (result:object) => {
    return{
        type:GET_AGENT_HISTORY_LAUNDRY,
        result
    }
}


export const getAgentEarnings = (data:Object) => {
    return (dispatch, getState) => {       
  
        return apiCall('agent/earnings', true, 'POST', data)
        .then((result) => {           
            dispatch(_getAgentEarnings(result));            
        })

    };
}

export const _getAgentEarnings = (result:object) => {
    return{
        type:GET_AGENT_EARNING,
        result
    }
}
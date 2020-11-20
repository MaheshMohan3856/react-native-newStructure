import {AGENT_REGISTER,SWITCHING,BECAME_AGENT} from './agentregisterActionTypes';

import { apiCall } from '../../lib/Api';



export const agentRegister = (data:object) => {
    return (dispatch, getState) => {       
  
        return apiCall('users/agent_transition', true, 'POST', data)
        .then((result) => {           
            dispatch(_agentRegister(result));            
        })

    };
}

export const _agentRegister = (result:object) => {
    return{
        type:AGENT_REGISTER,
        result
    }
}

export const switchover = (data:object) => {
    return (dispatch, getState) => {       
  
        return apiCall('users/user_switch', true, 'POST', data)
        .then((result) => {           
            dispatch(_switchover(result));            
        })

    };
}

export const _switchover = (result:object) => {
    return{
        type:SWITCHING,
        result
    }
}

export const agentReg = (result:object) => {
    return{
        type:BECAME_AGENT,
        result
    }
}


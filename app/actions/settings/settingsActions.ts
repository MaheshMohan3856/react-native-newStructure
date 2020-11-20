import {CHANGE_PASSWORD,USER_PROFILE,UPDATE_PROFILE,PROFILE_EDITTED,AGENT_PROFILE,EDIT_AGENT} from './settingsActionTypes';

import { apiCall } from '../../lib/Api';



export const changePassword = (data:object) => {
    return (dispatch, getState) => {       
  
        return apiCall('users/change_password', true, 'POST', data)
        .then((result) => {           
            dispatch(_changePassword(result));            
        })

    };
}

export const _changePassword = (result:object) => {
    return{
        type:CHANGE_PASSWORD,
        result
    }
}

export const getUserProfile = () => {
    return (dispatch, getState) => {       
  
        return apiCall('users/get_user_profile', true, 'POST', {})
        .then((result) => {           
            dispatch(_userProfile(result));            
        })

    };
}

export const _userProfile = (result:object) => {
    return{
        type:USER_PROFILE,
        result
    }
}

export const editProfile = (data:object) => {
    return (dispatch, getState) => {       
  
        return apiCall('users/update_user_profile', true, 'POST', data)
        .then((result) => {           
            dispatch(_editProfile(result));            
        })

    };
}

export const _editProfile = (result:object) => {
    return{
        type:UPDATE_PROFILE,
        result
    }
}

export const _profileEditted = (result:object) =>{
    return{
        type:PROFILE_EDITTED,
        result
    }
}

export const getAgentProfile = () => {
    return (dispatch, getState) => {       
  
        return apiCall('users/get_agent_profile', true, 'POST', {})
        .then((result) => {           
            dispatch(_agentProfile(result));            
        })

    };
}

export const _agentProfile = (result:object) => {
    return{
        type:AGENT_PROFILE,
        result
    }
}

export const editAgent = (data:object) => {
    return (dispatch, getState) => {       
  
        return apiCall('users/update_agent_profile', true, 'POST', data)
        .then((result) => {           
            dispatch(_editAgent(result));            
        })

    };
}

export const _editAgent = (result:object) => {
    return{
        type:EDIT_AGENT,
        result
    }
}
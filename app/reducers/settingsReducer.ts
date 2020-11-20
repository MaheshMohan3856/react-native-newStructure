import {CHANGE_PASSWORD,USER_PROFILE,UPDATE_PROFILE,PROFILE_EDITTED,AGENT_PROFILE,EDIT_AGENT} from '../actions/settings/settingsActionTypes';



export default function (state:any={}, action:any){
    switch(action.type){
     
        case CHANGE_PASSWORD:
            return {_changePassword:action.result}
        case USER_PROFILE:
            return {_userProfile:action.result}
        case UPDATE_PROFILE:
            return {_updateProfile:action.result}
        case PROFILE_EDITTED:
            return {_profileEditted:action.result}
        case AGENT_PROFILE:
            return {_agentProfile:action.result}
        case EDIT_AGENT:
            return {_editAgent:action.result}

        default:
            return state;
    }
} 
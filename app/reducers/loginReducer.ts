import {LOGIN,LOGOUT,SIGNUP,VERIFY_PHONE,VERIFY_EMAIL,RESEND,FORGOT,RESET,DELETE,VERIFY_NEW_PHONE} from '../actions/login/loginActionTypes';



export default function (state:any={}, action:any){
    switch(action.type){
     
        case LOGIN:
            return {_login:action.result}
 
        case LOGOUT:
            return {_logout:action.result}
        case SIGNUP:
            return {_signup:action.result}
        case VERIFY_PHONE:
            return {_verifyPhone:action.result}
        case VERIFY_EMAIL:
            return {_verifyEmail:action.result}
        case RESEND:
            return {_resend:action.result}
        case FORGOT:
            return {_forgot:action.result}
        case RESET:
            return {_resetPass:action.result}
        case DELETE:
            return {_delete:action.result}
        case VERIFY_NEW_PHONE:
            return {_verifyNewPhone:action.result}
        default:
            return state;
    }
}
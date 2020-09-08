import {LOGIN} from '../actions/login/loginActionTypes';



export default function (state:any={}, action:any){
    switch(action.type){
     
        case LOGIN:
            return {_login:action.result}
       
        default:
            return state;
    }
}
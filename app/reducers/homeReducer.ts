import {GETSIM,} from '../actions/home/homeActionTypes';



export default function (state:any={}, action:any){
    switch(action.type){
     
        case GETSIM:
            return {_getSim:action.result}
       
        default:
            return state;
    }
}
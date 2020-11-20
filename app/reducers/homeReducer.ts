import {CHECKSTATUS,CHECKCARD,HOMELIST} from '../actions/home/homeActionTypes';



export default function (state:any={}, action:any){
    switch(action.type){
     
        case CHECKSTATUS:
            return {_status:action.result,_homelist:state._homelist}
        case CHECKCARD:
            return {_card:action.result,_status:state._status,_homelist:state._homelist}
        case HOMELIST:
            return {_homelist:action.result,_card:state._card,_status:state._status}
       
        default:
            return state;
    }
}
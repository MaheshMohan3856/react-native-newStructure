import {REQUESTLIST,ACCEPTMONEY,STARTREQUEST,ARRIVEDREQUEST,COMPLETEREQUEST} from '../actions/accept/acceptActionTypes';



export default function (state:any={}, action:any){
    switch(action.type){
     
       
        case REQUESTLIST:
            return {_requestList:action.result}
        case ACCEPTMONEY:
            return {_acceptRequest:action.result,_requestList:state._requestList}
        case STARTREQUEST:
            return {_startRequest:action.result}
        case ARRIVEDREQUEST:
            return {_arrivedRequest:action.result}
        case COMPLETEREQUEST:
            return {_completeRequest:action.result}
        default:
            return state;
    }
}
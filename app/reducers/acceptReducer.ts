import {REQUESTLIST,ACCEPTMONEY,STARTREQUEST,ARRIVEDREQUEST,COMPLETEREQUEST,SUMMARY,MONEYOTP,ACCEPTLAUNDRY,LAUNDRYSTATUS,CANCELLAUNDRYREQUEST,CANCELREQUEST,LAUNDRY_COMPLETE,LAUNDRY_OTP} from '../actions/accept/acceptActionTypes';



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
        case SUMMARY:
            return {_summary:action.result}
        case MONEYOTP:
            return {_moneyOtp:action.result}
        case ACCEPTLAUNDRY:
            return {_acceptLaundry:action.result,_requestList:state._requestList}
        case LAUNDRYSTATUS:
            return {_statusUpdated:action.result}
        case CANCELREQUEST:
            return {_mrCancel:action.result,_requestList:state._requestList}
        case CANCELLAUNDRYREQUEST:
            return {_lrCancel:action.result,_requestList:state._requestList}
        case LAUNDRY_OTP:
            return {_otpSend:action.result,_requestList:state._requestList}
        case LAUNDRY_COMPLETE:
            return {_completeLaundry:action.result,_requestList:state._requestList}
        default:
            return state;
    }
}
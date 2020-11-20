import {CALCULATEAMOUNT,MONEYRANGE,CONFIRMMONEY} from '../actions/moneyrequest/moneyrequestActionTypes';



export default function (state:any={}, action:any){
    switch(action.type){
     
        
        case CALCULATEAMOUNT:
            return {_calculateCharge:action.result,_moneyRange:state._moneyRange}
        case MONEYRANGE:
            return {_moneyRange:action.result}
        case CONFIRMMONEY:
            return {_confirmMoney:action.result}
        default:
            return state;
    }
}
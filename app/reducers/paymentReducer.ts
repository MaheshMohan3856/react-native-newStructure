import {ADDBANK,ADDCARD,PAYMENTDETAILS,ADDNEWBANK,DELETECARD} from '../actions/payment/paymentActionTypes';



export default function (state:any={}, action:any){
    switch(action.type){
     
        case ADDBANK:
               return {_addBankAccount:action.result}
        case ADDCARD:
               return {_addCard:action.result}
        case PAYMENTDETAILS:
               return {_paymentDetails:action.result}
        case ADDNEWBANK:
               return {_addNewBank:action.result}
        case DELETECARD:
            return {_deleteCard:action.result,_paymentDetails:state._paymentDetails}
        default:
            return state;
    }
}
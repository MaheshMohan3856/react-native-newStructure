import {LAUNDRY_ORDER,CANCEL_LAUNDRY_ORDER,LAUNDRY_PAYMENT,LAUNDRY_PAYMENT_REJECT,LAUNDRY_RATING} from '../actions/laundryorder/laundryorderActionTypes';



export default function (state:any={}, action:any){
    switch(action.type){
     
        
        case LAUNDRY_ORDER:
            return {_orderDetails:action.result}

        case CANCEL_LAUNDRY_ORDER:
            return {_cancelLaundry:action.result,_orderDetails:state._orderDetails}
        
        case LAUNDRY_PAYMENT:
            return {_paymentDone:action.result,_orderDetails:state._orderDetails}
            
        case LAUNDRY_PAYMENT_REJECT:
            return {_paymentRejected:action.result,_orderDetails:state._orderDetails}

        case LAUNDRY_RATING:
            return {_laundryRating:action.result}
      
        default:
            return state;
    }
}
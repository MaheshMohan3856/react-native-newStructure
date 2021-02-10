import {MONEY_ORDER,CANCEL_MONEY_ORDER,PAY_MONEY,RATING} from '../actions/moneyorder/moneyorderActionTypes';



export default function (state:any={}, action:any){
    switch(action.type){
     
        
        case MONEY_ORDER:
            return {_orderDetails:action.result}

        case CANCEL_MONEY_ORDER:
            return {_cancelMoney:action.result,_orderDetails:state._orderDetails}

        case PAY_MONEY:
            return {_payAgent:action.result,_orderDetails:state._orderDetails}

        case RATING:
            return {_rating:action.result}
      
        default:
            return state;
    }
}
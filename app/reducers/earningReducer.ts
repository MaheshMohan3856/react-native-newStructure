import {TOTAL_EARNINGS} from '../actions/earning/earningActionTypes';



export default function (state:any={}, action:any){
    switch(action.type){
     
       
        case TOTAL_EARNINGS:
            return {_totalEarnings:action.result}
        default:
            return state
    }
}
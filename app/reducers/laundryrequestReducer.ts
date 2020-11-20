import {LAUNDRYLIST,LAUNDRYDETAIL,LAUNDRO,CALCULATE,CONFIRMPICKUP} from '../actions/laundryrequest/requestActionTypes';



export default function (state:any={}, action:any){
    switch(action.type){
     
        case LAUNDRYLIST:
              return {_getLaundryList:action.result}
        case LAUNDRYDETAIL:
            return {_laundryDetail:action.result,_getLaundryList:state._getLaundryList}
        case LAUNDRO:
            return {_laundro:action.result,_getLaundryList:state._getLaundryList,_laundryDetail:state._laundryDetail}
        case CALCULATE:
            return {_calculate:action.result,_laundro:state._laundro,_getLaundryList:state._getLaundryList,_laundryDetail:state._laundryDetail}
        case CONFIRMPICKUP:
            return {_confirmPickup:action.result}
        default:
            return state;
    }
}
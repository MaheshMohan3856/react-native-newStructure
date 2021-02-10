import {
    SET_TOKEN
   
} from '../actions/token/tokenActionTypes';

export default function(state = {}, action:any) {

    switch(action.type){        
        case SET_TOKEN:
        
            return {_token:action.result}; 
                 
        default:
            return state;

    }

}
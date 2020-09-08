import {
    SHOW_LOADER,
    HIDE_LOADER,
    DISABLE_SCROLL
} from '../actions/common/commonActionTypes';

export default function(state = {}, action) {

    switch(action.type){        
        case SHOW_LOADER:
        case HIDE_LOADER:
            return action.payload; 
        case DISABLE_SCROLL:
             return action.payload          
        default:
            return state;

    }

}
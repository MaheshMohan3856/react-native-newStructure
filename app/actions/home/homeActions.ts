import {GETSIM} from './homeActionTypes';

import { apiCall } from '../../lib/Api';



export const getSimList = (data:object) => {
    return (dispatch, getState) => {       
  
        return apiCall('getsimcardlist', true, 'POST', data)
        .then((result) => {           
            dispatch(_getSim(result));            
        })

    };
}

export const _getSim = (result:object) => {
    return{
        type:GETSIM,
        result
    }
}


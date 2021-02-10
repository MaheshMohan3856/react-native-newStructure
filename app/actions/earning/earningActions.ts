import {TOTAL_EARNINGS} from './earningActionTypes';

import { apiCall } from '../../lib/Api';



export const getTotalEarnings = () => {
    return (dispatch, getState) => {       
  
        return apiCall('agent/total_earnings', true, 'POST', {})
        .then((result) => {           
            dispatch(_getTotalEarnings(result));            
        })

    };
}

export const _getTotalEarnings = (result:object) => {
    return{
        type:TOTAL_EARNINGS,
        result
    }
}
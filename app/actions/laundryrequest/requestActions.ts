import {LAUNDRYLIST,LAUNDRYDETAIL,LAUNDRO,CALCULATE,CONFIRMPICKUP} from './requestActionTypes';

import { apiCall } from '../../lib/Api';



export const getLaundryList = (data:Object) => {
    return (dispatch, getState) => {       
  
        return apiCall('users/get_laundromat_list', true, 'POST', data)
        .then((result) => {           
            dispatch(_getLaundryList(result));            
        })

    };
}

export const _getLaundryList = (result:object) => {
    return{
        type:LAUNDRYLIST,
        result
    }
}

export const getLaundryDetail = (data:Object) =>{
    return (dispatch, getState) => {       
  
        return apiCall('users/get_laundromat_details', true, 'POST', data)
        .then((result) => {           
            dispatch(_getLaundryDetail(result));            
        })

    };
}

export const _getLaundryDetail = (result:object) => {
    return{
        type:LAUNDRYDETAIL,
        result
    }
}


export const getlaundro = (data:Object) =>{
    return (dispatch, getState) => {       
  
        return apiCall('users/last_address_laundromat_data', true, 'POST', data)
        .then((result) => {           
            dispatch(_getLaundro(result));            
        })

    };
}

export const _getLaundro  = (result:object) => {
    return{
        type:LAUNDRO,
        result
    }
}

export const calculatePrice = (data:Object) => {
    return (dispatch, getState) => {       
  
        return apiCall('users/final_laundry_calculations', true, 'POST', data)
        .then((result) => {           
            dispatch(_calculate(result));            
        })

    };
}

export const _calculate  = (result:object) => {
    return{
        type:CALCULATE,
        result
    }
}

export const confirmPick = (data:Object) => {
    return (dispatch, getState) => {       
  
        return apiCall('users/submit_laundry_request', true, 'POST', data)
        .then((result) => {           
            dispatch(_confirmPick(result));            
        })

    };
}

export const _confirmPick  = (result:object) => {
    return{
        type:CONFIRMPICKUP,
        result
    }
}
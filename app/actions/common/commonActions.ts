import { SHOW_LOADER, HIDE_LOADER,DISABLE_SCROLL } from './commonActionTypes';

export const showLoader = () => {

    return {
        type: SHOW_LOADER,
        payload: {
            loader: true
        }
    }

}

export const hideLoader = () => {

    return {
        type: HIDE_LOADER,
        payload: {
            loader: false
        }
    }

}

export const getScrollUpdated = () =>{
    return{
        type:DISABLE_SCROLL,
        payload:{
            scroller:false
        }
    }
}
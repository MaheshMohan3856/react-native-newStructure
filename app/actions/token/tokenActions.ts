import { SET_TOKEN } from './tokenActionTypes';

export const saveToken = (result:Object) => {

    return {
        type: SET_TOKEN,
        result
    }

}


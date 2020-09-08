import {combineReducers} from 'redux';

import commonReducer from './reducers/commonReducer';
import homeReducer from './reducers/homeReducer';
import loginReducer from './reducers/loginReducer';




const AppReducer = combineReducers({
  
    common_r:commonReducer,
    home_r:homeReducer,
    login_r:loginReducer
   
}) 

export default AppReducer

export type RootState = ReturnType<typeof AppReducer>


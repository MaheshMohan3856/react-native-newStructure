import {combineReducers} from 'redux';

import commonReducer from './reducers/commonReducer';
import homeReducer from './reducers/homeReducer';
import loginReducer from './reducers/loginReducer';
import agentregisterReducer from './reducers/agentregisterReducer';
import settingsReducer from './reducers/settingsReducer';
import laundryrequestReducer from './reducers/laundryrequestReducer';
import paymentReducer from './reducers/paymentReducer';
import moneyrequestReducer from './reducers/moneyrequestReducer';
import acceptReducer from './reducers/acceptReducer';
import moneyorderReducer from './reducers/moneyorderReducer';
import laundryorderReducer from './reducers/laundryorderReducer';
import tokenReducer from './reducers/tokenReducer';
import historyReducer from './reducers/historyReducer';
import earningReducer from './reducers/earningReducer';

const AppReducer = combineReducers({
  
    common_r:commonReducer,
    home_r:homeReducer,
    login_r:loginReducer,
    agentregister_r:agentregisterReducer,
    settings_r:settingsReducer,
    payment_r:paymentReducer,
    lrequest_r:laundryrequestReducer,
    mrequest_r:moneyrequestReducer,
    accept_r:acceptReducer,
    morder_r:moneyorderReducer,
    lorder_r:laundryorderReducer,
    token_r:tokenReducer,
    history_r:historyReducer,
    earnings_r:earningReducer
   
}) 

export default AppReducer

export type RootState = ReturnType<typeof AppReducer>


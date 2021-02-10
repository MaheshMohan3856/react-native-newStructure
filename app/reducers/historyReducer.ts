import {
    GET_USER_HISTORY_MONEY,
    GET_USER_HISTORY_LAUNDRY,
    GET_AGENT_HISTORY_LAUNDRY,
    GET_AGENT_HISTORY_MONEY,
    GET_AGENT_EARNING
   
} from '../actions/history/historyActionTypes';

export default function(state:any = {}, action:any) {

    switch(action.type){        
        case GET_USER_HISTORY_MONEY:
        
            return {_historyMoney:action.result,_historyLaundry:state._historyLaundry} 

        case GET_USER_HISTORY_LAUNDRY:

            return {_historyLaundry:action.result,_historyMoney:state._historyMoney}
        
        case GET_AGENT_HISTORY_LAUNDRY:

            return {_agentHistoryLaundry:action.result,_agentHistoryMoney:state._agentHistoryMoney,_agentEarning:state._agentEarning}

        case GET_AGENT_HISTORY_MONEY:

            return {_agentHistoryMoney:action.result,_agentHistoryLaundry:state._agentHistoryLaundry,_agentEarning:state._agentEarning}

        case GET_AGENT_EARNING:

        return {_agentEarning:action.result,_agentHistoryMoney:state._agentHistoryMoney,_agentHistoryLaundry:state._agentHistoryLaundry}
                 
        default:
            return state;

    }

}
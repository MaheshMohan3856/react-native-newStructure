import {AGENT_REGISTER,SWITCHING,BECAME_AGENT} from '../actions/agentregister/agentregisterActionTypes';



export default function (state:any={}, action:any){
    switch(action.type){
     
        case AGENT_REGISTER:
            return {_agentRegister:action.result,_agentBecame:state._agentBecame}
        case SWITCHING:
            return {_switch:action.result}
        case BECAME_AGENT:
            return {_agentBecame:{...action.result}}
      
        default:
            return state;
    }
}
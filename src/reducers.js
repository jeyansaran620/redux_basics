
import {combineReducers} from 'redux';

function todos (state=[],action)
{
    
    switch (action.type)
    {
        case 'ADD_TODO':
            return state.concat([action.todo])
        case 'REMOVE_TODO':
            return state.filter((value) => value.id !== action.id)
        case 'TOGGLE_TODO':
            return state.map((value) => {
                if (value.id === action.id)
                {
                 return Object.assign({},value,{complete : !value.complete})
                }
                return value
         })
        case 'RECEVIE_DATA':
            return action.todos
        default :    
            return state
    }
}

function goals (state=[],action)
{
    
    switch (action.type)
    {
        case 'ADD_GOAL':
            return state.concat([action.goal])
        case 'REMOVE_GOAL':
            return state.filter((value) => value.id !== action.id)  
        case 'RECEVIE_DATA':
            return action.goals;
        default :
            return state
    }
}


function loading(state = true,action) 
{
  
    switch (action.type)
    {
        case 'RECEVIE_DATA':
        return false
        default :
        return state
    }
}

export default combineReducers(
    {
        todos,
        goals,
        loading
    }
  )
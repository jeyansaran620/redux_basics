import {applyMiddleware} from 'redux';
import * as thunk from 'redux-thunk';

const checker = () => (next) => (action) =>
{
  if (
    action.type === 'ADD_TODO' &&
    action.todo.name.toLowerCase().includes('bitcoin')
  ) {
    return alert("Nope. That's a bad idea.")
  }

  if (
    action.type === 'ADD_GOAL' &&
    action.goal.name.toLowerCase().includes('bitcoin')
  ) {
    return alert("Nope. That's a bad idea.")
  }

  return next(action)
}

 
const logger = (store) => (next) => (action) =>
{
   console.group(action.type)
   console.log(action)
   const result = next(action)
   console.log('the new state is: ',store.getState())   
   console.groupEnd();
   return  result
}

const thunks =(store) => (next) => (action) =>
{
  if (typeof action === 'function')
  {
    return action(store.dispatch)
  }
    return next(action)
}

export default applyMiddleware(thunk.default,checker,logger)
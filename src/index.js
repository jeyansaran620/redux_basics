import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

let todos = window.todos
let goals = window.goals
let loading = window.loading
let Redux = window.Redux

const checker = () => (next) => (action) =>
{

           if (action.type ==='ADD_TODO' )
           {
              if(action.todo.name.toLowerCase().includes('bitcoin'))
              {
                console.log("no bitcoins");
               }
               else 
               {
                  next(action)
                }
            }
            else if (action.type ==='ADD_GOAL')
            {
            
            if (action.goal.name.toLowerCase().includes('bitcoin'))
               
               {
                  console.log("no bitcoins");
               }
               else 
               {
                  next(action)
                }
              }
             else 
              {
                 next(action)
               }
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

const thunk =(store) => (next) => (action) =>
{
  if (typeof action === 'function')
  {
    return action(store.dispatch)
  }
    return next(action)
}

let store = Redux.createStore(Redux.combineReducers(
  {
      todos,
      goals,
      loading
  }
) , Redux.applyMiddleware(window.ReduxThunk.default,checker,logger))


const Context =React.createContext();

class Provider extends React.Component
{
  render()
  {
    return(
      <Context.Provider value={store}>
      {this.props.children}
      </Context.Provider>
    )
  }
}


const ConnectedApp = connect ((state) =>
({
  loading:state.loading
})) (App)


function connect(mapStateToProps)
{
  return (Component) =>
  {
    class Receiver extends React.Component
    {
      componentDidMount()
      {
        const {subscribe} = this.props.store
        this.unsubscribe = subscribe(()=>
        {
          this.forceUpdate()
        })
      }
      componentWillUnmount()
      {
        this.unsubscribe()
      }
      render()
      {  
        const {dispatch , getState } = this.props.store
        const state = getState()
        const stateNeeded = mapStateToProps(state)
        return (
           <Component {...stateNeeded} dispatch={dispatch} />
        )
      }
    }
    class ConnectedComponent extends React.Component
    {
      render()
      {
        return(
          <Context.Consumer>
          {(store) => <Receiver store={store}/>}
          </Context.Consumer>
        )
      }
    }
    return ConnectedComponent
  }
}

ReactDOM.render(
  <React.StrictMode>
  <Provider >
  <ConnectedApp />
  </Provider>
    
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

export  {connect};
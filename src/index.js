import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {createStore} from 'redux';
import {Provider,connect} from 'react-redux';
import reducer from './reducers';
import middleware from './middlewares';

/*class Provider extends React.Component
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
*/

/*
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
*/

let store = createStore(reducer ,middleware )



const ConnectedApp = connect ((state) =>
({
  loading:state.loading
})) (App)


ReactDOM.render(
  <React.StrictMode>
  <Provider store={store}>
  <ConnectedApp />
  </Provider>   
  </React.StrictMode>,
  document.getElementById('root')
);

import React from 'react';
import {connect} from 'react-redux';
import {handleGetValues} from './handlers';
import Todos from './Todos';
import Goals from './Goals';


const ConnectedTodos = connect((state) => (
  {
    todos:state.todos
  })) (Todos)
 

const ConnectedGoals = connect((state) =>(
  {
    goals:state.goals
  })) (Goals)
  

class App extends React.Component {

  componentDidMount = () =>
  {
    this.props.dispatch(handleGetValues()) 

  }
  render()
  {
    const {loading} =this.props.loading

    if (loading)
    return <h2>Loading</h2>
    else{
  return (
    <div className="App">
    <ConnectedTodos />
     <ConnectedGoals />
    </div>
  );
  }
}
}

export default App;

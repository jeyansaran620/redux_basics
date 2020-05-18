import React from 'react';
import {connect} from './index'




class Todos extends React.Component
{
   removeTodo =(todo) => 
   {
    this.props.dispatch(window.handleDeleteTodo(todo.id))
   }
   toggleTodo =(todo) => 
   {
    this.props.dispatch(window.handleToggleTodo(todo))
   }
   addItem =(e) => 
  {
    e.preventDefault();
    this.props.dispatch(window.handleAddTodo(this.input.value))
    this.input.value='';
  }

  render()
{  
  return (
    <div>
    <h1>TODO List</h1>
    <input id='todo' type='text' ref={(input) => this.input=input} placeholder ='Add todo' />
    <button onClick={(e) => this.addItem(e)}>Add Todo</button>
    <ul id='todos'>
    {
      this.props.todos.map((todo) =>
      (
        <li key={todo.id}>
        {todo.name}
        <button onClick={() => this.toggleTodo(todo)}>{todo.complete.toString()}</button>
        <button onClick={() => this.removeTodo(todo)}>X</button>
        </li>
      ))
    }
    </ul>
    </div>
  )
}
}

const ConnectedTodos = connect((state) => (
  {
    todos:state.todos
  })) (Todos)
  


class Goals extends React.Component
{
  removeGoal =(goal) => 
  {

    this.props.dispatch(window.handleDeleteGoal(goal.id))
  }

  addItem =(e) => 
  {
    e.preventDefault();
    this.props.dispatch(window.handleAddGoal(this.input.value))
    this.input.value='';
  }

  render()
{  
  return (
    <div>
    <h1>GOAL List</h1>
    <input id='goal' type='text' ref={(input) => this.input=input} placeholder ='Add goal' />
    <button onClick={(e) => this.addItem(e)}>Add Goal</button>
    <ul id='goals'>
    {
      this.props.goals.map((goal) =>
      (
        <li key={goal.id}>
        {goal.name} <button onClick={() => this.removeGoal(goal)}>X</button>
        </li>
      ))
    }
    </ul>
    </div>
  )
}
}


const ConnectedGoals = connect((state) =>(
  {
    goals:state.goals
  })) (Goals)
  


class App extends React.Component {

  componentDidMount = () =>
  {
    this.props.dispatch(window.handleGetValues()) 

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

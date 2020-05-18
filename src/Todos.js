import React from 'react';
import {handleDeleteTodo,handleToggleTodo,handleAddTodo} from './handlers';

class Todos extends React.Component
{
   removeTodo =(todo) => 
   {
    this.props.dispatch(handleDeleteTodo(todo.id))
   }
   toggleTodo =(todo) => 
   {
    this.props.dispatch(handleToggleTodo(todo))
   }
   addItem =(e) => 
  {
    e.preventDefault();
    this.props.dispatch(handleAddTodo(this.input.value))
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

export default Todos;
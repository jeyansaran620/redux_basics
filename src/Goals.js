import React from 'react';
import {handleAddGoal,handleDeleteGoal} from './handlers';

class Goals extends React.Component
{
  removeGoal =(goal) => 
  {

    this.props.dispatch(handleDeleteGoal(goal.id))
  }

  addItem =(e) => 
  {
    e.preventDefault();
    this.props.dispatch(handleAddGoal(this.input.value))
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
export default Goals;
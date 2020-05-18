import API from 'goals-todos-api';

  const ADD_TODO = 'ADD_TODO';
  const TOGGLE_TODO = 'TOGGLE_TODO';
  const REMOVE_TODO = 'REMOVE_TODO';
  const ADD_GOAL = 'ADD_GOAL';
  const REMOVE_GOAL = 'REMOVE_GOAL';
  const RECEVIE_DATA ='RECEVIE_DATA';

function addTodoAction(todo)
{
    return {
        type: ADD_TODO,
        todo
    }
}

function removeTodoAction (id)
{
    return {
        type: REMOVE_TODO,
        id
    }
}
function toggleTodoAction (id)
{
    return {
        type: TOGGLE_TODO,
        id
    }
}
function addGoalAction (goal)
{
    return {
        type: ADD_GOAL,
        goal
    }
}
function removeGoalAction (id)
{
    return {
        type: REMOVE_GOAL,
        id
    }
}

function receiveDataAction (todos, goals)
{
    return {
        type: RECEVIE_DATA,
        todos,
        goals
    }
}



function handleDeleteTodo(todo)
{

    return(dispatch) =>
     {
    dispatch(removeTodoAction(todo))
    API.deleteTodo(todo.id).catch(()=>
    {
     dispatch(addTodoAction(todo))
      alert('Error in deleting Todo')
    }
    )}
}


function handleToggleTodo(todo)
{

    return(dispatch) =>
     {
        dispatch(toggleTodoAction(todo.id))
         API.saveTodoToggle(todo.id).catch(()=>
        {
         dispatch(toggleTodoAction(todo.id))
          alert('Error in Toggle Todo from '+todo.complete.toString())
        })}
}


function handleAddTodo(value)
{
  return(dispatch) =>
     {
       API.saveTodo(value).then((todo) =>
        {
         dispatch(addTodoAction(todo))
          
        }).catch(() =>
        {
          alert('Error in add Todo')
        }
    
        )}
}
function handleAddGoal(value)
{
  return(dispatch) =>
     {
    API.saveGoal(value).then((goal) =>
    {
      dispatch(addGoalAction(goal))
    }).catch(() =>
    {
      alert('Error in add Goal')
    }

    )}
}

function handleDeleteGoal(goal)
{

    return(dispatch) =>
     {
    dispatch(removeGoalAction(goal))
    API.deleteGoal(goal.id).catch(()=>
    {
     dispatch(addTodoAction(goal))
      alert('Error in deleting goal')
    }
    )}
}

function handleGetValues()
{
    return(dispatch) =>
    {
  return  Promise.all([
        API.fetchTodos(),
        API.fetchGoals()
      ]).then(([ todos, goals ]) => {
       dispatch(receiveDataAction(todos, goals))
      })
    }
}

export {handleDeleteTodo,handleToggleTodo,handleAddTodo,handleAddGoal,handleDeleteGoal,handleGetValues}
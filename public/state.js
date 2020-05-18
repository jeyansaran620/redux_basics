function createStore(reducer){
 
    let state;
    let listeners =[];
 
   const getState =() => state;
   const subscribe = (listener) => 
   {
       listeners.push(listener);
       return () =>
       {
           listeners.filter((l) => l!==listener)
        }
   }
   const dispatch =(action) =>
   {
       state= reducer(state,action) 
       listeners.forEach((lis) => lis())

   }
    return {
         getState,
         subscribe,
         dispatch
    }
}
//APP code


const ADD_TODO = 'ADD_TODO';
const TOGGLE_TODO = 'TOGGLE_TODO';
const REMOVE_TODO = 'REMOVE_TODO';
const ADD_GOAL = 'ADD_GOAL';
const REMOVE_GOAL = 'REMOVE_GOAL';
const RECEVIE_DATA ='RECEVIE_DATA';

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

function app (state={},action)
{
    
   return {
       todos: todos(state.todos,action),
       goals: goals(state.goals,action)
   }
}


function generateId()
  {
      return Math.random().toString(36).substring(2) + (new Date()).getTime().toString(36)
  }

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
    window.API.deleteTodo(todo.id).catch(()=>
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
        dispatch(window.toggleTodoAction(todo.id))
         window.API.saveTodoToggle(todo.id).catch(()=>
        {
         dispatch(window.toggleTodoAction(todo.id))
          alert('Error in Toggle Todo from '+todo.complete.toString())
        })}
}
function handleAddTodo(value)
{
  return(dispatch) =>
     {
       window.API.saveTodo(value).then((todo) =>
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
    window.API.saveGoal(value).then((goal) =>
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
    window.API.deleteGoal(goal.id).catch(()=>
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
        window.API.fetchTodos(),
        window.API.fetchGoals()
      ]).then(([ todos, goals ]) => {
       dispatch(receiveDataAction(todos, goals))
      })
    }
}
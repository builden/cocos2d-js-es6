import { VisibilityFilters, SET_VISIBILITY_FILTER, ADD_TODO, COMPLETE_TODO } from './actions';
import { combineReducers } from 'redux';

function todos(state = [], action) {
  switch (action.type) {
  case ADD_TODO:
    return [...state, {
      text: action.text,
      completed: false,
    }];
  case COMPLETE_TODO:
    return [
      ...state.slice(0, action.index),
      Object.assign({}, state[action.index], {
        completed: true,
      }),
      ...state.slice(action.index + 1),
    ];
  default:
    return state;
  }
}

function visibilityFilter(state = VisibilityFilters.SHOW_ALL, action) {
  switch (action.type) {
  case SET_VISIBILITY_FILTER:
    return action.filter;
  default:
    return state;
  }
}

// <=>
/*
  export default function todoApp(state, action) {
    return {
      visibilityFilter: visibilityFilter(state.visibilityFilter, action),
      todos: todos(state.todos, action)
    };
  }
*/
const todoApp = combineReducers({
  visibilityFilter,
  todos,
});

export default todoApp;

import { createAction, handleActions } from 'redux-actions';
import { Map, List } from 'immutable';

const CHANGE_INPUT = 'todo/CHANGE_INPUT';
const INSERT = 'todo/INSERT';
const TOGGLE = 'todo/TOGGLE';
const REMOVE = 'todo/REMOVE';

/* createAction 함수는 3가지의 파라미터를 받는다.
1. 액션이름
2. paloadCreateor
3. metaCreator
const sample = createAction('SAMPLE', (value) => value + 1, (value) => value - 1);
sample(1);
{ type: 'SAMPLE', payload: 2, meta: 0 } 
*/
export const changeInput = createAction(CHANGE_INPUT);
export const insert = createAction(INSERT);
export const toggle = createAction(TOGGLE);
export const remove = createAction(REMOVE);

let id = 0;

/* 
const initialState = {
  input: '',
  todos: {},
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case CHANGE_INPUT:
      return { ...state, input: action.payload };
    case INSERT:
      return { ...state, todos: state.todos.concat({ id: id++, checked: false, text: action.payload }) };
    case TOGGLE:
      return { ...state, todos: state.todos.map((item) => (item.id === action.payload ? { ...item, checked: !item.checked } : item)) };
    case REMOVE:
      return { ...state, todos: state.todos.filter((todo) => todo.id !== action.payload) };
    default:
      return state;
  }
}
*/

// immutable 사용
const initialState = Map({
  input: '',
  todos: List(),
});
// handleAction 사용
export default handleActions(
  {
    [CHANGE_INPUT]: (state, action) => state.set('input', action.payload),
    [INSERT]: (state, { payload: text }) => {
      const item = Map({ id: id++, checked: false, text });
      return state.update('todos', (todos) => todos.push(item));
    },
    [TOGGLE]: (state, { payload: id }) => {
      const index = state.get('todos').findIndex((item) => item.get('id') === id);
      return state.updateIn(['todos', index, 'checked'], (checked) => !checked);
    },
    [REMOVE]: (state, { payload: id }) => {
      const index = state.get('todos').findIndex((item) => item.get('id') === id);
      return state.deleteIn(['todos', index]);
    },
  },
  initialState
);

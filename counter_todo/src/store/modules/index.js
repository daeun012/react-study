// 모든 모듈들을 불러와서 합치는 작업이 이뤄짐
// combineReducer를 사용해 하나의 리듀서로 합치기
import { combineReducers } from 'redux';
import counter from './counter';
import todo from './todo';

export default combineReducers({
  counter,
  todo,
});

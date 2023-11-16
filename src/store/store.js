import { createStore } from 'redux';
import rootReducer from './reducers';

// Redux DevTools를 사용하기 위한 코드
const enhancer = process.env.NODE_ENV === 'development' ? window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__() : null;

const store = createStore(rootReducer, enhancer);

export default store;



// import { createStore, combineReducers } from 'redux';

// import todos from '../modules/todos';

// const rootReducer = combineReducers({
//     todos,
// });
// const store = createStore(rootReducer);

// export default store;
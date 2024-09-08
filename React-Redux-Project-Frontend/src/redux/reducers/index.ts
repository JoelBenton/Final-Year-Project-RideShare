import { combineReducers } from 'redux';
import formReducer from './userFormReducer';

const rootReducer = combineReducers({
  form: formReducer,
  // other reducers can go here
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
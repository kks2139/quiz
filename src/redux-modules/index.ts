import { combineReducers } from 'redux';
import app from './app';
import quizList from './quizList';
import quizHistoryList from './quizHistoryList';


const rootReducer = combineReducers({
    app,
    quizList,
    quizHistoryList
});

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;
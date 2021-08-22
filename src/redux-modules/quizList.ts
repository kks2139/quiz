import {quiz, selectedFactor, resultInfo} from '../utils/interfaces';

const SET_QUIZ_LIST = 'quizList/SET_QUIZ_LIST' as const;
const ADD_RESULT = 'quizList/ADD_RESULT' as const;
const RESET_RESULT = 'quizList/RESET_RESULT' as const;
const SET_RESULT_TIME = 'quizList/SET_RESULT_TIME' as const;
const SET_RESULT_DATE = 'quizList/SET_RESULT_DATE' as const;
const UPDATE_OPINION = 'quizList/UPDATE_OPINION' as const;

export const setQuizList = (arg: quiz[])=> ({ 
    type : SET_QUIZ_LIST,
    payload : arg
});
export const addResult = (arg: selectedFactor)=> ({ 
    type : ADD_RESULT,
    payload : arg
});
export const resetResult = ()=> ({ 
    type : RESET_RESULT,
    payload : null
});
export const setResultTime = (arg: string)=> ({ 
    type : SET_RESULT_TIME,
    payload : arg
});
export const setResultDate = (arg: string)=> ({ 
    type : SET_RESULT_DATE,
    payload : arg
});
export const updateOpinion = (arg: selectedFactor[])=> ({ 
    type : UPDATE_OPINION,
    payload : arg
});

type actionType = 
    | ReturnType<typeof setQuizList>
    | ReturnType<typeof addResult>
    | ReturnType<typeof resetResult>
    | ReturnType<typeof setResultTime>
    | ReturnType<typeof setResultDate>
    | ReturnType<typeof updateOpinion>

type stateType = {
    quizList: quiz[]
    resultInfo: resultInfo
}

const initState: stateType = {
    quizList : [],
    resultInfo : {
        resultList : [],
        resultTime : '00:00.0',
        resultDate : ''
    }
};

function app(state: stateType = initState, action: actionType) {
    switch (action.type) {
        case SET_QUIZ_LIST:
            return {
                ...state,
                quizList : action.payload.slice()
            };
        case ADD_RESULT:
            return {
                ...state,
                resultInfo : {
                    ...state.resultInfo,
                    resultList : state.resultInfo.resultList.concat({...action.payload})
                }
            };
        case RESET_RESULT:
            return {
                ...state,
                resultInfo : {
                    resultTime : '00:00.0',
                    resultList : [],
                    resultDate : ''
                }
            };
        case SET_RESULT_TIME:
            return {
                ...state,
                resultInfo : {
                    ...state.resultInfo,
                    resultTime : action.payload,
                }
            };
        case SET_RESULT_DATE:
            return {
                ...state,
                resultInfo : {
                    ...state.resultInfo,
                    resultDate : action.payload,
                }
            };
        case UPDATE_OPINION:
            return {
                ...state,
                resultInfo : {
                    ...state.resultInfo,
                    resultList : action.payload,
                }
            };
        default:
            return state;
  }
}

export default app;
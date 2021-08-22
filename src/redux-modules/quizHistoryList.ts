import {historyInfo} from '../utils/interfaces';

const SET_HISTORY_LIST = 'quizHistoryList/SET_HISTORY_LIST' as const;

export const setHistoryList = (arg: historyInfo[])=> ({ 
    type : SET_HISTORY_LIST,
    payload : arg
});

type actionType = 
    | ReturnType<typeof setHistoryList>

type stateType = {
    historyList: historyInfo[]
}

const initState: stateType = {
    historyList : []
};

function quizHistoryList(state: stateType = initState, action: actionType) {
    switch (action.type) {
        case SET_HISTORY_LIST:
            return {
                ...state,
                historyList: action.payload.slice()
            };
        default:
            return state;
  }
}

export default quizHistoryList;
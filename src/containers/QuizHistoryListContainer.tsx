import React, {useEffect} from 'react';
import {QuizHistoryList} from '../components/index';
import {useSelector, useDispatch} from 'react-redux';
import { RootState } from '../redux-modules/index';
import {historyInfo} from '../utils/interfaces';
import UT from '../utils/util';

interface Props {
    onClickCard?: (arg: historyInfo)=>void
}

function QuizHistoryListContainer({onClickCard}: Props){
    const {historyList} = useSelector((state: RootState) => state.quizHistoryList);
    historyList.sort((a: historyInfo, b: historyInfo)=>{
        return UT.localeStringToTime(b.resultDate) - UT.localeStringToTime(a.resultDate);
    });

    return (
        <QuizHistoryList historyList={historyList} onClickCard={onClickCard}></QuizHistoryList>
    );
}

export default QuizHistoryListContainer;
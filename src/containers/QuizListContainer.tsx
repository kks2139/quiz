import React, {useEffect} from 'react';
import {QuizList} from '../components/index';
import {useSelector, useDispatch} from 'react-redux';
import { RootState } from '../redux-modules/index';
import {selectedFactor} from '../utils/interfaces';
import {addResult, resetResult} from '../redux-modules/quizList';
import {showToast} from '../redux-modules/app';

interface Props {
    onQuizFinished: ()=>void
    onLastSelected: ()=>void
}

function QuizListContainer({onQuizFinished, onLastSelected}: Props){
    const dispatch = useDispatch();
    const {quizList} = useSelector((state: RootState) => state.quizList);

    
    const onSelected = (factor: selectedFactor, isLast: boolean)=>{
        dispatch(showToast({
            msg: factor.correct ? '정답!' : '오답..',
            show: true,
            type: factor.correct ? 'o' : 'x'
        }));
        dispatch(addResult(factor));
        if(isLast) onLastSelected();
    }
    
    const onNext = ()=>{
        dispatch(showToast({show: false}));
    }

    const onFinished = ()=>{
        onQuizFinished();
    }

    useEffect(()=> {
        dispatch(resetResult());
        return ()=> { 
            dispatch(showToast({show: false}));
         }
    }, []);

    return (
        <QuizList quizList={quizList} onSelected={onSelected} onFinished={onFinished} onNext={onNext}></QuizList>
    );
}

export default QuizListContainer;
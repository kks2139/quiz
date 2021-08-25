import React from 'react';
import {NoteList} from '../components/index';
import {useSelector, useDispatch} from 'react-redux';
import { RootState } from '../redux-modules/index';
import {showConfirm, showToast} from '../redux-modules/app';
import {updateOpinion} from '../redux-modules/quizList';
import {historyInfo} from '../utils/interfaces';

interface Props {
    info?: historyInfo
}

function NoteListContainer({info}: Props){
    const quizState = useSelector((state: RootState) => state.quizList);
    const {resultList, resultTime, resultDate} = info ? info : quizState.resultInfo;
    const category = info ? info.category : quizState.quizList.length > 0 ? quizState.quizList[0].category : '';
    const dispatch = useDispatch();
    
    const onSave = ()=>{
        dispatch(showConfirm({
            msg: info ? '내용을 수정할까요?' : '결과를 저장할까요?',
            show: true,
            confirmCallback: saveResultList
        }));
    }

    const onOpinionChanged = (opinion: string, index: number)=>{
        const newList = resultList.map((res, i) => {
            res.opinion = i === index ? opinion : res.opinion;
            return res;
        });
        dispatch(updateOpinion(newList));
    }

    const saveResultList = ()=>{
        // sessionStorage를 실제 DB 라고 가정
        const key = 'quiz-' + resultDate.split(' ').join('-');
        const value = {
            resultList,
            resultTime,
            resultDate,
            category
        };
        sessionStorage.setItem(key, JSON.stringify(value));
        dispatch(showToast({
            msg: '저장 되었습니다!',
            show: true
        }));
    }

    return (
        <NoteList resultList={resultList} onSave={onSave} onOpinionChanged={onOpinionChanged}></NoteList>
    );
}

export default NoteListContainer;
import React from 'react';
import {ChartBox} from '../components/index';
import {useSelector, useDispatch} from 'react-redux';
import { RootState } from '../redux-modules/index';
import {selectedFactor} from '../utils/interfaces';

interface Props {
    list?: selectedFactor[]
    showLabel?: boolean
}

function ChartBoxContainer({list, showLabel}: Props){
    let {resultList} = useSelector((state: RootState) => state.quizList.resultInfo);
    resultList = list ? list : resultList; 
    const corrects = resultList.reduce((acc, now)=> now.correct ? acc + 1 : acc, 0);
    const incorrects = resultList.length - corrects;
    const dataList = [
        {x: '' + corrects, y: corrects, name: '정답'},
        {x: '' + incorrects, y: incorrects, name: '오답'},
    ];
    const colorList = ['#008cff', '#ff3e3e'];

    return (
        <ChartBox dataList={dataList} colorList={colorList} showLabel={showLabel}></ChartBox>
    );
}

export default ChartBoxContainer;
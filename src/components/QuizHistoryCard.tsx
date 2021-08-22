import React from 'react';
/** @jsxImportSource @emotion/react */
import {css} from '@emotion/react';
import {selectedFactor, historyInfo} from '../utils/interfaces';
import {ChartBoxContainer} from  '../containers/index';

interface Props {
    resultList: selectedFactor[]
    resultDate: string
    resultTime: string
    category: string
    onClickCard?: (arg: historyInfo)=>void
}

function QuizHistoryCard({resultList, resultDate, resultTime, category, onClickCard}: Props){
    const minSec = resultTime.split(':').map(t => Number(t));

    const onClick = ()=>{
        if(onClickCard) {
            onClickCard({
                resultList,
                resultDate,
                resultTime,
                category
            });
        }
    }

    return (
        <div css={style} onClick={onClick}>
            <div className='info'>
                <div className='date'>{resultDate}</div> 
                <div className='cate'>{category}</div>
                <div className='time'>{`${minSec[0]}분 ${minSec[1]}초`}</div>
            </div>
           <div className='chart'>
               <ChartBoxContainer list={resultList} showLabel={false}></ChartBoxContainer>
           </div>
        </div>
    );
}

const style = css`
    display: flex;
    font-size: 21px;
    margin-bottom: 20px;
    cursor: pointer;
    box-shadow: var(--shadow-1);
    transition: .2s;
    .info {
        display: flex;
        flex-direction: column;
        justify-content: space-evenly;
        background-color: var(--color-dark-navy);
        width: 400px;
        > div {
            padding-left: 15px;
            margin-left: 20px;
            border-left: 3px solid var(--color-blue);
        }
    }
    > .chart {
        width: 140px;
        background-color: var(--color-light-black);
    }
    &:hover {
        box-shadow: 0 0 0 2px var(--color-dark-blue);
    }
`;

export default QuizHistoryCard;
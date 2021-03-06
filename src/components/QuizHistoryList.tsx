import React from 'react';
/** @jsxImportSource @emotion/react */
import {css} from '@emotion/react';
import {historyInfo} from '../utils/interfaces';
import {QuizHistoryCard} from '../components/index';

interface Props {
    historyList: historyInfo[]
    onClickCard?: (arg: historyInfo)=>void
}

function QuizHistoryList({historyList, onClickCard}: Props){
    return (
        <div css={style}>
            {historyList.map(h => (
                <QuizHistoryCard 
                    key={h.resultDate}
                    resultList={h.resultList}
                    resultDate={h.resultDate} 
                    resultTime={h.resultTime}
                    category={h.category}
                    onClickCard={onClickCard}/>
            ))}
            {historyList.length === 0 ? (
                <div className='empty'>
                    <div className='txt'>아직 저장된 퀴즈 결과가 없어요.</div>
                </div>
            ) : null}
        </div>
    );
}

const style = css`
    height: 100%;
    padding: 15px;
    > .empty {
        font-size: 20px;
        text-align: center;
        margin-top: 50px;
        > .txt {
            height: 50px;
        }
    }
`;

export default QuizHistoryList;
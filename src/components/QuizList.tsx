import React, {useState} from 'react';
/** @jsxImportSource @emotion/react */
import {css} from '@emotion/react';
import {quiz} from '../utils/interfaces';
import {QuizCard} from './index';
import {selectedFactor} from '../utils/interfaces';

interface Props {
    quizList: quiz[]
    onSelected: (arg1: selectedFactor, arg2: boolean)=>void;
    onFinished: ()=>void;
    onNext: ()=>void;
}

function QuizList({quizList, onSelected, onFinished, onNext}: Props){
    const [quizIndex, setQuizIndex] = useState(0);

    const onClickNext = ()=>{
        const last = quizIndex === quizList.length - 1;
        setQuizIndex(idx => last ? idx : idx + 1);
        onNext();
        if(last) onFinished();
    }
    
    const onFactorSelected = (factor: selectedFactor)=>{
        const last = quizIndex === quizList.length - 1;
        onSelected(factor, last);
    }

    return (
        <div css={style}>
            {quizList.length > 0 ?
                <QuizCard 
                    key={quizIndex}
                    quiz={quizList[quizIndex]} 
                    quizNumber={quizIndex} 
                    size={quizList.length}
                    onClickNext={onClickNext}
                    onFactorSelected={onFactorSelected}/>
                : null
            }
        </div>
    );
}

const style = css`
    width: 750px;
    height: 500px;
    padding: 20px 30px;
    background-color: var(--color-light-black);
    box-shadow: var(--shadow-2);
`;

export default QuizList;
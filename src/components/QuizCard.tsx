import React, { useState } from 'react';
/** @jsxImportSource @emotion/react */
import {css} from '@emotion/react';
import {quiz} from '../utils/interfaces';
import UT from '../utils/util';
import {ImCheckboxChecked} from 'react-icons/im';
import {selectedFactor} from '../utils/interfaces';
import {ToastBox} from '../components/index';

interface Props {
    quiz: quiz
    quizNumber: number
    size: number
    onClickNext: ()=>void
    onFactorSelected: (args1: selectedFactor)=>void
}

function QuizCard({quiz, quizNumber, size, onClickNext, onFactorSelected}: Props){
    const [info, setInfo] = useState({
        selected: false,
        correct: false
    });
    const [correct, setCorrect] = useState(false);
    const {question, correct_answer, incorrect_answers} = quiz;
    const factors = incorrect_answers.concat(correct_answer);
    // const factors = incorrect_answers.slice();
    // factors.splice(UT.rand(4), 0, correct_answer); // 정답을 섞어넣는다.

    const onClickFact = (e: React.MouseEvent<HTMLDivElement>)=>{
        const fact = e.currentTarget.dataset.fact!
        const correct = fact === correct_answer

        if(!info.selected){
            e.currentTarget.classList.add('selected');
            onFactorSelected({
                question,
                answer: correct_answer,
                pick: fact,
                correct
            });
            setInfo({
                selected: true,
                correct,
            });
        }
    }

    return (
        <div css={style}>
            <div className='header'>
                <div className='num'>{`문제 ${quizNumber + 1}.`}</div>
                <div className='question'>{question}</div>
            </div>
            <section>
                <div className='factors'>
                    {factors.map((fact, i) => (
                        <div key={fact} className='fact' onClick={onClickFact} data-fact={fact}>
                            <div className='txt'>
                                <span>{`${i+1}.`}</span>
                                <div>{fact}</div>
                            </div>
                            <div className='line'></div>
                        </div>
                    ))}
                </div>
                {info.selected ? 
                    <div className='button' onClick={onClickNext}>{size === quizNumber + 1 ? '결과 확인!' : '다음 문항'}</div> 
                    : null
                }
            </section>
            {/* {info.selected ? <ToastBox type={info.correct ? 'o' : 'x'}></ToastBox> : null} */}
        </div>
    );
}

const style = css`
    width: 100%;
    height: 100%;
    font-weight: bold;
    color: white;
    .header {
        background-color: var(--color-dark-navy);
        padding: 20px 0 0 20px;
        box-shadow: var(--shadow-1);
    }
    .num {
        font-size: 23px;
    }
    .question {
        width: calc(100% - 60px);
        height: 80px;
        font-size: 18px;
        line-height: 35px;
        margin: 15px 0;
    }
    section {
        height: calc(100% - 160px);
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        .button {
            margin: 0 auto;
            width: 220px;
            text-align: center;
        }
    }
    .factors {
        margin-left: 10px;
        .txt {
            display: flex;
            span {
                margin-right: 15px;
                font-size: 20px;
            }
        }
        .fact {
            width: fit-content;
            transition: .2s;
            line-height: 40px;
            padding: 0 10px;
            margin-bottom: 15px;
            &:hover {
                cursor: pointer;
                .line {
                    width: 100% !important;
                    height: 2px;
                }
            }
            .line {
                width: 0px;
                height: 2px;
                background-color: var(--color-orange);
                transition: .3s;
            }
        }
        .selected {
            color: var(--color-orange);
            .line {
                width: 100%;
            }
        }
    }
`;

export default QuizCard;
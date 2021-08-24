import React, { useState, useEffect } from 'react';
/** @jsxImportSource @emotion/react */
import {css} from '@emotion/react';
import {quiz} from '../utils/interfaces';
import UT from '../utils/util';
import {selectedFactor} from '../utils/interfaces';

interface state {
    selected: boolean
    correct: boolean
    factors: string[]
}

interface Props {
    quiz: quiz
    quizNumber: number
    size: number
    onClickNext: ()=>void
    onFactorSelected: (args1: selectedFactor)=>void
}

function QuizCard({quiz, quizNumber, size, onClickNext, onFactorSelected}: Props){
    const {question, correct_answer, incorrect_answers} = quiz;
    const [info, setInfo] = useState<state>({
        selected: false,
        correct: false,
        factors: []
    });

    const onClickFact = (e: React.MouseEvent<HTMLDivElement>)=>{
        const fact = e.currentTarget.dataset.fact!
        const correct = fact === correct_answer;

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
                factors: info.factors
            });
        }
    }

    useEffect(()=>{
        const list = incorrect_answers.slice();
        list.splice(UT.rand(3), 0, correct_answer);
        setInfo({
            ...info,
            factors: list
        });
    }, [quiz]);

    return (
        <div css={style}>
            <div className='header'>
                <div className='num'>{`문제 ${quizNumber + 1}.`}</div>
                <div className='question'>{question}</div>
            </div>
            <section>
                <div className='factors'>
                    {info.factors.map((fact, i) => (
                        <div key={fact} className='fact' onClick={onClickFact} data-fact={fact}>
                            <div className='txt'>
                                <span data-testid='f1'>{`${i+1}.`}</span>
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
        padding: 20px 0 3px 20px;
        box-shadow: var(--shadow-1);
    }
    .num {
        font-size: 23px;
    }
    .question {
        width: calc(100% - 60px);
        min-height: 80px;
        font-size: 18px;
        line-height: 35px;
        margin: 15px 0;
    }
    section {
        height: calc(100% - 160px);
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        margin-top: 10px;
        .button {
            margin: 0 auto;
            width: 220px;
            text-align: center;
            margin-top: 10px;
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

    @media screen and (max-width: 800px) {
        .header {
            .question {
                height: unset;
            }
        }
    }
`;

export default QuizCard;
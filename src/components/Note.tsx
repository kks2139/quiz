import React, {useState} from 'react';
/** @jsxImportSource @emotion/react */
import {css} from '@emotion/react';
import {selectedFactor} from '../utils/interfaces';
import {ImCross, ImCheckmark} from 'react-icons/im';

interface Props {
    resultFactor: selectedFactor
    index: number
    onOpinionChanged: (arg1: string, arg2: number)=>void
}

function Note({resultFactor, index, onOpinionChanged}: Props){
    const {question, answer, pick, correct, opinion} = resultFactor;

    const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>)=>{
        onOpinionChanged(e.currentTarget.value, index);
    }

    return (
        <div css={style}>
            <div className='idx'>
                {`문제 ${index + 1}.`}
                {correct ? <ImCheckmark color='var(--color-green)'/> : <ImCross color='var(--color-red)'/>}
            </div>
            <section>
                <div className='row'>
                    <div className='txt'>문제</div>
                    <div className='val'>{question}</div>
                </div>
                <div className='row'>
                    <div className='txt'>정답</div>
                    <div className='val'>{answer}</div>
                </div>
                <div className='row'>
                    <div className='txt'>나의 답</div>
                    <div className='val'>{pick}</div>
                </div>
                <div className='row'>
                    <div className='txt'>기록할 내용</div>
                    <div className='ta'>
                        <textarea value={opinion} onChange={onChange}></textarea>
                    </div>

                </div>
            </section>        
        </div>
    );
}

const style = css`
    position: relative;
    margin-bottom: 50px;
    padding: 0 20px;
    .idx {
        display: flex;
        align-items: center;
        font-size: 18px;
        font-weight: bold;
        margin: 0 0 10px 15px;
        svg {
            margin-left: 15px;
            transform: scale(1.1);
        }
    }
    section {
        box-shadow: 0 2px 20px -5px black;
        font-weight: bold;
        .row {
            display: flex;
            height: 60px;
            > div {
                display: flex;
                align-items: center;
                padding-left: 20px;
            }
            .txt {
                width: 140px;
                background-color: var(--color-dark-navy);
            }
            .ta {
                flex-grow: 1;
            }
            .val {
                width: calc(100% - 150px);
            }
            textarea {
                height: 40px;
                width: calc(100% - 30px);
                resize: none;
                border-radius: var(--radius-2);
                background-color: var(--color-dark-gray);
                color: white;
                font-weight: bold;
            }
        }
    }
    animation-name: showUp;
    animation-duration: 1s;
    animation-timing-function: ease;
`;

export default Note;
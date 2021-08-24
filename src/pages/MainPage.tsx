import React, {useEffect, useState, useRef} from 'react';
/** @jsxImportSource @emotion/react */
import {css} from '@emotion/react';
import {useHistory} from 'react-router-dom';
import {QuizListContainer} from '../containers/index';
import {useDispatch} from 'react-redux';
import {Timer, AlertBox} from '../components/index';
import {setResultTime, setResultDate} from '../redux-modules/quizList';

function MainPage(){
    const history = useHistory();
    const dispatch = useDispatch();
    const timerId = useRef(0);
    const [info, setInfo] = useState({
        start : false,
        startTimer : false,
        readyTime : 3
    });

    const onClickToStart = ()=>{
        history.push('/');
    }

    const onQuizFinished = ()=>{
        history.push('/result');
    }
    
    const onLastSelected = ()=>{
        setInfo({
            ...info,
            startTimer : false
        });
    }
    
    const getCurrentTime = (timeStr: string)=>{
        dispatch(setResultTime(timeStr));
        dispatch(setResultDate(new Date().toLocaleString()));
    }

    const countDown = ()=>{
        timerId.current = window.setInterval(()=> {
            setInfo((state)=>{
                if(state.readyTime < 0) clearInterval(timerId.current);
                return {
                    startTimer : state.readyTime < 1,
                    start : state.readyTime < 1,
                    readyTime : state.readyTime - 1
                }
            });
        }, 1000);
    }

    useEffect(()=>{
        countDown();
        return ()=>{clearInterval(timerId.current)}
    }, []);

    return (
        <div css={style}>
            {info.start ? 
                <div className='quiz-wrapper'>
                    <div className='header'>
                        <Timer startTimer={info.startTimer} getCurrentTime={getCurrentTime}></Timer>       
                        <div className='button' onClick={onClickToStart}>처음으로</div>
                    </div>
                    <QuizListContainer onQuizFinished={onQuizFinished} onLastSelected={onLastSelected}></QuizListContainer>
                </div>
                : <AlertBox msg={`${info.readyTime}초 후 시작!`}></AlertBox>
            }
        </div>
    );
}

const style = css`
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    .quiz-wrapper {
        > .header {
            display: flex;
            align-items: center;
            justify-content: space-between;
            height: 70px;
            width: 100%;
            transition: .3s;
        }
    }

    @media screen and (max-width: 800px) {
        .quiz-wrapper {
            > .header {
                flex-direction: column;
                align-items: flex-start;
                height: 100px;
                transform: translateY(-20px);
            }
        }
    }
`;

export default MainPage;
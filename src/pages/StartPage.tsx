import React, {useEffect} from 'react';
/** @jsxImportSource @emotion/react */
import {css} from '@emotion/react';
import UT from '../utils/util'; 
import {IoMdArrowRoundDown} from 'react-icons/io';
import {useDispatch} from 'react-redux';
import {RouteComponentProps} from 'react-router-dom';
import {setQuizList} from '../redux-modules/quizList';


function StartPage({history}: RouteComponentProps){
    const dispatch = useDispatch();

    const getQuizList = async ()=>{
        const result = await UT.request('mock.json');
        dispatch(setQuizList(result[UT.rand(2)].results));
    }

    useEffect(()=>{
        getQuizList();
    }, []);

    const onClick = (e: React.MouseEvent<HTMLDivElement>)=>{
        const {type} = e.currentTarget.dataset;

        if(type === 'quiz') history.push('/main');
        else history.push('/history');
        
    }

    return (
        <div css={style}>
            <div className='txt'>클릭하여 퀴즈를 풀어보세요!</div>
            <IoMdArrowRoundDown size='40'></IoMdArrowRoundDown>
            <div className='btn-wrapper'>
                <div className='menu-btn' data-type='quiz' onClick={onClick}>퀴즈 풀기</div>
                <div className='menu-btn' data-type='hist' onClick={onClick}>기록 보기</div>
            </div>
        </div>
    );
}

const style = css`
    width: 400px;
    height: 350px;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    text-align: center;
    color: white;
    // background-color: black;
    .txt {
        font-size: 25px;
    }
    svg {
        margin: 30px 0;   
        animation-name: upDown;
        animation-duration: 2s;
        animation-timing-function: ease;
        animation-iteration-count: infinite;
    }
    .btn-wrapper {
        width: 100%;
        .menu-btn {
            margin-bottom: 15px;
            width: 100%;
            height: 55px;
            line-height: 55px;
            font-size: 28px;
            box-sizing: content-box;
            border-radius: var(--radius-2);
            background-color: var(--color-orange);
            color: white;
            font-weight: bold;
            cursor: pointer;
            transition: .3s;
            &:hover {
                transform: translateY(-3px);
                box-shadow: var(--shadow-3);
            }
        }
    }
    @keyframes upDown {
        0% {transform: translateY(-13px);}
        50% {transform: translateY(13px);}
        100% {transform: translateY(-13px);}
    }
`;

export default StartPage;
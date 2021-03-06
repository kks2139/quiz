import React from 'react';
/** @jsxImportSource @emotion/react */
import {css} from '@emotion/react';
import {useHistory} from 'react-router-dom';
import {ChartBoxContainer} from '../containers/index';
import {ToolTip} from '../components/index';
import {useSelector} from 'react-redux';
import {RootState} from '../redux-modules/index';

function ResultPage(){
    const history = useHistory();
    const quizState = useSelector((state: RootState)=> state.quizList);
    const minSec = quizState.resultInfo.resultTime.split(':').map(t => Number(t));
    const resDate = quizState.resultInfo.resultDate;

    const onClickDoAgain = ()=>{
        history.push('/main');
    }
    const onClickToStart = ()=>{
        history.push('/');
    }
    const onClickToWrongAns = ()=>{
        history.push('/note');
    }

    return (
        <div css={style}>
            <div className='wrapper'>
                <div className='header'>
                    <div className='txt'>๐๊ฒฐ๊ณผ<span>{resDate}</span></div>
                    <div className='btn-wrapper'>
                        <div className='button' onClick={onClickDoAgain}>๋ค์ํ๊ธฐ</div>
                        <div className='button' onClick={onClickToStart}>์ฒ์์ผ๋ก</div>
                        <ToolTip text='์ค๋ต๋ธํธ๋ฅผ ์์ฑํ๊ณ  ๊ธฐ๋ก์ ๋จ๊ฒจ๋ณด์ธ์.'>
                            <div className='button' onClick={onClickToWrongAns}>์ค๋ต๋ธํธ ์์ฑ</div>
                        </ToolTip>
                    </div>
                </div>
                <div className='content'>
                    <div className='result-info'>
                        <div className='info'>
                            <div className='desc'>์์์๊ฐ</div>
                            <div className='val'>{`${minSec[0]}๋ถ ${minSec[1]}์ด`}</div>
                        </div>
                        <div className='info'>
                            <div className='desc'>์นดํ๊ณ ๋ฆฌ</div>
                            <div className='val'>{quizState.quizList[0] && quizState.quizList[0].category}</div>
                        </div>
                        <div className='info'>
                            <div className='desc'>๋์ด๋</div>
                            <div className='val'>{quizState.quizList[0] && quizState.quizList[0].difficulty}</div>
                        </div>
                        <div className='info'>
                            <div className='desc'>์ด ๋ฌธ์ ์</div>
                            <div className='val'>{quizState.resultInfo.resultList.length}</div>
                        </div>
                    </div>
                    <div className='chart-wrapper'>
                        <ChartBoxContainer></ChartBoxContainer>
                    </div>
                </div>
            </div>
        </div>
    );
}

const style = css`
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    color: white;
    overflow-x: hidden;
    > .wrapper {
        width: 900px;
        height: 600px;
        > .header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            transform: translateY(-5px);
            font-size: 35px;
            font-weight: bold;
            transition: .3s;
            > .txt span {
                font-size: 18px;
                margin-left: 20px;
            }
            > .btn-wrapper {
                display: flex;
                .button {
                    margin-left: 15px;
                }
            }
        }
        > .content {
            display: flex;
            box-shadow: var(--shadow-2);
            transition: .3s;
            > .result-info {
                display: flex;
                flex-direction: column;
                justify-content: space-between;
                width: 400px;
                font-size: 25px;
                font-weight: bold;
                padding: 40px 0 0 40px;
                background-color: var(--color-dark-navy);
                > .info {
                    position: relative;
                    margin-bottom: 50px;
                    padding-left: 20px;
                    border-left: 5px solid var(--color-blue);
                    animation-name: showUp;
                    animation-duration: 1s;
                    animation-timing-function: ease;
                    .desc {
                        display: flex;
                        align-items: center;
                    }
                }
            }
            > .chart-wrapper {
                position: relative;
                flex-grow: 1;
                animation-name: showUp;
                animation-duration: 1s;
                animation-timing-function: ease;
            }
        }
    }

    @media screen and (max-width: 800px) {
        align-items: unset;
        .wrapper {
            > .header {
                flex-direction: column;
                align-items: flex-start;
                padding: 10px;
                > .txt {
                    margin-bottom: 10px;
                }
            }
        }
        .content {
            flex-direction: column;
            > .result-info {
                width: 100% !important;
                font-size: 20px !important;
                > .info {
                    margin-bottom: 30px !important;
                }
            }
            > .chart-wrapper {
                display: flex;
                justify-content: center;
            }
        }
    }
`;

export default ResultPage;
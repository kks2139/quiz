import React, {useEffect, useState} from 'react';
/** @jsxImportSource @emotion/react */
import {css} from '@emotion/react';
import { useHistory } from 'react-router-dom';
import {QuizHistoryListContainer, NoteListContainer} from  '../containers/index';
import {Popup} from  '../components/index';
import {historyInfo} from  '../utils/interfaces';
import {useDispatch} from  'react-redux';
import {setHistoryList} from  '../redux-modules/quizHistoryList';

interface popInfoStateType {
    show: boolean
    hisInfo: historyInfo | undefined
}

function HistoryPage(){
    const history = useHistory();
    const dispatch = useDispatch();
    const [popInfo, setPopInfo] = useState<popInfoStateType>({
        show: false,
        hisInfo: undefined
    });


    const onClickBack = ()=>{
        history.goBack();
    }
    
    const onClickQuizHistoryCard = ({resultList, resultTime, resultDate, category}: historyInfo)=>{
        setPopInfo({
            show: true,
            hisInfo: {
                resultList : resultList.slice(),
                resultTime,
                resultDate,
                category 
            }
        });
    }

    const onClosePop = ()=>{
        setPopInfo({
            show: false,
            hisInfo: undefined
        });
    }

    const getQuizHistoryList = ()=>{
        const hisList: historyInfo[] = [];
        Object.keys(sessionStorage).forEach(key => {
            if(key.indexOf('quiz-') !== -1){
                const str = sessionStorage.getItem(key);
                hisList.push(JSON.parse(str!));
            }
        });
        dispatch(setHistoryList(hisList));
    }

    useEffect(()=>{
        getQuizHistoryList();
    }, []);

    return (
        <div css={style}>
            <div className='wrapper'>
                <div className='header'>
                    <div className='txt'>📑퀴즈이력</div>
                    <div className='button' onClick={onClickBack}>이전으로</div>
                </div>
                <div className='content'>
                    <QuizHistoryListContainer onClickCard={onClickQuizHistoryCard}></QuizHistoryListContainer>
                </div>
            </div>
            {popInfo.show ? 
                <Popup width='600px' height='80%' onClose={onClosePop}>
                    <NoteListContainer info={popInfo.hisInfo}></NoteListContainer>
                </Popup> : null
            }
        </div>
    );
}

const style = css`
    display: flex;
    justify-content: center;
    min-height: 100vh;
    padding: 20px 0;
    color: white;
    > .wrapper {
        max-width: 900px;
        width: calc(100% - 100px);
        height: calc(100vh - 50px);
        > .header {
            display: flex;
            justify-content: space-between;
            margin-bottom: 5px;
            .txt {
                font-size: 30px;
                font-weight: bold;
            }
        }
        > .content {
            display: flex;
            justify-content: center;
            height: calc(100% - 50px);
            box-shadow: 0 10px 30px -7px black;
            overflow: auto;
        }
    }

    @media screen and (max-width: 800px){
        > .wrapper {
            width: unset;
            height: calc(100vh - 85px);
            width: calc(100vw - 19px);
            > .header {
                flex-direction: column;
                height: 90px;
                margin-bottom: 10px;
            }
        }
    }
`;

export default HistoryPage;
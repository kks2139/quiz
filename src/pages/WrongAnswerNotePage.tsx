import React from 'react';
/** @jsxImportSource @emotion/react */
import {css} from '@emotion/react';
import {RouteComponentProps} from 'react-router-dom';
import {NoteListContainer} from '../containers/index';
import {useDispatch} from 'react-redux';
import {showConfirm} from '../redux-modules/app';

function WrongAnswerNotePage({history}: RouteComponentProps){
    const dispatch = useDispatch();
    const onClickBack = ()=>{
        history.goBack();
    }

    return (
        <div css={style}>
            <div className='wrapper'>
                <div className='header'>
                    <div className='txt'>📕오답노트</div>
                    <div className='button' onClick={onClickBack}>이전으로</div>
                </div>
                <div className='content'>
                    <NoteListContainer></NoteListContainer>
                </div>
            </div>
        </div>
    );
}

const style = css`
    position: relative;
    display: flex;
    justify-content: center;
    height: 100vh;
    padding-top: 30px;
    > .wrapper {
        width: 800px;
        color: white;
        > .header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            transform: translateY(-5px);
            > .txt {
                font-size: 30px;
                font-weight: bold;
            }
        }
        > .content {
            box-shadow: var(--shadow-1);
            width: 100%;
            height: calc(100% - 80px);
            padding: 20px;
        }
    }
`;

export default WrongAnswerNotePage;
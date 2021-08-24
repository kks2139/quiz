import React from 'react';
/** @jsxImportSource @emotion/react */
import {css} from '@emotion/react';
import { useHistory } from 'react-router-dom';

function NotFound(){
    const history = useHistory();
    const onClick = ()=>{
        history.goBack();
    }

    return (
        <div css={style}>
            <div className='txt'>잘못된 경로에요!</div>
            <div className='btn-wrapper'>
                <div className='button' onClick={onClick}>이전 페이지</div>
            </div>
        </div>
    );
}

const style = css`
    position: fixed;
    top: 40%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-weight: bold;
    font-size: 50px;
    text-align: center;
    color: white;
    .btn-wrapper {
        width: 100%;
        display: flex;
        justify-content: center;
        .button {
            margin-top: 30px;
        }
    }
    .txt {
        min-width: 390px;
    }
`;

export default NotFound;
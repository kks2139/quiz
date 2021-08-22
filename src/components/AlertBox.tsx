import React from 'react';
/** @jsxImportSource @emotion/react */
import {css} from '@emotion/react';
import {FaCheck} from 'react-icons/fa';

interface Props {
    msg: string
}

function AlertBox({msg}: Props){
    return (
        <div css={style}>
            <div className='txt'>
                {msg}
            </div>
        </div>
    );
}

const style = css`
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    display: flex;
    align-items: center;
    width: 310px;
    height: 100px;
    background-color: white;
    text-align: center;
    color: black;
    border-radius: var(--radius-2);
    // border-top: 6px solid var(--color-light-green);
    box-shadow: var(--shadow-2);
    .txt {
        width: 100%;
        font-weight: bold;
        font-size: 35px;       
        svg {
            margin-right: 15px;
        }
    }
`;

export default AlertBox;
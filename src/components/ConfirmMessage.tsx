import React from 'react';
/** @jsxImportSource @emotion/react */
import {css} from '@emotion/react';

interface Props {
    onClickButton: (arg: React.MouseEvent<HTMLDivElement>)=>void
    msg?: string
}

function ConfirmMessage({onClickButton, msg}: Props){
    const onClick = (e: React.MouseEvent<HTMLDivElement>)=> {
        onClickButton(e);
    }

    return (
        <div css={style}>
            <div className='msg-box'>
                <div className='txt'>
                    {msg}
                </div>
                <div className='btn-wrapper'>
                    <div className='btn' data-type='Y' onClick={onClick}>예</div>
                    <div className='btn' data-type='N' onClick={onClick}>아니오</div>
                </div>
            </div>
            <div className='modal'></div>
        </div>
    );
}

const style = css`
    > .msg-box {
        z-index: 100;
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        width: 340px;
        height: 140px;
        background-color: white;
        color: black;
        border-radius: var(--radius-2);
        // border-top: 6px solid var(--color-orange);
        box-shadow: 0 20px 20px -10px black;
        .txt {
            display: flex;
            justify-content: center;
            width: calc(100% - 20px);
            height: 30px;
            align-items: center;
            flex-grow: 1;
            font-weight: bold;
            font-size: 18px;       
            svg {
                margin-right: 15px;
            }
        }
        .btn-wrapper {
            display: flex;
            .btn {
                display: flex;
                justify-content: center;
                align-items: center;
                text-align: center;
                font-size: 20px;
                font-weight: bold;
                height: 40px;
                background-color: var(--color-light-gray);
                cursor: pointer;
                transition: .2s;
            }
            .btn:first-child {
                flex-grow: 1;
                border-bottom-left-radius: var(--radius-2);
                &:hover {
                    color: white;
                    background-color: var(--color-blue);
                }
            }
            .btn:last-child {
                flex-grow: 1;
                border-bottom-right-radius: var(--radius-2);
                &:hover {
                    color: white;
                    background-color: var(--color-red);
                }
            }
        }
    }
    .modal {
        z-index: 99;
    }
`;

export default ConfirmMessage;
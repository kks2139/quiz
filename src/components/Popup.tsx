import React from "react";
/** @jsxImportSource @emotion/react */
import {css} from '@emotion/react';
import {GrClose} from 'react-icons/gr';

interface Props {
    width?: string
    height?: string
    onClose: ()=>void
}

const Popup: React.FC<Props> = ({width='300px', height='300px', onClose, children})=>{
    return (
        <>
            <div css={style} style={{width, height}}>
                <div className='header'>
                    <GrClose size='30' onClick={()=>{onClose()}}/>
                </div>
                <div className='content'>
                    {children}
                </div>
            </div>
            <div className='modal'></div>
        </>
    );
}

const style = css`
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: rgb(57 57 57);
    padding: 0 20px 20px 20px;
    border-radius: var(--radius-2);
    box-shadow: 0 0 20px -5px black;
    z-index: 11;
    > .header {
        // border: 1px solid red;
        height: 50px;
        display: flex;
        justify-content: flex-end;
        align-items: center;
        svg {
            cursor: pointer;
            color: white;
        }
    }
    > .content {
        height: calc(100% - 50px);
    }
`;

export default Popup;
import React from "react";
/** @jsxImportSource @emotion/react */
import {css} from '@emotion/react';
import {IoIosCloseCircleOutline} from 'react-icons/io';

interface Props {
    width?: string
    height?: string
    onClose: ()=>void
    children: JSX.Element
}

function Popup({width='50%', height='50%', onClose, children}: Props){
    return (
        <>
            <div css={style} style={{width, height}}>
                <div className='header'>
                    {/* <VscClose size='50' color='white' onClick={()=>{onClose()}}/> */}
                    <IoIosCloseCircleOutline size='50' color='white' onClick={()=>{onClose()}}/>
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
        height: 50px;
        display: flex;
        justify-content: center;
        align-items: center;
        svg {
            cursor: pointer;
            margin-top: 10px;
        }
    }
    > .content {
        height: calc(100% - 50px);
    }

    @media screen and (max-width: 800px){
        width: calc(100% - 100px) !important;
    }
`;

export default Popup;
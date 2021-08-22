import React from 'react';
/** @jsxImportSource @emotion/react */
import {css} from '@emotion/react';

interface Props {
    text: string
    children: JSX.Element
}

function ToolTip({text, children}: Props){
    return (
        <div css={style}>
            {children}
            <div className='tooltip-text pos'>
                {text}
            </div>
            <div className='triangle pos'></div>
        </div>
    );
}

const style = css`
    position: relative;
    .tooltip-text {
        z-index: 1;
        position: absolute;
        top: 0;
        left: 100%;
        transform: translate(-50%, calc(-100% - 14px));
        opacity: 0;
        width: fit-content;
        font-size: 12px;
        color: white;
        padding: 3px 10px;
        background-color: var(--color-blue);
        border-radius: var(--radius-2);
        transition: .2s;
    }
    .triangle {
        z-index: 2;
        position: absolute;
        top: 0;
        left: 100%;
        transform: translate(-50px, calc(-50% - 14px)) rotate(45deg);
        opacity: 0;
        width: 7px;
        height: 7px;
        background-color: var(--color-blue);
        transition: .2s;
    }
    &:hover {
        .tooltip-text, .triangle {
            opacity: 1;
        }
    }
`;

export default ToolTip;
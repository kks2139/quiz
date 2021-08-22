import React, { useEffect, useRef } from 'react';
/** @jsxImportSource @emotion/react */
import {css} from '@emotion/react';
import {ImCross, ImCheckmark} from 'react-icons/im';

interface Props {
    msg?: string
    type?: 'o' | 'x'
    onVanish: ()=>void
}

function ToastBox({msg='', type, onVanish}: Props){
    const toastRef = useRef<HTMLDivElement>(null);
    useEffect(()=>{
        if(!type) setTimeout(()=> {
            toastRef.current!.style.visibility = 'hidden';
            onVanish();
        }, 2900);
    }, []);

    return (
        <div css={style(type)} ref={toastRef}>
            {type === 'o' ? 
                <div className='txt'>
                    <ImCheckmark size='35' color='rgb(0 174 0)'/>{msg}
                </div> :
                type === 'x' ?
                <div className='txt'>
                    <ImCross size='35' color='red'/>{msg}
                </div> :
                <div className='txt'>
                    {msg}
                </div>
            }
        </div>
    );
}

const style = (type: string | undefined)=> {
return css`
    z-index: 100;
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
        font-size: 30px;       
        svg {
            margin-right: 15px;
        }
    }
    animation-name: ${type ? 'appear' : 'vanish'};
    animation-duration: ${type ? '1s' : '3s'};
    animation-timing-function: ease;
`;}

export default ToastBox;
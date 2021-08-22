import React, { useEffect, useState, useRef } from 'react';
/** @jsxImportSource @emotion/react */
import {css} from '@emotion/react';
import {MdTimelapse} from 'react-icons/md';
import {useDispatch} from 'react-redux';


interface Props {
    startTimer: boolean
    getCurrentTime: (arg: string)=>void
}

function Timer({startTimer, getCurrentTime}: Props){
    const [time, setTime] = useState('00:00.0');
    const timerId = useRef(0);
    const initTime = new Date().getTime();

    const setText = ()=>{
        const currTime = new Date().getTime();
        const diff = new Date(currTime - initTime);

        const min = toString(diff.getMinutes());
        const sec = toString(diff.getSeconds());
        const mil = Math.floor(diff.getMilliseconds()/100);

        setTime(`${min}:${sec}.${mil}`);
    }

    const toString = (n: number)=> n < 10 ? '0' + n : '' + n;

    useEffect(()=>{
        if(startTimer) timerId.current = window.setInterval(()=> setText(), 100);
        if(!startTimer) getCurrentTime(time);
        return ()=>{clearInterval(timerId.current!)}
    }, [startTimer]);

    return (
        <div css={style}>
            <MdTimelapse size='32' color='rgb(0, 140, 255)'/>{time}
        </div>
    );
}

const style = css`
    font-size: 40px;
    color: white;
    transform: scaleY(1.1);
    > svg {
        margin-right: 20px;
        animation-name: rotate;
        animation-duration: 2.5s;
        animation-timing-function: ease;
        animation-iteration-count: infinite;
    }
    @keyframes rotate {
        from {transform: rotate(0deg);}
        to {transform: rotate(360deg);}
    }
`;

export default Timer;
import React from 'react';
import {ConfirmMessage} from '../components/index';
import {useSelector, useDispatch} from 'react-redux';
import { RootState } from '../redux-modules/index';
import {showConfirm} from '../redux-modules/app';

function ConfirmMessageContainer(){
    const dispatch = useDispatch();
    const {msg, confirmCallback} = useSelector((state: RootState)=> state.app.confirmInfo);

    const onClickButton = (e: React.MouseEvent<HTMLDivElement>)=> {
        const {type} = e.currentTarget.dataset;
        if(type === 'Y'){
            if(confirmCallback) confirmCallback();
        }
        dispatch(showConfirm({show: false}));
    }

    return (
        <ConfirmMessage onClickButton={onClickButton} msg={msg}></ConfirmMessage>
    );
}

export default ConfirmMessageContainer;
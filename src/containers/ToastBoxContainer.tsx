import React from 'react';
import {ToastBox} from '../components/index';
import {useSelector, useDispatch} from 'react-redux';
import { RootState } from '../redux-modules/index';
import {showToast} from '../redux-modules/app';

function ToastBoxContainer(){
    const dispatch = useDispatch();
    const {msg, type} = useSelector((state: RootState)=> state.app.toastInfo);

    const onVanish = ()=>{
        dispatch(showToast({
            show: false
        }))
    }

    return (
        <ToastBox msg={msg} type={type} onVanish={onVanish}></ToastBox>
    );
}

export default ToastBoxContainer;
import {confirmInfo, toastInfo} from '../utils/interfaces';

const SHOW_CONFIRM = 'app/SHOW_CONFIRM' as const;
const SHOW_TOAST = 'app/SHOW_TOAST' as const;

export const showConfirm = (arg: confirmInfo)=> ({ 
    type : SHOW_CONFIRM,
    payload : arg
});
export const showToast = (arg: toastInfo)=> ({ 
    type : SHOW_TOAST,
    payload : arg
});

type actionType = 
    | ReturnType<typeof showConfirm>
    | ReturnType<typeof showToast>

type stateType = {
    confirmInfo: confirmInfo
    toastInfo: toastInfo
}

const initState: stateType = {
    confirmInfo: {
        msg: '',
        show: false,
        confirmCallback: undefined
    },
    toastInfo : {
        msg: '',
        show: false,
        type: undefined
    }
};

function app(state: stateType = initState, action: actionType) {
    switch (action.type) {
        case SHOW_CONFIRM:
            return {
                ...state,
                confirmInfo : {
                    msg: action.payload.msg || '',
                    show: action.payload.show,
                    confirmCallback: action.payload.show ? action.payload.confirmCallback : undefined
                }
            };
        case SHOW_TOAST:
            return {
                ...state,
                toastInfo : {
                    msg: action.payload.msg || '',
                    show: action.payload.show,
                    type: action.payload.show ? action.payload.type : undefined
                }
            };
        default:
            return state;
  }
}

export default app;
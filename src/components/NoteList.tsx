import React from 'react';
/** @jsxImportSource @emotion/react */
import {css} from '@emotion/react';
import {selectedFactor} from '../utils/interfaces';
import {Note} from './index';

interface Props {
    resultList: selectedFactor[]
    onSave: ()=>void
    onOpinionChanged: (arg1: string, arg2: number)=>void
}

function NoteList({resultList, onSave, onOpinionChanged}: Props){
    const onClickSave = ()=> {
        onSave();
    }
    return (
        <div css={style}>
            <div className='header'>
                <div className='button' onClick={onClickSave}>저장</div>
            </div>
            <div className='note-wrapper'>
                {resultList.map((res, i) => (
                    <Note key={res.question} resultFactor={res} index={i} onOpinionChanged={onOpinionChanged}></Note>
                ))}
            </div>
        </div>
    );
}

const style = css`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;

    > .header {
        display: flex;
        justify-content: flex-end;
        align-items: center;
        height: 50px;
        margin-bottom: 10px;
    }
    > .note-wrapper {
        overflow: auto;
        flex-grow: 1;
    }
`;

export default NoteList;
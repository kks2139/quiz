import React, { useEffect } from 'react';
/** @jsxImportSource @emotion/react */
import {css} from '@emotion/react';
import './Common.scss';
import {Route, Switch} from 'react-router-dom';
import {useSelector} from 'react-redux';
import {RootState} from './redux-modules/index';
import {MainPage, StartPage, ResultPage, WrongAnswerNotePage, HistoryPage, NotFound} from './pages/index';
import {ConfirmMessageContainer, ToastBoxContainer} from './containers/index'; 

function App() {
  const {confirmInfo, toastInfo} = useSelector((state: RootState)=> state.app);
  
  return (
    <div css={style}>
      <Switch>
          <Route path='/' exact render={(props)=> <StartPage {...props}></StartPage>}></Route>
          <Route path='/main' render={(props)=> <MainPage {...props}></MainPage>}></Route>
          <Route path='/result' render={(props)=> <ResultPage {...props}></ResultPage>}></Route>
          <Route path='/note' render={(props)=> <WrongAnswerNotePage {...props}></WrongAnswerNotePage>}></Route>
          <Route path='/history' render={(props)=> <HistoryPage {...props}></HistoryPage>}></Route>
          <Route component={NotFound}></Route>
      </Switch>
      {confirmInfo.show ? <ConfirmMessageContainer></ConfirmMessageContainer> : null}
      {toastInfo.show ? <ToastBoxContainer></ToastBoxContainer> : null}
    </div>
  );
}

const style = css`
  background-color: #282c34;
  min-height: 100vh;
`;

export default App;

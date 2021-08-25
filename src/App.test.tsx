import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';
import {MemoryRouter} from 'react-router-dom';
import {Provider} from 'react-redux';
import {createStore} from 'redux';
import rootReducer from './redux-modules/index';
import userEvent from '@testing-library/user-event';
import mock from '../public/mock.json';
import {ChartBox, Popup, QuizCard, Note} from './components/index';

function mockFetch(){
  const list = JSON.parse(JSON.stringify(mock));
  global.fetch = jest.fn(list);
}

function renderApp() {
  const store = createStore(rootReducer);
  render(
    <MemoryRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </MemoryRouter>
  );
}

function getMenuButtons() {
  global.fetch = jest.fn().mockResolvedValue({
    result: {
      status: 1,
      result: "Dale Seo",
    },
  });
  renderApp();
  const button1 = screen.getByText('퀴즈 풀기');
  const button2 = screen.getByText('기록 보기');
  return {button1, button2};
}

describe('[ 메뉴 링크 테스트 ]', () => {
  test('#1 시작 페이지 렌더링', () => {
    const {button1, button2} = getMenuButtons();
    expect(button1).toBeInTheDocument;
    expect(button2).toBeInTheDocument;
  });
  
  test('#2 메인 페이지 렌더링', async () => {
    // mockFetch();
    const {button1} = getMenuButtons();
    userEvent.click(button1);

    const countAlert = await screen.findByText('3초 후 시작!');
    expect(countAlert).toBeInTheDocument;

    const backButton = await screen.findByText('처음으로');
    expect(backButton).toBeInTheDocument;

    const factor1 = screen.getByTestId('f1');
    expect(factor1).toBeInTheDocument;

    userEvent.click(factor1);
    expect(screen.getByText('다음 문항')).toBeInTheDocument;
  });
  
  test('#3 퀴즈이력 페이지 렌더링', async () => {
    const {button2} = getMenuButtons();
    userEvent.click(button2);

    const title = screen.getByText(/퀴즈이력/);
    expect(title).toBeInTheDocument;
  });
});

describe('<ChartBox/>', ()=>{
  test('차트 렌더링', ()=>{
    const list = [
      {x: '3', y: 12, name: 'test1'},
      {x: '7', y: 20, name: 'test2'},
    ];
    const colorList = ['#008cff', '#ff3e3e'];

    render(<ChartBox dataList={list} colorList={colorList}/>);

    const name1 = screen.getByText('test1');
    expect(name1).toBeInTheDocument;
    
    const name2 = screen.getByText('test2');
    expect(name2).toBeInTheDocument;
  });
});

describe('<Popup/>', ()=>{
  test('팝업 렌더링', ()=>{
    const TestElement = ()=> (
      <div>
        테스트<img src='' alt='this is img'></img>
      </div>
    );
    
    render(
      <Popup onClose={()=>{}}>
        <TestElement/>
      </Popup>
    );

    const text = screen.getByText('테스트');
    expect(text).toBeInTheDocument;
    
    const alt = screen.getByAltText('this is img');
    expect(alt).toBeInTheDocument;
  });
});

describe('<QuizCard/>', ()=>{
  test('퀴즈컨텐츠 렌더링', ()=>{
    const quiz = {
      category: '',
      type: '',
      difficulty: '',
      question: 'Where is the Namsan tower?',
      correct_answer: 'in the Namsan mountain',
      incorrect_answers: ['w1','w2','w3']
    }

    render(
      <QuizCard 
        quiz={quiz}
        quizNumber={1} 
        size={10} 
        onClickNext={()=>{}} 
        onFactorSelected={()=>{}}/>
    );

    const question = screen.getByText('Where is the Namsan tower?');
    expect(question).toBeInTheDocument;
    
    const correct = screen.getByText('in the Namsan mountain');
    expect(correct).toBeInTheDocument;

    const wrong = screen.getByText('w2');
    expect(wrong).toBeInTheDocument;

    userEvent.click(correct);
    
    const nextButton = screen.getByText('다음 문항');
    expect(nextButton).toBeInTheDocument;
  });
});

describe('<Note/>', ()=>{
  test('오답노트 렌더링', ()=>{
    const resultFactor = {
      question: '우리나라의 수도는?',
      answer: '서울',
      pick: '부산',
      correct: false,
      opinion: '공부하자.',
    }

    render(
      <Note 
        resultFactor={resultFactor}
        index={1} 
        onOpinionChanged={()=>{}}/>
    );

    const question = screen.getByText('우리나라의 수도는?');
    expect(question).toBeInTheDocument;
    
    const txt = screen.getByText('나의 답');
    expect(txt).toBeInTheDocument;

    const wrong = screen.getByText('부산');
    expect(wrong).toBeInTheDocument;
    
    const opi = screen.getByText('공부하자.');
    expect(opi).toBeInTheDocument;
    
    screen.debug();
  });
});
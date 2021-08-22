// 퀴즈 타입
export interface quiz {
    category: string
    type: string
    difficulty: string
    question: string
    correct_answer: string
    incorrect_answers: string[]
}

// 퀴즈 응답값 타입
export interface quizResponse {
    response_code: number
    results: quiz[]
}

// 선택한 문항 타입
export interface selectedFactor {
    question: string
    answer: string
    pick: string
    correct: boolean
    opinion?: string
}

// 퀴즈결과 타입
export interface resultInfo {
    resultList: selectedFactor[]
    resultTime: string
    resultDate: string
}

// 이력 타입
export interface historyInfo extends resultInfo {
    category: string
}

export interface confirmInfo {
    msg?: string
    show: boolean
    confirmCallback?: ()=>void
}

export interface toastInfo {
    msg?: string
    show: boolean
    type?: 'o' | 'x'
}
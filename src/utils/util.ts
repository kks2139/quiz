const UT = {
    request : async (api: string)=>{
        try {
            const result = await fetch(api);
            if(result.status !== 200){
                throw new Error('문제가 발생하였습니다.');
            }
            return result.json();
        }catch(ex){
            console.error(ex);
        }
    },
    rand : (n: number) => { // 0 이상 ~ n 미만 랜덤숫자 리턴
        return Math.floor(Math.random() * 10) % n;
    },
    localeStringToTime : (str: string)=>{
        const arr = str.split('.').join('').split(':').join(' ').split(' ');
        const nums = arr.map(a => {
            if(a === '오전') return -1;
            else if(a === '오후') return 1;
            else return Number(a);
        });
        return new Date(
            nums[0], 
            nums[1] - 1, 
            nums[2], 
            nums[3] > 0 ? nums[4] + 12 : nums[4], 
            nums[5], 
            nums[6]
        ).getTime();
    }
}

export default UT;
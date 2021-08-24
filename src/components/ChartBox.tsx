import React from 'react';
/** @jsxImportSource @emotion/react */
import {css} from '@emotion/react';
import {VictoryPie} from 'victory';

interface dataListType {
    x: string
    y: number
    name: string
}

interface Props {
    dataList: dataListType[]
    colorList: string[]
    showLabel?: boolean
}

function ChartBox({dataList, colorList, showLabel=true}: Props){
    return (
        <div css={style}>
            <VictoryPie 
                colorScale={colorList}
                data={dataList}
                innerRadius={70}
                labelRadius={({ innerRadius }) => 100 }
                startAngle={180}
                endAngle={360 + 180}
                style={{
                    labels: {
                        fontSize: 35,
                        fontWeight: 'bold',
                        fill: 'white'
                    }
                }}/>
            {showLabel ? <div className='info'>
                {dataList.map((data, i) => (
                    <div key={i} className='wrapper'>
                        <div className='color' style={{backgroundColor: colorList[i]}}></div>
                        <div className='name'>{data.name}</div>
                    </div>
                ))}
            </div> : null}
        </div>
    );
}

const style = css`
    > .info {
        display: flex;
        justify-content: center;
        margin-bottom: 30px;
        > .wrapper {
            color: white;
            font-weight: bold;
            display: flex;
            align-items: center;
            margin-right: 20px;
            .name {
            }
            .color {
                margin-right: 10px;
                width: 16px;
                height: 16px;
                border-radius: var(--radius-2);
            }
        }
    }

    @media screen and (max-width: 800px) {
        display: flex;
        > .info {
            flex-direction: column;
            > .wrapper {
                min-width: 100px;
                height: 35px;
            }
        }

    }
`;

export default ChartBox;
import React from 'react';
import { Chart } from './Chart'
interface Props {
    title: string;
}

const graphs = [{type:'windactual', color:'green'}, {type:'demandactual', color:'red'}];

export const GraphContainer = (props: Props) => {
  return (
    <div className="graphContainer">
        <h2 className='title'>{props.title}</h2>
        <Chart title='Chart' graphs={graphs} width={300} height={100} strokeWidth={0.5} strokeColor='#57a16a'/>
    </div>
  );
};
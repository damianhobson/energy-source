import React from 'react';
import {useEffect, useState, useMemo} from 'react';
import * as d3 from 'd3';
import { GraphLine } from './GraphLine';
import { Axis } from './Axis';

interface Props {
  title: string;
  graphs: {type:string, color:string}[];
  width: number;
  height: number;
  strokeWidth: number;
  strokeColor: string;
}

export const Chart = (props: Props) => {

  const [domainX, setDomainX] = useState<[Date, Date]>([new Date(), new Date()]);
  const [maxY, setMaxY] = useState<number>(6000);
  const [margin, setMargin] = useState<[number, number]>([15, 0]);

  return (
    <div className="chart">
      <svg viewBox={`0 0 ${props.width} ${props.height+20}`}>
          
          {props.graphs.map(({type, color}) => (
            <GraphLine key={type} type={type} 
              maxY={maxY}
              domainX={domainX} setDomainX={setDomainX}
              width={props.width} height={props.height} 
              margin={[15, 0]}
              strokeWidth={0.5} strokeColor={color}/>
          ))}

          <Axis maxY={maxY}
            domainX={domainX} setDomainX={setDomainX}
            width={props.width} height={props.height}
            margin={margin}
            strokeWidth={0.5} strokeColor={'#FFF'}/>

      </svg>
    </div>
  );
};

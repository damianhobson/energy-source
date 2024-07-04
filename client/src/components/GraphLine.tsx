import {useEffect, useState} from 'react';
import * as d3 from 'd3';

interface Props {
  type: string;
  width: number;
  height: number;
  margin: [number, number];
  strokeWidth: number;
  strokeColor: string;
  maxY: number;
  setMaxY: Function;
  setDomainX: Function;
  domainX: [Date, Date];
}
interface ValueLine {
  date: number;
  value: number;
}

export const GraphLine = (props: Props) => {
  const [pathData, setpathData] = useState<ValueLine[]>([]);

  useEffect(() => {
    fetch(`/api/graph?type=${props.type}`)
      .then((res) => res.json())
      .then((data) => {
        const minDomainDate:any = d3.min(data.map((d: { date: Date; }) => d.date)) || new Date();
        const maxDomainDate:any = d3.max(data.map((d: { date: Date; }) => d.date)) || new Date();
        const maxValue:any = d3.max(data.map((d: { value: number; }) => d.value)) || 0;
        if (maxValue > props.maxY) props.setMaxY(maxValue + 10);
        props.setDomainX([minDomainDate, maxDomainDate]);
        setpathData(data);
    });
  }, []);

  const xScale = d3.scaleLinear()
    .domain(props.domainX || [0,0])
    .range([props.margin[0], props.width - props.margin[0]]|| [0,0])

  const yScale = d3.scaleLinear()
    .domain([0, props.maxY] || [0,0])
    .range([props.height, props.margin[1]] || [0,0])

  const valuePath = d3.line<ValueLine>()
    .x((d) => { return xScale(d.date || 0); })
    .y((d) => { return yScale(d.value || 0); })

  return (
    <path d={valuePath(pathData) || undefined} stroke={props.strokeColor} strokeWidth={props.strokeWidth} fill="none"/>
  )
}
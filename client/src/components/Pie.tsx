import {useEffect, useState} from 'react';
import * as d3 from 'd3';

interface Props {
  width: number;
  height: number;
  margin: [number, number];
  strokeWidth: number;
  strokeColor: string;
  innerRadius: number;
  outerRadius: number;
  paletteMap: {key:string, name:string, color:string}[];
}

interface ArcProps {
  data: ArcValue;
  index: number;
  createArc: Function;
  centroid: Function;
  colors: Function;
  format: Function;
}

interface ArcValue {
    name?: string;
    value: number;
    percentage?:number;
}

export const Pie = (props: Props) => {
  const [pieData, setPieData] = useState<ArcValue[]>([]);

  useEffect(() => {
    fetch(`/api/fuelmix`)
      .then((res) => res.json())
      .then((data) => {
        const total = data.reduce((acc: number, dataPoint: { value: number; } ) => acc + dataPoint.value, 0);
        const addPercentage = data.map((dataPoint: { value: number; }) => ({percentage: ((dataPoint.value / total) * 100).toFixed(2), ...dataPoint}));
        setPieData(addPercentage);
    });
  }, []);

  const Arc = (arc:ArcProps) => (
    <g key={arc.index} className="arc">
      <path className="arc" d={arc.createArc(arc.data)} fill={arc.colors(arc.data)} />
      <text
        transform={`translate(${arc.centroid(arc.data)})`}
        textAnchor="middle" fill="white" fontSize="12"
      >
        {arc.format(arc.data)}
      </text>
    </g>
  );
  const createPie = d3
    .pie<ArcValue>()
    .value(d => d.value || 0)
    .sort(null);

  const createArc = d3
    .arc<d3.PieArcDatum<ArcValue>>()
    .innerRadius(props.innerRadius)
    .outerRadius(props.outerRadius)
    .padAngle(0.03);

  const createArcForText = d3
    .arc<d3.PieArcDatum<ArcValue>>()
    .innerRadius(props.innerRadius + 50)
    .outerRadius(props.outerRadius + 50)
    .padAngle(0.03);

  const palette = Object.assign({}, ...props.paletteMap.map((item)=> ({[item.key]: item.color})));
  const colors = (data:any) => (palette[data.data.name] || '#FFF');
  const format = (data:any) => (data.data.percentage + '%') 
  const data = createPie(pieData);

  return (
    <div className='pie'>
      <svg width={props.width + props.margin[0]} height={props.height + props.margin[1]} viewBox={`0 0 ${props.width + props.margin[0]} ${props.height + props.margin[1]}`}>
        <g transform={`translate(${props.outerRadius + props.margin[0]} ${props.outerRadius + props.margin[1]})`}>
            {data.map((d, i) => (
              <Arc
                key={i}
                index={i}
                data={d}
                createArc={createArc}
                centroid={createArcForText.centroid}
                colors={colors}
                format={format}
              />
            ))}
          </g>
        </svg>
      </div>
  )
}
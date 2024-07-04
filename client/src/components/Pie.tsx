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
}

interface ArcProps {
  data: ArcValue;
  index: number;
  createArc: Function;
  colors: Function;
  format: Function;
}

interface ArcValue {
    name?: string;
    value?: number;
}

export const Pie = (props: Props) => {
  const [pieData, setPieData] = useState<ArcValue[]>([]);

  useEffect(() => {
    fetch(`/api/graph?type=fuelmix`)
      .then((res) => res.json())
      .then((data) => {
        setPieData(data);
    });
  }, []);

  const Arc = (arc:ArcProps) => (
    <g key={arc.index} className="arc">
      <path className="arc" d={arc.createArc(arc.data)} fill={arc.colors(arc.index)} />
      <text
        // transform={`translate(${createArc.centroid(arc.data)})`}
        textAnchor="middle"
        fill="white"
        fontSize="10"
      >
        {arc.format(arc.data.value)}
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
    .outerRadius(props.outerRadius);

    //d3.line<ValueLine>()
  const colors = d3.scaleOrdinal(d3.schemeSet3);
  const format = d3.format(".2f");
  const data = createPie(pieData);

  return (
    <svg width={props.width} viewBox={`0 0 ${props.width} ${props.height+20}`}>
      <g transform={`translate(${props.outerRadius + props.margin[0]} ${props.outerRadius + props.margin[1]})`}>
          {data.map((d, i) => (
            <Arc
              key={i}
              index={i}
              data={d}
              createArc={createArc}
              colors={colors}
              format={format}
            />
          ))}
        </g>
      </svg>
  )
}
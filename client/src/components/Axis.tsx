import {useMemo} from 'react';
import * as d3 from 'd3';

interface Props {
  width: number;
  height: number;
  strokeWidth: number;
  strokeColor: string;
  maxY: number;
  setDomainX: Function;
  domainX: [Date, Date];
  margin: [number, number];
}

const getTimestamp = (d: number) => {
  const tickTime = new Date(d);
  return `${tickTime.getHours()}:${(tickTime.getMinutes() < 10 ? '0' : '') + tickTime.getMinutes() }:${(tickTime.getSeconds() < 10 ? '0' : '') +tickTime.getSeconds()}`;
};

export const Axis = (props: Props) => {

  const xScale = d3.scaleLinear()
    .domain(props.domainX || [0,0])
    .range([props.margin[0], props.width - props.margin[0]]|| [0,0])

  const yScale = d3.scaleLinear()
    .domain([0, props.maxY] || [0,0])
    .range([props.height, props.margin[1]] || [0,0])

  const ticksX = useMemo(() => {
    const pixelsPerTick = 50
    const numberOfTicksTarget = Math.max(
      1,
      Math.floor(
        props.width / pixelsPerTick
      )
    )
    return xScale.ticks(numberOfTicksTarget)
      .map(value => ({
        value,
        xOffset: xScale(value)
      }))
  }, [
    props.domainX.join("-"),
    [0, props.width].join("-")
  ])
  const ticksY = useMemo(() => {
    const pixelsPerTick = 30
    const numberOfTicksTarget = Math.max(
      1,
      Math.floor(
        props.height / pixelsPerTick
      )
    )
    return yScale.ticks(numberOfTicksTarget)
      .map(value => ({
        value,
        yOffset: yScale(value)
      }))
  }, [
    [0, props.maxY].join("-"),
    [props.height, 0].join("-")
  ])

  return (
    <g>
      <path d={`M ${props.margin[0]} ${props.height - props.margin[1]} H ${props.width - props.margin[0]}`} stroke="#FFF"/>
      <path d={`M ${props.margin[0]} ${props.height - props.margin[1]} L ${props.margin[0]} 0`} stroke="#FFF"/>
      {ticksX.map(({ value, xOffset }) => (
        <g
          key={value}
          transform={`translate(${xOffset}, ${props.height})`}
        >
          <line
            y2="6"
            stroke="#FFF"
          />
          <text
            key={value}
            style={{
              fontSize: "4px",
              fill: "#FFF",
              textAnchor: "middle",
              transform: "translateY(10px)"
            }}>
            { getTimestamp(value) }
          </text>
        </g>
        
      ))}

      {ticksY.map(({ value, yOffset }) => (
        <g
          key={value}
          transform={`translate( ${props.margin[0]}, ${yOffset})`}
        >
          <line
            x2="-3"
            stroke="#FFF"
          />
          <text
            key={value}
            style={{
              fontSize: "4px",
              fill: "#FFF",
              textAnchor: "end",
              transform: "translateX(-4px)translateY(+3px)"
            }}>
            { value }
          </text>
        </g>
        
      ))}
    </g>
  )

}
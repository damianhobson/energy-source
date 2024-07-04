import { Chart } from './Chart'

interface Props {
  labels: {name:string, color:string}[];
}

export const Legend = (props: Props) => {
  return (
    <div className="legend">
      {props.labels.map(({name, color}) => (
        <div className='item'>
          <div className='colorLine' style={{ backgroundColor: color }}></div>
          <div className='name'>{name}</div>
        </div>
      ))}

    </div>
  );
};
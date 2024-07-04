import { Pie } from './Pie'

interface Props {
  title: string;
}

// const graphs = [{type:'windactual', color:'#487a02'}, {type:'demandactual', color:'#c46f54'}];

export const PieContainer = (props: Props) => {
  return (
    <div className="graphContainer">
        <h2 className='title'>{props.title}</h2>
        <Pie
            width={400}
            height={400}
            innerRadius={140}
            outerRadius={180}
            margin={[20,20]}
            strokeWidth={1} strokeColor={'red'}
          />
    </div>
  );
};
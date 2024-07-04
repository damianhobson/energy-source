import { Chart } from './Chart'
import { Legend } from './Legend'
interface Props {
  title: string;
}

const graphs = [{type:'windactual', name:'Wind Generated', color:'#487a02'}, {type:'demandactual', name:'Total Demand', color:'#c46f54'}];
const labels = graphs.map((graph) => {return {name : graph.name, color: graph.color}});
 //[{name:'windactual', color:'#487a02'}, {lame:'demandactual', color:'#c46f54'}]
export const GraphContainer = (props: Props) => {
  return (
    <div className="graphContainer">
        <h2 className='title'>{props.title}</h2>
        <Chart title='Chart' graphs={graphs} width={300} height={100} strokeWidth={1} strokeColor='#57a16a'/>
        <Legend labels={labels} />
    </div>
  );
};
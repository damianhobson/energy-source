import {useState} from 'react';
import { Chart } from './Chart'
import { Legend } from './Legend'
import Select from "react-dropdown-select";

interface Props {
  title: string;
}
interface graphOption {
  value: string,
  label: string
}
const graphOptions = [
  {value: 'wind', label: 'Wind Generated'},
  {value: 'emissions', label: 'C02 Emmisions'}
]
const graphs = [
  {type:'windactual', name:'Wind Generated', color:'#487a02', group:'wind'}, 
  {type:'demandactual', name:'Total Demand', color:'#c46f54', group:'wind'}, 
  {type:'co2emission', name:'C02 Emmisions', color:'#5ebf6c', group:'emissions'}
];
const labels = graphs.map((graph) => {return {name : graph.name, color: graph.color}});

export const GraphContainer = (props: Props) => {
  //  const [selectedGraphs, setGraphs] = useState<graphOption[]>([]);
  //const [user, setUser] = useState<UserData | null>(null);
  const [selectedGraphs, setGraphs] = useState<graphOption>(graphOptions[0]);
  console.log(selectedGraphs)
  return (
    <div className="graphContainer">
        <Select className='graphSelect' options={graphOptions} onChange={(values) => setGraphs(values[0])} values={graphOptions} />
        <Chart title='Chart' graphs={graphs.filter((graph) => graph.group === selectedGraphs.value)} width={300} height={100} strokeWidth={1} strokeColor='#57a16a'/>
        <Legend labels={graphs.filter((graph) => graph.group === selectedGraphs.value)} />
    </div>
  );
}; 
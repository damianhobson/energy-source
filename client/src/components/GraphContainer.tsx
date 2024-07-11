import {useState} from 'react';
import { Chart } from './Chart'
import { Legend } from './Legend'
import Select from "react-dropdown-select";

interface Props {
  title: string;
}
interface graphOption {
  value: string;
  label: string;
  ylabel: string;
}
const graphOptions = [
  {value: 'wind', label: 'Wind Generated', ylabel: 'MW'},
  {value: 'emissions', label: 'C02 Emmisions', ylabel: 'tCO2/hr'},
  {value: 'total', label: 'Total Generated', ylabel: 'MW'},
]
const graphs = [
  {type:'windactual', name:'Wind Generated', color:'#487a02', group:'wind'}, 
  {type:'demandactual', name:'Total Demand', color:'#c46f54', group:'wind'}, 
  {type:'co2emission', name:'C02 Emmisions', color:'#5ebf6c', group:'emissions'},
  {type:'generationactual', name:'Total Generated', color:'#fff', group:'total'}
];

export const GraphContainer = (props: Props) => {
  const [selectedGraphs, setGraphs] = useState<graphOption>(graphOptions[0]);
  return (
    <div className="graphContainer">
        <Select className='graphSelect' options={graphOptions} onChange={(values) => setGraphs(values[0])} values={[graphOptions[0]]} />
        <Chart title='Chart' graphs={graphs.filter((graph) => graph.group === selectedGraphs.value)} ylabel={selectedGraphs.ylabel} width={300} height={100} strokeWidth={1} strokeColor='#57a16a'/>
        <Legend labels={graphs.filter((graph) => graph.group === selectedGraphs.value)} />
    </div>
  );
}; 
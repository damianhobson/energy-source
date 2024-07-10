import { Pie } from './Pie'
import { Legend } from './Legend'
interface Props {
  title: string;
}

const paletteMap = [{key:'FUEL_NET_IMPORT', name:'Imported', color:'#bdcf32'}, 
  {key:'FUEL_GAS', name:'Gas', color:'#7c1158'}, 
  {key:'FUEL_COAL', name: 'Coal', color:'#54504c'},
  {key:'FUEL_OTHER_FOSSIL', name: 'Other Fossil Fuel', color:'#c46f54'},
  {key:'FUEL_RENEW', name: 'All Renewable', color:'#487a02'},
];
const labels = paletteMap.map((item) => {return {name : item.name, color: item.color}});

export const PieContainer = (props: Props) => {
  return (
    <div className="graphContainer">
        <h2 className='title'>{props.title}</h2>
        <Pie
            width={400}
            height={400}
            innerRadius={110}
            outerRadius={170}
            margin={[45,30]}
            strokeWidth={1} strokeColor={'red'}
            paletteMap={paletteMap}
        />
        <Legend labels={labels} />
    </div>
  );
};
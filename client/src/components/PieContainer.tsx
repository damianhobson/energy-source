import { Pie } from './Pie'

interface Props {
  title: string;
}

const paletteMap = [{key:'FUEL_NET_IMPORT', name:'Imported', color:'#487a02'}, 
  {key:'FUEL_GAS', name:'Gas', color:'#7c1158'}, 
  {key:'FUEL_COAL', name: 'Coal', color:'#54504c'},
  {key:'FUEL_OTHER_FOSSIL', name: 'Other Fossil Fuel', color:'#c46f54'},
  {key:'FUEL_RENEW', name: 'All Renewable', color:'#bdcf32'},
];

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
            paletteMap={paletteMap}
          />
    </div>
  );
};
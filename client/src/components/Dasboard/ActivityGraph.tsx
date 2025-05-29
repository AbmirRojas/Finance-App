import { RiMoneyEuroCircleLine } from "react-icons/ri";
import {LineChart, Line, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, } from 'recharts';

const data = [
  {
    name: 'January',
    uv: 4000,
    Income: 2400,
    amt: 2400,
  },
  {
    name: 'February',
    uv: 3000,
    Income: 1398,
    amt: 2210,
  },
  {
    name: 'March',
    uv: 2000,
    Income: 9800,
    amt: 2290,
  },
  {
    name: 'April',
    uv: 2780,
    Income: 3908,
    amt: 2000,
  },
  {
    name: 'May',
    uv: 1890,
    Income: 4800,
    amt: 2181,
  },
  {
    name: 'June',
    uv: 2390,
    Income: 3800,
    amt: 2500,
  },
];

export default function ActivityGraph() {
    return(
        <div className="col-span-8 overflow-hidden rounded border border-stone-300 shadow">
            <div className="p-4">
                <h3 className="flex items-center gap-1.5 font-medium">
                   <RiMoneyEuroCircleLine /> Activity
                </h3>               
            </div>
            {/*Graph*/}
            <div className='h-64 px-4'>
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart width={500} height={400} data={data} margin={{top: 0, right: 0, left: -10, bottom: 0}}>      
                    <XAxis dataKey="name" padding={{ left: 30, right: 30 }} />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="Income" stroke="#1d4ed8" activeDot={{ r: 8 }} />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </div>
    )
}